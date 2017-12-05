import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CollectionsAction from '../../redux/oilCollections/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import CollectionList from '../../components/oilCollections/collectionList';
import SingleCollectionView from '../../components/oilCollections/singleView';
import EditCollectionView from '../../components/oilCollections/editView';
import IntlMessages from '../../components/utility/intlMessages';
//import CollectionsMap from '../../components/maps/service/collectionMap'
import { CollectionsWrapper } from './oilCollection.style';
import OilCollectionWidgets from '../Widgets/oilCollection';

const {
  fetchCollections,
  fetchUnassignedCollections,
  changeCollection,
  editCollection,
  deleteCollection,
  viewChange,
  viewMap
} = CollectionsAction;

const { Content } = Layout;
class Collections extends Component {
  componentWillMount() {
    this.props.fetchCollections()
    this.props.fetchUnassignedCollections()
  }

  render() {
    const {    
      collections,
      selectedId,
      editView,
      changeCollection,
      editCollection,
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

    console.log(this.props);
    return (
      <div>
                    <OilCollectionWidgets 
              unassignedAccounts={collections}
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
                <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="cross" /> : <Icon type="check" />}{' '}
                </Button>
              </div>
              {editView ? (
                <EditCollectionView
                  collection={selectedCollection}
                  editCollection={editCollection}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                />
              ) : (
                <SingleCollectionView
                  collection={selectedCollection}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                  collectionAttributes={collectionAttributes}
                  collections={collections}
                />
              )}
            </Content>
          ) : (
            <Content className="CollectionBox">
            {/* <CollectionsMap 
              markers={collections}
            /> */}
          </Content>
          )}
        </Layout>
      </CollectionsWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { collections, selectedId, editView } = state.Collections;
  return {
    collections,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchCollections,
  fetchUnassignedCollections,
  changeCollection,
  editCollection,
  deleteCollection,
  viewChange,
  viewMap
})(Collections);
