import axios from 'axios';
import {APP_CONSTANTS} from '../utils/Constants';

export default axios.create({
  baseURL: APP_CONSTANTS.baseAPIURL,
});
