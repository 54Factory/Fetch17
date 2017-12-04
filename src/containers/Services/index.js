import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ServicesAction from '../../redux/services/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import ServiceList from '../../components/services/serviceList';
import SingleServiceView from '../../components/services/singleView';
import EditServiceView from '../../components/services/editView';
import IntlMessages from '../../components/utility/intlMessages';
import ServicesMap from '../../components/maps/service/serviceMap'
import { ServicesWrapper } from './services.style';

const {
  fetchServices,
  changeService,
  editService,
  deleteService,
  viewChange,
  viewMap
} = ServicesAction;

const { Content } = Layout;
class Services extends Component {
  componentWillMount() {
    this.props.fetchServices()
  }

  render() {
    const {    
      services,
      selectedId,
      editView,
      changeService,
      editService,
      deleteService,
      viewChange,
      viewMap
    } = this.props;
    
    const selectedService = selectedId
      ? services.filter(service => service.id === selectedId)[0]
      : null;
    
    const onViewChange = () => viewChange(!editView);
    const onMapChange = () => viewMap(editView);

    const containerAttributes = [
      { title: 'Quantity', value: 'quantity', type: 'number' },
      { title: 'Container', value: 'containerType', type: 'name' }    
    ];

    const setUpAttributes = [
      { title: 'Requested Setup Date', value: 'setUpDate', type: 'date' },
    ]

    const truckAttributes = [
      { title: 'Truck', value: 'description', type: 'name' }
    ]

    console.log(this.props);
    return (
      <div>
      <ServicesWrapper
        className="Services"
        style={{ background: 'none' }}
      >        
        <div className="ServiceListBar">
          <ServiceList
            services={services}
            selectedId={selectedId}
            changeService={changeService}
            deleteService={deleteService}
          />
        </div>
        <Layout className="ServiceBoxWrapper">
          {selectedService ? (
            <Content className="ServiceBox">
              <div className="ServiceControl">
                <Button
                  type="primary"
                  onClick={onMapChange}
                  className="BackBtn"
                >
                  <IntlMessages id="servicelist.backButton" />
                </Button>
                <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="cross" /> : <Icon type="check" />}{' '}
                </Button>
              </div>
              {editView ? (
                <EditServiceView
                  service={selectedService}
                  editService={editService}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                />
              ) : (
                <SingleServiceView
                  service={selectedService}
                  containerAttributes={containerAttributes}
                  setUpAttributes={setUpAttributes}
                  truckAttributes={truckAttributes}
                  services={services}
                />
              )}
            </Content>
          ) : (
            <Content className="ServiceBox">
            <ServicesMap 
              markers={services}
            />
          </Content>
          )}
        </Layout>
      </ServicesWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { services, selectedId, editView } = state.Services;
  return {
    services,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchServices,
  changeService,
  editService,
  deleteService,
  viewChange,
  viewMap
})(Services);
