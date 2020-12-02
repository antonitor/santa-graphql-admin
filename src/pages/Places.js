import React from "react";
import { PLACES } from "../queries";
import { useQuery } from "@apollo/client";
import { Table, Spinner } from "react-bootstrap";
import ToolBar from "../components/ToolBar";

const Places = () => {
  const result = useQuery(PLACES);

  if (result.loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <div>
        <ToolBar title="Places" />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Place</th>
              <th>Code</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {result.data.places.map((place) => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.code}</td>
                <td>{place.lat}</td>
                <td>{place.long}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Places;
