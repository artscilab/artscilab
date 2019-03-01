import React from "react";
import { Container, Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import fetch from "node-fetch";
import BreadcrumbRow from "../components/Breadcrumb";
import DynamicLink from "../components/DynamicLink";

export default class Project extends React.Component {
  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }
  
  static async getInitialProps({ query }) {
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/project/${query.id}`)
    let data = await res.json()
    return { project: data }
  }

  renderContent() {
    return { __html: this.props.project.content.rendered }
  }
  
  render() {
    return (
      <Layout pageName={this.props.project.title.rendered} title={this.props.project.title.rendered}>
        <Container>
          <BreadcrumbRow parentHref='/projects' parentText="Projects" activeText={this.props.project.title.rendered}></BreadcrumbRow>
          <Row className='mb-5'>
            <Col dangerouslySetInnerHTML={this.renderContent()}>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <h2>People involved</h2>
            </Col>
          </Row>
          <Row>
            {this.props.project.lab_members.map((person) => (
              <Col sm='3' className='mb-5'>
                <DynamicLink actualRoute='person' displayRoute='people' id={person.id}>
                  <img className='img-fluid' src={person.profile_image.guid}></img>
                  <h2>{person.post_title}</h2>
                </DynamicLink>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}