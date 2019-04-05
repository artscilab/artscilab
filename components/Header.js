import React, {Component} from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';
import SiteNav from './SiteNav'
import PropTypes from "prop-types";
import ReactFittext from 'react-fittext';

export default class Header extends Component {
  render() {
    let styles = '';
    if (this.props.pageName) {
      styles = ''
    } else {
      styles = 'jumbotron-margin'
    }
    return (
      <>
        <Jumbotron className={styles + ' page-header'} >
          <SiteNav title={this.props.title}></SiteNav>
        </Jumbotron>
        {this.props.pageName &&
          <Container>
            <Row className='row-no-margin'>
              <Col>
                <ReactFittext compressor={0.5} maxFontSize={90}>
                  <h1 className='page-title display-2'>{this.props.pageName}</h1>
                </ReactFittext>
              </Col>
            </Row>
          </Container>
        }
      </>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired
}