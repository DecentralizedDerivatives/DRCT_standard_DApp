# DRCT Decentralized Application

![Wormhole](./public/readme.png)

Code for drct.decentralizedderivatives.org


    Download Node.js
    Download Meteor
 



To clone on local machine:


    Download most recent drct_standard and drct_standard_dapp from github (my branches are single_token and react respectively)

Now:

    In drct_standard folder, delete ‘build’ folder

Open 3 command terminals (ct):

CT1:

    ganache-cli -m waxfang

CT2:

    Cd …./drct_standard (cd to your location)
    Truffle compile
    Truffle migrate

--Now copy and overwrite the ‘./build/contracts’ from drct_standard to the ‘./imports/contracts’ folder in drct_standard_dapp

CT2 cont”

    Truffle exec scripts/setup.js
    Truffle exec scripts/contract_setup.js
    Truffle exec scripts/new_contract.js
    Truffle exec scripts/scenario.js


Ct3:

    Cd …./drct_standard_dapp (cd to your location)
    Meteor

In metamask:

    Import the account with private key: e495a0d39ae99327ea09eace1f6096a5a3cddeec3b52a3ff80b719831be3d695

Now you should have 4 tokens, some tokens for sale, and some transactions

        

This webpage builds the DApp at drct.decentralizedderivatives.org 

Follow our video tutorial (deprecated) here: https://www.youtube.com/watch?v=NdBqfzAeHFg

