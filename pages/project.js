import React from "react";
import { Container, Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import fetch from "node-fetch";
import ReactFitText from "react-fittext";
import DynamicLink from "../components/DynamicLink";
import { convertUrlToHttps } from "../functions/functions";

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
    console.log(convertUrlToHttps)
    return (
      <Layout title={this.props.project.title.rendered}>
        <Container className='single-item'>
          <Row className='single-header align-items-end justify-content-center'>
            <Col md='5' className='single-feature-img'>
              <img className='img-fluid' src={convertUrlToHttps( this.props.project.research_image.guid)}></img>
            </Col>
            <Col md='7'>
              <div className='single-title'>
                <ReactFitText compressor={0.6} maxFontSize={75}>
                  <h1 className='display-3'>{this.props.project.title.rendered}</h1>
                </ReactFitText>
              </div>
            </Col>
          </Row> 

          <Row className='mb-5 single-information justify-content-center'>
            <Col md='4'>
              <div className='project-types'>
                {!!this.props.project.research_type && 
                  <ul className='project-type-list'>
                    {this.props.project.research_type.map((type) => (
                      <li>
                        <ReactFitText compressor={0.9} maxFontSize={55}>
                          <h2>{type}</h2>
                        </ReactFitText>
                      </li>
                    ))}
                  </ul>
                }
                {this.props.project.access_link && 
                <a href={this.props.project.access_link}>{this.props.project.access_link}</a>}
              </div>
            </Col>
            <Col md='7'>
              <p className='project-short-description'>{this.props.project.short_description}</p>
            </Col>
          </Row>
          
          <Row className='mb-5 justify-content-center'>
            <Col sm='7' className='post-content' dangerouslySetInnerHTML={this.renderContent()}>
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