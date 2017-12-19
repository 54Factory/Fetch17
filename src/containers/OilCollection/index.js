import React from 'react';
import { connect } from 'react-redux';
import * as CollectionsAction from '../../redux/oilCollections/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import CollectionList from '../../components/oilCollections/collectionList';
import SingleCollectionView from '../../components/oilCollections/singleView';
import CollectionBuilderView from '../../components/oilCollections/collectionBuilderView';
import IntlMessages from '../../components/utility/intlMessages';
import OilCollectionMap from '../../components/maps/oilcollection'
import { CollectionsWrapper } from './oilCollection.style';
import OilCollectionWidgets from '../Widgets/oilCollection';

const {
  fetchCollections,
  fetchUnassignedCollections,
  changeCollection,
  deleteCollection,
  viewChange,
  viewMap
} = CollectionsAction;

const { Content } = Layout;
class Collections extends React.Component {
  componentWillMount() {
    this.props.fetchCollections()
    this.props.fetchUnassignedCollections()
  }
  // componentDidMount() {
  //   this.props.fetchCollections()
  //   this.props.fetchUnassignedCollections()
  // }

  render() {
    const {    
      collections,
      unassignedCollections,
      selectedId,
      editView,
      changeCollection,
      deleteCollection,
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
      <OilCollectionWidgets 
        unassignedAccounts={unassignedCollections}
        activeAccounts={collections}
      />
      <CollectionsWrapper
        className="Services"
        style={{ background: 'none' }}
      >        
        <div className="CollectionListBar">
          <CollectionList
            collections={collections}
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
  const { collections, unassignedCollections, selectedId, editView } = state.Collections;
  return {
    collections,
    unassignedCollections,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchCollections,
  fetchUnassignedCollections,
  changeCollection,
  deleteCollection,
  viewChange,
  viewMap
})(Collections);
