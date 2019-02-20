import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DynamicLink from "../components/DynamicLink";


export default class People extends Component {
  static async getInitialProps() {
    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/lab_member?per_page=99')
    let members = await res2.json()
    return { members }
  }

  render() {
    return (
      <Layout title="People" pageName="People">
        <Container>
          <Row className='justify-content-center'>
            {this.props.members.map((person) => (
              <Col sm='3' className='mb-5'>
                <DynamicLink actualRoute='person' displayRoute='people' id={person.id}>
                  <img className='img-fluid' src={person.profile_image.guid}></img>
                  <h2>{person.title.rendered}</h2>
                </DynamicLink>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
