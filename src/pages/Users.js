import React, { useState } from "react";
import { USERS, DELETE_USER } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { Table, Spinner, Button } from "react-bootstrap";
import ToolBar from "../components/ToolBar";
import UserForm from "../components/UserForm";

const Users = ({ setError }) => {
  const result = useQuery(USERS);
  const [delUser] = useMutation(DELETE_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: USERS }],
  });
  const [showForm, setShowForm] = useState(false);

  if (result.loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  const deleteUser = ({ id }) => {
    if (window.confirm(`Are you sure to delete user ${id} ?`))
      delUser({ variables: { id } });
  };

  return (
    <>
      <div>
        <ToolBar title="Users" setShowForm={setShowForm} showForm={showForm}>
          {showForm ? (
            <UserForm setError={setError} setShowForm={setShowForm} />
          ) : null}
        </ToolBar>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {result.data.users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      deleteUser({ id: user.id });
                    }}
                  >
                    DEL
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Users;
