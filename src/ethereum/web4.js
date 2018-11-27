const Web3 = require('web3');

let web4;

const alchemy_key = window.env.ALCHEMY;
let rpcUrl = 'https://eth-mainnet.alchemyapi.io/jsonrpc/' + alchemy_key;

if (alchemy_key != 0) {
	web4 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
	console.log('Alechemy set');
}else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	console.log('Utilizing web3')
  web4 = new Web3(window.web3.currentProvider);
} else {
  window.addEventListener('message', ({ data }) => {
    if (data && data.type && data.type === 'ETHEREUM_PROVIDER_SUCCESS') {
      web4 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  })
 }
module.exports = web4;