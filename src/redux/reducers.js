import App from './app/reducer';
import {login, register, user} from './authorize/reducers/auth'
import Users from './users/reducer'
import Trucks from './trucks/reducers'
import SetUpTruck from './trucks/setUpTruck/reducers'
import Locations from './locations/reducers'
import SetUps from './setups/reducers'
import Drivers from './drivers/reducer'
import Services from './services/reducers'
import Collections from './oilCollections/reducers'
import OilCollectionRecords from './oilCollectionRecords/reducers'
import Sidebar from './sidebar/reducers'

export default {
  App,
  login,
  register,
  user,
  Users,
  Trucks,
  Locations,
  SetUps,
  Drivers,
  Services,
  Collections,
  OilCollectionRecords,
  SetUpTruck,
  Sidebar
};
