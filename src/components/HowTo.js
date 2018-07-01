import React from 'react';
import { Media } from 'reactstrap';
import '../styles/HowTo.css';

const HowTo = () => {
  const section1 = [
    'All contracts are Ethereum smart contracts that pay out the change in an underlying rate (e.g. BTC/USD) over a time frame (e.g. 7 days)',
    'Sometimes the contracts use multipliers too (e.g. 10x)',
    'All Contracts are fully collateralized. The smart contract holds the Ether and the contracts are capped (so a 10x multiplier means that a 10% move is all you can gain or lose from)',
    'Contracts start by a market maker creating a contract by funding both sides (long and short)',
    'Contract positions are represented as tokens on the Ethereum network (e.g. one Ether of collateral locked in this contract is worth 1000 tokens. This is your balance)',
    'Owners of tokens at expiration get paid from collateral held in the smart contract'
  ];

  const section2 = [
    'In the <em>My Portfolio</em> tab, you can see your positions and your transactions',
    "Go buy some tokens or create a contract if you don't have any!",
    'You can click on the row to see more details about the tokens'
  ];

  const section3 = [
    'Creating a contract is a two step process',
    'First you have to deploy a contract, then you have to wrap your Ether and send it to the contract to fund it',
    'So in the <em>Create Contract</em> tab, first pick a start date and then click: <em>Create Contract</em>',
    'After that, you can wait for the address result (your new contract)',
    'Once that comes back, you can click <em>Send Funds</em> to send double what you entered in the <em>amount of Ether</em> field (its per side)',
    'Once the contract mines you will see it in your positions'
  ];

  const section4 = [
    'The Bulletin is a sell only list of tokens that you can buy (think like Craigslist but for derivative tokens)',
    'That said, there are no partial orders on the Bulletin (you have to buy them all in a given order)',
    'To list your own, just click list, pick from your tokens, set an amount to sell and a price and your off',
    "You own the tokens until someone buys them (they'll still show up in your token list)",
    'To buy, just find the order ID and click buy.',
    'You can unlist your orders also by just knowing the order ID',
    "If you haven't realized by now, all tokens with the same details (underlying rate, duration , multiplier, and start date) are fungible, so feel free to buy from multiple different created contracts"
  ];

  const section5 = [
    'Contracts for the dapp, although you send them Ether, actually use wrapped (or tokenized Ether) to make things easier on us',
    "This however means that you'll have to <em>unwrap</em> your Ether after the contract expires and pays out",
    'To do this, just click <em>Cash Out</em>',
    'If you have a balance there, you will be able to click withdraw and unwrap all your Ether',
    "Remember that some contracts may take a day to close out, so don't panic if your Eth isn't there on the expiration date"
  ];

  const renderListItem = text => (
    <Media>
      <Media left>
        <Media object data-src="../imgs/eth_transparent.png" alt="ETh-Logo" />
      </Media>
      <Media body>{text}</Media>
    </Media>
  );

  return (
    <div>
      <Media>
        <Media body>
          <Media heading>How To</Media>
        </Media>
      </Media>

      <Media>
        <Media body>
          <Media heading>Welcome to the DDA dapp!</Media>
          Before we get into specifics, let's talk about how the contracts work.
        </Media>
        {section1.map(item => renderListItem(item))}
      </Media>

      <Media>
        <Media body>
          <Media heading>
            Here's a picture to help explain it a bit better.
          </Media>
        </Media>
        <Media body>
          <Media center className="howTo__infograph">
            <Media
              object
              data-src="../imgs/infograph-transparent.png"
              alt="Infograph"
            />
          </Media>
        </Media>
      </Media>

      <Media>
        <Media body>
          <Media heading>Viewing My Positions</Media>
        </Media>

        {section2.map(item => renderListItem(item))}
      </Media>

      <Media>
        <Media body>
          <Media heading>Creating a Contract</Media>
        </Media>

        {section3.map(item => renderListItem(item))}
      </Media>

      <Media>
        <Media body>
          <Media heading>Using the Bulletin</Media>
        </Media>

        {section4.map(item => renderListItem(item))}
      </Media>

      <Media>
        <Media body>
          <Media heading>Cashing Out</Media>
        </Media>

        {section5.map(item => renderListItem(item))}
      </Media>

      <Media>
        <Media body>
          <Media header>More Information</Media>
        </Media>

        <Media>
          <Media left>
            <Media
              object
              data-src="../imgs/eth_transparent.png"
              alt="ETh-Logo"
            />
          </Media>
          <Media body>
            Have another question, shoot us an email at:
            <a href="mailto:info@decentralizedderivatives.org">
              info@decentralizedderivatives
            </a>
          </Media>
        </Media>

        <Media>
          <Media left>
            <Media
              object
              data-src="../imgs/eth_transparent.png"
              alt="ETh-Logo"
            />
          </Media>
          <Media body>
            To become a member or read more about us, check out our website:
            <a href="https://www.ddacoop.org">www.ddacoop.org</a>
          </Media>
        </Media>
      </Media>
    </div>
  );
};

export default HowTo;
