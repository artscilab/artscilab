import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";

export default class Blog extends Component {
  static async getInitialProps() {
    const res = await fetch('https://dev.atec.io/wp-json/wp/v2/posts?per_page=99&_embed')
    let posts = await res.json()
    
    return { posts }
  }

  render() {
    return (
      <Layout title="Blog" pageName="Blog">
        <Container>
          {this.props.posts.map((post) => (
            <Row className='justify-content-center mt-5'>
                <Col sm='8 text-center'>
                  <DynamicLink actualRoute='post' displayRoute='blog' id={post.id}>
                  {(post.hasOwnProperty('_embedded')) && (post._embedded.hasOwnProperty('wp:featuredmedia')) && post._embedded['wp:featuredmedia'][0].hasOwnProperty('id') &&
                    <img className='img-fluid mb-2' src={post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}></img>
                    }
                    <h2>{post.title.rendered}</h2>
                  </DynamicLink>
                </Col>
            </Row>
          ))}
        </Container>
      </Layout>
    )
  }
}
