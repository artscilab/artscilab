import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";
import { convertUrlToHttps } from "../functions/functions";

export default class People extends Component {
  static async getInitialProps() {
    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/lab_member?per_page=99&orderby=title&order=asc')
    let members = await res2.json()
    let activeMembers = members.filter(member => member.skills !== '');
    //console.log(activeMembers);
    for(var i = 0; i < activeMembers.length; i++){
      activeMembers[i].skills = parseInt(activeMembers[i].skills);
   }
    activeMembers.sort((a, b) => parseFloat(a.skills) - parseFloat(b.skills));
    let inactiveMembers = members.filter(member => member.skills === '');
    return { members,activeMembers,inactiveMembers }
  }


  render() {

    return (
      <Layout title="People" pageName="Lab Members">
        <Container>
        <center><h2>Active Members</h2></center>
          <Row className='justify-content-center mb-5'>
            {this.props.activeMembers.map((person) => (
              <Col xs='12' sm='6' md='4' lg='3' className='mb-5 listing' key={person.id}>
                <DynamicLink actualRoute='person' displayRoute='people' slug={person.slug}>
                  
                  <div className='crop'>
                    <img className='img-fluid' src={convertUrlToHttps(person.profile_image.guid)}></img>
                  </div>
                  <h4 className='text-center'>{person.title.rendered}</h4>
                  {person.member_title && <p className='text-center'>{person.member_title}</p> }
                </DynamicLink>
              </Col>
              
            ))}
          </Row>
          <center><h2>Previous Members</h2></center>
          <Row className='justify-content-center mb-5'>
            {this.props.inactiveMembers.map((person) => (
              
              //console.log(person.skills),
              <Col xs='12' sm='6' md='4' lg='3' className='mb-5 listing' key={person.id}>
                <DynamicLink actualRoute='person' displayRoute='people' slug={person.slug}>
                  
                  <div className='crop'>
                    <img className='img-fluid' src={convertUrlToHttps(person.profile_image.guid)}></img>
                  </div>
                  <h4 className='text-center'>{person.title.rendered}</h4>
                  {person.member_title && <p className='text-center'>{person.member_title}</p> }
                </DynamicLink>
              </Col>
              
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
