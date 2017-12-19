import React from 'react';
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
//import { Layout } from "antd";
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';
import Loading from './Loading';



let dateTodayIso = "2017-12-01T09:05:09.807Z"
//const dateTodayIso = dateToday.toISOString()

class DriverDashBoard extends React.Component {

  render() {
    if (this.props.OilCollectionIndexData && this.props.OilCollectionIndexData.loading) { 
      return (
        <Loading/>
      )}
      
    console.log(this.props)
    // const pendingPickups = this.props.OilCollectionIndexData.User.driver.truck.oilCollectionServices[0].oilCollectionRecords.length
    // //const totalPickUps = this.props.OilCollectionIndexData.User.driver.truck.oilCollectionServices.length
    // const truckName = this.props.OilCollectionIndexData.User.driver.truck.name

    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>FETCH DRIVER DASHBOARD HOME</h1>
          {/* <Content>
        {this.props.OilCollectionIndexData && pendingPickups > 0
          ? <Link to={`/dashboard/pendingCollections/${truckName}`}>
          <PendingPickUpsStickerWidget
            number={pendingPickups}
            text={pendingPickups === 1 ? <IntlMessages id="oilCollection.sticker.pendingPickUps=1" /> : <IntlMessages id="oilCollection.sticker.pendingPickUps" />}
            icon="ion-soup-can"
            fontColor="#ffffff"
            bgColor="#7ED321"
          /> 
        </Link>
      : <Content>
          <PendingPickUpsStickerWidget
            number={pendingPickups}
            text={pendingPickups === 1 ? <IntlMessages id="oilCollection.sticker.pendingPickUps=1" /> : <IntlMessages id="oilCollection.sticker.pendingPickUps" />}
            icon="ion-soup-can"
            fontColor="#ffffff"
            bgColor="#4482FF"
          /> 
        </Content>
        }    
      </Content> */}
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

const PENDING_PICKUPS_QUERY = gql`
query PendingPickupsByTruckAndDriver ($id: ID!, $scheduledCollectionDate_lte: DateTime){
  User(id: $id) {
    id
    role
    driver{
      id
      truck{
        id
        name
        oilCollectionServices{
          oilCollectionState(filter: {
          active: true,
          }){
          id
          }
          id
          oilCollectionRecords(filter: {
          scheduledCollectionDate_lte: $scheduledCollectionDate_lte,
            collected: false,
          }){
            id
            scheduledCollectionDate
          }
        }
      }
    }
  }
}
`
const mapStateToProps = (state) => {
  return { 
    user: state.user
  }
}

const PENDING_PICKUPS_QUERY_WITH_ID = graphql(PENDING_PICKUPS_QUERY, {
  name: 'OilCollectionIndexData', 
  options: (props) => ({
    variables: {
      id: props.user.userId,
      scheduledCollectionDate_lte: dateTodayIso
    },
  }),
  })(DriverDashBoard)

export default connect(mapStateToProps)(PENDING_PICKUPS_QUERY_WITH_ID);



