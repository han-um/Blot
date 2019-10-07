# BlockChain Side

## Development Environment
- truffle v0.5.39
- solc v0.5.8
- node v10.16.3
- npm 6.9.0

<br>

## How to use
1. Download ```node_server``` folder
2. Run your favorite ```terminal``` program like powershell, cmd and so on.
3. Go inside node_server dir
4. Type ```npm install``` command
5. Type ```run dev build``` command. Then, you can use local server. ```localhost:8080```
6. Visit that Link and Please login klaytn account with our key.
(Private Key is Secret!)

<br>

## File Structure
### node_server/src/*.js
- contractInfo.js : klaytn network 상에 배포한 smart contract address 및 ABI 정보
- index.js : .html 파일에서 사용할 js 로직을 구현한 파일

### node_server/dist/
- main.js
    - ../src/index.js를 entry로 지정하여 webpack으로 bundling한 결과물
    - index.html에서 button을 눌렀을 때, contract 내 어떤 함수들을 호출할지 구현되어 있음
- index.html
    - main page
    - 여기서 위의 main.js 파일을 import해서 사용
    
<br>

## Klaytn Account List
They are not private keys but pulbic keys. Because Private Key is scret, I didn't upload them.

### Contract Owner & Delegate Fee Payer
- Account[0]
    - 0x4aff875cb544368fd51b8f7fda6d247582b5b87c
    
### Writer, Translator, Evaluator
- Account[1]
    - 0x6f560ac6ede19461b28382816232c4dd50bd4843
- Account[2]
    - 0x19f74f83114ad84736df48534f3b0c569ebcd419
- Account[3]
    - 0xad4abd5ba764b4cbd1c97219bb42365749f6d03c

<br>

> TO Do List
1. 수수료 대납 기능 구현
2. BlotMain.sol의 사용자 지갑 주소 변경 함수 수정
    - delegatecall을 이용해서 컨트랙트 사이에 호출에도 context 유지가 필요
3. 서버랑 클라이언트에 기능 붙이기
4. 취약점 파악 및 개선(contract Access controller 수정)

<br>

> Notice
- caver.js를 Server Side에서 사용할 때는 node module로 간단히 설치하면 됨
- caver.js를 Cleint Side에서 사용할 때는 webpack으로 caver.js 모듈을 포함한 Entry 파일을 지정 후 bundling한 파일(js)을 client html 파일에서 import해서 사용
- *webapck 참고 : https://stackoverflow.com/questions/4944863/how-to-use-node-js-module-system-on-the-clientside*