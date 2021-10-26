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
          <Row className='mt-3 justify-content-center text-center'>
            <Col xs='12' className='home-listing justify-content-center text-center'>
              <video autoplay="true" muted="true" width="500" loop="true">
                <source src="/static/Diwali21.mp4" type="video/mp4"/>
                Sorry, your browser doesn't support embedded videos.
              </video>
            </Col>
            <Col xs='12' md='8'  className='d-none home-listing justify-content-center bg-light text-center border border-dark rounded'>
              <p className="text-center">This week in <b>Our Art Science Experimental Seminars</b></p>
              <h4 className="text-center text-success">Why Infiltration Can be a Good Thing in and Beyond ATEC?</h4>
              <br/>
              <p className="text-center">Coordinated by: Caroline Trotter, ATEC MFA</p>
              <p className="text-center"> October 14, 2021, 5:00 PM - 6:30 PM CST</p>
              <p className="text-center"> ATC 2.918 or <a href="https://teams.microsoft.com/l/team/19%3aTKiW5TEV6idTk3snEnmmgxLaTBGU7MvcExQzhxheVI81%40thread.tacv2/conversations?groupId=2a3cc081-bd85-4ab8-bc79-a573fc2a067a&tenantId=8d281d1d-9c4d-4bf7-b16e-032d15de9f6c">MS Teams</a></p>
              <br/>
              {/* style={{backgroundImage: `url('/static/thumbnail_WH.jpg')`}} */}
              <p style={{backgroundImage: `url('/static/thumbnail_WH.jpg')`}}>
                <p className="text-left text-white" style={{padding: "10px"}}>
                      <span style={{backgroundColor: "green"}}><span style={{fontWeight: "bold"}}>INFILTRATION</span> is generally a negative concept, but perhaps in the right context, we could bring in some positive connotation.  </span>
                      <br/><br/>

                      <span style={{backgroundColor: "green"}}>This is an open call to animals from every discipline or place to join us on campus or on MSTeams at 5pm Thursday, Oct 14, 2021 for a session on infiltration. Any Gamers want to game? Any Animators want to animate? Here’s the space for you!  </span>
                      <br/><br/>

                      <span style={{backgroundColor: "green"}}>To present at the upcoming Watering Hole, kindly get in touch with the ArtSciLab Experimental Publisher, Swati Anwesha (swati@utdallas.edu).  </span>
                      <br/><br/>

                      <span style={{backgroundColor: "green"}}>Prof. Lindsay and Mike Kesden, UTD Physicists, plan on infiltrating our seminar as well with Gaming Applied to Physics. </span>
                      <br/><br/>

                      <span style={{fontWeight: "bold", backgroundColor: "green"}} className="text-center justify-content-center">Definition of infiltrate</span><br/> 
                      <span style={{backgroundColor: "green"}}>(transitive verb)</span><br/> <br/>
                      <span style={{backgroundColor: "green"}}>1. to enter or become established in gradually or unobtrusively usually for subversive purposes the intelligence staff had been infiltrated by spies.</span><br/>
                      <span style={{backgroundColor: "green"}}>2. to pass (troops) singly or in small groups through gaps in the enemy line.</span><br/>
                      <span style={{backgroundColor: "green"}}>3. to pass into or through (a substance) by filtering or permeating.</span><br/>
                      <span style={{backgroundColor: "green"}}>4. to cause (something, such as a liquid) to permeate something by penetrating its pores or interstices.</span><br/><br/>
                </p>
                <p className="text-center text-white" style={{fontSize: "20px"}}>
                <span style={{backgroundColor: "green"}}>We Hope To See You Soon!</span> <br/><br/>  
                </p>
              </p>
              {/* <p className="text-center" style={{fontSize: "15px"}}> If you would like to present at our future sessions,<br/> please contact Swati Anwesha, the ArtSciLab Experimental Publisher at <a href="mailto: swati@utdallas.edu">swati@utdallas.edu</a></p> */}
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
