import React, {Component} from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';
import SiteNav from './SiteNav'
import PropTypes from "prop-types";

export default class Header extends Component {
  render() {
    return (
      <>
        <SiteNav title={this.props.title}></SiteNav>
        <Jumbotron className='page-header' >
          <Container>
            <Row className='row-no-margin'>
              <Col>
                <h1 className='display-2'>{this.props.pageName}</h1>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </>
      
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired
}