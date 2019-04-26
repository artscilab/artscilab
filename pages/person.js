import React, {Component} from 'react';
import fetch from "node-fetch";
import Layout from "../components/Layout";
import { Container, Col, Row } from "reactstrap";
import DynamicLink from "../components/DynamicLink";
import ReactFitText from "react-fittext";
import { convertUrlToHttps } from '../functions/functions';

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
      <Layout title={this.props.person.title.rendered}>
        <Container className='single-item'>
          <Row className='single-header align-items-end justify-content-center'>
            <Col md='5' className='single-feature-img'>
              <img className='img-fluid' src={convertUrlToHttps(this.props.person.profile_image.guid)}></img>
            </Col>
            <Col md='7'>
              <div className='single-title'>
                <ReactFitText compressor={0.6} maxFontSize={75}>
                  <h1 className='display-3'>{this.props.person.title.rendered}</h1>
                </ReactFitText>
              </div>
            </Col>
          </Row> 
          <Row className='single-information align-items-baseline justify-content-center'>
            <Col md='4'>
              <div className='person-job-title'>
                <ReactFitText compressor={0.9} maxFontSize={55}>
                  <h2>{this.props.person.member_title}</h2>
                </ReactFitText>
                {this.props.person.website && 
                <a target='blank' href={this.props.person.website}>{this.props.person.website}</a>}
              </div>
            </Col>
            <Col className='person-bio-container' md='7' dangerouslySetInnerHTML={this.renderPost()}>
            </Col>
          </Row>
          {this.props.person.project_involved.length > 0 &&
            <Row className='person-projects justify-content-center'>
            {this.props.person.project_involved.map((project, i) => (
              <Col sm='3' className='listing project-listing text-center'>
                <DynamicLink actualRoute='project' displayRoute='projects' slug={project.post_name}>
                  <img className='img-fluid' src={project.research_image.guid}></img>
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