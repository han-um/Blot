<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>CryptoZombies front-end</title>
    <script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="js/web3.min.js"></script>
  </head>
  <body>
    <script>
        console.log("hello");

        function startApp() {
          const contractAddress = "0xd7e3d92abc2f10326a3051c950708fdac0f9d220";
          const abi = [
   {
      "constant": false,
      "inputs": [
         {
            "name": "_postId",
            "type": "uint256"
         },
         {
            "name": "_userAddresses",
            "type": "address"
         },
         {
            "name": "_userShare",
            "type": "uint256"
         },
         {
            "name": "_userSentenceId",
            "type": "uint256[]"
         }
      ],
      "name": "generateActivityEvent",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": false,
            "name": "postId",
            "type": "uint256"
         },
         {
            "indexed": false,
            "name": "translatorAddress",
            "type": "address"
         },
         {
            "indexed": false,
            "name": "userShare",
            "type": "uint256"
         },
         {
            "indexed": false,
            "name": "sentenceId",
            "type": "uint256[]"
         }
      ],
      "name": "NewTranslation",
      "type": "event"
   }
];
        // 컨트랙트 생성
        var EventTestContract = web3.eth.contract(abi);
        var EventTestContractInstance = EventTestContract.at(contractAddress);
        console.log(EventTestContractInstance);

        console.log(web3.eth.accounts[0]);
/*
// 이벤트 넣기
        // ["0xca35b7d915458ef540ade6068dfe2f44e8fa733c", 30, [3]]
        // 컨트랙트 함수 호출
        // event
        EventTestContractInstance.generateActivityEvent(3, "0xca35b7d915458ef540ade6068dfe2f44e8fa733c", 30, [1, 2, 3], function(error, result) {
          if(!error)
            console.log(JSON.stringify(result));
          else {
            console.log(error);
          }
        });
*/


// 이벤트 테스트
    EventTestContractInstance.NewTranslation({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
      if (error)
        console.log('Error in myEvent event handler: ' + error);
      else
        console.log('myEvent: ' + JSON.stringify(eventResult[0].args));
    });
}


      window.addEventListener('load', function() {
        // Web3가 브라우저에 주입되었는지 확인(Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
          // Mist/MetaMask의 프로바이더 사용
          console.log("yes");
          web3 = new Web3(web3.currentProvider);
          console.log(web3);

          // 메타마스크 계정을 Dapp에서 읽게하기 위함
          ethereum.enable();

          startApp();
        } else {
          console.log("no");
        }
      });

    </script>
  </body>
</html>