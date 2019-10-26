pragma solidity ^0.5.6;

import "./BlotToken.sol";
import "./BlotProject.sol";
import "./BlotUser.sol";
import "./library/SafeMath.sol";
import "./library/KlaytnMonetaryUnit.sol";
import "./library/Ownable.sol";

contract BlotMain is Ownable {

    using SafeMath for uint256;

    BlotToken public blotTokenAddress;
    BlotProject public blotProjectAddress;
    BlotUser public blotUserAddress;

    constructor () public {
        blotTokenAddress = new BlotToken();
        blotProjectAddress = new BlotProject();
        blotUserAddress = new BlotUser();
    }

    // fallback function
    function() external payable {
        require(_msgData().length == 0, "ERROR : You called fallback function with data.");
        emit LogDepositReceived(_msgSender(), msg.value);
    }

    /* 토큰 구매 및 판매 */

    // Klay를 지불하고 Blot 토큰을 구입하는 함수
    // BLOT 서비스 이용자가 아닌 외부 사용자도 토큰을 구입할 수 있도록 함
    function purchaseToken(address userAddress, uint256 klayNum) public payable returns (bool) {
        // 토큰 구입은 컨트랙트 계정이 아닌 사용자 계정으로만 가능하도록 제한
        require(_isUserAddress(userAddress), "ERROR : It's not external owned account. Please buy tokens with your EOA.");

        // klayNum 만큼의 klay를 송금했다면
        require(KlaytnMonetaryUnit.pebToKlay(msg.value) >= klayNum, "ERROR : Not enough balance.");

        // userAddress에 klayNum에 비례하는 Token 지급
        if(blotTokenAddress.mintBlot(userAddress, KlaytnMonetaryUnit.klayToBlot(klayNum, uint256(blotTokenAddress.decimals())))) {
            // 누가 컨트랙트 계정에 입금했는지 로그 기록을 남김
            emit LogDepositReceived(_msgSender(), msg.value);
            return true;
        }
        else
            revert("ERROR : Can't sell token. Because of mintBlot.");
    }

    // Blot 토큰 판매하고 Klay로 바꿔가는 함수
    function sellToken(address payable userAddress, uint256 blotNum) public returns (bool) {
        // blotNum이 10000으로 나누어떨어져야 함
        require(blotNum.mod(1e4)==0, "Please enter BLOT token number in units of 10000");

        // blotNum 만큼 토큰을 없앰
        if(blotTokenAddress.burnBlot(userAddress, blotNum)) {
            // 사용자 계정으로 klay(Peb 단위) 입금하기 위해 컨트랙트 계정의 잔고를 확인하고 송금
            uint256 pebNum = KlaytnMonetaryUnit.blotToPeb(blotNum, uint256(blotTokenAddress.decimals()));
            require(address(this).balance >= pebNum, "Error : Contract owner doesn't have enough money.");
            userAddress.transfer(pebNum);
            return true;
        }
        else
            revert("ERROR : Can't sell token. Because of burnBlot.");
    }

    // 사용자Id로 사용자 토큰 잔고를 조회하는 함수
    function getUserBalanceByUserId(string memory userId) public view returns (uint256) {
        require(blotUserAddress.userExist(userId), "ERROR : The userId isn't registered yet.");
        return blotTokenAddress.balanceOf(blotUserAddress.getUserAddressByUserId(userId));
    }

    // 사용자 지갑 계정을 변경하는 함수
    function replaceOldToNewUserAddress(string memory userId, address payable newUserAddress) public returns (bool) {
        // 사용자 지갑 계정 수정
        if(blotUserAddress.modifyUserAddress(userId, _msgSender(), newUserAddress)) {
            // 토큰 잔고 옮겨주기
            uint256 userBalance = blotTokenAddress.getUserBalanceByUserAddress(_msgSender());
            if(userBalance > 0) {
                // userBalance 만큼 토큰을 없애고 새로운 계정에 토큰 입금
                if(blotTokenAddress.burnBlot(_msgSender(), userBalance)) {
                    // userAddress에 userBalance만큼 토근 지급
                    if(blotTokenAddress.mintBlot(newUserAddress, userBalance))
                        return true;
                    else
                        revert("ERROR : Can't change his address. Because of mintBlot");
                }
                else
                    revert("ERROR : Can't change his address. Because of burnBlot");
            }
        }
        else
            revert("ERROR : Can't change his address.");
    }

    // 사용자 신뢰 점수 조정 함수
    function updateUserReliability(string memory userId, int256 value) public onlyOwner returns (bool) {
        if(value >= 0)
            return blotUserAddress.addUserReliability(userId, uint(value));
        return blotUserAddress.subUserReliability(userId, uint(-value));
    }

    // 새로운 프로젝트 등록 함수
    function registerNewProject(
        string memory projectId,
        string memory writerId,
        string memory deadline,
        uint256 reward
    )
        public
    {
        // 글쓴이가 프로젝트 등록을 요청한 것인지 확인
        require(blotUserAddress.getUserAddressByUserId(writerId)==_msgSender());

        // 프로젝트 등록
        if(blotProjectAddress.createProject(projectId, writerId, deadline, reward)) {
            // 사용자 지갑에서 보상금액(BLOT 단위)만큼 토큰을 소멸시킴. 보상금 줄 때 다시 발행해서 지급할 계획
            if(!blotTokenAddress.burnBlot(blotUserAddress.getUserAddressByUserId(writerId), reward))
                revert("ERROR : Can't burn his tokens.");
        } else
            revert("ERROR : Can't Create Project.");
    }

     // 프로젝트 마감 후, 사용자들에게 토큰으로 보상금 지급. reward는 BLOT 단위
    function sendRewardToUser(address payable userAddress, uint256 reward) public onlyOwner returns (bool) {
        if(blotTokenAddress.mintBlot(userAddress, reward))
            return true;
        revert("ERROR : Can't send reward. Because of mintBlot.");
    }

    // 번역 활동 기록을 이벤트로 저장
    function generateTranslationEvent(
        string memory projectId,
        string memory translatorId,
        uint[] memory sentenceList,
        uint[] memory translationList,
        uint listSize,
        uint userShare
    )
        public onlyOwner
    {
        require(blotProjectAddress.projectExist(projectId), "ERROR : There is that projectID");
        require(blotUserAddress.userExist(translatorId), "ERROR : The userId isn't registered yet.");
        emit NewTranslation(
            keccak256(bytes(projectId)),
            keccak256(bytes(translatorId)),
            projectId,
            translatorId,
            sentenceList,
            translationList,
            listSize,
            userShare
        );
    }

    // 평가 활동 기록을 이벤트로 저장
    function generateEvaluationEvent(
        string memory projectId,
        string memory evaluatorId,
        uint[] memory sentenceList,
        uint[] memory translationList,
        uint listSize,
        uint userShare
    )
        public onlyOwner
    {
        require(blotProjectAddress.projectExist(projectId), "ERROR : There is that projectID");
        require(blotUserAddress.userExist(evaluatorId), "ERROR : The userId isn't registered yet.");
        emit NewEvaluation(
            keccak256(bytes(projectId)),
            keccak256(bytes(evaluatorId)),
            projectId,
            evaluatorId,
            sentenceList,
            translationList,
            listSize,
            userShare
        );
    }

    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // 주어진 address가 EOA인지 판단하는 함수
    function _isUserAddress(address _addr) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(_addr)}
        return (size == 0);  // 0 이면 EOA, 1 이상이면 CA
    }

    // 번역 프로젝트 마감 후, 잉여 자금을 대납 계정으로 송금
    function transferBalanceToOwner() public onlyOwner {
        uint256 q = blotTokenAddress.totalSupply()/(10 ** uint256(blotTokenAddress.decimals()));
        uint256 surplus = getContractBalance().sub(KlaytnMonetaryUnit.klayToPeb(q));
        if(surplus > 0)
            address(uint160(owner())).transfer(surplus);
    }

    // klay 수신 내역
    event LogDepositReceived(address indexed userAddress, uint256 klayNum);

    // 번역 및 평가 활동 기록
    event NewTranslation(
        bytes32 indexed projectIdHash,
        bytes32 indexed translatorIdHash,
        string projectId, string translatorId,
        uint[] sentenceIdList, uint[] translationIdList,
        uint listSize,
        uint userShare
    );

    event NewEvaluation(
        bytes32 indexed projectIdHash,
        bytes32 indexed evaluatorIdHash,
        string projectId,
        string evaluatorId,
        uint[] sentenceIdList,
        uint[] translationIdList,
        uint listSize,
        uint userShare
    );
}