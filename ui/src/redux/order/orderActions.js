import axios from 'axios'

import {
  GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_REQUEST,
  RESET_ORDER
} from './orderTypes'

const API = process.env.REACT_APP_API_HOST;

const getOrderRequest = () => {
  return {
    type: GET_ORDER_REQUEST
  }
}

const getOrderSuccess = (orders) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: orders
  }
}

const getOrderFailure = (error) => {
  return {
    type: GET_ORDER_FAILURE,
    payload: error
  }
}

const placeOrderRequest = () => {
  return {
    type: PLACE_ORDER_REQUEST
  }
}

const placeOrderSuccess = (orders) => {
  return {
    type: PLACE_ORDER_SUCCESS,
    payload: orders
  }
}

const placeOrderFailure = (error) => {
  return {
    type: PLACE_ORDER_FAILURE,
    payload: error
  }
}

const deleteOrderRequest = () => {
  return {
    type: DELETE_ORDER_REQUEST
  }
}

const deleteOrderSuccess = (orders) => {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload: orders
  }
}

const deleteOrderFailure = (error) => {
  return {
    type: DELETE_ORDER_FAILURE,
    payload: error
  }
}

const updateOrderRequest = () => {
  return {
    type: UPDATE_ORDER_REQUEST
  }
}

const updateOrderSuccess = (orders) => {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload: orders
  }
}

const updateOrderFailure = (error) => {
  return {
    type: UPDATE_ORDER_FAILURE,
    payload: error
  }
}

const resetOrder = () => {
  return {
    type: RESET_ORDER
  }
}

export const resetOrderData = () => {
  return (dispatch) => {
    dispatch(resetOrder());
  }
}

export const getOrders = (args) => {
  return async (dispatch) => {
    dispatch(getOrderRequest());

    try {
      const result = await axios.post(API,
        {
          query: `
          query {
            orders(order_id:${args?.orderId ? args.orderId : 'null'}, customer_name: "${args?.customerName ? args.customerName : 'null'}", is_items: true) {
              total
              data {
                id
                order_date
                customer_name
                customer_address
                ship_date
                items {
                  id
                  code
                  description
                  rate
                  quantity
                  tax
                }
                gross_order_amount
                total_tax
                shipping_tax
                total_order_amount
              }
          }
        }
        `
        }
      );
      //console.log(result.data.data);
      dispatch(getOrderSuccess(result.data.data));
    } catch (err) {
      dispatch(getOrderFailure(err.message))
    }
  }
}

export const placeOrder = (args) => {
  return async (dispatch) => {
    dispatch(placeOrderRequest());

    try {
      const result = await axios.post(API,
        {
          query: `
          mutation {
            placeOrder(
              orderInput: {
                customer_name: "${args.customerName}", 
                customer_address: "${args.customerAddress}", 
                items: [${args.items}], 
                order_type: ${args.type}
              }
            )
          }          
        `
        }
      );
      //console.log(result.data.data);
      dispatch(placeOrderSuccess(result.data.data));
    } catch (err) {
      dispatch(placeOrderFailure(err.message))
    }
  }
}

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    dispatch(deleteOrderRequest());

    try {
      const result = await axios.post(API,
        {
          query: `
          mutation {
            deleteOrder(order_id: ${orderId})
          }
        `
        }
      );
      //console.log(result.data.data);
      dispatch(deleteOrderSuccess(result.data.data));
    } catch (err) {
      dispatch(deleteOrderFailure(err.message))
    }
  }
}


export const updateOrder = (args) => {
  return async (dispatch) => {
    dispatch(updateOrderRequest());

    try {
      const result = await axios.post(API,
        {
          query: `
          mutation {
            updateOrder(
              orderInput: {
                id: ${args.id},
                customer_name: "${args.customerName}", 
                customer_address: "${args.customerAddress}", 
                items: [${args.items}], 
                order_type: ${args.type}
              }
            )
          }          
        `
        }
      );
      //console.log(result.data.data);
      dispatch(updateOrderSuccess(result.data.data));
    } catch (err) {
      dispatch(updateOrderFailure(err.message))
    }
  }
}