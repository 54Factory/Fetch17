import React from 'react';
import { Input } from 'antd';
import DeleteButton from '../deleteButton';
// import { FormattedDate, IntlProvider } from 'react-intl'
import { PropTypes } from "prop-types";
import { CollectionListWrapper } from '../collectionList.style';


const Search = Input.Search;

function filterUnassignedAccounts(unassignedAccounts, search) {
  search = search.toUpperCase();
  return search
    ? unassignedAccounts.filter(unassignedAccount => unassignedAccount.service.location.locationName.toUpperCase().includes(search))
    : unassignedAccounts;
}

export default class UnassignedCollectionList extends React.Component {
  constructor(props) {
    super(props);
    this.singleUnassignedAccount = this.singleUnassignedAccount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleUnassignedAccount(unassignedAccount) {
    const { selectedId, deleteCollection, changeCollection } = this.props;
    const activeClass = selectedId === unassignedAccount.id ? 'active' : '';
    const name = unassignedAccount.oilCollectionService.service.location.locationName
    //const setUpDate = collection.oilCollectionService.service.setUpService.setUpDate
    const onChange = () => changeCollection(unassignedAccount.id);
    return (
      <div
        key={unassignedAccount.id}
        className={`${activeClass} SingleCollection`}
        onClick={onChange}
      >
        <div className="Avatar">
          {unassignedAccount.image ? <img alt="#" src={unassignedAccount.image} /> : ''}
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
        <DeleteButton deleteCollection={deleteCollection} collection={unassignedAccount} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const unassignedAccounts = filterUnassignedAccounts(this.props.unassignedAccounts, search); 
    console.log("Unassigned Collections: ", unassignedAccounts)   
    return(
      <CollectionListWrapper className="CollectionListWrapper">
        <Search
          placeholder={this.context.intl.formatMessage({id:"collectionlist.searchCollections"})}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {unassignedAccounts && unassignedAccounts.length > 0
          ? <div className="CollectionList">
              {unassignedAccounts.map(unassignedAccount => this.singleUnassignedAccount(unassignedAccount))}
            </div>
          : 'No Location with that name found...'}
      </CollectionListWrapper>
    )
  }
}

UnassignedCollectionList.contextTypes ={
  intl: PropTypes.object.isRequired
 }