import Layout from '../components/Layout';
import fetch from 'node-fetch';
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from '../components/DynamicLink';
import SiteNav from '../components/SiteNav';
import SectionTitle from '../components/SectionTitle';
import { convertUrlToHttps, formatDate } from '../functions/functions';

export default class Index extends Component {
  static async getInitialProps() {
    const res2 = await fetch(
      'https://dev.atec.io/wp-json/wp/v2/posts?per_page=6&_embed',
    );
    let posts = await res2.json();
    return { posts };
  }

  render() {
    return (
      <Layout title='ArtSciLab' pageName='ArtSciLab' isHome>
        <SiteNav className='home-nav' title={this.props.title}></SiteNav>

        <Container fluid>
          <Row className='home-header'>
            <Col className='home-left'>
              <h3 className='site-title'>Connecting Arts and Sciences</h3>
              <p className='site-lead'>
                Collaboration between the arts and sciences has the potential to
                create new knowledge, ideas, and processes beneficial to many
                disciplines. We work on initiatives that could not be
                accomplished without the collaboration of artist, designers, and
                scientists.
              </p>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className='mt-3 justify-content-center text-center'>
            <Col
              xs='12'
              md='8'
              className='home-listing justify-content-center bg-light text-center border border-dark rounded mt-2'>
              <button className='btn btn-secondary p-2 m-2'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white'
                  href='https://teams.microsoft.com/l/meetup-join/19%3ameeting_OGM4ZGU4MWMtNGQ5Ni00MGNjLThkNGYtY2U3YTQ0NzY3Yzdl%40thread.v2/0?context=%7b%22Tid%22%3a%228d281d1d-9c4d-4bf7-b16e-032d15de9f6c%22%2c%22Oid%22%3a%222ae11b39-3496-4450-94f6-444ace251d9b%22%7d'>
                  Join Watering Hole
                </a>
              </button>
              <img
                src='/static/Watering_Hole_10Feb.png'
                alt='Watering Hole Announcement'
                className='my-2 border rounded'
              />
            </Col>
            {/* <Col
              xs='12'
              md='12'
              className='home-listing justify-content-center bg-light text-center'>
              <img
                src='/static/crier_new.png'
                alt='Watering Hole Announcement'
                className='my-2'
              />
            </Col> */}
          </Row>
          <SectionTitle text='News and Events'></SectionTitle>
          <Row className='mb-3 justify-content-center'>
            {this.props.posts.map((post) => {
              let excerpt = '';

              if (post.excerpt.rendered.length > 125) {
                excerpt = post.excerpt.rendered.substring(0, 125) + ' ...';
              } else {
                excerpt = post.excerpt.rendered;
              }

              return (
                <Col
                  key={post.id}
                  xs='12'
                  sm='10'
                  md='6'
                  lg='4'
                  className='listing home-listing'>
                  <div className='postDiv'>
                    {post._embedded &&
                      post._embedded['wp:featuredmedia'] &&
                      post._embedded['wp:featuredmedia'][0] &&
                      post._embedded['wp:featuredmedia'][0].media_details &&
                      post._embedded['wp:featuredmedia'][0].media_details
                        .sizes &&
                      post._embedded['wp:featuredmedia'][0].media_details.sizes
                        .medium && (
                        <div className='crop'>
                          <DynamicLink
                            actualRoute='post'
                            displayRoute='blog'
                            slug={post.slug}>
                            <img
                              src={convertUrlToHttps(
                                post._embedded['wp:featuredmedia'][0]
                                  .media_details.sizes.medium.source_url,
                              )}></img>
                          </DynamicLink>
                        </div>
                      )}

                    <DynamicLink
                      actualRoute='post'
                      displayRoute='blog'
                      slug={post.slug}>
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}></h4>
                    </DynamicLink>

                    {post.excerpt && (
                      <div
                        className='excerpt'
                        dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                    )}

                    {/* <DynamicLink actualRoute='post' displayRoute='blog' slug={post.slug} >
                      <button>Read More ></button>
                    </DynamicLink> */}

                    <div className='date'>
                      <p>{formatDate(new Date(post.date))}</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Layout>
    );
  }
}
