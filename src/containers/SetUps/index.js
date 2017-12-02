import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SetUpsAction from '../../redux/setups/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import SetUpList from '../../components/setups/setUpList';
import SingleSetUpView from '../../components/setups/singleView';
import EditSetUpView from '../../components/setups/editView';
import DeleteButton from '../../components/setups/deleteButton';
import IntlMessages from '../../components/utility/intlMessages';
import SetUpsMap from '../../components/maps/setups/pendingSetUpsMap'
import { SetUpsWrapper } from './setups.style';

const {
  fetchSetUps,
  changeSetUp,
  editSetUp,
  deleteSetUp,
  viewChange,
  viewMap
} = SetUpsAction;



const { Content } = Layout;
class SetUps extends Component {
  componentWillMount() {
    this.props.fetchSetUps()
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
      { title: 'Container', value: 'containerType', type: 'name' },
      { title: 'Quantity', value: 'quantity', type: 'number' }
    ];

    const setUpAttributes = [
      { title: 'Set Up Date', value: 'setUpDate', type: 'date' },
    ]



    console.log(this.props);
    return (
      <div>
      <SetUpsWrapper
        className="SetUps"
        style={{ background: 'none' }}
      >        
        <div className="SetUpListBar">
          <SetUpList
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
                <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
                </Button>
                <DeleteButton
                  deleteSetUp={deleteSetUp}
                  setup={selectedSetUp}
                />
                <Button
                  type="primary"
                  onClick={onMapChange}
                  className="BackBtn"
                >
                  <IntlMessages id="setUplist.backButton" />
                </Button>
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
                  setups={setups}
                />
              )}
            </Content>
          ) : (
            <Content className="SetUpBox">
            <SetUpsMap 
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
  fetchSetUps,
  changeSetUp,
  editSetUp,
  deleteSetUp,
  viewChange,
  viewMap
})(SetUps);
