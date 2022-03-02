import Layout from '../components/Layout';
import fetch from 'node-fetch';
import { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
} from 'reactstrap';
import DynamicLink from '../components/DynamicLink';
import { convertUrlToHttps } from '../functions/functions';
import CardText from 'reactstrap/lib/CardText';

export default class Projects extends Component {
  static async getInitialProps() {
    const res2 = await fetch(
      'https://dev.atec.io/wp-json/wp/v2/project?per_page=99',
    );
    let projects = await res2.json();
    return { projects };
  }

  render() {
    return (
      <Layout title='Projects' pageName='Projects'>
        <Container>
          <Row className='justify-content-center mb-5'>
            {this.props.projects.map((project, i) => {
              let short_description = '';

              if (project.short_description.length > 100) {
                short_description =
                  project.short_description.substring(0, 100) + ' ...';
              } else {
                short_description = project.short_description;
              }

              return project.start_year.substring(0, 4) === '2022' ? (
                <Col
                  xs='12'
                  sm='6'
                  md='4'
                  lg='4'
                  key={project.slug}
                  className='mb-5 listing text-center'>
                  <Card className='h-100'>
                    <CardBody>
                      <CardTitle tag='h5'>
                        <DynamicLink
                          actualRoute='project'
                          displayRoute='projects'
                          slug={project.slug}>
                          <h4 className='card-title'>
                            {project.title.rendered}
                          </h4>
                          <img
                            className='img-fluid'
                            style={{ borderRadius: 10 + 'px' }}
                            src={convertUrlToHttps(
                              project.research_image.guid,
                            )}></img>
                        </DynamicLink>
                      </CardTitle>
                      <CardFooter>{short_description}</CardFooter>
                    </CardBody>
                  </Card>
                </Col>
              ) : (
                <></>
              );
            })}
          </Row>
          <hr />
          <h2 className='p-4'> Past Projects </h2>
          <Row className='justify-content-center mb-5'>
            {this.props.projects.map((project, i) => {
              let short_description = '';

              if (project.short_description.length > 100) {
                short_description =
                  project.short_description.substring(0, 100) + ' ...';
              } else {
                short_description = project.short_description;
              }

              return project.start_year.substring(0, 4) !== '2022' ? (
                <Col
                  key={project.slug}
                  xs='12'
                  sm='6'
                  md='4'
                  lg='3'
                  className='pb-2'>
                  <Card className='h-100'>
                    <CardBody>
                      <CardTitle tag='h5'>
                        <DynamicLink
                          actualRoute='project'
                          displayRoute='projects'
                          slug={project.slug}>
                          <h4 className='card-title'>
                            {project.title.rendered}
                          </h4>
                        </DynamicLink>
                      </CardTitle>
                      <CardText>{short_description}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              ) : (
                <></>
              );
            })}
          </Row>
        </Container>
      </Layout>
    );
  }
}
