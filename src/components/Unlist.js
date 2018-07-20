import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import UnlistFormContainer from './UnlistFormContainer';
// import { getUserOrders } from '../actions/userActions';

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
  // async componentDidMount() {
  //   await this.props.getUserOrders(this.props.userAccount);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.unlistOrderError !== null) {
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
  renderOrderModal = () => (
    this.state.formOpen || this.state.resultsMessage ? (
      <div>
        <div className="order-modal-background" onClick={this.closeOrderModal} />
        <div className="order-modal">
          <div id="buy-form">
            <h4 className="order-modal-head">Order Confirmation</h4>
            <UnlistFormContainer />
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
      <div className="order-btn-wrapper">
        <div className="order-btn" onClick={this.toggleFormVisibility}>
          <label className="order-btn-label">
            Unlist Order
            </label>
        </div>
        {this.renderOrderModal()}
      </div>
    );
  }
}

Unlist.propTypes = {
  // getUserOrders: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  unlistOrderTx: PropTypes.string,
  unlistOrderError: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  unlistOrderTx: state.order.unlistOrderID,
  unlistOrderError: state.order.unlistOrderError
});

export default connect(mapStateToProps, null)(Unlist);
