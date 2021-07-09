import { 
  GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_FAILURE,
  GET_SALES_REQUEST, GET_SALES_SUCCESS, GET_SALES_FAILURE,
  RESET_SALES 
} from './itemTypes'

const initialState = {
  loading: false,
  items: [],
  error: '',
  sales: []
}

const itemReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ITEM_REQUEST: 
    case GET_SALES_REQUEST: return {
      ...state,
      loading: true
    }
    case GET_ITEM_SUCCESS: return {
      ...state,
      loading: false,
      items: action.payload,
      error: ''
    }
    case GET_ITEM_FAILURE: return {
      loading: false,
      items: [],
      error: action.payload
    }
    case GET_SALES_SUCCESS: return {
      ...state,
      loading: false,
      sales: action.payload,
      error: ''
    }
    case GET_SALES_FAILURE: return {
      loading: false,
      sales: [],
      error: action.payload
    }
    case RESET_SALES: return {
      ...state,
      sales: []
    }
    default: return state
  }
}

export default itemReducer