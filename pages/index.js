import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";

export default class Index extends Component {
  static async getInitialProps() {
    const res = await fetch('https://dev.atec.io/wp-json/wp/v2/project?per_page=4')
    let projects = await res.json()
    return { projects }
  }

  render() {
    return (
      <Layout title="ArtSciLab" pageName="ArtSciLab" isHome={true}>
        <Container>
          <Row>
            <p className='lead'>This is a blurb about ArtSciLab</p>
          </Row>
          <Row>
            <h2>Recent Projects</h2>
          </Row>
          <Row>
            {this.props.projects.map((project) => (
              <Col sm='3'>
                <DynamicLink actualRoute='project' displayRoute='projects' id={project.id} >
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
