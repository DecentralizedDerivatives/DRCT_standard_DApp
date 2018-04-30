const web3 = require('./web3');
const contract = require('truffle-contract');

const factoryArtifact = require('./build/contracts/Factory.json');
const factory = contract(factoryArtifact);

const tokenToTokenSwapArtifact = require('./build/contracts/TokenToTokenSwap.json');
const tokenToTokenSwap = contract(tokenToTokenSwapArtifact);

if ((typeof window !== 'undefined') && (typeof window.web3 !== 'undefined')) {
  factory.setProvider(web3.currentProvider);
  tokenToTokenSwap.setProvider(web3.currentProvider);

  factory.at('0x57ebd3609d60f7e3ed3d93b42a3ae0b95e55b544');
}

module.exports = {
  factory,
  tokenToTokenSwap,
}
