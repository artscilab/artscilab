import Layout from "../components/Layout";
import {Container, Row, Col} from 'reactstrap';

export default function Home(props) {
  return(
    <Layout pageName="About" title="About">
      <Container>
        <Row>
          <Col>
            <p className="lead">This is the about page. theoretically it will also include content</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}