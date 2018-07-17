import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import MyPositions from './MyPositions';
import MyTransactions from './MyTransactions';
import ContractDetails from './ContractDetails';
import CreateContract from "./CreateContract";
import {
  getUserAccount,
  getUserPositions,
  getUserTransactions
} from '../actions/userActions';
import requireConnection from './requireConnection';

// Use named export for unconnected component for testing
export class MyPortfolio extends Component {
  constructor() {
    super();

    this.state = {
      detailsOpen: false,
      formOpen: false,
    };
  }

  async componentDidMount() {
    await this.props.getUserAccount();
    this.props.getUserPositions(this.props.userAccount);
    this.props.getUserTransactions(this.props.userAccount);
  }

  // async componentDidUpdate() {
  //   await this.props.getUserPositions(this.props.userAccount);
  //   await this.props.getUserTransactions(this.props.userAccount);
  // }
  //
  handleRowClick = async (transactionAddress, e) => {
    e.preventDefault();
    console.log('ROW CLICK', transactionAddress)
    // TODO: Do we need a Transaction Details popup?
    // this.openContractDetails(symbol);
  };
  //
  openContractDetails = async (symbol) => {
    // await this.props.getContractDetails(symbol);
    this.setState({
      detailsOpen: true
    });
  };

  closeContractDetails = () => {
    this.setState({
      detailsOpen: false
    });
  };
  handleCreateContract = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  };
  renderCreateContract = () =>{
    return this.state.formOpen?(
      <CreateContract close={this.closeCreateContract} />
    ):(
      null
    )
  }
  closeCreateContract = () =>{
    this.setState({
      formOpen: false
    });
  }
  render() {
    return (
      <div id="portfolio">
        <MyPositions onRowClick={this.handleRowClick.bind(this)} />
        <MyTransactions onRowClick={this.handleRowClick.bind(this)} />
        <Collapse isOpen={this.state.detailsOpen}>
          <ContractDetails onClick={this.closeContractDetails.bind(this)} />
        </Collapse>
        {this.renderCreateContract()}
        <div className="create-contract-btn" onClick={this.handleCreateContract}>Create Contract</div>
      </div>
    );
  }
}

MyPortfolio.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  getUserPositions: PropTypes.func.isRequired,
  getUserTransactions: PropTypes.func.isRequired,
  orderId: PropTypes.string,
  userAccount: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

export default connect(
  mapStateToProps,
  { getUserAccount, getUserPositions, getUserTransactions }
)(requireConnection(MyPortfolio));
