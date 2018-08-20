import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardHeader
} from 'reactstrap';

class BlockProgress extends Component {
  render() {
    if (!this.props.isProcessing) { return '' }
    return (
      <div>
        <div className="modal-background"></div>
        <div className="modal">
          <Card>
            <CardHeader className="text-center">Processing...</CardHeader>
            <CardBody>
              <CardImg
                top
                tag="iframe"
                width="100%"
                frameBorder="0"
                src="https://giphy.com/embed/K5kfQExKk731K"
                alt="Card image cap"
              />
            </CardBody>
            <CardFooter className="text-center">
              This could take several minutes...
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

BlockProgress.propTypes = {
  isProcessing: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isProcessing: state.status.isProcessing
});

export default connect(mapStateToProps)(BlockProgress);
