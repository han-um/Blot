pragma solidity ^0.5.8;

import "./blotUser.sol";

/***
 * @title BlotPost Contract
 *  번역요청글에 대한 정보 생성 & 보상금 송금받기
 *  번역요청글 정보(보상금, 작성자id) 조회
 *  번역요청글에 대한 사용자별 활동 내역을 이벤트로 저장
*/

contract BlotPost is BlotUser {

  // Post 구조체
  struct Post {
    uint reward;    // 번역 보상금
    string writer;  // 작성자
  }

  // 글 id에 대한 글 정보
  mapping(uint => Post) public postInfo;

  /// @dev 글 정보 생성 & 송금받은 금액을 컨트랙트 계정으로 저장
  /// @notice 보상금으로 지정한 금액 이상 실제로 송금한 경우만 유효
  /// @notice 사용자 아이디에 대응하는 계정으로 함수 호출을 할 경우만 유효
  function createPost(uint _postId, uint _reward, string calldata _userId) external payable {
    require(msg.value >= _reward);
    require(msg.sender == userInfo[_userId].account);
    postInfo[_postId] = Post(_reward, _userId);
  }

  // 글의 보상금 조회
  function getPostReward(uint _postId) external view returns (uint) {
    return postInfo[_postId].reward;
  }

  // 글의 작성자 조회
  function getPostWriter(uint _postId) external view returns (string memory) {
    return postInfo[_postId].writer;
  }

}
