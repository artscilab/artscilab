import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default class DynamicLink extends Component {
  render() {
    return (
      <Link as={`/${this.props.displayRoute}/${this.props.id}`} href={`/${this.props.actualRoute}?id=${this.props.id}`}>
        <a>{this.props.children}</a>
      </Link>
    )
  }
}

DynamicLink.propTypes = {
  displayRoute: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  actualRoute: PropTypes.string.isRequired
}