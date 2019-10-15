import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";
import SiteNav from '../components/SiteNav';
import SectionTitle from "../components/SectionTitle";
import { convertUrlToHttps } from "../functions/functions";

export default class Index extends Component {
  static async getInitialProps() {
    const res = await fetch('https://dev.atec.io/wp-json/wp/v2/project?per_page=4')
    let projects = await res.json()

    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/posts?per_page=6')
    let posts = await res2.json()
    return { projects, posts }
  }

  render() {
    return (
      <Layout title="ArtSciLab" pageName="ArtSciLab" isHome>
        <SiteNav className="home-nav" title={this.props.title}></SiteNav>
        
        <Container fluid>
          <Row className='home-header'>
            <Col className='home-left'>
              <h3 className="site-title">Connecting Arts and Sciences</h3>
              <p className="site-lead">Collaboration between the arts and sciences has the potential to create new knowledge, ideas, and processes beneficial to many disciplines. We work on initiatives that could not be accomplished without the collaboration of artist, designers, and scientists.</p>
            </Col>
          </Row>
        </Container>

        <Container>
          <SectionTitle text="Recent Projects"></SectionTitle>
          <Row>
            {this.props.projects.map((project) => (
              <Col sm='4' className='listing'>
                <DynamicLink 
                  actualRoute='project' 
                  displayRoute='projects' 
                  slug={project.slug}>
                    {console.log(project)}
                    {project.research_image && <div className='crop'>
                      <img src={convertUrlToHttps(project.research_image.guid)}></img>
                    </div>}
                    <h3 dangerouslySetInnerHTML={{__html: project.title.rendered}}></h3>
                </DynamicLink>
              </Col>
            ))}
          </Row>

          <SectionTitle text="News and Events"></SectionTitle>
          <Row className='mb-3 justify-content-center'>
            {this.props.posts.map((post) => (
              <Col sm='4' className='listing'>
                <DynamicLink actualRoute='post' displayRoute='posts' slug={post.slug} >
                  <h3 dangerouslySetInnerHTML={{__html: post.title.rendered}}></h3>
                </DynamicLink>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
