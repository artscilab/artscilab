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

            <Col xs='12' sm='12' md='5' className='single-feature-img'>
              <img className='img-fluid' src={convertUrlToHttps(this.props.person.profile_image.guid)}></img>
            </Col>

            <Col xs='12' sm='12' md='7'>
              <div>
                <ReactFitText compressor={0.6} maxFontSize={50}>
                  <h3 className='display-3'>{this.props.person.title.rendered}</h3>
                </ReactFitText>
              </div>
            </Col>

          </Row>

          <Row className='pt-5'>
            <Col xs='12'>
              <div>
                {/* <ReactFitText compressor={0.9} maxFontSize={20}> */}
                  <h4 className='display-5'>{this.props.person.member_title}</h4>
                {/* </ReactFitText> */}
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs='12'>
              <div>
                  <h5 className='display-5'>{
                    this.props.person.website && 
                    <a target='blank' href={this.props.person.website}>{this.props.person.website}</a>
                  }</h5>
              </div>
            </Col>
          </Row>

          <Row className='pt-4 align-items-baseline justify-content-center'>
            <Col className='person-bio-container' xs='12' dangerouslySetInnerHTML={this.renderPost()}>
            </Col>
          </Row>

          <h4 className='pb-4'>Current Projects</h4>

          {this.props.person.project_involved.length > 0 &&
            <Row className='justify-content-center'>
            {this.props.person.project_involved.map((project, i) => (
              <Col xs='6' sm='6' md='4' lg='2' className='listing project-listing text-center'>
                <DynamicLink actualRoute='project' displayRoute='projects' slug={project.post_name}>
                  <img className='img-thumbnail border' src={convertUrlToHttps(project.research_image.guid)}></img>
                  <h6>{project.post_title}</h6>
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