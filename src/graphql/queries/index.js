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

export const ALL_USERS_DRIVERS_QUERY = gql`
  query UserDriver {
    allUsers (filter: {
      role: "DRIVER"
    }) {
      id
      firstName
      lastName
      username
      driver {
        id
      }
    }
  }
`

export const ALL_DRIVERS_QUERY = gql`
  query allDrivers {
    allDrivers {
      id
      dlNumber
      image
      user {
        id
        username
        avatar
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
    	updatedAt
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
            actualSetUpDate
            truck {
              id
              description
              driver {
                id
                user {
                  id
                  firstName
                  lastName
                }
              }
            }
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
export const COMPLETED_SETUPS_QUERY = gql`
query Setups {
  allOilCollectionStates(filter: {
    setup: true
    }) {
      id
      active
      setup
    	updatedAt
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
            actualSetUpDate
            truck {
              id
              description
              driver {
                id
                user {
                  id
                  firstName
                  lastName
                }
              }
            }
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



export const ALL_SERVICES_QUERY = gql`
query AllServices {
  allServices {
    id
    location {
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
    setUpService {
      id
      actualSetUpDate
      truck {
        id
        description
        driver {
          id
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
    oilCollectionService {
      id
      serviceCycle
      truck {
        id
        description
      }
      containment {
        id
        quantity
        containerType
      }
      oilCollectionRecords {
        id
        scheduledCollectionDate
        collected
      }
      oilCollectionState {
        id
        active
        setup
      }
    }
  }
}
`

export const UNASSIGNED_COLLECTIONS_QUERY = gql`
  query UnassignedCollections {
    allOilCollectionStates(filter: {
        setup: true,
        active: false,
      })
      {
      id
      active
      oilCollectionService{
        id
        truck{
          id
          name
        }
        service{
          id
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

export const PENDING_COLLECTIONS_QUERY = gql`
  query AllOilCollections {
    allOilCollectionServices(filter: {
      oilCollectionState: {
        active: true
      }
    }) {
      id
      containment {
        id
        containerType
        quantity
      }
      truck {
        id
        description
        driver {
          id
          user {
            id
            firstName
            lastName
          }
        }
      }
      service {
        id
        setUpService {
          id
          actualSetUpDate
        }
        location {
          id
          locationName
          streetNumber
          street
          city
          county
          state
          zip
          lat
          lng
        }
      }
    }
  }
`

