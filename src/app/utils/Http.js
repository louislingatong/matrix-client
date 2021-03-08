import axios from 'axios';
import store from '../store';
import ErrorParser from './ErrorParser';
import {authLogout} from '../store/authSlice';

// create new instance
const Http = axios.create();

// set default connect
Http.defaults.baseURL = process.env.REACT_APP_API_URL;
Http.defaults.headers.common.Accept = 'application/json';

/**
 * intercept the response so we can handle the
 * expected exceptions from the API
 */
Http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    /**
     * This could be a CORS issue or
     * a dropped internet connection.
     */
    if (typeof error.response === 'undefined') {
      return alert('A network error occurred.');
    }

    switch (error.response.status) {
      case 401:
      case 403:
        const state = store.getState();
        if (state.auth.isAuthenticated) {
          store.dispatch(authLogout());
        }
        break;
      case 500:
      case 562:
      case 563:
      case 567:
      case 568:
      case 570:
        if (error.response.data && error.response.data.error) {
          console.log(error.response.data.error) // show error
        }
        break;
      default:
        break;
    }

    const parsedError = ErrorParser.parse(error);

    return Promise.reject(parsedError);
  },
);

export default Http;
