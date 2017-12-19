import React from 'react';
import { connect } from 'react-redux';
import * as RecordsAction from '../../redux/oilCollectionRecords/actions';
import ReactTable from 'react-table';
import { FormattedDate, IntlProvider } from 'react-intl'
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import 'react-table/react-table.css'

const {
  fetchAllCollectionRecords
} = RecordsAction;


class OilCollectionRecords extends React.Component {

  
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
      id: 'nextCollection',
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
      id: 'collected', // Required because our accessor is not a string
      Header: 'Status',
      accessor: 'collected', // Custom value accessors!
      //accessor: d => d.collected ? 'Completed' : 'Pending' // Custom value accessors!
      Cell: props => (
          <div>{props.value ? <p style={{ color: 'green' }}>Completed</p> : <p style={{ color: '#efd402' }}>Pending</p>}</div>
        )
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
          defaultPageSize={10}
          className="-striped -highlight"
          defaultSorted={[
            {
              id: 'nextCollection',
              asc: true
            }
          ]}
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
