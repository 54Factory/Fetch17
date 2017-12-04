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

export const ALL_DRIVERS_QUERY = gql`
  query allDrivers {
    allDrivers {
      id
      dlNumber
      user {
        id
        username
      }
      truck {
        id
        name
      }
    }
  }
`;

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
      streetNumber
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

export const PENDING_SETUPS_QUERY = gql`
query Setups {
  allOilCollectionStates(filter: {
    setup: false
    }) {
      id
      active
      setup
      oilCollectionService{
        id
        startDate
        serviceCycle
        containment{
          id
          containerType
          quantity
        }
        service{
          id
          setUpService{
            id
            setUpDate
            setUpNotes{
              id
              setUpNoteContent
            }
          }
          location{
            id
            locationName
            streetNumber
            street
            city
            state
            zip
            lat
            lng
          }
        }
      }
    }
  }
`

export const SINGLE_SET_UP_QUERY = gql`
query SetUp($id: ID!){
  OilCollectionState(id: $id) {
      id
      active
      setup
      oilCollectionService{
        id
        serviceCycle
        serviceType
        startDate
        containment{
          id
          containerType
          quantity
        }
        service{
          id
          setUpService{
            id
            setUpDate
            setUpNotes{
              id
              setUpNoteContent
            }
          }
          location{
            id
            locationName
            streetNumber
            street
            city
            state
            zip
            lat
            lng
          }
        }
      }
    }
  }
`;