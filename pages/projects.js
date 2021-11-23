import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";
import { convertUrlToHttps } from "../functions/functions";

export default class Projects extends Component {
  static async getInitialProps() {
    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/project?per_page=99')
    let projects = await res2.json()
    return { projects }
  }

  render() {
    return (
      <Layout title="Projects" pageName="Projects">
        <Container>
          <Row className='justify-content-center mb-5'>
          {this.props.projects.map((project, i) => (
            <Col xs='12' sm='6' md='4' lg='3' className='mb-5 listing text-center'>
              <div>
                <DynamicLink actualRoute='project' displayRoute='projects' slug={project.slug}>
                  <div>
                  <img className='img-fluid' style={{borderRadius: 20 + 'px'}} src={convertUrlToHttps(project.research_image.guid)}></img>
                  </div>
                  <h4>{project.title.rendered}</h4>
                </DynamicLink>
              </div>
            </Col>
          ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
