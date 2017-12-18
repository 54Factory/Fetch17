import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../../components/uielements/menu';
import IntlMessages from '../../../components/utility/intlMessages';
import SidebarWrapper from '../sidebar.style';
import * as SidebarAction from '../../../redux/sidebar/actions';
import appActions from '../../../redux/app/actions';
import Logo from '../../../components/utility/logo';
import { rtl } from '../../../config/withDirection';
import { getCurrentTheme } from '../../ThemeSwitcher/config';
import { themeConfig } from '../../../config';
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;

const { fetchUserForSidebar } = SidebarAction


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

componentWillMount() {
  
  this.props.fetchUserForSidebar(this.props.user.userId)
  console.log('Will Mount ---->', this.props)
}

  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0',
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  render() {
    
    const { url, app, toggleOpenDrawer, truckType, fetched } = this.props;
    console.log(truckType)    
    const customizedTheme = getCurrentTheme('sidebarTheme', themeConfig.theme);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };

    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor
    };


    // if(truckType) {
    //   switch (role) {
    //     case 'ADMIN':
    //       console.log('ADMIN Route')
    //       return <AdminApp url={url}/>
    //     case 'DRIVER':
    //       console.log('DRIVER Route')
    //       return <DriverApp url={url}/>
    //     default:
    //       console.log('No Roles Defined')
    //       return <SignIn />
    //   }
    // }
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="Sidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
          {truckType === 'Oil Collection' && fetched ?
            <Menu
            onClick={this.handleClick}
            theme="dark"
            mode={mode}
            openKeys={collapsed ? [] : app.openKeys}
            selectedKeys={app.current}
            onOpenChange={this.onOpenChange}
            className="DashboardMenu"
          >
          <Menu.Item key="dashboard">
            <Link to={`${url.path}`}>
              <span className="MenuHolder" style={submenuColor}>
                <i className="ion-ios-speedometer" />
                <span className="nav-text">
                  <IntlMessages id="sidebar.dashboard" />
                </span>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="locations">
            <Link to={`${url.path}/locations`}>
              <span className="MenuHolder" style={submenuColor}>
                <i className="ion-location" />
                <span className="nav-text">
                  <IntlMessages id="sidebar.locations" />
                </span>
              </span>
            </Link>
          </Menu.Item>        
          <Menu.Item key="oilcollection">
            <Link to={`${url.path}/oilcollection`}>
              <span className="MenuHolder" style={submenuColor}>
                <i className="ion-waterdrop" />
                <span className="nav-text">
                  <IntlMessages id="sidebar.oilCollection" />
                </span>
              </span>
            </Link>
          </Menu.Item>            
        <Menu.Item key="trucks">
          <Link to={`${url.path}/trucks`}>
              <span className="MenuHolder" style={submenuColor}>
                <i className="ion-android-bus" />
                <span className="nav-text">
                  <IntlMessages id="sidebar.trucks" />
                </span>
              </span>
            </Link>
          </Menu.Item>
            <Menu.Item key="driverPage">
              <Link to={`${url.path}/driverPage`}>
                <span className="MenuHolder" style={submenuColor}>
                  <i className="ion-document" />
                  <span className="nav-text">
                    <IntlMessages id="sidebar.driver.driverPage" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
          </Menu>          
          : 
          <Menu
          onClick={this.handleClick}
          theme="dark"
          mode={mode}
          openKeys={collapsed ? [] : app.openKeys}
          selectedKeys={app.current}
          onOpenChange={this.onOpenChange}
          className="DashboardMenu"
        >
        <Menu.Item key="dashboard">
          <Link to={`${url.path}`}>
            <span className="MenuHolder" style={submenuColor}>
              <i className="ion-ios-speedometer" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard" />
              </span>
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="locations">
          <Link to={`${url.path}/locations`}>
            <span className="MenuHolder" style={submenuColor}>
              <i className="ion-location" />
              <span className="nav-text">
                <IntlMessages id="sidebar.locations" />
              </span>
            </span>
          </Link>
        </Menu.Item>        
        <Menu.Item key="oilcollection">
          <Link to={`${url.path}/oilcollection`}>
            <span className="MenuHolder" style={submenuColor}>
              <i className="ion-waterdrop" />
              <span className="nav-text">
                <IntlMessages id="sidebar.oilCollection" />
              </span>
            </span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="setups"
          title={
          (
            <span className="MenuHolder" style={submenuColor}>
              <i className="ion-cube" />
              <span className="nav-text">
                <IntlMessages id="sidebar.setups" />
              </span>
            </span>
          )
        }>
          <Menu.Item style={submenuStyle} key="pendingSetUps">
            <Link style={submenuColor} to={`${url.path}/pendingSetups`}>
              <IntlMessages id="sidebar.pendingSetups" />
            </Link>
          </Menu.Item>
          <Menu.Item style={submenuStyle} key="completedSetUps">
            <Link style={submenuColor} to={`${url.path}/completedSetups`}>
              <IntlMessages id="sidebar.completedSetups" />
            </Link>
          </Menu.Item>
        </SubMenu>             
      <Menu.Item key="trucks">
        <Link to={`${url.path}/trucks`}>
            <span className="MenuHolder" style={submenuColor}>
              <i className="ion-android-bus" />
              <span className="nav-text">
                <IntlMessages id="sidebar.trucks" />
              </span>
            </span>
          </Link>
        </Menu.Item>
          <Menu.Item key="driverPage">
            <Link to={`${url.path}/driverPage`}>
              <span className="MenuHolder" style={submenuColor}>
                <i className="ion-document" />
                <span className="nav-text">
                  <IntlMessages id="sidebar.driver.driverPage" />
                </span>
              </span>
            </Link>
          </Menu.Item>
        </Menu>          
          }

          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

function mapStateToProps(state) {
  const app = state.App.toJS()
  const { truckType, fetched } = state.Sidebar;
  return {
    app,
    truckType,
    fetched
  };
}

export default connect(mapStateToProps,
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed, fetchUserForSidebar }
)(Sidebar);

// function mapStateToProps(state) {
//   const { truckType, fetched } = state.Sidebar;
//   const { app } = state.App
//   return {
//     app,
//     truckType,
//     fetched
//   };
// }
// export default connect(mapStateToProps, {
//   fetchUserForSidebar,
//   toggleOpenDrawer, 
//   changeOpenKeys, 
//   changeCurrent, 
//   toggleCollapsed
// })(Sidebar);
