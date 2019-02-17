import React, {Component} from 'react';
import fetch from "node-fetch";
import Layout from "../components/Layout";
import { Container, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";

export default class Person extends React.Component {
  constructor(props) {
    super(props)
    this.renderPost = this.renderPost.bind(this)
  }

  static async getInitialProps({ query }) {
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/lab_member/${query.id}`)
    let data = await res.json()
    return { person: data }
  }

  renderPost() {
    return { __html: this.props.person.content.rendered }
  }


  render() {
    return(
      <Layout pageName={this.props.person.title.rendered} title={this.props.person.title.rendered}>
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem><a href="/index">Home</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/people">People</a></BreadcrumbItem>
                <BreadcrumbItem active>{this.props.person.title.rendered}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col sm='3'>
              <img className="img-fluid" src={this.props.person.profile_image.guid}></img>
            </Col>
            <Col dangerouslySetInnerHTML={this.renderPost()}>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}