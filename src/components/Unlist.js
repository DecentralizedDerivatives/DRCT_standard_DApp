import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import UnlistForm from './UnlistForm';
import { getUserOrders } from '../actions/userActions';

// Use named export for unconnected component for testing
export class Unlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      resultsMessage: ''
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  async componentWillMount() {
    await this.props.getUserOrders(this.props.userAccount);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.unlistOrderError !== 'null') {
      this.setState({
        resultsMessage: `Error: ${this.props.unlistOrderError}`,
        formOpen: false
      });
    } else if (this.props.unlistOrderTx) {
      this.setState({
        resultsMessage: `Unlist Order result ${this.props.unlistOrderTx}`,
        formOpen: false
      });
    }
  }

  toggleFormVisibility() {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }

  render() {
    return (
      <div className="container">
        <div id="unlist-button">
          <button
            className="btn btn-primary"
            onClick={this.toggleFormVisibility}
          >
            Unlist Order
          </button>
        </div>

        <Collapse isOpen={this.state.formOpen}>
          <div id="unlist-form">
            <h4 className="center-text">Unlist Order</h4>
            <UnlistFormComponent />
          </div>
        </Collapse>

        {this.state.resultsMessage && (
          <div id="results-message" className="text-center">
            {this.state.resultsMessage}
          </div>
        )}
      </div>
    );
  }
}

Unlist.propTypes = {
  getUserOrders: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  unlistOrderTx: PropTypes.string.isRequired,
  unlistOrderError: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.account.userAccount,
  unlistOrderTx: state.order.unlistOrderID,
  unlistOrderError: state.order.unlistOrderError
});

export default connect(
  mapStateToProps,
  { getUserOrders }
)(Unlist);
