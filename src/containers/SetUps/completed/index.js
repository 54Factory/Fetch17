import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SetUpsAction from '../../../redux/setups/actions';
import { Layout, Icon } from 'antd';
import Button from '../../../components/uielements/button';
import CompletedSetUpList from '../../../components/setups/completedSetUpList';
import SingleSetUpView from '../../../components/setups/singleView';
import EditSetUpView from '../../../components/setups/editView';
import IntlMessages from '../../../components/utility/intlMessages';
import CompletedSetUpsMap from '../../../components/maps/setups/completedSetUpsMap'
import { SetUpsWrapper } from '../setups.style';

const {
  fetchCompletedSetUps,
  changeSetUp,
  editSetUp,
  deleteSetUp,
  viewChange,
  viewMap
} = SetUpsAction;

const { Content } = Layout;
class SetUps extends Component {
  componentWillMount() {
    this.props.fetchCompletedSetUps()
  }

  render() {
    const {    
      setups,
      selectedId,
      editView,
      changeSetUp,
      editSetUp,
      deleteSetUp,
      viewChange,
      viewMap
    } = this.props;
    
    const selectedSetUp = selectedId
      ? setups.filter(setup => setup.id === selectedId)[0]
      : null;
    
    const onViewChange = () => viewChange(!editView);
    const onMapChange = () => viewMap(editView);

    const containerAttributes = [
      { title: 'Quantity', value: 'quantity', type: 'number' },
      { title: 'Container', value: 'containerType', type: 'name' }    
    ];

    const setUpAttributes = [
      { title: 'Requested Setup Date', value: 'setUpDate', type: 'date' },
      { title: 'Actual Setup Date', value: 'actualSetUpDate', type: 'date' }
    ]

    const truckAttributes = [
      { title: 'Truck', value: 'description', type: 'name' }
    ]





    console.log(this.props);
    return (
      <div>
      <SetUpsWrapper
        className="SetUps"
        style={{ background: 'none' }}
      >        
        <div className="SetUpListBar">
          <CompletedSetUpList
            setups={setups}
            selectedId={selectedId}
            changeSetUp={changeSetUp}
            deleteSetUp={deleteSetUp}
          />
        </div>
        <Layout className="SetUpBoxWrapper">
          {selectedSetUp ? (
            <Content className="SetUpBox">
              <div className="SetUpControl">
                <Button
                  type="primary"
                  onClick={onMapChange}
                  className="BackBtn"
                >
                  <IntlMessages id="setUplist.backButton" />
                </Button>
                {/* <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="cross" /> : <Icon type="check" />}{' '}
                </Button> */}
              </div>
              {editView ? (
                <EditSetUpView
                  setup={selectedSetUp}
                  editSetUp={editSetUp}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                />
              ) : (
                <SingleSetUpView
                  setup={selectedSetUp}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                  truckAttributes={truckAttributes}
                  setups={setups}
                />
              )}
            </Content>
          ) : (
            <Content className="SetUpBox">
            <CompletedSetUpsMap 
              markers={setups}
            />
          </Content>
          )}
        </Layout>
      </SetUpsWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { setups, selectedId, editView } = state.SetUps;
  return {
    setups,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchCompletedSetUps,
  changeSetUp,
  editSetUp,
  deleteSetUp,
  viewChange,
  viewMap
})(SetUps);
