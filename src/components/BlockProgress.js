import React from 'react';
import { Card, CardBody, CardFooter, CardImg, CardHeader } from 'reactstrap';

const BlockProgress = () => (
  <Card>
    <CardHeader>Processing...</CardHeader>
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
    <CardFooter>This could take several minutes...</CardFooter>
  </Card>

  // Small gif without iframe
  // <img src="https://media.giphy.com/media/K5kfQExKk731K/200w_d.gif" alt="">
);

export default BlockProgress;
