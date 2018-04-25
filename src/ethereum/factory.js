const web3 = require('./web3');
const factoryArtifact = require('./build/contracts/Factory.json');
const contract = require('truffle-contract');
const factory = contract(factoryArtifact);

if ((typeof window !== 'undefined') && (typeof window.web3 !== 'undefined')) {
  factory.setProvider(web3.currentProvider);
  factory.at('0x2972cD67aD4B716EC4E2be35785970de94287064');
}

module.exports = factory;
