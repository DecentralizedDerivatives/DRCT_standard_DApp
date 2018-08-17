const web3 = require('./web3');
const contract = require('truffle-contract');

const factoryArtifact = require('./build/contracts/Factory.json');
const Factory = contract(factoryArtifact);

const exchangeArtifact = require('./build/contracts/Exchange.json');
const Exchange = contract(exchangeArtifact);

const oracleArtifact = require('./build/contracts/Oracle.json');
const Oracle = contract(oracleArtifact);

const swapArtitifact = require('./build/contracts/TokenToTokenSwap.json');
const Swap = contract(swapArtitifact);

//we'll have to update this name with the new contracts
const userArtifact = require('./build/contracts/UserContract.json');
const UserContract = contract(userArtifact);

const wrappedArtifact = require('./build/contracts/Wrapped_Ether.json');
const Wrapped = contract(wrappedArtifact);

const drctArtifact = require('./build/contracts/DRCT_Token.json');
const DRCT = contract(drctArtifact);

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  [Factory, Exchange, Swap, Wrapped, DRCT, UserContract, Oracle].forEach(Contract =>
    Contract.setProvider(web3.currentProvider)
  );
}

module.exports = {
  Factory,
  Exchange,
  Oracle,
  Swap,
  Wrapped,
  DRCT,
  UserContract,
};
