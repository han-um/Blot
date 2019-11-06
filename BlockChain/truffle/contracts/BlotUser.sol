pragma solidity ^0.5.6;

import "./library/SafeMath.sol";
import "./BlotToken.sol";
import "./BlotProject.sol";

contract BlotUser is Ownable {

    using SafeMath for uint256;

    BlotToken public blotTokenAddress;
    BlotProject public blotProjectAddress;

    struct User {
        address payable walletAddress;
        uint256 reliability;
        bool used;
    }

    // 사용자Id에 따른 사용자 정보
    mapping(string => User) userInfo;

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

    // 사용자Id로 사용자 토큰 잔고를 조회하는 함수
    function getUserBalanceByUserId(string memory userId) public view returns (uint256) {
        require(userExist(userId), "ERROR : The userId isn't registered yet.");
        return blotTokenAddress.balanceOf(getUserAddressByUserId(userId));
    }

    // 사용자가 등록되었는지 확인하는 함수
    function userExist(string memory userId) public view returns (bool) {
        if(userInfo[userId].used)
            return true;
        return false;
    }

    // 회원가입 시, 사용자 정보 저장
    // 사용자 초기 신뢰 점수 100
    function userSignUp(string memory userId, address payable walletAddress) public returns (bool) {
        // 해당 User 아이디가 사용중이 아니어야 함
        require(!userExist(userId), "ERROR : That userId already exists.");
        userInfo[userId] = User(walletAddress, 1000, true);
        return true;
    }

    // 사용자 지갑 주소 변경 함수
    function modifyUserAddress(
        string memory userId,
        address oldUserAddress,
        address payable newUserAddress
    )
        public returns (bool)
    {
        require(msg.sender == owner() || msg.sender == address(blotTokenAddress));

        // 해당 User 아이디 존재해야함
        require(userExist(userId), "ERROR : There is not the user. Can't modify user wallet address.");

        // 기존 사용자 주소와 똑같으면 할 필요없음
        require(userInfo[userId].walletAddress != newUserAddress, "ERROR : It's the same as former address.");

        // 사용자의 기존 지갑계정이 맞는지 확인
        require(oldUserAddress == userInfo[userId].walletAddress, "ERROR : Please send a request with your former walletAddress.");

        userInfo[userId].walletAddress = newUserAddress;
        return true;
    }

    // 사용자 신뢰 점수 조정 함수
    // @ NOTE : reason 0 번역, 1 평가, 2 월별 차감
    function updateUserReliability(
        string memory projectId,
        string memory userId,
        int256 value,
        uint8 reason
    )
        public
        onlyOwner
        returns (bool)
    {
        require(blotProjectAddress.projectExist(projectId), "ERROR : There is not the project. Can't add user reliability.");
        require(userExist(userId), "ERROR : There is not the user. Can't add user reliability.");

        if(value >= 0)
            userInfo[userId].reliability = (userInfo[userId].reliability).add(uint(value));
        else
            userInfo[userId].reliability = (userInfo[userId].reliability).sub(uint(-value));

        emit Reliability(
            keccak256(bytes(projectId)),
            keccak256(bytes(userId)),
            projectId,
            userId,
            value,
            reason,
            userInfo[userId].reliability
        );
        return true;
    }

    // BlotTokenAddress 주소 설정
    function setBlotTokenAddress(address payable addr) public onlyOwner {
        blotTokenAddress = BlotToken(addr);
    }

    // BlotProjectAddress 주소 설정
    function setBlotProjectAddress(address addr) public onlyOwner {
        blotProjectAddress = BlotProject(addr);
    }

    // 사용자가 얼마큼 신뢰 점수를 얻었는지 이벤트로 남김
    event Reliability (
        bytes32 indexed projectIdHash,
        bytes32 indexed userIdHash,
        string projectId,
        string userId,
        int value,
        uint8 reason,
        uint256 totalUserReliability
    );
}