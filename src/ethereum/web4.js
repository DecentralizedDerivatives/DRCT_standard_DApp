const Web3 = require('web3');

let web4;
//let rpcUrl = 'https://eth-mainnet.alchemyapi.io/jsonrpc/7dW8KCqWwKa1vdaitq-SxmKfxWZ4yPG6';
let rpcUrl = 'https://eth-mainnet.alchemyapi.io/jsonrpc/7dW8KCqWwKa1vdaitq-SxmKfxWZ4yPG6';
web4 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

module.exports = web4;