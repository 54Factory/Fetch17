import gql from 'graphql-tag'

export const USER_QUERY = gql`
  query allUsers {
    allUsers {
      id
      username
      firstName
      lastName
      email
      role
      avatar
    }
  }
`
export const ALL_TRUCKS_QUERY = gql`
query allTrucks {
  allTrucks {
    id
    image
    name
    description
    createdAt
    updatedAt
    driver{
      id
      user {
        id
        firstName
        lastName
      }
    }
  }
}
`;

export const ALL_LOCATIONS_QUERY = gql`
query allLocations {
  allLocations(orderBy: createdAt_DESC) {
    id
    createdAt
    locationName
    street
    city
    state
    zip
    lat
    lng
    customer {
      id
      firstName
      lastName
    }
  }
}
`;