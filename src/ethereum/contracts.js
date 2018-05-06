const web3 = require('./web3');
const contract = require('truffle-contract');

const factoryArtifact = require('./build/contracts/Factory.json');
const Factory = contract(factoryArtifact);

const exchangeArtifact = require('./build/contracts/Exchange.json');
const Exchange = contract(exchangeArtifact);

const swapArtitifact = require('./build/contracts/TokenToTokenSwap.json');
const Swap = contract(swapArtitifact);

const wrappedArtifact = require('./build/contracts/Wrapped_Ether.json');
const Wrapped = contract(wrappedArtifact);

const drctArtifact = require('./build/contracts/DRCT_Token.json');
const DRCT = contract(drctArtifact);

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  [Factory,Exchange,Swap,Wrapped,DRCT].forEach(Contract =>
    Contract.setProvider(web3.currentProvider)
  );
  // Factory.at('0xf0836623ef02e8ac937be2d4d3b86386e2e226ef');
}

module.exports = {
  Factory,
  Exchange,
  Swap,
  Wrapped,
  DRCT
};
