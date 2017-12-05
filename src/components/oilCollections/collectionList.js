import React from 'react';
import { Input } from 'antd';
import DeleteButton from './deleteButton';
import { FormattedDate, IntlProvider } from 'react-intl'
import { PropTypes } from "prop-types";
import { CollectionListWrapper } from './collectionList.style';


const Search = Input.Search;

function filterCollections(collections, search) {
  search = search.toUpperCase();
  return search
    ? collections.filter(collection => collection.oilCollectionService.service.location.locationName.toUpperCase().includes(search))
    : collections;
}

export default class CollectionList extends React.Component {
  constructor(props) {
    super(props);
    this.singleCollection = this.singleCollection.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleCollection(collection) {
    const { selectedId, deleteCollection, changeCollection } = this.props;
    const activeClass = selectedId === collection.id ? 'active' : '';
    const name = collection.oilCollectionService.service.location.locationName
    //const setUpDate = collection.oilCollectionService.service.setUpService.setUpDate
    const onChange = () => changeCollection(collection.id);
    return (
      <div
        key={collection.id}
        className={`${activeClass} SingleCollection`}
        onClick={onChange}
      >
        <div className="Avatar">
          {collection.image ? <img alt="#" src={collection.image} /> : ''}
        </div>
        <div className="CollectionName">
          <h3>{name ? name : 'No Name'}</h3>
          {/* <h4>Date: <IntlProvider locale="en">
                  <FormattedDate
                    value={setUpDate}
                    year='numeric'
                    month='long'
                    day='numeric'
                  />
              </IntlProvider></h4> */}
        </div>
        <DeleteButton deleteCollection={deleteCollection} collection={collection} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const collections = filterCollections(this.props.collections, search); 
    console.log("Collections: ", collections)   
    return(
      <CollectionListWrapper className="CollectionListWrapper">
        <Search
          placeholder={this.context.intl.formatMessage({id:"collectionlist.searchCollections"})}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {collections && collections.length > 0
          ? <div className="CollectionList">
              {collections.map(collection => this.singleCollection(collection))}
            </div>
          : 'No Location with that name found...'}
      </CollectionListWrapper>
    )
  }
}

CollectionList.contextTypes ={
  intl: PropTypes.object.isRequired
 }