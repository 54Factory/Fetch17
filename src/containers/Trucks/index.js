import React from 'react';
import { connect } from 'react-redux';
import * as TruckAction from '../../redux/trucks/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import TruckList from '../../components/trucks/truckList';
import SingleTruckView from '../../components/trucks/singleView';
import EditTruckView from '../../components/trucks/editView';
import AssignDriverToTruck from '../../components/trucks/assignDriverToTruck';
import DeleteButton from '../../components/trucks/deleteButton';
import IntlMessages from '../../components/utility/intlMessages';
import { TrucksWrapper } from './trucks.style';

const {
  fetchTrucks,
  changeTruck,
  addTruck,
  editTruck,
  deleteTruck,
  viewChange
} = TruckAction;



const { Content } = Layout;
class Trucks extends React.Component {
  componentWillMount() {
    this.props.fetchTrucks()
  }
  render() {

    const {    
      trucks,
      selectedId,
      editView,
      changeTruck,
      addTruck,
      editTruck,
      deleteTruck,
      viewChange
    } = this.props;
    const selectedTruck = selectedId
      ? trucks.filter(truck => truck.id === selectedId)[0]
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
      <div>
        <div className="TruckAssignDriver">
          <AssignDriverToTruck
            handleSubmit={this.handleSubmit}
          />
        </div>
      <TrucksWrapper
        className="Trucks"
        style={{ background: 'none' }}
      >        
        <div className="TruckListBar">
          <TruckList
            trucks={trucks}
            selectedId={selectedId}
            changeTruck={changeTruck}
            deleteTruck={deleteTruck}
          />
        </div>
        <Layout className="TruckBoxWrapper">
          {selectedTruck ? (
            <Content className="TruckBox">
              <div className="TruckControl">
                <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
                </Button>
                <DeleteButton
                  deleteTruck={deleteTruck}
                  truck={selectedTruck}
                />
                <Button
                  type="primary"
                  onClick={addTruck}
                  className="AddTruckBtn"
                >
                  <IntlMessages id="trucklist.addNewTruck" />
                </Button>
              </div>
              {editView ? (
                <EditTruckView
                  truck={selectedTruck}
                  editTruck={editTruck}
                  otherAttributes={otherAttributes}
                />
              ) : (
                <SingleTruckView
                  truck={selectedTruck}
                  otherAttributes={otherAttributes}
                />
                
              )}
            </Content>
          ) : (
            <div className="TruckControl">
              <Button
                type="primary"
                onClick={addTruck}
                className="AddTruckBtn"
              >
                <IntlMessages id="trucklist.addNewTruck" />
              </Button>
            </div>
          )}
        </Layout>
      </TrucksWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { trucks, selectedId, editView } = state.Trucks;
  return {
    trucks,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchTrucks,
  changeTruck,
  addTruck,
  editTruck,
  deleteTruck,
  viewChange
})(Trucks);
