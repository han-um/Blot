# 블록체인 개념 & 시스템 내 블록체인 설계 내용

## BlockChain이란?
- 분산 원장 기술 == 데이터 분산 처리 기술
- 네트워크에 참여하는 모든 사용자가 모든 거래 내역 등의 데이터를 분산 및 저장하는 기술
- 개인과 개인 간의 거래(P2P) 데이터가 블록에 저장되고, 이러한 블록들이 시간의 흐름에 따라 사슬(체인)처럼 연결되어 **블록+체인**이라 부름.
- 모든 사용자가 거래 내역 보유 >> 거래 내역 확인 시, 모든 사용자가 보유한 장부를 대조하고 확인해야 함 == 공공 거래장부
 ![whatIsBlockChain](./img/whatIsBlockChain.png)

<br><br>



## 사용한 블록체인 플랫폼 Klaytn
### Klaytn이란
- 카카오 자회사인 그라운드 X가 개발한 블록체인 플랫폼
cf. 그라운드 X : 카카오의 블록체인 연구개발(R&D) 담당 계열사

### 현재 상황
- 2018년 9월 13일, 업비트 개발자 컨퍼런스(UDC) 행사에서 클레이튼 발표
- 2019년 6월 말, 클레이튼 메인넷(Cypress) 공개

<br><br>



## 왜 Klaytn을 사용했는가

### 기존 블록체인 플랫폼의 문제점
- 비트코인과 이더리움이 갖는 대표적인 문제로 **TPS**와 **Block Interval**을 가지고 이야기 함
    cf. 확장성(Scalability) : 사용자 수의 증대에 유연하게 대응할 수 있는 정도. 블록체인에서는 **사용자 수의 증가에 따라 거래건수가 늘어나더라도 무리 없이 전송 처리용량을 증대시킬 수 있는 능력**을 의미
    - 비트코인은 블록 Size가 정해져 있고 이더리움은 블록의 Gas Limit가 정해져 있음
    - 블록 생성 시간 또한 정해져 있으므로 Scalability 측면에서 유연성이 부족
- 이외에도, Finality(최종성) 문제와 Fork 문제를 얘기할 수 있음

1. TPS
- 초당 몇개의 거래(transaction)를 처리할 수 있는가
- 주로 Visa랑 비교를 함
- 자료출처 : [해쉬넷](http://wiki.hash.kr/index.php/TPS)

    |구분|거래 처리량/초|
    |----|----------|
    |Visa|2만 4천개/s|
    |BitCoin|7/s(실질적 2~5개)|
    |Ethereum|10~30/s|
    |Klaytn|3000/s|

2. Block Interval
- 블록 생성 간격
- 자료출처 : [해쉬넷](http://wiki.hash.kr/index.php/TPS)
    |구분|블록생성 시간|
    |----|----------|
    |BitCoin|10분|
    |Ethereum|12초|
    |Klaytn|1초|

3. Finality(최종성)
- 트랜잭션이 변경 불가라는 합리적인 보장을 받기까지 기다려야하는 시간을 말함
- '블록이 Final하다' : 블록에 담긴 거래가 바뀔 수 없다고 보증할 수 있다
- 비트코인과 이더리움의 Finality
    - 트랜잭션이 모호하지않고 완료되었다고 믿어야하는데 비트코인과 이더리움은 Finality이 길다.
    - 비트코인은 finality까지 평균 시간 60분(6번의 검증 단계를 거침), 이더리움은 6분(25번의 검증 단계를 거침)이 걸림
        - ***cf. 검증 단계 : 거래 내용이 신뢰하기에 충분하다라고 판명나는 과정***
    - Finality가 너무 오래 걸리기 때문에 현재 암호화폐가 상용화되기 어려운 것임. 과연 얼마나 많은 사람이 한 시간이나 기다려줄까!?
    - Finality가 빨리 처리되는 것이 중요한 비지니스의 자산임

        > ex) 비트코인으로 비행기 티켓을 샀다?
        > - 기록에 남을 수 있는 거래가 생성됨. 그러나, 이 트랜잭션은 바로 처리되지 않음. **'완벽한 보증은 아니지만 결국엔 처리 될 것이다'라는 확률론적 최종성** 만 제공. 즉, 결제는 했지만 나중에 보면 결제가 안되어 있을 수도 있음
    
4. Fork
- 블록들의 연결이 두 개 이상의 분기로 분리되는 현상
- Fork가 발생하는 이유
    - P2P 네트워크의 모든 참여자들이 독립적으로 채굴이 가능하므로 비슷한 시간에 채굴 완료하는 경우가 생김
- Fork가 발생했을 때, 어떻게 하나의 체인을 유지?
    - 기존 블록체인은 분기 시, **Longest Chain Rule** 을 적용

        > Longest Chain Rule이란?
        > - 분기가 일어났을 때, 블록들이 가장 길게 연결되어 있는 경우를 올바른 체인으로 선정하는 규칙
        > - 이는 악용의 가능성이 있음. <br>
        ex) 51%이상의 컴퓨팅 자원을 갖는 노드가 악의적으로 자기한테 불리한 tx를 블록에 포함시키지 않은 채로 빠르게 채굴해나가고 전파는 안한다면!? 남들보다 채굴속도가 빠르니 긴 체인을 만들 수 있고 모았다가 전파해버리면 악의적으로 만들어진 블록들이 합법적으로 받아들여짐. 또한, 분기 시 긴 체인을 선택해야하는 문제 때문에 Finality가 오래 걸리는 문제도 있음

