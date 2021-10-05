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
            <Col xs='12' md='8'  className='home-listing justify-content-center bg-light text-center border border-dark rounded'>
              <p className="text-center">This week in <b>Our Art Science Experimental Seminars</b></p>
              <h3 className="text-center text-success">Can Addictions be good for you?</h3>
              <br/>
              <p className="text-center"> October 07, 2021 - 5:00 PM CST</p>
              <p className="text-center"> ATC 2.918 or <a href="https://teams.microsoft.com/l/team/19%3aTKiW5TEV6idTk3snEnmmgxLaTBGU7MvcExQzhxheVI81%40thread.tacv2/conversations?groupId=2a3cc081-bd85-4ab8-bc79-a573fc2a067a&tenantId=8d281d1d-9c4d-4bf7-b16e-032d15de9f6c">MS Teams</a></p>
              <br/>
              {/* <h5 className="text-center">Dr. Celia Matsunaga</h5> */}
              <p className="text-center">
                <ul style={{listStyleType: "none", fontSize: "15px"}}>
                  <li><a href="https://utdmercury.com/students-police-learn-use-life-saving-drug/" style={{fontWeight: "bold"}}>The Centre for Students in Recovery Group</a> at UTD will be presenting on types of addictions, methods of recovery and its effect on one’s mental health at the upcoming session.</li>
                  <hr/>
                  <li><span style={{fontWeight: "bold"}}>Prof. Roger Malina</span> will present the work of <span style={{fontWeight: "bold"}}>Bonnie Pitman</span> with her project <a href="http://www.dosomethingnew.org/about" style={{fontWeight: "bold"}}>Do Something New</a>. The project explains why some habits are desirable, and how to break an undesirable habit.</li>
                  <hr/>
                  <li>We will also be discussing the festivals of <span style={{fontWeight: "bold"}}>Deepavali</span> and <span style={{fontWeight: "bold"}}>Dusshera</span> and ways in which repetitive behaviors can be good.</li>
                </ul>
              </p>
              <p className="text-center text-secondary" style={{fontSize: "14px"}}> If you would like to present at our future sessions,<br/> please contact Swati Anwesha, the ArtSciLab Experimental Publisher at <a href="mailto: swati@utdallas.edu">swati@utdallas.edu</a></p>
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
