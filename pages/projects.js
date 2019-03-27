import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";

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
            <Col sm='6' className='listing project-listing text-center'>
              <DynamicLink actualRoute='project' displayRoute='projects' slug={project.slug}>
                <img className='img-fluid mb-2' src={project.research_image.guid}></img>
                <h2>{project.title.rendered}</h2>
              </DynamicLink>
            </Col>
          ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
