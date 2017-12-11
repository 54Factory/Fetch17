import gql from 'graphql-tag';

//export { default as createUser } from './createUser';
export { default as loginUser } from './loginUser';

export const UPDATE_OIL_ACCOUNT_STATE = gql`
mutation UpdateAccountStateAndCreateFirstCollectionRecord(  $id: ID!,  $active: Boolean, $setup: Boolean, 
  $oilServiceId: ID, $scheduledCollectionDate: DateTime,
  $actualSetUpDate: DateTime, $setUpServiceId: ID!
	){
  updateSetUpService: updateSetUpService(id: $setUpServiceId, actualSetUpDate: $actualSetUpDate){
    id
  }
  updateState: updateOilCollectionState(id: $id, active: $active, setup: $setup){
    id
    oilCollectionService{
      id
      startDate
      containment{
        id
        containerType
        quantity
        createdAt
      }
      oilCollectionState{
        id
        active
        setup
      }
      service{
        id
        location{
          id
          locationName
          street
          state
          city
          
        }
      }
    }
  }
  createFirstCollectionRecord: createOilCollectionRecord(oilServiceId: $oilServiceId, scheduledCollectionDate: $scheduledCollectionDate) {
    id
    collected
    scheduledCollectionDate
  }
  }
`

