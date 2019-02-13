import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import fetch from "node-fetch";

export default class Project extends React.Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/project/${query.id}`)
    let data = await res.json()
    console.log(data)
    return { project: data }
  }

  render() {
    return (
      <Layout title={this.props.project.title.rendered}>
        <Container>
          <Row>
            <Col>
              <h1>{this.props.project.title.rendered}</h1>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}