import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Factory, Exchange, web3, DRCT } from '../ethereum';

class ContractDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getContractDetails(this.props.tokenAddress);
  }

  render() {
    return typeof this.props.tokenAddress !== 'undefined' &&
      this.props.tokenAddress.length ? (
      <div>
        <Card>
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
              href={`https://rinkeby.etherscan.io/address/${
                this.props.oracleAddress
              }`}
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
        </Card>
      </div>
    ) : (
      <div>
        <Card>
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
              href={`https://rinkeby.etherscan.io/address/${
                this.props.oracleAddress
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.oracleAddress}
            </CardLink>
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
  contractAddress: state.contractAddress,
  contractDuration: state.contractDuration,
  contractMultiplier: state.contractMultiplier,
  oracledAddress: state.oracleAddress
});

export default connect(
  mapStateToProps,
  { getContractDetails }
)(ContractDetails);
