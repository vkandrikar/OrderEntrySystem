import { combineReducers } from 'redux'
import orderReducer from './order/orderReducer'
import itemReducer from './item/itemReducer'

const rootReducer = combineReducers({
  order: orderReducer,
  item: itemReducer
});

export default rootReducer;