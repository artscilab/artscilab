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
          {this.props.projects.map((project) => (
            <Row className='justify-content-center mb-5'>
                <Col sm='8'>
                  <DynamicLink actualRoute='project' displayRoute='projects' id={project.id}>
                    <img className='img-fluid mb-2' src={project.research_image.guid}></img>
                    <h2>{project.title.rendered}</h2>
                  </DynamicLink>
                </Col>
            </Row>
          ))}
        </Container>
      </Layout>
    )
  }
}
