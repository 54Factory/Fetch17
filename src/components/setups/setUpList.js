import React from 'react';
import { Input } from 'antd';
import DeleteButton from './deleteButton';
import { FormattedDate, IntlProvider } from 'react-intl'
import { PropTypes } from "prop-types";
import { SetUpListWrapper } from './setUpList.style';


const Search = Input.Search;

function filterSetUps(setups, search) {
  search = search.toUpperCase();
  return search
    ? setups.filter(setup => setup.oilCollectionService.service.location.locationName.toUpperCase().includes(search))
    : setups;
}

export default class SetUpList extends React.Component {
  constructor(props) {
    super(props);
    this.singleSetUp = this.singleSetUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleSetUp(setup) {
    const { selectedId, deleteSetUp, changeSetUp } = this.props;
    const activeClass = selectedId === setup.id ? 'active' : '';
    const name = setup.oilCollectionService.service.location.locationName
    const setUpDate = setup.oilCollectionService.service.setUpService.setUpDate
    const onChange = () => changeSetUp(setup.id);
    return (
      <div
        key={setup.id}
        className={`${activeClass} SingleSetUp`}
        onClick={onChange}
      >
        <div className="Avatar">
          {setup.image ? <img alt="#" src={setup.image} /> : ''}
        </div>
        <div className="SetUpName">
          <h3>{name ? name : 'No Name'}</h3>
          <h4>Date: <IntlProvider locale="en">
                  <FormattedDate
                    value={setUpDate}
                    year='numeric'
                    month='long'
                    day='numeric'
                  />
              </IntlProvider></h4>
        </div>
        <DeleteButton deleteSetUp={deleteSetUp} setup={setup} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const setups = filterSetUps(this.props.setups, search); 
    console.log("SetUps: ", setups)   
    return(
      <SetUpListWrapper className="SetUpListWrapper">
        <Search
          placeholder={this.context.intl.formatMessage({id:"setuplist.searchSetUps"})}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {setups && setups.length > 0
          ? <div className="SetUpList">
              {setups.map(setup => this.singleSetUp(setup))}
            </div>
          : 'No Location with that name found...'}
      </SetUpListWrapper>
    )
  }
}

SetUpList.contextTypes ={
  intl: PropTypes.object.isRequired
 }