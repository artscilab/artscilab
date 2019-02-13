import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


export default class People extends Component {
  static async getInitialProps() {
    const res2 = await fetch('https://dev.atec.io/wp-json/wp/v2/lab_member')
    let members = await res2.json()
    return { members }
  }

  render() {
    return (
      <Layout title="People" pageName="People">
        <Container>
          <Row>
            {this.props.members.map((person) => (
              <Col sm='3'>
                <h2>{person.title.rendered}</h2>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}
