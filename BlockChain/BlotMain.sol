pragma solidity ^0.5.0;

import "./BlotToken.sol";
import "./BlotProject.sol";
import "./BlotUser.sol";
import "./SafeMath.sol";
import "./KlaytnMonetaryUnit.sol";
import "./Ownable.sol";

contract BlotMain is Ownable {
    
    using SafeMath for uint256;

    BlotToken public blotTokenAddress;
    BlotProject public blotProjectAddress;
    BlotUser public blotUserAddress;
    
    constructor(address _blotTokenAddress, address _blotProjectAddress, address _blotUserAddress) public {
        blotTokenAddress = BlotToken(_blotTokenAddress);
        blotProjectAddress = BlotProject(_blotProjectAddress);
        blotUserAddress = BlotUser(_blotUserAddress);
    }
    
    // fallback function
    function() external payable {
        require(_msgData().length == 0);
        
        emit LogDepositReceived(_msgSender(), msg.value);
    }
    
    /* 토큰 구매 및 판매 */
    
    // Klay를 지불하고 Blot 토큰을 구입하는 함수
    // BLOT 서비스 이용자가 아닌 외부 사용자도 토큰을 구입할 수 있도록 함
    function purchaseToken(address userAddress, uint256 klayNum) public payable returns (bool) {
        // 토큰 구입은 컨트랙트 계정이 아닌 사용자 계정으로만 가능하도록 제한
        require(isUserAddress(userAddress), "ERROR : It's not external owned account. Please buy tokens with your EOA.");
        
        // klayNum 만큼의 klay를 송금했다면
        require(KlaytnMonetaryUnit.pebToKlay(msg.value) >= klayNum);
        
        // userAddress에 klayNum에 비례하는 Token 지급
        blotTokenAddress.mintBlot(userAddress, KlaytnMonetaryUnit.klayToBlot(klayNum));
        
        // 누가 컨트랙트 계정에 입금했는지 로그 기록을 남김
        emit LogDepositReceived(_msgSender(), msg.value);
        
        return true;
    }
    
    // Blot 토큰 판매하고 Klay로 바꿔가는 함수
    function sellToken(address payable userAddress, uint256 blotNum) public returns (bool) {
        // blotNum이 10000으로 나누어떨어져야 함
        require(blotNum.mod(1e4)==0, "Please enter BLOT token number in units of 10000");
        
        // blotNum 만큼 토큰을 없앰
        blotTokenAddress.burnBlot(userAddress, blotNum);
    
        // 사용자 계정으로 klay(Peb 단위) 입금하기 위해 컨트랙트 계정의 잔고를 확인하고 송금
        uint256 pebNum = KlaytnMonetaryUnit.blotToPeb(blotNum);
        require(address(this).balance >= pebNum, "Error : Contract owner doesn't have enough money.");
        userAddress.transfer(pebNum);
        
        return true;
    }
    
    
    
    /* 사용자 정보 저장 및 조회 & 신뢰도 조정 */
    
    function userSignUp(string memory userId, address payable walletAddress) public returns (bool) {
        return blotUserAddress.createUser(userId, walletAddress);
    }
    
    // 사용자Id로 사용자 토큰 잔고를 조회하는 함수
    function getUserBalanceByUserId(string memory userId) public view returns (uint256) {
        require(blotUserAddress.userExist(userId), "ERROR : The userId isn't registered yet.");
        return blotTokenAddress.balanceOf(blotUserAddress.getUserAddress(userId));
    }
    
    // 사용자 지갑주소로 사용자 토큰 잔고를 조회하는 함수
    function getUserBalanceByUserAddress(address userAddress) public view returns (uint256) {
        return blotTokenAddress.balanceOf(userAddress);
    }
    
    // 사용자 Id로 지갑 주소를 조회하는 함수
    function getUserAddressByUserId(string memory userId) public view returns (address) {
       return blotUserAddress.getUserAddress(userId);
    }
    
    // 사용자 Id로 사용자 신뢰 점수를 조회하는 함수
    function getUserReliabilityByUserId(string memory userId) public view returns (uint256) {
        return blotUserAddress.getUserReliability(userId);
    }
 
    function replaceOldToNewUserAddress(string memory userId, address payable newUserAddress) public returns (bool) {
        
        // 지갑 계정 수정 
        blotUserAddress.modifyUserAddress(userId, newUserAddress);
            
        uint256 userBalance = getUserBalanceByUserAddress(_msgSender());
        
        if(userBalance > 0) // 토큰 잔고를 옮겨줌
            return blotTokenAddress.transfer(newUserAddress, userBalance);
            
        return true;
    }
    
    // 사용자 신뢰 점수 증가 함수
    function updateUserReliability(string memory userId, uint128 value) public returns (bool) {
        return blotUserAddress.addUserReliability(userId, value);
    }
    
    
    
    /* 프로젝트 정보 저장 및 조회 */
    
    // 새로운 프로젝트 등록 함수
    function registerNewProject(string memory projectId, string memory writerId, string memory deadline, uint256 reward) public returns (bool) {
        blotProjectAddress.createProject(projectId, writerId, deadline, reward);
        
        // 사용자 지갑에서 보상금액(BLOT 단위)만큼 토큰을 소멸시킴. 보상금 줄 때 다시 발행해서 지급할 계획
        return blotTokenAddress.burnBlot(getUserAddressByUserId(writerId), reward);
    }
    
    // 프로젝트 보상금 조회
    function getProjectRewardByprojectId(string memory projectId) public view returns (uint256) {
        return blotProjectAddress.getProjectReward(projectId);
    }
    
    // 프로젝트 정보 조회
    function getProjectInfoByprojectId(string memory projectId) public view returns (string memory, string memory, uint256) {
        return blotProjectAddress.getProjectInfo(projectId);
    }
    
    
    
    /* 프로젝트 마감 이후 로직 */
    
    // 프로젝트 마감 후, 사용자들에게 토큰으로 보상금 지급. reward는 BLOT 단위
    function sendRewardToUser(address payable userAddress, uint256 reward) public returns (bool) {
        return blotTokenAddress.mintBlot(userAddress, reward);
    }
    
    // 번역 활동 기록을 이벤트로 저장
    function generateTranslationEvent(string memory projectId, string memory translatorId, uint[] memory sentenceId, uint[] memory translationId, uint listSize, uint userShare) public {
      emit NewTranslation(projectId, translatorId, sentenceId, translationId, listSize, userShare);
    }
    
    // 평가 활동 기록을 이벤트로 저장
    function generateEvaluationEvent(string memory projectId, string memory evaluatorId, uint[] memory sentenceId, uint[] memory translationId, uint listSize, uint userShare) public {
      emit NewEvaluation(projectId, evaluatorId, sentenceId, translationId, listSize, userShare);
    }
    
    // 주어진 address가 EOA인지 판단하는 함수
    function isUserAddress(address _addr) private view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(_addr)}
        return (size == 0);  // 0 이면 EOA, 1 이상이면 CA
    }
    
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // klay 수신 내역
    event LogDepositReceived(address indexed userAddress, uint256 klayNum);
    
    // 번역 및 평가 활동 기록
    event NewTranslation(string indexed projectId, string indexed translatorId, uint[] sentenceId, uint[] translationId, uint listSize, uint userShare);
    event NewEvaluation(string indexed projectId, string indexed evaluatorId, uint[] sentenceId, uint[] translationId, uint listSize, uint userShare);

}