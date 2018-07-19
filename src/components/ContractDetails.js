import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink
} from 'reactstrap';
import { getContractDetails } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class ContractDetails extends Component {
  // async componentDidMount() {
  //   await this.props.getContractDetails(this.props.tokenAddress);
  // }

  renderCardBody() {
    const cardBody =
      typeof this.props.tokenAddress !== 'undefined' &&
      this.props.tokenAddress.length ? (
        <CardBody>
          <CardTitle>Factory Contract</CardTitle>
          <CardSubtitle>Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${
              this.props.contractAddress
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.contractAddress}
          </CardLink>
          <CardSubtitle>Duration</CardSubtitle>
          <CardText>{this.props.contractDuration}</CardText>
          <CardSubtitle>Multiplier</CardSubtitle>
          <CardText>{this.props.contractMultiplier}</CardText>
          <CardSubtitle>Oracle Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${this.props.oracleAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.oracleAddress}
          </CardLink>
          <CardSubtitle>Token Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${
              this.props.tokenAddress
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.tokenAddress}
          </CardLink>
        </CardBody>
      ) : (
        <CardBody>
          <CardTitle>Factory Contract</CardTitle>
          <CardSubtitle>Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${
              this.props.contractAddress
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.contractAddress}
          </CardLink>
          <CardSubtitle>Duration</CardSubtitle>
          <CardText>{this.props.contractDuration}</CardText>
          <CardSubtitle>Multiplier</CardSubtitle>
          <CardText>{this.props.contractMultiplier}</CardText>
          <CardSubtitle>Oracle Address</CardSubtitle>
          <CardLink
            href={`https://rinkeby.etherscan.io/address/${this.props.oracleAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.oracleAddress}
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
            <Button onClick={this.handleDetailsClick} />
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
  oracleAddress: PropTypes.string,
  tokenAddress: PropTypes.string
};

const mapStateToProps = state => ({
  contractAddress: state.contract.contractAddress,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier,
  oracleAddress: state.contract.oracleAddress,
  tokenAddress: state.selected.selectedTokenAddress
});

export default connect(
  mapStateToProps,
  { getContractDetails }
)(ContractDetails);
