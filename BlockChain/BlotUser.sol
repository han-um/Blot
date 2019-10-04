pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./Context.sol";

contract BlotUser is Context {
    
    using SafeMath for uint256;
    
    struct User {
        address payable walletAddress;
        uint256 reliability;
        bool used;
    }
    
    // 사용자Id에 따른 사용자 정보
    mapping(string => User) userInfo;

    // 사용자 정보 저장
    // 사용자 초기 신뢰 점수 100
    function createUser(string memory userId, address payable walletAddress) public returns (bool) {
        // 해당 User 아이디가 사용중이 아니어야 함
        require(!userExist(userId), "ERROR : That userId already exists.");
        userInfo[userId] = User(walletAddress, 100, true);
        return true;
    }
    
    // 사용자 지갑 주소 반환 함수
    function getUserAddress(string memory userId) public view returns (address payable) {
        // 해당 User 아이디 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't get user wallet address.");
        return userInfo[userId].walletAddress;
    }

    // 사용자 신뢰 점수 반환 함수
    function getUserReliability(string memory userId) public view returns (uint256) {
        // 해당 User 아이디 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't get user reliability.");
        return userInfo[userId].reliability;
    }
    
    // 사용자가 등록되었는지 확인하는 함수
    function userExist(string memory userId) public view returns (bool) {
        if(userInfo[userId].used)
            return true;
        return false;
    }
    
    // 사용자 지갑 주소 변경 함수
    function modifyUserAddress(string memory userId, address payable newUserAddress) public {
        // 해당 User 아이디 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't modify user wallet address.");
        
        // 기존 사용자 주소와 똑같으면 할 필요없음
        require(userInfo[userId].walletAddress != newUserAddress, "ERROR : It's the same as former address.");
        
        // 트랜잭션 호출자가 사용자의 기존 지갑계정인지 확인
        require(_msgSender() == userInfo[userId].walletAddress, "ERROR : Please send a request with your former walletAddress.");
        
        userInfo[userId].walletAddress = newUserAddress;
    }
    
    // 사용자 신뢰 점수 증가 함수
    function addUserReliability(string memory userId, uint128 value) public returns (bool) {
        require(userExist(userId), "ERROR : There is not the user. Can't add user reliability.");
        userInfo[userId].reliability = (userInfo[userId].reliability).add(value);
        emit Reliability(userId, int128(value), userInfo[userId].reliability);
        return true;
    }
    
    // 사용자가 얼마큼 신뢰 점수를 얻었는지 이벤트로 남김
    event Reliability(string indexed userId, int128 value, uint256 totalUserReliability);
}