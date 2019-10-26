const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const NETWORK_ID = '1001';
const GASLIMIT = '20000000';
const URL = `https://api.baobab.klaytn.net:8651`;
const PRIVATE_KEY = '0xa86989e8db32b234489fd06e6f622e8913777372f7553363c0bed137e32315f5';

module.exports = {
  compilers: {
    solc: {
      version: "0.5.6"    
    }
  },
  
  // ganache
  networks: {
    /*
    ganache: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
     gas: 10000000
    },
    */

    klaytn: {
      provider: new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    }
  },
}