pragma solidity ^0.5.6;

import "./erc20/ERC20.sol";
import "./erc20/ERC20Detailed.sol";
import "./library/KlaytnMonetaryUnit.sol";
import "./library/Ownable.sol";
import "./BlotUser.sol";
import "./BlotProject.sol";

/**
 * @title BlotToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract BlotToken is Ownable, ERC20, ERC20Detailed {

    BlotUser public blotUserAddress;
    BlotProject public blotProjectAddress;
    uint256 public basePebMoney;

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     * tokenName, tokenSymbol, exponent
     */
    constructor () public ERC20Detailed("BlotToken", "BLOT", 4) {
        //_mint(_msgSender(), 1000 * (10 ** uint256(decimals())));
        // 초기자본금
        basePebMoney = 1e18;
    }

    // fallback function
    function() external payable {
        require(_msgData().length == 0, "ERROR : You called fallback function with data.");
        emit LogDepositReceived(_msgSender(), msg.value);
    }

    // 사용자 지갑주소로 사용자 토큰 잔고를 조회하는 함수 = balanceOf()
    function getUserBalanceByUserAddress(address userAddress) public view returns (uint256) {
        return balanceOf(userAddress);
    }

    // 컨트랙트 내 잔고를 조회
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Klay를 지불하고 Blot 토큰을 구입하는 함수
    // @ NOTE : BLOT 서비스 이용자가 아닌 외부 사용자도 토큰을 구입할 수 있도록 함
    function purchaseToken(address userAddress, uint256 klayNum) public payable returns (bool) {
        // 토큰 구입은 컨트랙트 계정이 아닌 사용자 계정으로만 가능하도록 제한
        require(_isUserAddress(userAddress), "ERROR : It's not external owned account. Please buy tokens with your EOA.");

        // klayNum 만큼의 klay를 송금했다면
        require(KlaytnMonetaryUnit.pebToKlay(msg.value) >= klayNum, "ERROR : Not enough balance.");

        // userAddress에 klayNum에 비례하는 Token 지급
        _mint(userAddress, KlaytnMonetaryUnit.klayToBlot(klayNum, uint256(decimals())));

        // 누가 컨트랙트 계정에 입금했는지 로그 기록을 남김
        emit LogDepositReceived(_msgSender(), msg.value);
        return true;
    }

    // Blot 토큰 판매하고 Klay로 바꿔가는 함수
    function sellToken(uint256 blotNum) public returns (bool) {
        // blotNum이 10000으로 나누어떨어져야 함
        require(blotNum.mod(1e4)==0, "Please enter BLOT token number in units of 10000");

        // user가 blotNum 이상의 토큰을 보유하고 있어야 함
        require(balanceOf(_msgSender()) >= blotNum, "You don't enough tokens.");

        // blotNum 만큼 토큰을 없앰
        _burn(_msgSender(), blotNum);

        // 사용자 계정으로 klay(Peb 단위) 입금하기 위해 컨트랙트 계정의 잔고를 확인하고 송금
        uint256 pebNum = KlaytnMonetaryUnit.blotToPeb(blotNum, uint256(decimals()));
        require(address(this).balance >= pebNum, "Error : Contract owner doesn't have enough money.");
        address(uint160(_msgSender())).transfer(pebNum);
        return true;
    }

    // 사용자 지갑 계정을 변경하는 함수
    function replaceOldToNewUserAddress(string memory userId, address payable newUserAddress) public returns (bool) {
        // 사용자 지갑 계정 수정
        if(blotUserAddress.modifyUserAddress(userId, _msgSender(), newUserAddress)) {
            // 토큰 잔고 옮겨주기
            uint256 userBalance = getUserBalanceByUserAddress(_msgSender());
            if(userBalance > 0) {
                // userBalance 만큼 토큰을 새로운 계정으로 옮김
                if(transfer(newUserAddress, userBalance))
                    return true;
                else
                    revert("ERROR : Can't change his address. Because of transfer");                
            }
        }
        else
            revert("ERROR : Can't change his address.");
    }

    // 프로젝트 마감 후, 사용자들에게 토큰으로 보상금 지급. reward는 BLOT 단위 => Token으로 옮겨줌
    function sendRewardToUser(address payable userAddress, uint256 reward) public onlyOwner returns (bool) {
        _mint(userAddress, reward);
        return true;
    }

    // 사용자의 지갑에서 일정량의 토큰을 없애고 총 토큰 발행량을 감소시키기
    function burnBlot(address userAddress, uint256 blotNum) public returns (bool) {
        require(_msgSender() == owner() || _msgSender() == address(blotProjectAddress));
        // user가 blotNum 이상의 토큰을 보유하고 있어야 함
        require(balanceOf(userAddress) >= blotNum, "You don't enough tokens.");

        // blotNum 만큼 토큰을 없앰
        _burn(userAddress, blotNum);
        return true;
    }

    // 번역 프로젝트 마감 후, 잉여 자금을 대납 계정으로 송금
    function transferBalanceToOwner() public onlyOwner {
        uint256 q = totalSupply()/(10 ** uint256(decimals()));
        uint256 surplus = getContractBalance().sub(KlaytnMonetaryUnit.klayToPeb(q));
        if(surplus > basePebMoney)
            address(uint160(owner())).transfer(surplus.sub(basePebMoney));
    }

    // 기초자본금 변경
    function setBaseMoney(uint16 klayNum) public onlyOwner {
        basePebMoney = KlaytnMonetaryUnit.klayToPeb(klayNum);
    }

    // BlotUserAddress 주소 설정
    function setBlotUserAddress(address addr) public onlyOwner {
        blotUserAddress = BlotUser(addr);
    }

    // BlotProjectAddress 주소 설정
    function setBlotProjectAddress(address addr) public onlyOwner {
        blotProjectAddress = BlotProject(addr);
    }

    // 주어진 address가 EOA인지 판단하는 함수
    function _isUserAddress(address _addr) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(_addr)}
        return (size == 0);  // 0 이면 EOA, 1 이상이면 CA
    }

    // klay 수신 내역   => Token 컨트랙트로 옮겨주기
    event LogDepositReceived(address indexed userAddress, uint256 pebNum);
}