pragma solidity ^0.5.8;

import "./ownable.sol";

/***
 * @title BlotUser Contract
 * @dev
 *  사용자 정보 생성
 *  사용자 정보 조회
 *  사용자 계정 변경
*/
contract BlotUser is Ownable {

  // User
  struct User {
    address payable account;  // 계정
    uint reliability;  // 신뢰도
  }

  // 매핑 : 사용자 아이디 => 사용자 정보
  mapping(string => User) public userInfo;

  // 매핑 : 사용자 Account 주소 => 사용자 아이디
  mapping(address => string) public userIdInfo;

  function createUser(string calldata _userId, address payable _userAccount) external {
    userInfo[_userId].account = _userAccount;
    userInfo[_userId].reliability = 0;
  }

  function getUserAccount(string memory _userId) public view returns (address){
    return userInfo[_userId].account;
  }

  function getUserReliability(string memory _userId) public view returns (uint){
    return userInfo[_userId].reliability;
  }

  function getUserInfo(string memory _userId) public view returns (address, uint) {
    return (userInfo[_userId].account, userInfo[_userId].reliability);
  }

  function setUserAccount(string calldata _userId, address payable _otherAccount) external {
    // 기존 계정 주소를 가지고 계정 변경 함수를 호출해야함
    require(keccak256(abi.encodePacked(userIdInfo[msg.sender])) == keccak256(abi.encodePacked(_userId)));

    // 사용자 아이디에 대한 Account 주소를 변경
    userInfo[_userId].account = _otherAccount;

    // 사용자 Account 계정에 대한 소유자 userId 등록
    userIdInfo[_otherAccount] = _userId;
  }

  function addUserReliability(string calldata _userId, uint _exp) external onlyOwner {
    userInfo[_userId].reliability = userInfo[_userId].reliability + _exp;
  }

  function minusUserReliability(string calldata _userId, uint _exp) external onlyOwner {
    userInfo[_userId].reliability = userInfo[_userId].reliability - _exp;
  }
}
