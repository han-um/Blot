pragma solidity ^0.5.6;

import "./library/Ownable.sol";
import "./BlotUser.sol";
import "./BlotToken.sol";

contract BlotProject is Ownable {

    struct Project {
        string writerId;
        string deadline;
        uint256 reward;
        bool used;
    }

    BlotUser public blotUserAddress;
    BlotToken public blotTokenAddress;
    mapping(string => Project) projectInfo;

    // 프로젝트 보상금 조회
    function getProjectRewardByprojectId(string memory projectId) public view returns (uint256) {
        require(projectExist(projectId), "ERROR : There is not the project. Can't get project reward.");
        return projectInfo[projectId].reward;
    }

    // 프로젝트 정보 조회
    function getProjectInfoByprojectId(string memory projectId) public view returns (string memory, string memory, uint256) {
        require(projectExist(projectId), "ERROR : There is not the project. Can't get project info.");
        return (
            projectInfo[projectId].writerId,
            projectInfo[projectId].deadline,
            projectInfo[projectId].reward
        );
    }

    // 프로젝트가 등록되었는지 확인하는 함수
    function projectExist(string memory projectId) public view returns (bool) {
        if(projectInfo[projectId].used)
            return true;
        return false;
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
        // 프로젝트 등록 및 보상금 차감
        // 해당 프로젝트 아이디가 사용중이 아니어야 함
        require(!projectExist(projectId), "ERROR : That projectId already exists. Can't create project info.");
        
        if(blotTokenAddress.burnBlot(_msgSender(), reward)) {
            projectInfo[projectId] = Project(writerId, deadline, reward, true);
            emit NewProject(reward, deadline, projectId);
        } else
            revert("ERROR : Can't burn his tokens.");
    }

    // 번역 활동 기록을 이벤트로 저장
    function generateTranslationEvent(
        string memory projectId,
        string memory translatorId,
        uint[] memory sentenceList,
        uint[] memory translationList,
        uint userShare
    )
        public onlyOwner
    {
        require(projectExist(projectId), "ERROR : There is that projectID");
        require(blotUserAddress.userExist(translatorId), "ERROR : The userId isn't registered yet.");
        emit NewTranslation(
            keccak256(bytes(projectId)),
            keccak256(bytes(translatorId)),
            projectId,
            translatorId,
            sentenceList,
            translationList,
            userShare
        );
    }

    // 평가 활동 기록을 이벤트로 저장
    function generateEvaluationEvent(
        string memory projectId,
        string memory evaluatorId,
        uint[] memory sentenceList,
        uint[] memory translationList,
        uint userShare
    )
        public onlyOwner
    {
        require(projectExist(projectId), "ERROR : There is that projectID");
        require(blotUserAddress.userExist(evaluatorId), "ERROR : The userId isn't registered yet.");
        emit NewEvaluation(
            keccak256(bytes(projectId)),
            keccak256(bytes(evaluatorId)),
            projectId,
            evaluatorId,
            sentenceList,
            translationList,
            userShare
        );
    }

    // BlotUserAddress 주소 설정
    function setBlotUserAddress(address addr) public onlyOwner {
        blotUserAddress = BlotUser(addr);
    }

    // BlotTokenAddress 주소 설정
    function setBlotTokenAddress(address payable addr) public onlyOwner {
        blotTokenAddress = BlotToken(addr);
    }

    // 새로운 프로젝트가 등록되었음을 이벤트로 기록
    event NewProject(
        uint256 indexed reward,
        string deadline,
        string projectId
    );

    // 번역 활동 기록
    event NewTranslation(
        bytes32 indexed projectIdHash,
        bytes32 indexed translatorIdHash,
        string projectId,
        string translatorId,
        uint[] sentenceIdList,
        uint[] translationIdList,
        uint userShare
    );

    // 평가 활동 기록
    event NewEvaluation(
        bytes32 indexed projectIdHash,
        bytes32 indexed evaluatorIdHash,
        string projectId,
        string evaluatorId,
        uint[] sentenceIdList,
        uint[] translationIdList,
        uint userShare
    );
}