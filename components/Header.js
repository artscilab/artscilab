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
    return (
      <Jumbotron className='page-header' >
        <SiteNav title={this.props.title}></SiteNav>
      </Jumbotron>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired
}