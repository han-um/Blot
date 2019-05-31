pragma solidity ^0.5.8;

contract moneyTransferTest {

    // 컨트랙트 배포자
    address payable public owner;

    constructor() public {
        owner = msg.sender;
    }

    // userId에 대한 계정
    mapping(string => address) userAccount;

    // Account 주소에 대한 userId
    mapping(address => string) userId;

    // postId에 대한 보상금
    uint[] postReward;

    /// @dev 사용자 아이디에 대한 Account 주소를 반환
    function getUserAccount(string _userId) public view returns (address){
      return userAccount[_userId];
    }

    /// @dev 사용자 아이디에 대한 Account 주소를 변경
    function setUserAccount(string _userId, address _otherAccount) external returns () {
      // 기존 계정 주소를 가지고 계정 변경 함수를 호출해야함
      require(keccak256(userId[msg.sender]) == keccak256(_userId);

      // 사용자 아이디에 대한 Account 주소를 변경
      userAccount[_userId] = _otherAccount;

      // 사용자 Account 계정에 대한 소유자 userId 등록
      userId[_otherAccount] = _userId;
    }

    // 글 등록시 보상금을 스마트 컨트랙트 배포자에게 입금
    function setPostTotalReward(uint _postId, uint _reward) external payable {
      require(msg.value > 0);
      postReward[_postId] = _reward;
    }

    
}
