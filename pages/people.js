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
    return { members }
  }
  render() {
    return (
      <Layout title="People" pageName="People">
        <Container>
          <Row className='justify-content-center'>
            {this.props.members.map((person) => (
              <Col md='3' className='mb-5 listing' >
                <DynamicLink actualRoute='person' displayRoute='people' slug={person.slug}>
                  <div className='crop'>
                    <img className='img-fluid' src={convertUrlToHttps(person.profile_image.guid)}></img>
                  </div>
                  <h2>{person.title.rendered}</h2>
                  {person.member_title && <p>{person.member_title}</p> }
                </DynamicLink>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
