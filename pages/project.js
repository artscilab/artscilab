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
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/project?slug=${query.slug}`)
    let data = await res.json()
    return { project: data[0] }
  }

  renderContent() {
    return { __html: this.props.project.content.rendered }
  }
  
  render() {
    return (
      <Layout pageName={this.props.project.title.rendered} title={this.props.project.title.rendered}>
        <Container>
          <BreadcrumbRow parentHref='/projects' parentText="Projects" activeText={this.props.project.title.rendered}></BreadcrumbRow>
          <Row className='mb-3 text-center align-items-center justify-content-center'>
            <Col sm='8'>
              <img className='img-fluid mb-2' src={this.props.project.research_image.guid}></img>
            </Col>
          </Row>
          <Row className='mb-5 justify-content-center'>
            <Col sm='8' className='post-content' dangerouslySetInnerHTML={this.renderContent()}>
            </Col>
          </Row>
          <Row className='mb-3 text-center'>
            <Col>
              <h2>People involved</h2>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            {this.props.project.lab_members.map((person) => (
              <Col sm='3' className='mb-5 listing' >
                <DynamicLink actualRoute='person' displayRoute='people' slug={person.post_name}>
                  <div className='crop'>
                    <img className='img-fluid' src={person.profile_image.guid}></img>
                  </div>
                  <h2>{person.post_title}</h2>
                  {person.member_title && <p>{person.member_title}</p> }
                </DynamicLink>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}