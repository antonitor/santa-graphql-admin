import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const stylish = {
  marginTop: 12,
  marginBottom: 12,
  backgroundColor: "WhiteSmoke",
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 8,
};

const ToolBar = (props) => {
  const { title, setShowForm, showForm } = props;
  return (
    <Container style={stylish}>
      <Row>
        <Col sm={10}>
          <h2 style={{ margin: "auto" }}>{title}</h2>
        </Col>
        <Col sm={2} style={{ margin: "auto", textAlign: "end" }}>
          {!showForm ? (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowForm(true)}
            >
              +
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowForm(false)}
            >
              -
            </Button>
          )}
        </Col>
      </Row>
      {showForm ? props.children : null}
    </Container>
  );
};

export default ToolBar;
