import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Places from "./pages/Places";
import Users from "./pages/Users";
import { Alert, Nav, Navbar, Button } from "react-bootstrap";

const App = () => {
  const [message, setMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("secondary");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const history = useHistory();

  if (!token) {
    if (localStorage.getItem("santa-admin-user-token"))
      setToken(localStorage.getItem("santa-admin-user-token"));
  }
  const logout = () => {
    history.push("/");
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message, variant) => {
    setMessage(message);
    setAlertVariant(variant);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div className="container">
        <Notify message={message} alertVariant={alertVariant} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div className="container">
      <Notify message={message} alertVariant={alertVariant} />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/places">
              Places
            </Nav.Link>
          </Nav>
          <Button size="sm" variant="secondary" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/places">
          <Places />
        </Route>
      </Switch>
    </div>
  );
};

const Notify = ({ message, alertVariant }) => {
  if (!message) {
    return null;
  }
  return <Alert variant={alertVariant}>{message}</Alert>;
};

export default App;
