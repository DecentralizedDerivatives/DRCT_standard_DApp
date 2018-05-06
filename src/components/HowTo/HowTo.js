import React from 'react';
import Sample from '../Sample';

const HowTo = props => (
  <div className="HowTo">
    <span><h1>This is the how to page</h1></span>
    <div id="how_to_box">
      <h2> How to Use:</h2>
      <ul>
        <li>Pick the start date of the contract (end date is 7 days after this).</li>
        <li>Choose long or short the rate.</li>
        <li>Enter amount of Ether you want to put into Contract.</li>
        <li>Enter the premium in Ether you will pay someone to take other side (how desperate are you?).</li>
        <li>Click create contract.</li>
        <li>Wait for transaction to mined (check your Metamask) and click 'Address Result'.  The addresss result button gives you the last created address from your Metamask account.  If you want to manually enter an address, you can do that in the text field.</li>
        <li>Click 'Send Funds' to complete your transation.</li>
        <li>Note that a 'Transaction Error. Exception thrown...' is actually just a warning from metamask about gas.  The contract will go through fine.</li>
        <li>You can check the 'My Positions' and see that you have some tokens when someone else enters the other side</li>
        <li>After the contract is paid out, be sure to go cash out your tokens</li>
        <li>For a complete tutorial, check out our DApp tutorial video: <a href='https://www.youtube.com/watch?v=NdBqfzAeHFg'>here</a></li>
      </ul>
	  </div>
	  <div id="contract_detail_box">
      <h2> Contract Details:</h2>
      <div id='cdetails_b'>
        <ul>
          <li>1x exposure to underlying rate.</li>
          <li>This contract starts at 00:00:00 GMT on Start Date.</li>
          <li>-Contract caps at 100% move (100% of collateral used up).</li>
          <li>Contracts end the following week and can be paid out 24 hours after expiration (time for Oracle to update).</li>
          <li>Oracle is a publicly operated Oraclize API pull: Full details <a href='https://github.com/DecentralizedDerivatives/Public_Oracle'>here.</a></li>
          <li>-Operator fee of 0.5%<br/>--1000 DRCT tokens per ETH</li>
        </ul>
      </div>
	  </div>
	  <div id="pro_tips_box">
      <h2>Pro tips:</h2>
      <div id='Protips_b'>
         <ul> 
          <li>Check Open contracts (maybe you can match someone and get paid for it!).</li>
          <li>Check Open contracts for how much premium you may need to pay.</li>
          <li>If no one enters your contract or you want to exit before someone does, be sure to click exit and cash out your tokens.</li>
        </ul>
	    </div>
    </div>
    </div>
);

export default HowTo;
