import React from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Layout from "../components/Layout";
import fetch from "node-fetch";

export default class Project extends React.Component {
  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }
  
  static async getInitialProps({ query }) {
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/project/${query.id}`)
    let data = await res.json()
    console.log(data)
    return { project: data }
  }

  renderContent() {
    return { __html: this.props.project.content.rendered }
  }
  
  render() {
    return (
      <Layout pageName={this.props.project.title.rendered} title={this.props.project.title.rendered}>
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem><a href="/index">Home</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/projects">Projects</a></BreadcrumbItem>
                <BreadcrumbItem active>{this.props.project.title.rendered}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col dangerouslySetInnerHTML={this.renderContent()}>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}