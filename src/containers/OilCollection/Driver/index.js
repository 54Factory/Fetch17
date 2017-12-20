import React from 'react';
import { connect } from 'react-redux';
import * as DriverCollectionsAction from '../../../redux/oilCollections/driverCollections/actions';
import { Layout, Icon } from 'antd';
import Button from '../../../components/uielements/button';
import DriverCollectionList from '../../../components/oilCollections/driverComponents/driverCollectionList';
import SingleCollectionView from '../../../components/oilCollections/driverComponents/singleView';
import CollectionBuilderView from '../../../components/oilCollections/driverComponents/collectionBuilderView';
import IntlMessages from '../../../components/utility/intlMessages';
import OilCollectionMap from '../../../components/maps/oilcollection'
import { CollectionsWrapper } from '../oilCollection.style';
import OilCollectionWidgets from '../../Widgets/oilCollection';

const {
  fetchCollectionsByDriver,
  fetchCompletedCollections,
  changeCollection,
  viewChange,
  viewMap
} = DriverCollectionsAction;

const { Content } = Layout;
class DriverCollections extends React.Component {
  componentWillMount() {
    const id = this.props.userId
    console.log("Will Mount------>", id)
    this.props.fetchCollectionsByDriver(id)
    this.props.fetchCompletedCollections()
  }
  // componentDidMount() {
  //   this.props.fetchCollections()
  //   this.props.fetchUnassignedCollections()
  // }

  render() {
    const {    
      collections,
      completedCollections,
      selectedId,
      editView,
      changeCollection,
      viewChange,
      viewMap
    } = this.props;
    
    const selectedCollection = selectedId
      ? collections.filter(collection => collection.id === selectedId)[0]
      : null;
    

    const onViewChange = () => viewChange(!editView);
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

    const truckAttributes = [
      { title: 'Truck', value: 'description', type: 'name' }
    ]


    console.log(this.props);
    return (
      <div>
      
      {/* <OilCollectionWidgets 
         activeAccounts={collections}

      /> */}
      <CollectionsWrapper
        className="Services"
        style={{ background: 'none' }}
      >        
        <div className="CollectionListBar">
          <DriverCollectionList
            collections={collections}
            selectedId={selectedId}
            changeCollection={changeCollection}
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
                <Button type="primary" onClick={onViewChange}>
                  {editView ? <Icon type="close-circle" /> : <Icon type="plus-circle-o" />}{' '}
                </Button>
              </div>
              {editView ? (
                <CollectionBuilderView 
                  collection={selectedCollection}
                />
              ) : (
                <SingleCollectionView
                  collection={selectedCollection}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                  truckAttributes={truckAttributes}
                  collectionAttributes={collectionAttributes}
                  collections={collections}
                  />
              )}
            </Content>
          ) : (
            <Content className="CollectionBox">
            <OilCollectionMap 
              markers={collections}
            />
          </Content>
          )}
        </Layout>
      </CollectionsWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { collections, completedCollections, selectedId, editView } = state.DriverCollections;
  const { userId } = state.user
  return {
    userId,
    collections,
    completedCollections,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchCollectionsByDriver,
  fetchCompletedCollections,
  changeCollection,
  viewChange,
  viewMap
})(DriverCollections);
