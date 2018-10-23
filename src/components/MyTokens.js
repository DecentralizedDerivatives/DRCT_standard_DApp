import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { SET_USER_POSITIONS } from '../actions/types';
import ListFormContainer from './ListFormContainer';
import ApprovalFormContainer from './ApprovalFormContainer';
import { formatter } from '../formatter'

export class MyTokens extends Component {
    constructor(props){
        super(props);
        this.state = {
          formOpen: false,
          resultsMessage: ''
        };
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listOrderError !== null) {
      this.setState({
        resultsMessage: `Error: ${nextProps.listOrderError}`,
        formOpen: false
      });
    } else if (nextProps.listOrderId) {
      this.setState({ resultsMessage: '', formOpen: false });
      this.props.refreshPage(true);
    } else if (nextProps.listOrderApproveError) {
      this.setState({
        resultsMessage: `Error: ${nextProps.listOrderApproveError}`,
        formOpen: true
      });
    } else if (nextProps.listOrderApproved) {
      this.setState({
        resultsMessage: `Order approval confirmed`,
        formOpen: true
      });
    }
  }

  toggleFormVisibility() {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }
  renderOrderModal = () => (
    this.state.formOpen || this.state.resultsMessage ? (
      <div>
        <div className="order-modal-background" onClick={this.closeOrderModal} />
        <div className="order-modal">
          <div id="buy-form">
            <h4 className="order-modal-head">
              { this.props.listOrderApproved ? <span>List Order</span> : <span>Approve Order</span> }
            </h4>
            {/* this.props.listOrderApproved ? <ListFormContainer /> : <ApprovalFormContainer />*/ }
            <ApprovalFormContainer />
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
  closeOrderModal = () => this.setState({ formOpen: false, resultsMessage: "" });
  formatPercent (val, empty) {
    if (!val) { return <span> {empty || '$0'} </span> }
    var cls = val < 0 ? 'warning' : ''
    return <span className={cls}>{formatter.toPercent(val)}</span>
  }
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
    if (this.props.userPositions.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Events</h5></td></tr>
    }
    var rows = this.props.userPositions.map((position, index) => {
      const {
        balance,
        date,
        symbol,
        contractDuration,
        contractMultiplier,
        tokenType,
      } = position;
      return (
        <tr key={index}>
          <td>
            {tokenType} {symbol} - {contractDuration} Days - {contractMultiplier}X
          </td>
          <td>{balance}</td>
          <td>{date}</td>
          <td><button className='btn btn-thin btn-theme' onClick={this.toggleFormVisibility}>List</button></td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="wide-table-container">
        <div className='table-title'>My Tokens</div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th style={{width: '30%'}}>Asset</th>
              <th style={{width: '20%'}}>Balance</th>
              <th>Start Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        {this.renderOrderModal()}
      </div>
    );
  }
}

MyTokens.propTypes = {
  loading: PropTypes.bool.isRequired,
  userAccount: PropTypes.string,
  userPositions: PropTypes.array,
  listOrderId: PropTypes.string,
  listOrderError: PropTypes.string,
  listOrderApproved: PropTypes.bool,
  listOrderApproveError: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_USER_POSITIONS),
  userAccount: state.user.userAccount,
  userPositions: state.user.userPositions,
  listOrderId: state.order.list.id,
  listOrderError: state.order.listOrderError,
  listOrderApproved: state.order.list.approved,
  listOrderApproveError: state.order.listOrderFundsError
});

export default connect(mapStateToProps,{ })(MyTokens);
