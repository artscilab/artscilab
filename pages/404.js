import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';

export default function Custom404(props) {
  return(
    <Layout pageName="Contact Us" title="Contact Us">
      <Container>
        <Row>
           <h1>404 - Page Not Found</h1>
           <p>atec.io is currently facing outage. The ArtSciLab website will be up and running as soon as it if fixed. Meanwhile, you can contact us using following contact information.</p>
        <Row>
        <Row>
          <Col sm='7'>
            <p>The ArtSciLab is located at <a href='http://www.utdallas.edu/locator/ATC_3.209'>ATC 3.209</a>, on the 3rd floor of the Edith O’Donnell Arts and Technology Building on The University of Texas at Dallas campus.</p>
            <ul className='mb-5'>
              <li>
                <a href='http://www.utdallas.edu/maps/'>UT Dallas campus map</a>
              </li>
              <li>
                <a href='http://www.utdallas.edu/locator/ATC_3.209'>Map of the Arts and Technology Building</a>
              </li>
              <li>
                <a href="https://www.google.com/maps/place/Edith+O'Donnell+Arts+and+Technology+Building/@32.9861738,-96.749781,17z/data=!4m8!1m2!3m1!2sEdith+ODonnell+Arts+and+Technology+Building!3m4!1s0x0:0xa43ddeacaf9438c5!8m2!3d32.9861736!4d-96.7475923">Directions via Google Maps</a>
              </li>
            </ul>
            <h3>Mailing Address</h3>
            <p>
              The University of Texas at Dallas<br></br>
              ArtSciLab, Edith O’Donnell Arts and Technology Building<br></br>
              800 West Campbell Road<br></br>
              Richardson, TX 75080-3021<br></br>
            </p>
            <h3>Email</h3>
            <p>
            Roger Malina — <a href="mailto:rxm116130@utdallas.edu" target="_blank" rel="noopener">rxm116130@utdallas.edu</a><br></br>
            Kirtan Pathak — <a href="mailto:ksp200004@utdallas.edu" target="_blank" rel="noopener">ksp200004@utdallas.edu</a>
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
