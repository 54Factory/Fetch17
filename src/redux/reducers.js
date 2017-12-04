import App from './app/reducer';
import {login, register, user} from './authorize/reducers/auth'
import Users from './users/reducer'
import Trucks from './trucks/reducers'
import Locations from './locations/reducers'
import SetUps from './setups/reducers'
import Drivers from './drivers/reducer'
import Services from './services/reducers'

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
  Services
};