### Klaytn의 장점
- **블록 생성시간 1초**
- **초당 트랜잭션 3000개 이상**
- 저렴한 트랜잭션 비용
- 확장성과 프라이버시를 생각해서 서비스 체인이란 걸 구성할 수 있음
- 솔리디티, 트러플 프레임워크를 지원하여 개발자들의 진입장벽을 낮춤
- **Fee Delegation(트랜잭션 수수료 위임) 가능**
    - Klaytn provides a number of fee-delegated versions for its basic transaction types.
    - enable service providers to subsidize(보조금을 지급하다) their end-user activities by paying for their transaction fees instead.
    - 트랜잭션 발신자가 아닌 제 3자가 수수료를 내게 하려면, 트랜잭션 발신자 A가 먼저 서명을 해서 rawTransaction 객체를 만들고 이를 수수료 납부자 계정 B으로 다시 트랜잭션을 보내는 방식

<br><br>



## Klaytn 네트워크 구조

![클레이튼 네트워크](./img/klaytnNetwork.png)

### Klaytn 네트워크는 어떻게 이루어져 있을까?
- Core Cell Network(CCN)와 이를 둘러싸고 있는 Endpoint Node Network(ENN)로 구성 + Service Chain Network(SCN)
- Core Cell Network는 **합의를 담당할 노드들이 있는 CNN**과 **생성한 블록을 Endpoint 네트워크에 전달하는 PNN** 으로 구성

#### Core Cell
- 하나의 Core cell은 한 개의 CN과 여러 개의 PN(Proxy Node)로 연결되어 있으며 CN에 의해 직접 운영됨
- [Official Docs][1]

  *cf. 왜 EN과 CN사이에 PN을 둘까? 바로 EN과 PN을 직접 연결하며 안되는가?
  CN은 합의를 담당하는 노드들이기에 Connection으로 인해 성능의 걸림돌이 되면 안됨.
  따라서, PN을 중간에 둠으로써 CN을 보호하며 PN을 여러대 둠으로써 확장성 문제를 해결할 수 있음*

##### CNN(Consensus Node Network)
- CNN은 CN(Consensus Node)끼리 빠른 블록 생성을 위해 서로 직접적으로 연결되어 있으며 외부 네트워크와는 제한적으로 소통이 가능하도록 한 Private 환경임.
(CN은 Core Cell 운영자로서 자신이 믿을 수 있는 PN을 앞에 내세워 CN에 접근할 수 있도록 함)

  *cf. CN, PN HW Spec*
  ![CN과 PN 스펙](./img/CN&PNspec.PNG)

##### PNN(Proxy Node Network)
- PN들이 서로 연결되어 PNN을 이룸
- 생성한 블록을 Endpoint 네트워크에 전달하는 역할
- 같은 Core Cell 내의 PNs들은 서로 연결되지 않음

#### ENN(Endpoint Node Network)
- EN(Endpoint Node)들은 PN과 연결해서 정보를 주고 받을 수 있음
- EN가 되기 위한 조건은 없음
- 서비스 제공자로서 역할 수행
  - Transaction을 생성
  - RPC API request를 처리
  - 서비스체인으로 부터 온 데이터 요청을 처리함

