import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink
} from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import { getContractDetails } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class ContractDetails extends Component {
  constructor(props) {
    super(props);

    const {
      tokenAddress,
      contractAddress,
      contractDuration,
      contractMultiplier,
      oracleAddress,
      handleDetailsClick
    } = this.props;
  }

  async componentDidMount() {
    await this.props.getContractDetails(tokenAddress);
  }

  renderCardBody() {
    const cardBody =
      typeof tokenAddress !== 'undefined' && tokenAddress.length ? (
        <CardBody>
          <CardTitle>Factory Contract</CardTitle>
          <CardSubtitle>Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contractAddress}
          </CardLink>
          <CardSubtitle>Duration</CardSubtitle>
          <CardText>{contractDuration}</CardText>
          <CardSubtitle>Multiplier</CardSubtitle>
          <CardText>{contractMultiplier}</CardText>
          <CardSubtitle>Oracle Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${oracleAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {oracleAddress}
          </CardLink>
          <CardSubtitle>Token Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tokenAddress}
          </CardLink>
        </CardBody>
      ) : (
        <CardBody>
          <CardTitle>Factory Contract</CardTitle>
          <CardSubtitle>Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contractAddress}
          </CardLink>
          <CardSubtitle>Duration</CardSubtitle>
          <CardText>{contractDuration}</CardText>
          <CardSubtitle>Multiplier</CardSubtitle>
          <CardText>{contractMultiplier}</CardText>
          <CardSubtitle>Oracle Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${oracleAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {oracleAddress}
          </CardLink>
        </CardBody>
      );

    return cardBody;
  }

  render() {
    return (
      <div id="contract-details">
        <Card>
          {this.renderCardBody()}
          <CardBody>
            <Button onClick={handleDetailsClick} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

ContractDetails.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  contractDuration: PropTypes.number.isRequired,
  contractMultiplier: PropTypes.number.isRequired,
  oracleAddress: PropTypes.string.isRequired,
  tokenAddress: PropTypes.string
};

const mapStateToProps = (state = {
  contractAddress: state.contract.contractAddress,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier,
  oracledAddress: state.contract.oracleAddress,
  tokenAddress: state.selected.selectedTokenAddress
});

export default connect(
  mapStateToProps,
  { getContractDetails }
)(ContractDetails);
