# DRCT Decentralized Application

![Wormhole](./public/readme.png)

Code for drct.decentralizedderivatives.org


    Requirements:
        Node.js
        Metamask
 



To clone on local machine:


    Download most recent drct_standard and drct_standard_dapp from github

Now:

    In drct_standard folder, delete ‘build’ folder

Open 3 command terminals (ct):

CT1:

    ganache-cli

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
    npm start

In metamask:

    Import the account with private key (account[0] in your ganache-cli)

Now you should have 4 tokens, some tokens for sale, and some transactions


This webpage builds the DApp at drct.decentralizedderivatives.org 

