import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPositions from './MyPositions';
import MyTransactions from './MyTransactions';
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
        <MyPositions />
        <MyTransactions />
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
