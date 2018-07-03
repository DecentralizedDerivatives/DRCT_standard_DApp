import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPositions from './MyPositions';
import MyTransactions from './MyTransactions';
import ContractDetails from './ContractDetails';
import { Factory, Exchange, web3, DRCT } from '../ethereum';

// Use named export for unconnected component for testing
export class MyPortfolio extends Component {
  constructor() {
    super();

    this.state = {
      detailsOpen: false
    };
  }

  async componentDidMount() {
    await this.props.getUserAccount();
    await this.props.getUserPositions(this.props.userAccount);
    await this.props.getUserTransactions(this.props.userAccount);
  }

  async componentDidUpdate() {
    await this.props.getUserAccount();
    await this.props.getUserPositions(this.props.userAccount);
    await this.props.getUserTransactions(this.props.userAccount);
  }

  handleRowClick = async e => {
    e.preventDefault();

    let addressEl = e.target.getElementsByClassName('link__token-address')[0];

    if (typeof addressEl !== 'undefined') {
      const token_address = addressEl.getAttribute('data-token-address');

      await this.props.setSelectedToken(token_address);

      this.openContractDetails(link, token_address);
    }
  };

  openContractDetails = async (link, token_address = false) => {
    await this.props.getContractDetails(link);

    this.setState({
      detailsOpen: true
    });
  };

  closeContractDetails = () => {
    this.setState({
      detailsOpen: false
    });
  };

  render() {
    return (
      <div>
        <MyPositions onRowClick={this.handleRowClick.bind(this)} />
        <MyTransactions onRowClick={this.handleRowClick.bind(this)} />

        <Collapse isOpen={this.state.detailsOpen}>
          <ContractDetails onClick={this.closeContractDetails.bind(this)} />
        </Collapse>
      </div>
    );
  }
}

MyPortfolio.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  getUserPositions: PropTypes.func.isRequired,
  getUserTransactions: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  userAccount: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

export default connect(
  mapStateToProps,
  { getUserAccount, getUserPositions, getUserTransactions }
)(MyPortfolio);
