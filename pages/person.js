import React, {Component} from 'react';
import fetch from "node-fetch";
import Layout from "../components/Layout";
import { Container, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import DynamicLink from "../components/DynamicLink";
export default class Person extends React.Component {
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
        <Container>
          <Row className='mb-5 mt-4 justify-content-center'>
            <Col md='8 d-flex flex-column align-items-center justify-content-center'>
              <img className="img-fluid" src={this.props.person.profile_image.guid}></img>
              <h4 className='mt-4 mb-3'>{this.props.person.member_title}</h4>
              {!!this.props.person.skills && 
                <p>{this.props.person.skills}</p>
              }
              {!!this.props.person.website && 
                <p><a href={this.props.person.website}>{this.props.person.website}</a></p>
              }
            </Col>
          </Row>
          <Row className='mb-5 justify-content-center'>
            <Col md='7' dangerouslySetInnerHTML={this.renderPost()}>
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