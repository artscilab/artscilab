import React, {Component} from 'react';
import fetch from "node-fetch";
import Layout from "../components/Layout";
import { Container, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import DynamicLink from "../components/DynamicLink";

export default class Person extends Component {
  constructor(props) {
    super(props)
    this.renderPost = this.renderPost.bind(this)
  }

  static async getInitialProps({ query }) {
    const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/lab_member?slug=${query.slug}`)
    let data = await res.json()
    return { person: data[0] }
  }

  renderPost() {
    return { __html: this.props.person.content.rendered }
  }

  render() {
    return(
      <Layout pageName={this.props.person.title.rendered} title={this.props.person.title.rendered}>
        <Container className='person-single'>
          <Row className='person-header align-items-end justify-content-center'>
            <Col md='5'>
              <img className='img-fluid' src={this.props.person.profile_image.guid}></img>
            </Col>
            <Col md='6'>
              <div className='person-name'>
                <h1 className='display-3'>{this.props.person.title.rendered}</h1>
              </div>
            </Col>
          </Row> 
          <Row className='person-info align-items-baseline justify-content-center'>
            <Col md='4'>
              <h2 className='person-job-title'>{this.props.person.member_title}</h2>
            </Col>
            <Col className='person-bio-container' md='7' dangerouslySetInnerHTML={this.renderPost()}>
            </Col>
          </Row>
          {this.props.person.project_involved.length > 0 &&
            <Row className='person-projects justify-content-center'>
            {this.props.person.project_involved.map((project, i) => (
              <Col sm='3' className='project-listing text-center'>
                <DynamicLink actualRoute='project' displayRoute='projects' slug={project.post_name}>
                  <img className='img-fluid mb-2' src={project.research_image.guid}></img>
                  <h2>{project.post_title}</h2>
                </DynamicLink>
              </Col>
            ))}
            </Row>
          }
        </Container>
      </Layout>
    )
  }
}