#### 부트노드(Bootnode)
- 새로운 노드가 네트워크에 등록하고 다른 노드에 연결할 수 있도록 돕는 특수한 노드
- 클레이튼에서 운영되는 특수한 노드임
- CN Bootnode, PN Bootnode, EN Bootnode가 있음
  - CN Bootnode는 비공개, PN Bootnode와 EN Bootnode는 공개
  - PN Bootnode : 허용된 PN만 등록할 수 있도록 해주고 EN와 연결할 수 있도록 도움
  - EN Bootnode : 어떠한 PN에 연결해야할지 EN에게 정보 제공

<br><br><br>



## 합의 알고리즘

### 합의 알고리즘이란
- 분산 시스템에서 시스템 간 특정 데이터에 대한 **동일한 값을 유지하기 위해 고안된 개념**
- 블록체인 또한 분산 원장 시스템이므로 모든 노드가 동일한 하나의 체인을 가질 수 있도록 블록이 생성 및 연결되게 하는 특정 메커니즘을 필요

1. PoW(Power of Work)
- 풀기 어려운 문제를 빨리 해결한 사람에게 블록 생성할 권한을 주고 그 보상으로 코인을 제공
- 문제 : 해쉬 함수(SHA256)의 결과값이 특정값보다 작아지도록 하는 입력값(Nonce)를 찾는 문제

2. PoS(Proof of Stake)
- 참여자의 코인 지분(코인양, 보유 기간)에 비례하여 블록 생성자를 뽑는 확률적인 알고리즘
- Coin Based PoS, BFT Style PoS 방식 등 PoS를 기반으로한 여러가지 형태의 알고리즘이 존재

3. DPoS(Delegated Proof of Stake)
- 투표로 권한을 위임할 대표 노드를 정하고, 소수의 대표 노드들이 블록 생성 및 검증 과정에 참여하는 알고리즘. 
- 위임한 대표자가 수익을 얻을 경우, 그 대표자에게 투표한 노드들과 수익을 배분하는 구조
- 높은 수준의 확장성(거래속도)를 필요로 하는 서비스에 적합한 합의 알고리즘
    ![posNdpos](./img/posNdpos.png)

4. PBFT(Practical Byzantine Fault Tolerance)
- 네트워크 내 배신자 노드가 어느 정도 있다고 해도 네트워크 내에서 이루어지는 합의의 신뢰를 보장하는 알고리즘
- 비동기 네트워크에서 배신자 노드가 f개 있고, 총 노드의 개수가 3f+1개 이상이라면 해당 네트워크에서 이루어지는 합의는 신뢰할 수 있다는 것을 증명한 알고리즘
- 현존하는 블록체인 합의 알고리즘 중 BFT 방식을 채택했다고 하는 경우, 대부분 PBFT를 바탕으로 변형을 가했다고 볼 수 있음
- https://steemit.com/consensus/@kblock/48-pbft-consensus-algorithm

<br><br><br>



## 클레이튼이 채택하고 있는 합의 알고리즘
- BFT(비잔티움 결함 허용) 알고리즘 활용
    - 참여 노드 수를 제한하여 분산화와 투명성을 약화시키는 대신 성능을 높이는 알고리즘. Private Blockchain에서 많이 사용

![IBFT 합의 알고리즘](./img/IBFTconsensus.png)

- IBFT 합의 알고리즘은 그림과 같이 5단계로 구성됨

1. Propose 단계
    - 매 라운드 마다 합의 노드들 중에 한 노드를 Proposer(제안자) 뽑음
    - 나머지 노드들은 Validator(검증자, 위원회)가 됨

2. Pre-prepare 단계
    - Proposer 노드가 블록을 생성해서 다른 노드들에게 제안

3. Prepare 단계
    - 검증자 노드들이 Proposer로부터 메세지를 받으면 자신을 제외한 다른 노드들에게 '잘 받았다'는 메세지를 보냄
    - Prepare 단계가 끝나면 시스템에서 몇 개의 노드가 살아있음을 확인할 수 있음

4. Commit 단계
    - Proposer한테 받은 블록을 받아들일건지 다른 노드들과 소통하며 결정하는 단계
    - 2/3이상이 합의했다면 받은 블록 승인함
    - tx가 변경 불가능한 상태인 finality가 이 단계에서 끝남. 이는 **합의 노드들끼리 통신을 통해 합의를 이끌어내고 그 즉시 완결성을 가짐을 의미함.** 합의 노드가 많아질 수록 통신량 많아진다는 단점도 존재하는데 합의 노드의 일부만 뽑아서 BFT를 유지하도록 되어있음.
    (비트코인이나 이더리움의 PoW 방식처럼 finality가 애매모한 상황이 아님)

