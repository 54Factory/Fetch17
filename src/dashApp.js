import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import PublicRoutes from './router';
import { client } from './client';
import { ApolloProvider } from 'react-apollo'

const DashApp = () => (
  <ApolloProvider store={store} client={client}> 
    <Provider store={store}>
      <PublicRoutes history={history} />
    </Provider>
  </ApolloProvider>
  );

export default DashApp;
