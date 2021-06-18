import axios from 'axios'

import { 
  GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_FAILURE,
  GET_SALES_REQUEST, GET_SALES_SUCCESS, GET_SALES_FAILURE  
} from './itemTypes'

export const getItemRequest = () => {
  return {
    type: GET_ITEM_REQUEST
  }
}

export const getItemSuccess = (orders) => {
  return {
    type: GET_ITEM_SUCCESS,
    payload: orders
  }
}

export const getItemFailure = (error) => {
  return {
    type: GET_ITEM_FAILURE,
    payload: error
  }
}

export const getSalesRequest = () => {
  return {
    type: GET_SALES_REQUEST
  }
}

export const getSalesSuccess = (orders) => {
  return {
    type: GET_SALES_SUCCESS,
    payload: orders
  }
}

export const getSalesFailure = (error) => {
  return {
    type: GET_SALES_FAILURE,
    payload: error
  }
}

export const getItems = () => {
  return async (dispatch) => {
    dispatch(getItemRequest());

    try {
      const result = await axios.post("http://localhost:8900/orderentrysystem",
        {
          query: `
          query {
            items {
              id
              code
              description
              rate
              tax
            }
          }
        `
        }
      );
      //console.log(result.data.data);
      dispatch(getItemSuccess(result.data.data));
    } catch (err) {
      dispatch(getItemFailure(err.message))
    }
  }
}

export const getSalesData = () => {
  return async (dispatch) => {
    dispatch(getSalesRequest());

    try {
      const result = await axios.post("http://localhost:8900/orderentrysystem",
        {
          query: `
          query {
            sales {
              item_id
              code
              sale_count
            }
          }
        `
        }
      );
      //console.log(result.data.data);
      dispatch(getSalesSuccess(result.data.data));
    } catch (err) {
      dispatch(getSalesFailure(err.message))
    }
  }
}
