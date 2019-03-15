import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default class DynamicLink extends Component {
  render() {
    return (
      <Link as={`/${this.props.displayRoute}/${this.props.slug}`} href={`/${this.props.actualRoute}?slug=${this.props.slug}`}>
        <a>{this.props.children}</a>
      </Link>
    )
  }
}

DynamicLink.propTypes = {
  displayRoute: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  actualRoute: PropTypes.string.isRequired
}