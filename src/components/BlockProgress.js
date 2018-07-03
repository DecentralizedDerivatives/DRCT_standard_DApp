import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardHeader,
  Modal
} from 'reactstrap';

class BlockProgress extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isProcessing}>
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
      </Modal>
    );
  }
}

ConnectionModal.propTypes = {
  isProcessing: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isProcessing: state.status.isProcessing
});

export default connect(mapStateToProps)(BlockProgress);
