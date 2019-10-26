pragma solidity ^0.5.6;

import "./library/SafeMath.sol";

contract BlotUser {

    using SafeMath for uint256;

    address private owner;

    constructor () public {
        owner = msg.sender;
    }

    struct User {
        address payable walletAddress;
        uint256 reliability;
        bool used;
    }

    // 사용자Id에 따른 사용자 정보
    mapping(string => User) userInfo;

    // 회원가입 시, 사용자 정보 저장
    // 사용자 초기 신뢰 점수 100
    function userSignUp(string memory userId, address payable walletAddress) public returns (bool) {
        // 해당 User 아이디가 사용중이 아니어야 함
        require(!userExist(userId), "ERROR : That userId already exists.");
        userInfo[userId] = User(walletAddress, 100, true);
        return true;
    }

    // 사용자 지갑 주소 반환 함수
    function getUserAddressByUserId(string memory userId) public view returns (address payable) {
        // 해당 User 아이디 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't get user wallet address.");
        return userInfo[userId].walletAddress;
    }

    // 사용자 신뢰 점수 반환 함수
    function getUserReliabilityByUserId(string memory userId) public view returns (uint256) {
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
    function modifyUserAddress(
        string memory userId,
        address oldUserAddress,
        address payable newUserAddress
    )
        public returns (bool)
    {
        require(msg.sender == owner);

        // 해당 User 아이디 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't modify user wallet address.");

        // 기존 사용자 주소와 똑같으면 할 필요없음
        require(userInfo[userId].walletAddress != newUserAddress, "ERROR : It's the same as former address.");

        // 트랜잭션 호출자가 사용자의 기존 지갑계정인지 확인
        require(oldUserAddress == userInfo[userId].walletAddress, "ERROR : Please send a request with your former walletAddress.");

        userInfo[userId].walletAddress = newUserAddress;
        return true;
    }

    // 사용자 신뢰 점수 증가 함수
    function addUserReliability(string memory userId, uint256 value) public returns (bool) {
        require(msg.sender == owner);

        // 유저가 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't add user reliability.");

        userInfo[userId].reliability = (userInfo[userId].reliability).add(value);
        emit Reliability(
            keccak256(bytes(userId)),
            userId, int256(value),
            userInfo[userId].reliability
        );
        return true;
    }


    // 사용자 신뢰 점수 감소 함수
    function subUserReliability(string memory userId, uint256 value) public returns (bool) {
        require(msg.sender == owner);

        // 유저가 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't sub user reliability.");

        // 신뢰 점수가 0 이하이면 안됨
        require(getUserReliabilityByUserId(userId) > 0, "ERROR : User Reliability is below 0.");

        userInfo[userId].reliability = (userInfo[userId].reliability).sub(value);
        emit Reliability(
            keccak256(bytes(userId)),
            userId, int256(-value),
            userInfo[userId].reliability
        );
        return true;
    }

    // 사용자가 얼마큼 신뢰 점수를 얻었는지 이벤트로 남김
    event Reliability(
        bytes32 indexed userIdHash,
        string userId,
        int value,
        uint256 totalUserReliability
    );
}