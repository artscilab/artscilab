import React, { Component } from 'react';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import MailchimpForm from '../components/MailchimpForm';

export default class Footer extends React.Component {
  render() {
    return (
      <Container className='footer-container'>
        {/* <Row className='footer-row align-items-center'>
          <div className='newsletter-signup-container'>
            <h3 htmlFor='newsletterEmail'>
              Sign up for the ArtSciLab Newsletter!
            </h3>
            <MailchimpForm></MailchimpForm>
          </div>
        </Row>
        <Row className='footer-row align-items-center'>
          <div className='newsletter-signup-container'>
            <h3>
              <a
                href='https://mailchi.mp/2d475b5f9645/e-sports-player-development'
                target='_blank'>
                Subscribe to get the latest about E-Sports Player Development
              </a>
            </h3>
          </div>
        </Row> */}
        <Row className='align-items-center footer-font'>
          <Col md='6'>
            <img src='/static/logo_square.png'></img>
          </Col>
          <Col md='6'>
            <p>
              We are a transdisciplinary research lab—helping the arts, science,
              and technology communities by pursuing initiatives of societal
              urgency and cultural timeliness. <a href='/about'>Read More</a>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
