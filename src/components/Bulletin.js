import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderBook from './OrderBook';
import RecentTrades from './RecentTrades';
import ContractDetails from './ContractDetails';
import PriceChart from './PriceChart';
import List from './List';
import Unlist from './Unlist';
import Buy from './Buy';
import {
  getUserAccount,
  getUserTokenPositions,
  getUserOrders
} from '../actions/userActions';
import {
  getOrderBook,
  getRecentTrades,
  getContractDetails,
  getStartDatePrice
} from '../actions/contractActions';
import { setSelectedToken } from '../actions/selectedActions';
import requireConnection from './requireConnection';

const moment = require('moment');

// Use named export for unconnected component for testing
export class Bulletin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsOpen: false
    };
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  async componentDidMount() {
    await this.props.getUserAccount();
    if (!this.props.userAccount) { return };
    this.props.getOrderBook();
    this.props.getRecentTrades();
    this.props.getUserTokenPositions(this.props.userAccount);
    this.props.getUserOrders(this.props.userAccount);
    this.orderBookInterval = setInterval(() => this.props.getOrderBook(this.props.userAccount, true), 30000);
    this.recentTradesInterval = setInterval(() => this.props.getRecentTrades(this.props.userAccount, true), 30000);
  }
  componentWillUnmount() {
    clearInterval(this.orderBookInterval);
    clearInterval(this.recentTradesInterval);
  }

  handleRowClick = async (tokenAddress, symbol, date, e) => {
    e.preventDefault();
    await this.props.setSelectedToken(tokenAddress);
    var details = await this.props.getContractDetails(symbol);
    const startDate = date ? moment(date, 'MM/DD/YYYY') : null;
    if (startDate && startDate.isBefore(moment().startOf('day'))) {
      await this.props.getStartDatePrice(details.oracleAddress, startDate.format('x'));
    }
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

  render() {
    return (
      <div id="bulletin">
        <OrderBook onRowClick={this.handleRowClick} />

        <div className="order-buttons">
          <Buy refreshPage={this.refreshPage}/>
          <List refreshPage={this.refreshPage}/>
          <Unlist refreshPage={this.refreshPage}/>
        </div>

        <div className="table-container price-chart">
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
  getOrderBook: PropTypes.func.isRequired,
  getRecentTrades: PropTypes.func.isRequired,
  getContractDetails: PropTypes.func.isRequired,
  getStartDatePrice: PropTypes.func.isRequired,
  getUserTokenPositions: PropTypes.func.isRequired,
  getUserOrders: PropTypes.func.isRequired,
  setSelectedToken: PropTypes.func.isRequired,
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
    setSelectedToken,
    getContractDetails,
    getStartDatePrice,
    getUserTokenPositions,
    getUserOrders
  }
)(requireConnection(Bulletin));
