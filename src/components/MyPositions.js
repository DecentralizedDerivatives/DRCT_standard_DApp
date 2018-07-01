import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import '../styles/myPositions.css';

class MyPositions extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      myPositions: [['loading...', 'loading...', 'loading...']],
      myAccount: '',
      selectedTokenAddress: '',
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: '',
      oracleAddress: ''
    };
  }

  async componentDidMount() {
    await this.props.getUserAccount;

    await this.getMyPositions();
  }

  getMyPositions = myAccount => {
    this.props.getUserPositions(myAccount);
  };

  onClickRow = link => {
    let addressEl = link.currentTarget.getElementsByClassName(
      'token-address-link'
    )[0];
    if (typeof addressEl !== 'undefined') {
      this.openContractDetails(
        link,
        addressEl.getAttribute('data-token-address')
      );
    }
  };

  renderRows() {
    this.state.myPositions.map(position => {
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
              className="token-address-link"
              onClick={event => event.stopPropagation()}
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
      <div className="flex-container-center">
        <div className="flex-item">
          <Table className="positions-table" onClick={this.onClickRow}>
            <thead>
              <tr>
                <th>My Positions</th>
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
  getUserAccount: PropTypes.func.isRequired,
  getUserPositions: PropTypes.func.isRequired,
  myAccount: PropTypes.string.isRequired,
  myPositions: PropTypes.array
};

const mapStateToProps = state => ({
  myAccount: state.userAccount,
  myPositions: state.userPositions
});

export default connect(
  mapStateToProps,
  { getUserAccount, getUserPositions }
)(MyPositions);
