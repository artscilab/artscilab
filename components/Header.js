import React, {Component} from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';
import SiteNav from './SiteNav'


export default class Header extends Component {
  render() {
    return (
      <Jumbotron className='page-header' style={divStyle} >
        <SiteNav title={this.props.title}></SiteNav>
        <Container>
          <Row className='row-no-margin'>
            <Col>
              <h1 className='display-2'>{this.props.pageName}</h1>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    )
  }
}