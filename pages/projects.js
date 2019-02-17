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
          <Row>
            {this.props.projects.map((project) => (
              <Col sm='3'>
                <DynamicLink actualRoute='project' displayRoute='projects' id={project.id}>
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
