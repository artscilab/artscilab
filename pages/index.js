import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";
import SiteNav from '../components/SiteNav';

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
      <Layout title="ArtSciLab" pageName="ArtSciLab" isHome>
        <Container fluid>
          <Row className='home-header'>
            <Col md='6' className='home-left'>
              <h1 className='site-title'>ART<br></br>SCI<br></br>LAB</h1>
              <p className='site-lead'>The ArtSciLab is a transdisciplinary research lab that carries out national and international investigations on <span className='data-vis'>data visualization,</span> <span className='experimental-publishing'>experimental publishing</span> and the <span className='hybridization'>hybridization of art and science</span></p>
            </Col>
            <Col md='6' className='home-right'>
              <div className='intro'>
                <h2>ART and SCIENCE</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..</p>
              </div>
              <div className='intro-bg'></div>
            </Col>
          </Row>
        </Container>
        <Container>
          <SiteNav title={this.props.title}></SiteNav>
          <Row className='mt-5 mb-3'>
            <Col>
              <h2>Recent Projects</h2>
              <hr></hr>
            </Col>
          </Row>
          <Row className='mb-3'>
            {this.props.projects.map((project) => (
              <Col sm='3' className='listing'>
                <DynamicLink actualRoute='project' displayRoute='projects' slug={project.slug}>
                  {project.research_image && <div className='crop'>
                    <img src={project.research_image.guid}></img>
                  </div>}
                  <h2>{project.title.rendered}</h2>
                </DynamicLink>
              </Col>
            ))}
          </Row>
          <Row className='mt-5 mb-3'>
            <Col>
              <h2>Recent Posts</h2>
              <hr></hr>
            </Col>
          </Row>
          <Row className='mb-3'>
            {this.props.posts.map((post) => (
              <Col sm='3' className='listing'>
                <DynamicLink actualRoute='post' displayRoute='posts' slug={post.slug} >
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
