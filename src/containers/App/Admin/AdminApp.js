import React from 'react';
import { connect } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { Debounce } from 'react-throttle';
import { WindowResizeListener } from 'react-window-resize-listener';
import { ThemeProvider } from 'styled-components';
import * as actionTypes from '../../../redux/authorize/actions';
import appActions from '../../../redux/app/actions';
import Sidebar from '../../Sidebar/Admin/Sidebar';
import Topbar from '../../Topbar/Topbar';
import AdminRouter from './AdminRouter';
import { siteConfig } from '../../../config.js';
import { AppLocale } from '../../../index';
import themes from '../../../config/themes';
import { themeConfig } from '../../../config';
import AppHolder from '.././commonStyle';
import '.././global.css';

const { Content, Footer } = Layout;
const { logoutUser } = actionTypes;
const { toggleAll } = appActions;


export class AdminApp extends React.Component {
  render() {
    console.log(this.props);
    const currentAppLocale = AppLocale.en;
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <ThemeProvider theme={themes[themeConfig.theme]}>
            <AppHolder>
              <Layout style={{ height: '100vh' }}>
                <Debounce time="1000" handler="onResize">
                  <WindowResizeListener
                    onResize={windowSize =>
                      this.props.toggleAll(
                        windowSize.windowWidth,
                        windowSize.windowHeight
                      )}
                  />
                </Debounce>
                <Topbar url={this.props.url} />
                <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                  <Sidebar url={this.props.url} />
                  <Layout
                    className="ContentMainLayout"
                    style={{
                      height: '100vh',
                    }}
                  >
                    <Content
                      className="Content"
                      style={{
                        padding: '70px 0 0',
                        flexShrink: '0',
                        background: '#f1f3f6',
                      }}
                    >
                      <AdminRouter url={this.props.url} />
                    </Content>
                    <Footer
                      style={{
                        background: '#ffffff',
                        textAlign: 'center',
                        borderTop: '1px solid #ededed',
                      }}
                    >
                      {siteConfig.footerText}
                    </Footer>
                  </Layout>
                </Layout>
              </Layout>
            </AppHolder>
          </ThemeProvider>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.user,

});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logoutUser());
  },
  toggleAll
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp);

// export default connect(
//   state => ({
//     auth: state.Auth
//   }),
//   { logout, toggleAll }
// )(App);
