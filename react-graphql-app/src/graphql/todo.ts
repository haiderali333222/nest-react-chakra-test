import { gql } from "@apollo/client";

// Fetch all saved data
export const GET_ITEMS = gql`
  query GetItems($limit: Int, $skip: Int) {
    items(limit: $limit, skip: $skip) {
      id
      name
      quantity
    }
  }
`;

// Mutation to create a new record
export const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateInputItem!) {
    createItem(input: $input) {
      id
      name
      quantity
    }
  }
`;

// Mutation to create a new record
export const DELETE_ITEM = gql`
  mutation DeleteItem($id: String!) {
    deleteItem(id: $id)
  }
`;
