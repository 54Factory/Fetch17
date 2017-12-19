import React from 'react';
import { connect } from 'react-redux';
import * as CollectionsAction from '../../../redux/oilCollections/actions';
import * as TruckAction from '../../../redux/trucks/actions';
import { Layout } from 'antd';
import Button from '../../../components/uielements/button';
import UnassignedCollectionList from '../../../components/oilCollections/assignTruck/unassignedList';
import AssignTruckView from '../../../components/oilCollections/assignTruck/assignView';
import IntlMessages from '../../../components/utility/intlMessages';
import TruckAssignmentMap from '../../../components/maps/oilcollection/assignment/oilCollectionAssignmentMap'
import PageHeader from '../../../components/utility/pageHeader'
import { AssignCollectionWrapper } from './oilCollectionAssign.style';


const {
  fetchUnassignedCollections,
  changeCollection,
  editCollection,
  deleteCollection,
  // viewChange,
  viewMap
} = CollectionsAction;

const {
  fetchTrucks
} = TruckAction

const { Content } = Layout;
class AssignTruck extends React.Component {
  componentWillMount() {
    this.props.fetchUnassignedCollections()
    this.props.fetchTrucks()
  }

  render() {
    const {    
      unassignedCollections,
      trucks,
      selectedId,
      editView,
      changeCollection,
      deleteCollection,
      // viewChange,
      viewMap
    } = this.props;
    console.log("AssignTruck Page");
    const selectedCollection = selectedId
      ? unassignedCollections.filter(collection => collection.id === selectedId)[0]
      : null;
    
    //const onViewChange = () => viewChange(!editView);
    const onMapChange = () => viewMap(editView);

    const containerAttributes = [
      { title: 'Container Type', value: 'containerType', type: 'name' },
      { title: 'No. of Containers', value: 'quantity', type: 'number' }
    ];

    const setUpAttributes = [
      { title: 'Setup Date', value: 'actualSetUpDate', type: 'date' },
    ]

    const collectionAttributes = [
      { title: 'Cycle', value: 'serviceCycle', type: 'name' }
    ]

    console.log(this.props);
    return (
      <div>
        <div style={{ paddingTop: '20px'}}>
        <PageHeader><IntlMessages id="oilCollection.unassignedIndex" /></PageHeader>
        </div> 
      <AssignCollectionWrapper
        className="Collections"
        style={{ background: 'none' }}
      >     
        <div className="CollectionListBar">
          <UnassignedCollectionList
            unassignedAccounts={unassignedCollections}
            selectedId={selectedId}
            changeCollection={changeCollection}
            deleteCollection={deleteCollection}
          />
        </div>
        <Layout className="CollectionBoxWrapper">
          {selectedCollection ? (
            <Content className="CollectionBox">
              <div className="CollectionControl">
                <Button
                  type="primary"
                  onClick={onMapChange}
                  className="BackBtn"
                >
                  <IntlMessages id="collectionlist.backButton" />
                </Button>
                {/* <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="cross" /> : <Icon type="check" />}{' '}
                </Button> */}
              </div>
                <AssignTruckView
                  trucks={trucks}
                  collection={selectedCollection}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                  collectionAttributes={collectionAttributes}
                  collections={unassignedCollections}
                />
            </Content>
          ) : (
            <Content className="CollectionBox">          
            <TruckAssignmentMap 
              markers={unassignedCollections}
            />
          </Content>
          )}
        </Layout>
      </AssignCollectionWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { collections, unassignedCollections, selectedId, editView } = state.Collections;
  const { trucks } = state.Trucks;
  return {
    trucks,
    collections,
    unassignedCollections,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchUnassignedCollections,
  fetchTrucks,
  changeCollection,
  editCollection,
  deleteCollection,
  // viewChange,
  viewMap
})(AssignTruck);
