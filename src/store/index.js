import { createStore, bindActionCreators } from 'redux';
import * as vsdbmActions from './actions';

import vsdbm from './reducer';

export const Store = createStore(vsdbm);

export const MapDispatch = dispatch => bindActionCreators(vsdbmActions, dispatch);

export default Store;