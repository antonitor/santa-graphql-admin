import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, USERS } from "../queries";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const UserForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const history = useHistory();

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message, "danger");
    },
    refetchQueries: [{ query: USERS }],
    onCompleted: () => {
      setUsername("");
      setPassword("");
      setName("");
      setRole("USER");
      history.push("/users");
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    createUser({ variables: { username, password, name, role } });
  };

  return (
    <div>
      <Form style={{ marginTop: 24 }} onSubmit={submit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Username{" "}
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Password{" "}
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Name{" "}
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Role{" "}
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              as="select"
              value={role}
              onChange={({ target }) => setRole(target.value)}
            >
              <option>USER</option>
              <option>SALES</option>
              <option>ADMIN</option>
              <option>ROOT</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <div style={{ marginTop: 20 }}>
          <Button variant="primary" type="submit">
            Create User
          </Button>
          <Button
            style={{ marginLeft: 4 }}
            variant="danger"
            as={Link}
            to="/users"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
