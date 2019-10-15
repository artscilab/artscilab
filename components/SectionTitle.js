import React from 'react'
import { Row, Col } from "reactstrap";

export default function SectionTitle({text}) {
  return (
    <Row className="section-title">
      <Col>
        <h2>{text}</h2>
      </Col>
    </Row>
  )
}
