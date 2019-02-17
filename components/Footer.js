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
          <Col>
            <hr></hr>
            <p className='lead'>This is some text in the footer</p>
          </Col>
        </Row>
      </Container>
    )
  }
}