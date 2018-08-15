import React from 'react';
import { Row, Col } from 'reactstrap';

const HowTo = () => {
  const section1 = [
    'All contracts are Ethereum smart contracts that pay out the change in an underlying rate (e.g. BTC/USD) over a time frame (e.g. 7 days)',
    'Sometimes the contracts use multipliers too (e.g. 10x)',
    'All Contracts are fully collateralized. The smart contract holds the Ether and the contracts are capped (so a 10x multiplier means that a 10% move is all you can gain or lose from)',
    'Contracts start by a "Creator" creating DRCT Tokens (long and short) for a given rate/duration/start date combmination',
    'These tokens are normal ERC20 tokens on the Ethereum network.',
    'At the start of the contract, one Ether of collateral locked in this contract is worth 1000 tokens. This is your balance',
    'Owners of the tokens at expiration get distributed the collateral held in the smart contract'
  ];

  const section2 = [
    'In the My Portfolio tab, you can see your positions and your transactions',
    "Go buy some tokens on the Bulletin or create a contract if you don't have any!",
    'You can click on the rows to see more details about the tokens'
  ];

  const section3 = [
    'Creating a contract is a two step process',
    'First you have to deploy a contract, then you have to wrap your Ether and send it to the contract to fund it',
    'So after clicking "Create Contrat", select a duration, underlying and start date, enter the amount of Ether per side and then click: Create Contract',
    'After that, you can wait for the address result (your new contract)',
    'Note: the contract will take double what you entered in the "amount of Ether" field (its per side, so X amount collateralizing Long tokens and the same on the Short side)',
    'Once that comes back, you can click Send Funds',
    'Once the contract mines you will see it in your positions'
  ];

  const section4 = [
    'The Bulletin is a sell only list of tokens that you can buy (think like Craigslist but for DRCT tokens)',
    'That said, there are no partial orders on the Bulletin (you have to buy them all in a given order)',
    'To list your own, just click list, pick from your tokens, set an amount to sell and a price and your off',
    'Like the creating of contract, listing is a two step process (first approval, then listing), so be sure to wait for the first call to come back',
    "You own the tokens until someone buys them (they'll still show up in your token list)",
    'To buy, just find the order ID and click buy.',
    'You can unlist your orders also by just knowing the order ID',
    "If you haven't realized by now, all tokens with the same details (underlying rate, duration , multiplier, and start date) are fungible, so feel free to buy from multiple different created contracts"
  ];

  const section5 = [
    'Contracts for the dapp, although you send them Ether, actually use wrapped (or tokenized Ether) to make things easier on us',
    "This means that you'll have to unwrap your Ether after the contract expires and pays out",
    'To do this, just click Cash Out',
    'If you have a balance there, you will be able to click withdraw and unwrap all your Ether',
    "Remember that some contracts may take a day to close out, so don't panic if your Eth isn't there on the expiration date"
  ];

  const renderListItem = text => (
    <Row key={text} className="mb-3">
      <Col md="1">
        <img
          src="/eth_transparent.png"
          className="img-fluid float-left"
          alt="ETh-Logo"
          height="40"
          width="40"
        />
      </Col>
      <Col md="11">
        <div>{text}</div>
      </Col>
    </Row>
  );

  return (
    <div className="container mt-5">
      <div className="mx-auto">
        <h3>Welcome to the DDA dapp!</h3>
        <Row className="ml-3 mt-4 mb-3">
          <h5>
            <em>
              Before we get into specifics, let's talk about how the contracts
              work.
            </em>
          </h5>
        </Row>
        {section1.map(item => renderListItem(item))}
      </div>

      <div className="mt-5">
        <Row className="ml-3">
          <h5>
            <em>Here's a picture to help explain it a bit better:</em>
          </h5>
        </Row>
        <Row>
          <img
            src="/infograph-transparent.png"
            className="howTo__infograph"
            alt="ETh-Logo"
            width="350"
          />
        </Row>
      </div>

      <div className="mb-5">
        <Row className="ml-3 mb-2">
          <h5>
            <em>Viewing Your Positions</em>
          </h5>
        </Row>
        {section2.map(item => renderListItem(item))}
      </div>

      <div className="mb-5">
        <Row className="ml-3 mb-2">
          <h5>
            <em>Creating a Contract</em>
          </h5>
        </Row>
        {section3.map(item => renderListItem(item))}
      </div>

      <div className="mb-5">
        <Row className="ml-3 mb-2">
          <h5>
            <em>Using the Bulletin</em>
          </h5>
        </Row>
        {section4.map(item => renderListItem(item))}
      </div>

      <div className="mb-5">
        <Row className="ml-3 mb-2">
          <h5>
            <em>Cashing Out</em>
          </h5>
        </Row>
        {section5.map(item => renderListItem(item))}
      </div>

      <div className="mb-5">
        <Row className="ml-3 mb-2">
          <h5>
            <em>Want to Learn More?</em>
          </h5>
        </Row>
        <Row>
          <Col md="1">
            <img
              src="/eth_transparent.png"
              className="img-fluid float-left"
              alt="ETh-Logo"
              height="40"
              width="40"
            />
          </Col>
          <Col md="11">
            <div>
              <span>
                To become a member or read more about us, check out our website:
              </span>
              <a href="https://www.ddacoop.org" className="pl-2">
                www.ddacoop.org
              </a>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mb-5">
        <Row className="ml-3 mb-2">
          <h5>
            <em>Still Have Questions?</em>
          </h5>
        </Row>
        <Row>
          <Col md="1">
            <img
              src="/eth_transparent.png"
              className="img-fluid float-left"
              alt="ETh-Logo"
              height="40"
              width="40"
            />
          </Col>
          <Col md="11">
            <div>
              <span>If you have more questions, shoot us an email at:</span>
              <a
                href="mailto:info@ddacoop.org"
                className="pl-2"
              >
                info@ddacoop.org
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HowTo;
