import { 
  GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE, DELETE_ORDER_SUCCESS, DELETE_ORDER_REQUEST,
  UPDATE_ORDER_FAILURE, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_REQUEST
 } from './orderTypes'

const initialState = {
  loading: false,
  orders: [],
  error: '',
  orderMsg: null
}

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDER_REQUEST: return {
      ...state,
      orderMsg: null,
      loading: true
    }
    case GET_ORDER_SUCCESS: return {
      orderMsg: null,
      loading: false,
      orders: action.payload,
      error: ''
    }
    case GET_ORDER_FAILURE: return {
      ...state,
      loading: false,
      orders: [],
      error: action.payload
    }
    case PLACE_ORDER_REQUEST: 
    case UPDATE_ORDER_REQUEST: 
    case DELETE_ORDER_REQUEST: return {
      ...state,
      orderMsg:null,
      loading: true
    }
    case PLACE_ORDER_SUCCESS: 
    case UPDATE_ORDER_SUCCESS: 
    case DELETE_ORDER_SUCCESS: return {
      ...state,
      loading: false,
      orderMsg: action.payload,
      error: ''
    }
    case PLACE_ORDER_FAILURE: 
    case UPDATE_ORDER_FAILURE: 
    case DELETE_ORDER_FAILURE: return {
      ...state,
      loading: false,
      orderMsg: null,
      error: action.payload
    }
    default: return state
  }
}

export default orderReducer