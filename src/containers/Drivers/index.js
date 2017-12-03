import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as DriverAction from '../../redux/drivers/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import DriverList from '../../components/drivers/driverList';
import SingleDriverView from '../../components/drivers/singleView';
import EditDriverView from '../../components/drivers/editView';
import DeleteButton from '../../components/drivers/deleteButton';
import IntlMessages from '../../components/utility/intlMessages';
import { DriversWrapper } from './drivers.style';

const {
  fetchDrivers,
  changeDriver,
  addDriver,
  editDriver,
  deleteDriver,
  viewChange
} = DriverAction;



const { Content } = Layout;
class Drivers extends Component {
  componentWillMount() {
    this.props.fetchDrivers()
  }
  render() {

    const {    
      drivers,
      selectedId,
      editView,
      changeDriver,
      addDriver,
      editDriver,
      deleteDriver,
      viewChange
    } = this.props;
    
    const selectedDriver = selectedId
      ? drivers.filter(driver => driver.id === selectedId)[0]
      : null;
    
      const onViewChange = () => viewChange(!editView);
    const otherAttributes = [
      { title: 'First Name', value: 'firstName', type: 'name' },
      { title: 'Last Name', value: 'lastName', type: 'name' },
      { title: 'Email', value: 'email', type: 'email' },
      { title: 'Role', value: 'role', type: 'position' },
      { title: 'Notes', value: 'note', type: 'paragraph' }
    ];
    
    console.log(this.props);
    return (
      <DriversWrapper
        className="Drivers"
        style={{ background: 'none' }}
      >
        <div className="DriverListBar">
          <DriverList
            drivers={drivers}
            selectedId={selectedId}
            changeDriver={changeDriver}
            deleteDriver={deleteDriver}
          />
        </div>
        <Layout className="DriverBoxWrapper">
          {selectedDriver ? (
            <Content className="DriverBox">
              <div className="DriverControl">
                <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
                </Button>
                <DeleteButton
                  deleteDriver={deleteDriver}
                  driver={selectedDriver}
                />
                <Button
                  type="primary"
                  onClick={addDriver}
                  className="BackBtn"
                >
                  <IntlMessages id="driverlist.backButton" />
                </Button>
              </div>
              {editView ? (
                <EditDriverView
                  driver={selectedDriver}
                  editDriver={editDriver}
                  otherAttributes={otherAttributes}
                />
              ) : (
                <SingleDriverView
                  driver={selectedDriver}
                  otherAttributes={otherAttributes}
                />
              )}
            </Content>
          ) : (
            <div className="DriverControl">
              <Button
                type="primary"
                onClick={addDriver}
                className="BackBtn"
              >
                <IntlMessages id="driverlist.backButton" />
              </Button>
            </div>
          )}
        </Layout>
      </DriversWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { drivers, selectedId, editView } = state.Drivers;
  return {
    drivers,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchDrivers,
  changeDriver,
  addDriver,
  editDriver,
  deleteDriver,
  viewChange
})(Drivers);
