import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderBook from './OrderBook';
import RecentTrades from './RecentTrades';
import ContractDetails from './ContractDetails';
import MyPositionsBulletin from './MyPositionsBulletin';
import PriceChart from './PriceChart';
import ListFormContainer from './ListFormContainer';
import ApprovalFormContainer from './ApprovalFormContainer';

import {
  getUserAccount,
  getUserTokenPositions,
  getUserOrders,
  getUserPositions,
} from '../actions/userActions';
import {
  getOrderBook,
  getRecentTrades,
  getContractDetails
} from '../actions/contractActions';
import requireConnection from './requireConnection';

// Use named export for unconnected component for testing
export class Bulletin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsOpen: false,
      listOrderOpen: false,
      resultsMessage: '',
      token: '',
      balance: 0,
    };
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleList = this.handleList.bind(this)
  }

  async componentDidMount() {
    await this.props.getUserAccount();
    if (!this.props.userAccount) { return };
    this.props.getOrderBook();
    this.props.getRecentTrades();
    this.props.getUserPositions(this.props.userAccount);
    this.props.getUserTokenPositions(this.props.userAccount);
    this.props.getUserOrders(this.props.userAccount);
    this.orderBookInterval = setInterval(() => this.props.getOrderBook(this.props.userAccount, true), 30000);
    this.positionsInterval = setInterval(() => this.props.getUserPositions(this.props.userAccount, true), 30000);
    this.recentTradesInterval = setInterval(() => this.props.getRecentTrades(this.props.userAccount, true), 30000);
  }
  componentWillUnmount() {
    clearInterval(this.orderBookInterval);
    clearInterval(this.positionsInterval);
    clearInterval(this.recentTradesInterval);
  }

  handleRowClick = async (tokenAddress, symbol, date, e) => {
    e.preventDefault();
    await this.props.getContractDetails(symbol, date);
    this.setState({
      detailsOpen: true
    });
  };

  refreshPage = (silentMode) => {
    this.props.getOrderBook(this.props.userAccount, silentMode)
    this.props.getRecentTrades(this.props.userAccount, silentMode)
  }
  renderContractDetails = () => {
    return this.state.detailsOpen ? (
      <ContractDetails
        close={this.closeContractDetails.bind(this)} />
    ) : null;
  };
  closeContractDetails = () => {
    this.setState({
      detailsOpen: false
    });
  };

  handleList = (token,balance) => {
    alert('yo')
    this.setState({
      listOrderOpen: true,
      token: token,
      balance: balance,
    });
  }
/*
  componentWillReceiveProps(nextProps) {
    if (nextProps.listOrderError !== null) {
      this.setState({
        resultsMessage: `Error: ${nextProps.listOrderError}`,
        listOrderOpen: false
      });
    } else if (nextProps.listOrderId) {
      this.setState({ resultsMessage: '', listOrderOpen: false });
      this.refreshPage(true);
    } else if (nextProps.listOrderApproveError) {
      this.setState({
        resultsMessage: `Error: ${nextProps.listOrderApproveError}`,
        listOrderOpen: true
      });
    } else if (nextProps.listOrderApproved) {
      this.setState({
        resultsMessage: `Order approval confirmed`,
        listOrderOpen: true
      });
    }
  }
  */

  renderOrderModal = () => (
    this.state.listOrderOpen || this.state.resultsMessage ? (
      <div>
        <div className="order-modal-background" onClick={this.closeOrderModal} />
        <div className="order-modal">
          <div id="buy-form">
            <h4 className="order-modal-head">
              { this.props.listOrderApproved ? <span>List Order</span> : <span>Approve Order</span> }
            </h4>
            { this.props.listOrderApproved ? <ListFormContainer token={this.state.token} /> : <ApprovalFormContainer token={this.state.token}/> }
            {this.state.resultsMessage && (
              <div id="results-message" className="text-center">
                {this.state.resultsMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    ) : (
        null
      )
  );
  closeOrderModal = () => this.setState({ listOrderOpen: false, resultsMessage: "" });

  render() {
    alert(this.state.listOrderOpen)
    alert(this.state.resultsMessage)
    return (
      <div id="bulletin">
        <OrderBook onRowClick={this.handleRowClick} refreshPage={this.refreshPage} />
        <MyPositionsBulletin handleList={this.handleList}/>
        <div className="order-buttons">
          {this.renderOrderModal()}
        </div>

        <div className="price-chart">
          {this.props.userAccount ? <PriceChart /> : ''}
        </div>
        <RecentTrades onRowClick={this.handleRowClick} />

        {this.renderContractDetails()}
      </div>
    );
  }
}
Bulletin.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  getUserPositions: PropTypes.func.isRequired,
  getOrderBook: PropTypes.func.isRequired,
  getRecentTrades: PropTypes.func.isRequired,
  getContractDetails: PropTypes.func.isRequired,
  getUserTokenPositions: PropTypes.func.isRequired,
  getUserOrders: PropTypes.func.isRequired,
  orderId: PropTypes.string,
  userAccount: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

export default connect(
  mapStateToProps,
  {
    getUserAccount,
    getOrderBook,
    getRecentTrades,
    getContractDetails,
    getUserTokenPositions,
    getUserOrders,
    getUserPositions,
  }
)(requireConnection(Bulletin));
