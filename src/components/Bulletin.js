import React, { Component } from 'react';
import OrderBook from './OrderBook';
import RecentTrades from './RecentTrades';
import ContractDetails from './ContractDetails';
import PriceChart from './PriceChart';
import List from './List';
import Unlist from './Unlist';
import Buy from './Buy';
import { getUserAccount } from '../actions/userActions';
import {
  getOrderBook,
  getRecentTrades,
  getContractDetails
} from '../actions/contractActions';
import { setSelectedToken } from '../actions/selectedActions';
import '../styles/Bulletin.css';

import { Factory, Exchange, web3 } from '../../ethereum';

class Bulletin extends Component {
  async componentDidMount() {
    await this.props.getUserAccount();
    await this.props.getOrderBook();
    await this.props.getRecentTrades();
  }

  async componentDidUpdate() {
    await this.props.getUserAccount();
    await this.props.getOrderBook();
    await this.props.getRecentTrades();
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
        <div className="wrapper">
          <OrderBook />

          <div className="order-buttons">
            <Buy />
            <List />
            <Unlist />
          </div>

          <RecentTrades />

          <Collapse isOpen={this.state.detailsOpen}>
            <ContractDetails onClick={this.closeContractDetails} />
          </Collapse>

          <div className="price-chart">
            <PriceChart />
          </div>
        </div>
      </div>
    );
  }
}
Bulletin.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  getOrderBook: PropTypes.func.isRequired,
  getRecentTrades: PropTypes.func.isRequired,
  getContractDetails: PropTypes.func.isRequired,
  setSelectedToken: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  userAccount: PropTypes.string.isRequired
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
    getContractDetails
  }
)(Bulletin);
