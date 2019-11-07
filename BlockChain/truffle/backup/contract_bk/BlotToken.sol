pragma solidity ^0.5.6;

import "./erc20/ERC20.sol";
import "./erc20/ERC20Detailed.sol";

/**
 * @title BlotToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract BlotToken is ERC20, ERC20Detailed {

    address private owner;

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     * tokenName, tokenSymbol, exponent
     */
    constructor () public ERC20Detailed("BlotToken", "BLOT", 4) {
        //_mint(_msgSender(), 1000 * (10 ** uint256(decimals())));
        owner = _msgSender();
    }

    // user에게 Blot 토큰을 새로 발행해주는 함수
    function mintBlot(address userAddress, uint256 blotNum) public returns (bool) {
        require(msg.sender == owner);
        _mint(userAddress, blotNum);
        return true;
    }

    // 사용자의 지갑에서 일정량의 토큰을 없애고 총 토큰 발행량을 감소시키기
    function burnBlot(address userAddress, uint256 blotNum) public returns (bool) {
        require(msg.sender == owner);
        // user가 blotNum 이상의 토큰을 보유하고 있어야 함
        require(balanceOf(userAddress) >= blotNum, "You don't enough tokens.");

        // blotNum 만큼 토큰을 없앰
        _burn(userAddress, blotNum);
        return true;
    }

    // 사용자 지갑주소로 사용자 토큰 잔고를 조회하는 함수
    function getUserBalanceByUserAddress(address userAddress) public view returns (uint256) {
        return balanceOf(userAddress);
    }
}