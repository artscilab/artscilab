import React, { Component } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Layout from "../components/Layout";
import fetch from "node-fetch";

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
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/posts/${query.id}`)
    let post = await res.json()
    return { post }
  }

  renderContent() {
    return { __html: this.props.post.content.rendered}
  }

  render() {
    return (
      <Layout pageName={this.props.post.title.rendered} title={this.props.post.title.rendered}>
        <Container>
          <Row className='justify-content-center'>
            <Col sm='8'>
              <Breadcrumb>
                <BreadcrumbItem><a href="/index">Home</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/blog">Blog</a></BreadcrumbItem>
                <BreadcrumbItem active>{this.props.post.title.rendered}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col sm='8' className='post-content' dangerouslySetInnerHTML={this.renderContent()}>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}