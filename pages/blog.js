import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";

export default class Blog extends Component {
  static async getInitialProps() {
    let numInResponse = 99;
    let posts = [];
    let offset = 0;
    while (!(numInResponse < 99)) {
      const res = await fetch(`https://dev.atec.io/wp-json/wp/v2/posts?per_page=99&_embed&offset=${offset}`)
      let currentPosts = await res.json();
      posts = posts.concat(currentPosts);
      numInResponse = currentPosts.length;
      offset += currentPosts.length;
    }
    
    return { posts }
  }

  render() {
    return (
      <Layout title="Blog" pageName="Blog">
        <Container>
          {this.props.posts.map((post) => (
            <Row className='blog-post justify-content-center mt-5'>
                <Col sm='8 text-center'>
                  <DynamicLink actualRoute='post' displayRoute='blog' slug={post.slug}>
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
