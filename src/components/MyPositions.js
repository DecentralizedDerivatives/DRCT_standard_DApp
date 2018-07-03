import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import { getContractDetails } from '../actions/userActions';
import '../styles/MyPositions.css';

// Use named export for unconnected component for testing
export class MyPositions extends Component {
  constructor(props) {
    super(props);

    const { handleRowClick } = this.props;
  }

  renderRows() {
    this.props.userPositions.map(position => {
      const {
        address,
        balance,
        date,
        symbol,
        contractDuration,
        contractMultiplier
      } = position;

      return (
        <tr>
          <td>
            <a
              className="link__token-address"
              onClick={this.handleRowClick}
              data-token-address={address}
            >
              {symbol} - {contractDuration} Days - {contractMultiplier}X
            </a>
          </td>
          <td>{balance}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Table className="positions-table">
            <thead>
              <tr>
                <th>My Tokens</th>
              </tr>
              <tr>
                <th>Asset</th>
                <th>Balance</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

MyPositions.propTypes = {
  handleRowClick: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  userPositions: PropTypes.array
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  userPositions: state.user.userPositions
});

export default connect(
  mapStateToProps,
  { getContractDetails }
)(MyPositions);
