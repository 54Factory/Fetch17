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
import { SetUpsWrapper } from './setups.style';

const {
  fetchSetUps,
  changeSetUp,
  addSetUp,
  editSetUp,
  deleteSetUp,
  viewChange
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
      addSetUp,
      editSetUp,
      deleteSetUp,
      viewChange
    } = this.props;
    const selectedSetUp = selectedId
      ? setups.filter(setup => setup.id === selectedId)[0]
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
                  onClick={addSetUp}
                  className="AddSetUpBtn"
                >
                  <IntlMessages id="setUplist.addNewSetUp" />
                </Button>
              </div>
              {editView ? (
                <EditSetUpView
                  setup={selectedSetUp}
                  editSetUp={editSetUp}
                  otherAttributes={otherAttributes}
                />
              ) : (
                <SingleSetUpView
                  setup={selectedSetUp}
                  otherAttributes={otherAttributes}
                />
                
              )}
            </Content>
          ) : (
            <div className="SetUpControl">
              <Button
                type="primary"
                onClick={addSetUp}
                className="AddSetUpBtn"
              >
                <IntlMessages id="setUplist.addNewSetUp" />
              </Button>
            </div>
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
  addSetUp,
  editSetUp,
  deleteSetUp,
  viewChange
})(SetUps);
