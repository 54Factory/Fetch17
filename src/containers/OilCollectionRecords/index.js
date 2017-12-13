import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as RecordsAction from '../../redux/oilCollectionRecords/actions';
import ReactTable from 'react-table';
import { FormattedDate, IntlProvider } from 'react-intl'
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import 'react-table/react-table.css'

const {
  fetchAllCollectionRecords
} = RecordsAction;


class OilCollectionRecords extends Component {

  
  componentWillMount() {
    this.props.fetchAllCollectionRecords()
  }


  render() {
    const data = this.props.collections
    console.log(this.props)
  
    const columns = [{
      Header: 'Location',
      id:  d => d.oilService.service.location.id,
      accessor: d => d.oilService.service.location.locationName // String-based value accessors!
    },
     {
      Header: 'Next Collection',
      accessor: 'scheduledCollectionDate',
      Cell: props => (
      <IntlProvider locale="en">
        <FormattedDate
          value={props.value}
          year='numeric'
          month='long'
          day='numeric'
        />
      </IntlProvider>
      ) // Custom cell components!
    },
     {
      id: d => d.id, // Required because our accessor is not a string
      Header: 'Status',
      //accessor: d => String(d.collected) // Custom value accessors!
      accessor: d => d.collected ? 'Completed' : 'Pending' // Custom value accessors!
    }
    //, {
    //   Header: props => <span>Friend Age</span>, // Custom header components!
    //   accessor: 'friend.age'
    // }
  ]

    return (
      <LayoutContentWrapper>
        <ReactTable
          data={data}
          columns={columns}
        />
      </LayoutContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { collections, selectedId, editView } = state.OilCollectionRecords;
  return {
    collections,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchAllCollectionRecords,
  })(OilCollectionRecords);
// export { dataList };
