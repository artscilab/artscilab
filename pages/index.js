import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";
import SiteNav from '../components/SiteNav';
import SectionTitle from "../components/SectionTitle";
import { convertUrlToHttps, formatDate } from "../functions/functions";

export default class Index extends Component {
  static async getInitialProps() {
    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/posts?per_page=6&_embed')
    let posts = await res2.json()
    return { posts }
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
          <Row className='mt-3 justify-content-center border border-dark rounded text-center'>
            <Col xs='12' className='home-listing justify-content-center bg-light text-center'>
              <p className="text-center">This week in <b>Our Art Science Experimental Seminars</b></p>
              <h4 className="text-center">Visualization & Typography</h4>
              <h5 className="text-center">Dr. Celia Matsunaga</h5>
              <p className="text-center">
                <ul style={{listStyleType: "none", fontSize: "14px"}}>
                  <li>Professor at the University of Brasilia, Faculty of Communication</li>
                  <li>Post Doctorate at Royal College of Art ( London, UK 2019)</li>
                  {/* <li>Post Doctorate APECV - Association of Teachers of Expression and Visual Communication, Lisbon - Portugal 2019.</li>
                  <li>Ph.D. in Arts from the Institute of the Arts / University of Brasilia</li> */}
                </ul>
              </p>
              <p className="text-center" style={{fontSize: "18px"}}>Dicussion about <span className="text-primary">semiotics</span>, <span className="text-success">electronic art</span>, <span className="text-danger">education</span>, <span className="text-warning">typography</span>, <span className="text-info">visualization</span> and much more!</p>
              <p className="text-center"> September 30, 2021 - 5:30 PM - 7:00 CDT</p>
              <p className="text-center"> ATC 2.918 or <a href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_OGM4ZGU4MWMtNGQ5Ni00MGNjLThkNGYtY2U3YTQ0NzY3Yzdl%40thread.v2/0?context=%7b%22Tid%22%3a%228d281d1d-9c4d-4bf7-b16e-032d15de9f6c%22%2c%22Oid%22%3a%222ae11b39-3496-4450-94f6-444ace251d9b%22%7d">MS Teams</a></p>
            </Col>
          </Row>
          <SectionTitle text="News and Events"></SectionTitle>
          <Row className='mb-3 justify-content-center'>
            {this.props.posts.map((post) => {
              let excerpt = "";

              if (post.excerpt.rendered.length > 125) {
                excerpt = post.excerpt.rendered.substring(0, 125) + ' ...'
              } else {
                excerpt = post.excerpt.rendered
              }
              
              return (
                <Col key={post.id} xs='12' sm='10' md='6' lg='4' className='listing home-listing'>
                  <div className="postDiv">
                    {post._embedded &&
                      post._embedded['wp:featuredmedia'] && 
                      post._embedded['wp:featuredmedia'][0] && 
                      post._embedded['wp:featuredmedia'][0].media_details && 
                      post._embedded['wp:featuredmedia'][0].media_details.sizes && 
                      post._embedded['wp:featuredmedia'][0].media_details.sizes.medium && 
                      <div className='crop'>
                        <DynamicLink actualRoute='post' displayRoute='blog' slug={post.slug} >
                          <img src={convertUrlToHttps(post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)}></img>
                        </DynamicLink>
                      </div>
                    }

                    <DynamicLink actualRoute='post' displayRoute='blog' slug={post.slug} >
                      <h3 dangerouslySetInnerHTML={{__html: post.title.rendered}}></h3>
                    </DynamicLink>
                  
                    {post.excerpt &&
                      <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}}></div>
                    }
                    
                    {/* <DynamicLink actualRoute='post' displayRoute='blog' slug={post.slug} >
                      <button>Read More ></button>
                    </DynamicLink> */}
                    
                    <div className="date">
                      <p>{formatDate(new Date(post.date))}</p>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>
      </Layout>
    )
  }
}
