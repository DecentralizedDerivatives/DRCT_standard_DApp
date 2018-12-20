import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { SET_USER_POSITIONS } from '../actions/types';
import { formatter } from '../formatter'
import List from './List'
import ListFormContainer from './ListFormContainer';
import ApprovalFormContainer from './ApprovalFormContainer';

export class MyPositionsBulletin extends Component {
  constructor() {
    super();

    this.state = {
      cashoutOpen: false,
      detailsOpen: false,
      formOpen: false,
      resultsMessage: false,
      approvedPosition: null,
      chosenPositionInfo: null,
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }
  formatPercent (val, empty) {
    if (!val) { return <span> {empty || '$0'} </span> }
    var cls = val < 0 ? 'warning' : 'success'
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
        address,
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
          <td>
            <List positionInfo={position} toggleFormVisibility={this.toggleFormVisibility}/>
          </td>
        </tr>
      );
    });
    return rows;
  };

  toggleFormVisibility(chosenPositionInfo) {
    this.setState({
      formOpen: !this.state.formOpen,
      chosenPositionInfo: chosenPositionInfo,
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
            { this.props.listOrderApproved ? <ListFormContainer positionInfo={this.state.chosenPositionInfo}/> : <ApprovalFormContainer positionInfo={this.state.chosenPositionInfo}/> }
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
              <th>List</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <div className="order-buttons">
          {this.renderOrderModal()}
        </div>
      </div>
    );
  }
}

MyPositionsBulletin.propTypes = {
  handleList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userPositions: PropTypes.array,
  listOrderId: PropTypes.string,
  listOrderError: PropTypes.string,
  listOrderApproved: PropTypes.bool,
  listOrderApproveError: PropTypes.string,
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_USER_POSITIONS),
  userPositions: state.user.userPositions,
  listOrderId: state.order.list.id,
  listOrderError: state.order.listOrderError,
  listOrderApproved: state.order.list.approved,
  listOrderApproveError: state.order.listOrderFundsError
});

export default connect(mapStateToProps,{ })(MyPositionsBulletin);
