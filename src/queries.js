import { gql } from "@apollo/client";

const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    name
    role
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $name: String!
    $role: String!
  ) {
    createUser(
      username: $username
      password: $password
      name: $name
      role: $role
    ) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

const PLACE_DETAILS = gql`
  fragment PlaceDetails on Place {
    id
    name
    code
    lat
    long
  }
`;

export const PLACES = gql`
  query {
    places {
      ...PlaceDetails
    }
  }
  ${PLACE_DETAILS}
`;

export const USERS = gql`
  query {
    users {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;
