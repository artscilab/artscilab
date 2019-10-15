import Layout from "../components/Layout";
import {Container, Row, Col} from 'reactstrap';

export default function Home(props) {
  return(
    <Layout pageName="About" title="About">
      <Container>
        <Row className='mt-4 mb-5 justify-content-center'>
          <Col sm='8'>
            <p className="lead">We are a transdisciplinary research lab—helping the arts, science, and technology communities by pursuing initiatives of societal urgency and cultural timeliness.</p>
            <p>We develop multiple applications in a studio-lab approach through our projects, which include the creation of artworks, scientific research, technology development, and educational innovation.</p>
            <p>We carry out our work through trans-disciplinary, national and international partnerships and collaborations.</p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md='6'>
            <h3>Art-science collaborations</h3>
            <p>Collaboration between the arts and sciences has the potential to create new knowledge, ideas and processes beneficial to both fields.</p>
            <p>We work on initiatives that could not be accomplished without collaboration between artists and scientists.</p>
          </Col>
          <Col md='6'>
            <h3>Experimental publishing</h3>
            <p>Digital culture is transforming how we document our work and show it to others. Curating and peer review processes are being re-invented.</p>
            <p>We conduct experiments in publishing to explore and identify new multi-modal and multimedia best practices.</p>
          </Col>
        </Row>
        <Row className='mt-5 justify-content-center'>
          <Col sm='8'>
            <h3>History</h3>
            <p>The ArtSciLab was created with the opening of the Edith O’Donnell Arts and Technology building in 2014. Dr. Roger Malina is the founding director and principal investigator of the lab.</p>
            <p>
              From its founding, the ArtSciLab initiated various projects that focused on data visualization and sonification of data, as well as experimental academic publishing projects with partners Leonardo and MIT Press.
            </p>
            <p>
              In addition, the lab hosts various projects that involve the integration of the arts, design and humanities in science, technology, education and mathematics (STEAM).
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}