import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";

export default class Index extends Component {
  static async getInitialProps() {
    const res = await fetch('https://dev.atec.io/wp-json/wp/v2/project?per_page=4')
    let projects = await res.json()

    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/posts?per_page=4')
    let posts = await res2.json()
    return { projects, posts }
  }

  render() {
    return (
      <Layout title="ArtSciLab" pageName="ArtSciLab" isHome={true}>
        <Container>
          <Row>
            <Col>
              <p className='lead'>This is a blurb about ArtSciLab</p>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <h2>Recent Projects</h2>
            </Col>
          </Row>
          <Row className='mb-3'>
            {this.props.projects.map((project) => (
              <Col sm='3'>
                <DynamicLink actualRoute='project' displayRoute='projects' id={project.id} >
                    <h2>{project.title.rendered}</h2>
                </DynamicLink>
              </Col>
            ))}
          </Row>
          <Row className='mt-5'>
            <Col>
              <h2>Recent Posts</h2>
            </Col>
          </Row>
          <Row className='mb-3'>
            {this.props.posts.map((post) => (
              <Col sm='3'>
                <DynamicLink actualRoute='post' displayRoute='posts' id={post.id} >
                  <h2>{post.title.rendered}</h2>
                </DynamicLink>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
