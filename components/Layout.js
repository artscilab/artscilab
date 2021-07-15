import React, { Component } from 'react';
import Head from 'next/head';
import Header from "./Header";
import Footer from './Footer';
import 'bootstrap/scss/bootstrap.scss';
import '../scss/main.scss';
import PropTypes from 'prop-types';
import {initGA, logPageView} from '../utils/analytics';

export default class Layout extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {
    return (
      <div className='layout'>
        <Head>
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
          <link href="https://fonts.googleapis.com/css?family=Merriweather:300,300i,400" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="../static/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="../static/favicon-16x16.png"></link>
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Sofia&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet"></link>
        </Head>
        <div className='layout-header'>
          {!this.props.isHome &&
            <Header title={this.props.title} isHome={this.props.isHome} pageName={this.props.pageName} intro={this.props.intro}></Header>
          }
        </div>
        <div className='layout-body'>
          {this.props.children}
        </div>
        <div className='layout-footer'>
          <Footer></Footer>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  isHome: PropTypes.bool,
  pageName: PropTypes.string,
  intro: PropTypes.string
}