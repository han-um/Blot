const Caver = require('caver-js');
const contractInfo = require('./contractInfo');
const config = { rpcURL: 'https://api.baobab.klaytn.net:8651/'}

const cav = new Caver(config.rpcURL);

const blotMainContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTMAIN_ABI, contractInfo.DEPLOYED_BLOTMAIN_ADDRESS);
const blotUserContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTUSER_ABI, contractInfo.DEPLOYED_BLOTUSER_ADDRESS);
const blotProjectContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTPROJECT_ABI, contractInfo.DEPLOYED_BLOTPROJECT_ADDRESS);
const blotTokenContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTTOKEN_ABI, contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS);

const privatekey = '0xa86989e8db32b234489fd06e6f622e8913777372f7553363c0bed137e32315f5';

const walletInstance = cav.klay.accounts.privateKeyToAccount(privatekey);

cav.klay.accounts.wallet.add(walletInstance);

module.exports = function() {
    
    return {
        
        getReward: async function() {
            var projectId = 'projectId3';
            await blotMainContract.methods.getProjectRewardByprojectId(projectId).call()
            .then( function( result ) {
                console.log(projectId + '의 보상금은 ' + result + ' BLOT');
            });
        },
        
        getTrust: async function() {
            
            var userId = 'kss';
            await blotMainContract.methods.getUserReliabilityByUserId(userId).call()
            .then( function( result ) {
                console.log(result);
            });
        },
        
        getWalletAddress: async function() {
            var userId = 'kss';
            await blotMainContract.methods.getUserAddressByUserId(userId).call()
            .then( function( result ) {
                console.log(result);
            });
        },
        
        setTrust: async function() {
            var userId = 'kss';
            var value = 10;
            await blotMainContract.methods.updateUserReliability(userId, value).send({
                from : cav.klay.accounts.wallet[0].address,
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobab.klaytn.com/tx/'+txHash);
            })
            .on('error', console.error);
        },
        
        setTranslation: async function() {
            const projectId = 'projectId3';
            const translatorId = 'translatorId';
            const sentenceList = [1, 2, 3];
            const translationList = [1, 2, 3];
            const listSize = 3;
            const share = 20;
            
            await blotMainContract.methods.generateTranslationEvent(projectId, translatorId, sentenceList, translationList, listSize, share).send({
                from : cav.klay.accounts.wallet[0].address,
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobab.klaytn.com/tx/'+txHash);
            })
            .on('error', console.error);
        },
        
        setEvaluation: async function() {
            const projectId = 'projectId3';
            const evaluatorId = 'translatorId';
            const sentenceList = [1, 2, 3];
            const translationList = [1, 2, 3];
            const listSize = 3;
            const share = 20;
            
            await blotMainContract.methods.blotMainContract.methods.generateEvaluationEvent(projectId, evaluatorId, sentenceList, translationList, listSize, share).send({
                from : cav.klay.accounts.wallet[0].address,
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobob.klaytn.com/tx/'+txHash);
            })
            .on('error', console.error);
        },
        
        Transfer: async function() {
            const recipient = '0x4aff875cb544368fd51b8f7fda6d247582b5b87c';
            const reward = 100;
            
            await blotMainContract.methods.blotMainContract.methods.sendRewardToUser(recipient, reward).send({
                from : cav.klay.accounts.wallet[0].address,
                gas : 250000
            })
            .on('transactionHash', function(txHash) {
                console.log('Transaction Result URL : https://baobob.klaytn.com/tx/'+txHash);
            })
            .on('receipt', function(receipt) {
                console.log(JSON.stringify(receipt));
            })
            .on('error', console.error);
        },
        
        payProxy: async function(rawTransaction) {
            const senderRawTransaction = rawTransaction;
            cav.klay.sendTransaction({
                senderRawTransaction: senderRawTransaction;
                feePayer: cav.flay.accounts.wallet[0].address
            })
            .on('transactionHash', function(txhash){
                console.log('Transaction Result URL : https://baobob.klaytn.com/tx/'+txHash);
                return txhash;
            })
            .on('receipt', function(receipt){
                console.log('receipt', receipt);
            })
            .on('error', console.error);
        }
        
    }    
};