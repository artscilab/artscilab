import React, { Component } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Layout from "../components/Layout";
import fetch from "node-fetch";
import { convertUrlToHttps } from "../functions/functions";

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "ArtSciLab",
      content: "Loading"
    }
    this.renderContent = this.renderContent.bind(this)
  }

  static async getInitialProps({query}) {
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/posts?slug=${query.slug}&_embed`)
    let post = await res.json()
    //console.log(post);  //know about the category of post
    let date = new Date(Date.parse(post[0].date));
    let date_display_str = 
      date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
    post[0].date = date_display_str;
    return { post: post[0] }
  }

  renderContent() {
    return { __html: this.props.post.content.rendered}
  }

  render() {
    return (
      <Layout pageName={this.props.post.title.rendered} title={this.props.post.title.rendered}>
        <Container className='blog-single'>
          <Row className=''>
            <Col sm='12'>
              <p>Published On: {this.props.post.date}</p>
            </Col>
          </Row>
          {(this.props.post.hasOwnProperty('_embedded')) && (this.props.post._embedded.hasOwnProperty('wp:featuredmedia')) && this.props.post._embedded['wp:featuredmedia'][0].hasOwnProperty('id') &&
            <Row>
              <Col sm='12'>
                <div>
                  <img className='img-fluid featured-image' src={convertUrlToHttps(this.props.post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url)}></img>
                </div>
              </Col>
            </Row>
          }
          <Row className=''>
            <Col sm='12' className='post-content' dangerouslySetInnerHTML={this.renderContent()}>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}