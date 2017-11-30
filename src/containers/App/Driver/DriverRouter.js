import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../../helpers/AsyncFunc';


class DriverRouter extends React.Component {
  render() {
    const { url } = this.props.url;
    return (
      <Switch>
        <Route
          exact
          path={`${url}`}
          component={asyncComponent(() => import('../../driverDashboard'))}
        />
        <Route
          exact
          path={`${url}/locations`}
          component={asyncComponent(() => import('../../Locations'))}
        />
        {/* <Route
          exact
          path={`${url}/oilcollection`}
          component={asyncComponent(() => import("../../OilCollection/Driver"))}
        />
        <Route
          path={`${url}/pendingCollections/:truckName`}
          component={asyncComponent(() => import("../../../components/oilCollection/driverComponents/pendingCollections"))}
        />
        <Route
          path={`${url}/collectionRecord/:id`}
          component={asyncComponent(() => import("../../../components/oilCollection/driverComponents/records"))}
        /> */}
        <Route
          exact
          path={`${url}/driverPage`}
          component={asyncComponent(() => import('../../driverPage'))}
        />
      </Switch>
    );
  }
}

export default DriverRouter;
