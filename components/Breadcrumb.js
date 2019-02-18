import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
import React, {Component} from "react";
import PropTypes from "prop-types";

export default class BreadcrumbRow extends Component {
  render() {
    return(
      <Row className='breadcrumb-row'>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem><a href='/index'>Home</a></BreadcrumbItem>
            <BreadcrumbItem><a href={this.props.parentHref}>{this.props.parentText}</a></BreadcrumbItem>
            <BreadcrumbItem active>{this.props.activeText}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    )
  }
}

BreadcrumbRow.propTypes = {
  parentHref: PropTypes.string.isRequired,
  parentText: PropTypes.string.isRequired,
  activeText: PropTypes.string.isRequired
}