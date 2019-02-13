import React, {Component} from 'react';
import {
  Container, 
  Row,
  Col
} from 'reactstrap';

export default class Footer extends React.Component {
  render() {
    return(
      <Container>
        <Row>
          <Col><h1>This is some text</h1></Col>
        </Row>
      </Container>
    )
  }
}