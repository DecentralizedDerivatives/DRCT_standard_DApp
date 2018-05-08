const Web3 = require('web3');

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Add error handling here
  console.log('Web3 Error: Check web3.js');
}



module.exports = web3;
