import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminDashBoard from '../../adminDashboard'
import asyncComponent from '../../../helpers/AsyncFunc';





class AdminRouter extends React.Component {
  render() {
    const { url } = this.props.url;

    return (
      <Switch>
        <Route
          exact
          path={`${url}`}
          component={AdminDashBoard}
        />
        <Route 
          exact
          path={`${url}/create`}
          component={asyncComponent(() => import("../../Create/NewOilCollectionCustomer"))}
        />
        <Route
          exact
          path={`${url}/customers`}
          component={asyncComponent(() => import('../../Customers'))}
        />
        <Route
          path={`${url}/customers/:id/edit`}
          component={asyncComponent(() => import("../../../components/customers/editPage"))}
        />
        <Route
          path={`${url}/customers/:id`}
          component={asyncComponent(() => import("../../Customers/customerPage"))}
        />
        <Route
          exact
          path={`${url}/locations`}
          component={asyncComponent(() => import("../../Locations"))}
        />
        {/* <Route
          path={`${url}/locations/:id`}
          component={asyncComponent(() => import("../../Locations/locationPage"))}
        /> */}
        <Route
          exact
          path={`${url}/pendingSetUps`}
          component={asyncComponent(() => import("../../SetUps"))}
        />
        {/* <Route
          exact
          path={`${url}/completedSetups`}
          component={asyncComponent(() => import("../../SetUps/completedSetUps"))}
        />
        <Route
          path={`${url}/setups/:id`}
          component={asyncComponent(() => import("../../SetUps/setUpPage"))}
        /> */}
        <Route
          exact
          path={`${url}/trucks`}
          component={asyncComponent(() => import("../../Trucks"))}
        />
        {/* <Route
          path={`${url}/trucks/:id`}
          component={asyncComponent(() => import("../../Trucks/truckPage"))}
        /> */}
        {/* <Route
          exact
          path={`${url}/drivers`}
          component={asyncComponent(() => import("../../Drivers"))}
        />
        <Route
          path={`${url}/drivers/:id`}
          component={asyncComponent(() => import("../../Drivers/driverPage"))}
        /> */}
        {/* <Route
          exact
          path={`${url}/oilcollection`}
          component={asyncComponent(() => import("../../OilCollection"))}
        />
        <Route
          exact
          path={`${url}/oilcollection/unassigned`}
          component={asyncComponent(() => import("../../../components/oilCollection/unassigned"))}
        />
        <Route
          path={`${url}/oilcollection/assignTruck/:id`}
          component={asyncComponent(() => import("../../../components/oilCollection/assign/assignPage"))}
        />
        <Route
          exact
          path={`${url}/oilcollection/pendingPickUps`}
          component={asyncComponent(() => import("../../../components/oilCollection/pendingPickUps"))}
        />
        <Route
          path={`${url}/collectionRecord/:id`}
          component={asyncComponent(() => import("../../../components/oilCollection/records"))}
        /> */}
        <Route
          exact
          path={`${url}/users`}
          component={asyncComponent(() => import("../../Users"))}
        />
        <Route
          exact
          path={`${url}/adminPage`}
          component={asyncComponent(() => import('../../adminPage'))}
        />
      </Switch>
    );
  }
}

export default AdminRouter;
