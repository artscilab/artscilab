import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";

export default class Blog extends Component {
  static async getInitialProps() {
    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/posts?per_page=99')
    let posts = await res2.json()
    return { posts }
  }

  render() {
    return (
      <Layout title="People" pageName="People">
        <Container>
          <Row>
            {this.props.posts.map((post) => (
              <Col sm='3'>
                <DynamicLink actualRoute='post' displayRoute='blog' id={post.id}>
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
