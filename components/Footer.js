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
        <Row className='footer-row align-items-center'>
          <Col md='6'>
            <img src='/static/logo_square.png'></img>
          </Col>
          <Col md='6'>
            <p>We are a transdisciplinary research lab—helping the arts, science, and technology communities by pursuing initiatives of societal urgency and cultural timeliness. <a href='/about'>Read More</a></p>
          </Col>
        </Row>
      </Container>
    )
  }
}