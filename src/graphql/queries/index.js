import gql from 'graphql-tag'

export const SET_UP_TRUCK_QUERY = gql`
  query allSetUpTrucks {
    allSetUpTrucks {
      id
      truckName
      truck {
        id
      }
    }
  }
`


export const USER_QUERY_FOR_SIDEBAR = gql`
  query User ($id: ID!) {
    User(id: $id) {
      id
      driver {
        id
        truck {
          id 
          name
          type
        }
      }
    }
  }
`


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
      setUpNotes{
          id
          setUpNoteContent
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

export const ALL_OIL_COLLECTIONS_QUERY = gql`
  query AllOilCollections {
    allOilCollectionServices(filter: {
      oilCollectionState: {
        active: true
      }
    }) {
      id
      serviceCycle
      serviceType
      oilCollectionRecords(filter: {
        collected: false
      }) {
        id
        scheduledCollectionDate
      }
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
          setUpNotes {
            id
            setUpNoteContent
          }
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

export const ALL_COLLECTION_RECORDS_QUERY = gql`
  query allOilCollectionRecords {
    allOilCollectionRecords {
      id
      scheduledCollectionDate
      wasteAmount
      oilAmount
      waterAmount
      collected
      truck {
        id
        description
      }
      oilService {
        id
        serviceType
        serviceCycle
        service {
          id
          location {
            id
            locationName
          }
        }
      }
    }
  }
`
export const OIL_COLLECTIONS_BY_DRIVER_QUERY = gql`
  query User ($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      driver {
        id
        truck {
          id
          description
          oilCollectionServices {
            id
            serviceCycle
            serviceType
            nextCollection
            oilCollectionState (filter:{
              active: true
              suspended: false
            }){
              id
              active
              suspended
            }
            oilCollectionRecords(filter: {
              collected: false
              scheduledCollectionDate_lte: "2017-12-27T00:00:00.000Z"
            }) {
              id
              collected
              scheduledCollectionDate
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
            service{
              id
              setUpService {
                id
                actualSetUpDate
                setUpNotes {
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
            containment {
              id
              containerType
              quantity
            }
          }
        }
      }
    }
  }
`

export const COMPLETED_COLLECTIONS_QUERY = gql`
  query OilCollectionByDriver{
    User(id: "cjal07apu6azd01653qbtqdsf") {
      id
      driver {
        id
        truck {
          id
          oilCollectionServices {
            id
            oilCollectionState {
              id
              active
              suspended
            }
            oilCollectionRecords(filter: {
              collected: true
            }) {
              id
              collected
              updatedAt
            }
          }
        }
      }
    }
  }
`