import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as DriverAction from '../../redux/drivers/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import DriverList from '../../components/drivers/driverList';
import SingleDriverView from '../../components/drivers/singleView';
import CreateDriver from './addDriver'
import EditDriverView from '../../components/drivers/editView';

//import DeleteButton from '../../components/drivers/deleteButton';
import IntlMessages from '../../components/utility/intlMessages';
import { DriversWrapper } from './drivers.style';
const { Content } = Layout;

const {
  fetchDrivers,
  fetchDriverUser,
  changeDriver,
  viewChange,
  viewMainPanel,
  viewAddDriver,
} = DriverAction;




class Drivers extends Component {
  componentWillMount() {
    this.props.fetchDrivers()
    this.props.fetchDriverUser()
  }



  render() {

    const {    
      drivers,
      users,
      selectedId,
      editView,
      changeDriver,   
      editDriver,
      deleteDriver,
      viewChange,
      viewMainPanel
    } = this.props;
    
    const selectedDriver = selectedId
      ? drivers.filter(driver => driver.id === selectedId)[0]
      : null;
    
    const onViewChange = () => viewChange(!editView);
    const onPanelChange = () => viewMainPanel(editView);
    
    
      const otherAttributes = [
      { title: 'License #', value: 'dlNumber', type: 'license' }
    ];
    const driverAttributes = [
      { title: 'Assigned Truck', value: 'name', type: 'name' }
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
                <Button
                  type="primary"
                  onClick={onPanelChange}
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
                  driverAttributes={driverAttributes}
                />
              ) : (
                <SingleDriverView
                  driver={selectedDriver}
                  otherAttributes={otherAttributes}
                  driverAttributes={driverAttributes}
                />
              )}
            </Content>
          ) : (
            <CreateDriver 
              users={users}
            />
          )}
        </Layout>
      </DriversWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { drivers, users, selectedId, editView, newDriverView } = state.Drivers;
  return {
    drivers,
    users,
    selectedId,
    editView,
    newDriverView
  };
}
export default connect(mapStateToProps, {
  fetchDrivers,
  fetchDriverUser,
  changeDriver,
  viewChange,
  viewMainPanel,
  viewAddDriver
})(Drivers);