5. Reply 단계
    - 합의하여 새로 생성된 블록을 주위 노드들에 전파

<br><br><br>




## 시스템 내 블록체인이 활용되는 부분

### Smart Contracts 구조도
![contractsStructure](./img/contractsStructure.png)
1. **BlotProject 컨트랙트**
- 사용자가 번역 요청한 글의 주요 정보를 저장하는 컨트랙트
    - 작성자, 번역 마감 기한, 보상금
- 주요기능
    - 번역 프로젝트 정보 조회
    - 번역 프로젝트 등록
    - 번역 활동 기록 저장 (어느 번역 프로젝트에서, 누가, 어떤 문장들을 번역했고, 얼마의 금액을 얻었는가)
    - 평가 활동 기록 저장 (어느 번역 프로젝트에서, 누가, 어떤 번역 문장들을 평가했고, 얼마의 금액을 얻었는가)

2. **BlotToken 컨트랙트**
- 본 BlockChain Application에서 사용할 수 있는 BLOT 토큰을 발행하고 사용자별 토큰 보유량을 관리하는 컨트랙트
- 주요기능
    - 토큰 구매 및 판매
    - 발행된 토큰의 총 수량 조회
    - 사용자별 보유하고 있는 토큰량 조회
    - 번역자/평가자에게 보상금 지급
    - 다른 사용자에게 토큰 송금하기(계좌이체)
    - 수수료 대납자에게 Klay 코인 자금 채우기

3. **BlotUser 컨트랙트**
- 사용자 주요 정보를 저장하는 컨트랙트
    - 사용자 지갑 주소, 사용자 신뢰 점수
- 주요기능
    - 사용자 정보 조회
        - 사용자 ID로 지갑주소 조회
        - 사용자 ID로 신뢰 점수 조회
    - 사용자 정보 등록
    - 사용자 신뢰 점수 조정하기
    - 사용자 신뢰 점수 변화 기록 저장  

<br>

### 신뢰성이 요구되는 데이터를 안전하게 보관
- 번역 프로젝트에 걸린 보상금
    - 번역 프로젝트를 등록할 당시, 걸린 보상금이 얼마인지 블록체인 내 저장

- 평가자의 번역 신뢰 점수
    - 사용자별 신뢰 점수를 블록체인 내 저장
    - 신뢰 점수의 변화 기록도 블록체인 내 저장

- 번역자/평가자들의 번역/평가 활동 기록 저장

<br>

### ERC 20 표준에 맞는 자체 토큰 BLOT 설계 및 발행

#### 코인과 토큰
- 코인 : 메인넷이 있는 시스템에서 발행한 암호화폐
- 토큰 : 메인넷의 블록체인 시스템을 빌려 발행한 독자적인 암호화폐

#### 토큰(Token)
1. Fungible Token Standard (ERC-20)
    - 균일성(uniformity)와 비가시성(divisibility) 특성을 갖는 Token
    - 각 Token이 동일한 가치를 지니므로 상호 교환이 가능
    - 블록체인 Tokens의 상당 부분이 Fungible Token임
    - ERC-20-compatible tokens들은 open-zepplin에서 제공하는 erc-20 토큰 표준 인터페이스를 구현해야 함
    - https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20/ERC20.sol

2. Non-fungible Token Standard (ERC-721)
    - 고유 자산을 나타내는 특수한 유형의 Token
    - 모든 단일 Token은 고유하고 나눌 수 없음
    - 디지털 아트, 게임 아이템 등 모든 종류의 자산을 나타내고 사람들이 거래할 수 있음
    - ERC-721-compatible tokens들은 open-zepplin에서 제공하는 erc-721 토큰 표준 인터페이스를 구현해야 함
    - https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol

#### ICO(Initial Coin Offering)
- Dapp이 토큰을 만들어서 이를 공개적으로 판매하는 것
- 새로운 기업이 상장되어 주식이 공개적으로 유통되는 IPO(Initial Public Offering)에 빗대어 만들어진 말
- 실체가 없는 상태에서 계획만 가지고 토큰을 판매하기 때문에 크라우드 펀딩에 더 가까움
- **아무나 ICO에 토큰을 상장해서 판매할 수 없기에 본 시스템에서는 개발한 Smart Contract 내에서 토큰 구입 및 판매하도록 설계함.**