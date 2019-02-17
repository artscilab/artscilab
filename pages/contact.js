import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';

export default function ContactUs(props) {
  return(
    <Layout pageName="Contact Us" title="Contact Us">
      <Container>
        <Row>
          <Col>
            <p className="lead">This is the contact us page. There would likely be a form or something here</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}