import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const stylish = {
  marginTop: 12,
  marginBottom: 12,
  backgroundColor: "WhiteSmoke",
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 8,
};

const HeadContainer = (props) => {
  const [toggleButton, setToggleButton] = useState(true);
  const { title, setShowForm } = props;

  if (!setShowForm) {
    setToggleButton(true);
  }

  const toggle = () => {
    console.log("TOGGLE");
    setShowForm(true);
    setToggleButton(false);
  };

  return (
    <Container style={stylish}>
      <Row>
        <Col sm={10}>
          <h2 style={{ margin: "auto" }}>{title}</h2>
        </Col>
        <Col sm={2} style={{ margin: "auto", textAlign: "end" }}>
          {toggleButton ? (
            <Button size="sm" variant="primary" onClick={toggle}>
              +
            </Button>
          ) : null}
        </Col>
      </Row>
      {props.children}
    </Container>
  );
};

export default HeadContainer;
