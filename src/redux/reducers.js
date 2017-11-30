import App from './app/reducer';
import {login, register, user} from './authorize/reducers/auth'
import Users from './users/reducer'
import Trucks from './trucks/reducers'

export default {
  App,
  login,
  register,
  user,
  Users,
  Trucks
};
