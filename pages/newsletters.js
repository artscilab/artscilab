import Layout from '../components/Layout';
import fetch from 'node-fetch';
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from '../components/DynamicLink';
import { convertUrlToHttps } from '../functions/functions';

export default class Blog extends Component {
  static async getInitialProps() {
    let numInResponse = 99;
    let posts = [];
    let offset = 0;
    while (!(numInResponse < 99)) {
      const res = await fetch(
        `https://dev.atec.io/wp-json/wp/v2/posts?per_page=99&_embed&offset=${offset}`,
      );
      let currentPosts = await res.json();
      posts = posts.concat(currentPosts);
      numInResponse = currentPosts.length;
      offset += currentPosts.length;
    }
    posts.map((post) => {
      let date = new Date(Date.parse(post.date));
      let date_display_str =
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
      post.date = date_display_str;
      return post;
    });
    return { posts };
  }

  render() {
    return (
      <Layout title='Newsletters' pageName='Newsletters'>
        <Container>
          <Row className='justify-content-center mt-5'>
            {this.props.posts.map((post, i) => {
              let excerpt = '';

              if (post.excerpt.rendered.length > 125) {
                excerpt = post.excerpt.rendered.substring(0, 125) + ' ...';
              } else {
                excerpt = post.excerpt.rendered;
              }

              return post.categories.indexOf(207) !== -1 ? (
                <>
                  <Col
                    key={i}
                    xs='12'
                    md='6'
                    className='listing text-center border p-2'>
                    <DynamicLink
                      actualRoute='post'
                      displayRoute='blog'
                      slug={post.slug}>
                      <div className='maxCrop'>
                        {post.hasOwnProperty('_embedded') &&
                        post._embedded.hasOwnProperty('wp:featuredmedia') &&
                        post._embedded['wp:featuredmedia'][0].hasOwnProperty(
                          'id',
                        ) ? (
                          <img
                            className=''
                            src={convertUrlToHttps(
                              post._embedded['wp:featuredmedia'][0]
                                .media_details.sizes.full.source_url,
                            )}></img>
                        ) : (
                          <img className='img-fluid' src=''></img>
                        )}
                      </div>
                      <h5 className='listing-title py-2'>
                        {post.title.rendered}
                      </h5>
                    </DynamicLink>
                  </Col>
                  {/* <Col key={i} xs='8' className='listing'>
                    <DynamicLink
                      actualRoute='post'
                      displayRoute='blog'
                      slug={post.slug}>
                      <h3 className='listing-title'>{post.title.rendered}</h3>
                      <p>{post.date}</p>
                      {post.excerpt && (
                        <div
                          className='excerpt'
                          dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                      )}
                    </DynamicLink>
                  </Col> */}
                </>
              ) : (
                <></>
              );
            })}
          </Row>
        </Container>
      </Layout>
    );
  }
}
