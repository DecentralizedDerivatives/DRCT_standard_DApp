import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContractDetails, getStartDatePrice } from '../actions/contractActions';
import FactoryProvider from '../factoryProvider';

// Use named export for unconnected component for testing
export class ContractDetails extends Component {
  // async componentDidMount() {
  //   await this.props.getContractDetails(this.props.tokenAddress);
  // }
  renderdiv() {
    const network_id = FactoryProvider.getNetworkId();
    const networks = require('../networkProvider');
    const url = networks[network_id].url + '/address/';
    // const startDate = null;
    console.log('CONTRACT', this.props.contract)
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
            <div className='detail'>{this.props.contract.contractDuration}</div>
          </div>
          <div className='detail-segment'>
            <div className='title'>Multiplier</div>
            <div className='detail'>{this.props.contract.contractMultiplier}</div>
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
          {this.props.tokenAddress &&
          this.props.tokenAddress.length ?
            <div className='detail-segment'>
              <div className='title'>Token Address</div>
              <div className='detail'>
                <a
                  href={url + this.props.tokenAddress}
                  target="_blank"
                  rel="noopener noreferrer">{this.props.tokenAddress}
                </a>
              </div>
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
  contract: PropTypes.object.isRequired,
  tokenAddress: PropTypes.string
};

const mapStateToProps = state => ({
  contract: state.contract,
  // contractDuration: state.contract.contractDuration,
  // contractMultiplier: state.contract.contractMultiplier,
  // contractStartPrice: state.contract.contractStartPrice,
  // oracleAddress: state.contract.oracleAddress,
  tokenAddress: state.selected.selectedTokenAddress
});

export default connect(
  mapStateToProps,
  { getContractDetails, getStartDatePrice }
)(ContractDetails);
