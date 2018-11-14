const Web3 = require('web3');

let web3;
let web4;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  window.addEventListener('message', ({ data }) => {
    if (data && data.type && data.type === 'ETHEREUM_PROVIDER_SUCCESS') {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  })
}

web4 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/zkGX3Vf8njIXiHEGRueB'));

module.exports = web3, web4;