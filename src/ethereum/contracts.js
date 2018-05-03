const web3 = require('./web3');
const contract = require('truffle-contract');

const factoryArtifact = require('./build/contracts/Factory.json');
const Factory = contract(factoryArtifact);

const exchangeArtifact = require('./build/contracts/Exchange.json');
const Exchange = contract(exchangeArtifact);

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  [Factory, Exchange].forEach(Contract =>
    Contract.setProvider(web3.currentProvider)
  );
  // Factory.at('0xf0836623ef02e8ac937be2d4d3b86386e2e226ef');
}

module.exports = {
  Factory,
  Exchange,
};
