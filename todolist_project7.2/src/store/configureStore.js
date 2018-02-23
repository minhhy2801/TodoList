import {createStore} from 'redux';
import reducer from '../reducers';

export default () => {
  return createStore(reducer);
}

//getState()
//dispatch(action): call 1 action
//subscrible(listener): listen to render View
