import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FactoryProvider from '../factoryProvider';
import { formatter } from '../formatter';

export class ContractDetails extends Component {
  formatMoney (val, empty) {
    // TODO: val is never empty or less than zero
    if (!val) { return <span> {empty || '$0'} </span> }
    var cls = val < 0 ? 'warning' : ''
    return <span className={cls}>{formatter.toDollars(val)}</span>
  }
  formatPercent (val, empty) {
    // TODO: this function is not used
    if (!val) { return <span> {empty || '$0'} </span> }
    var cls = val < 0 ? 'warning' : 'success'
    return <span className={cls}>{formatter.toPercent(val)}</span>
  }
  renderdiv() {
    const network_id = FactoryProvider.getNetworkId();
    const networks = require('../networkProvider');
    const url = networks[network_id].url + '/address/';
    const div = (
        <div style={{margin: '20px', padding: '10px'}}>
          <h2>Factory Contract</h2>
          <div className='detail-segment'>
            <div className='title'>Address</div>
            <div className='detail'>
              <a href={url + this.props.contract.contractAddress}
                target="_blank"
                rel="noopener noreferrer">{this.props.contract.contractAddress}
              </a>
            </div>
          </div>
          <div className='detail-segment'>
            <div className='title'>Duration</div>
            <div className='detail'>{this.props.contract.contractDuration} days</div>
          </div>
          <div className='detail-segment'>
            <div className='title'>Multiplier</div>
            <div className='detail'>{this.props.contract.contractMultiplier}X</div>
          </div>
          <div className='detail-segment'>
            <div className='title'>Oracle Address</div>
            <div className='detail'>
              <a
                href={url + this.props.contract.oracleAddress}
                target="_blank"
                rel="noopener noreferrer">{this.props.contract.oracleAddress}
              </a>
            </div>
          </div>
          {this.props.contract.contractStartPrice > 0 ?
            <div className='detail-segment'>
              <div className='title'>Start Price</div>
              <div className='detail'>{this.formatMoney(this.props.contract.contractStartPrice)}</div>
            </div>
          : ''}
        </div>
      );

    return div;
  }

  render() {
    return (
      <div id="contract-details">
        <div className="modal-background" onClick={this.props.close}></div>
        <div className="modal">
          {this.renderdiv()}
          <div>
            <div style={{width: '100%', textAlign: 'center', margin: '8px auto'}}>
              <button
                type="submit"
                className="btn btn-primary btn-md"
                onClick={this.props.close}>Ok</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContractDetails.propTypes = {
  contract: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contract: state.contract
});

export default connect(mapStateToProps, { })(ContractDetails);
