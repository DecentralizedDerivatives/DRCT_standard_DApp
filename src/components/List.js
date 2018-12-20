import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class List extends Component {
  constructor(props){
    super(props);
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm(positionInfo){
  this.props.toggleFormVisibility(positionInfo);
  }

  render() {
    return (
      <div>
        <button className='btn btn-theme btn-thin' onClick={this.toggleForm.bind(this, this.props.positionInfo)}>List</button>
      </div>
    );
  }
}

List.propTypes = {
  positionInfo: PropTypes.object,
  toggleFormVisibility: PropTypes.func,
};
