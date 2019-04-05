import React from "react";
import { Container, Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import fetch from "node-fetch";
import ReactFitText from "react-fittext";
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
        <Container className='project-container'>
          <Row className='justify-content-center'>
            <Col sm='8' className='project-title text-center'>
              <ReactFitText compressor={0.6} maxFontSize={85}>
                <h1 className='display-2'>{this.props.project.title.rendered}</h1>
              </ReactFitText>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className='justify-content-center'>
            <Col sm='10' className='project-feature-image-container'>
              <img className='project-feature-image img-fluid mb-2' src={this.props.project.research_image.guid}></img>
            </Col>
          </Row>
        </Container>
        <Container className='project-content'>
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