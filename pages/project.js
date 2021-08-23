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
            <Col xs='12' md='5' className='single-feature-img'>
              <img className='img-fluid' src={convertUrlToHttps( this.props.project.research_image.guid)}></img>
            </Col>
            <Col xs='12' md='7'>
              <div className='single-title'>
                {/* <ReactFitText compressor={0.6} maxFontSize={75}> */}
                  <h2 className='display-3'>{this.props.project.title.rendered}</h2>
                {/* </ReactFitText> */}
              </div>
            </Col>
          </Row> 

          <Row className='mb-1 single-information'>
            <Col xs='12'>
              <div>
                {!!this.props.project.research_type && 
                  <ul className='project-type-list'>
                    {this.props.project.research_type.map((type) => (
                      <li>
                        {/* <ReactFitText compressor={0.9} maxFontSize={55}> */}
                          <h4 className="display-5">{type}</h4>
                        {/* </ReactFitText> */}
                      </li>
                    ))}
                  </ul>
                }
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs='12'>
              <div>
                  <h5 className='display-5'>{
                    this.props.project.access_link && 
                    <a target='blank' href={this.props.project.access_link}>Project Link</a>
                  }</h5>
              </div>
            </Col>
          </Row>

          <Row className='mb-1 justify-content-center'>
            <Col xs='12' className='project-short-description text-center'>{this.props.project.short_description}
            </Col>
          </Row>
          
          <Row className='mb-5 justify-content-center'>
            <Col xs='12' className='post-content' dangerouslySetInnerHTML={this.renderContent()}>
            </Col>
          </Row>

          <Row className='mb-3 text-center'>
            <Col>
              <h2>People involved</h2>
            </Col>
          </Row>

          <Row className='justify-content-center text-center'>
            {this.props.project.lab_members.map((person) => (
              <Col sm='6' md='4' lg="4" className='mb-5 listing' >
                <DynamicLink actualRoute='person' displayRoute='people' slug={person.post_name}>
                  <div className='crop'>
                    <img className='img-fluid' src={convertUrlToHttps(person.profile_image.guid)}></img>
                  </div>
                  <h4>{person.post_title}</h4>
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