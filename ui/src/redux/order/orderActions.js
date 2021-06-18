import axios from 'axios'

import { 
  GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_REQUEST
 } from './orderTypes'

export const getOrderRequest = () => {
  return {
    type: GET_ORDER_REQUEST
  }
}

export const getOrderSuccess = (orders) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: orders
  }
}

export const getOrderFailure = (error) => {
  return {
    type: GET_ORDER_FAILURE,
    payload: error
  }
}

export const placeOrderRequest = () => {
  return {
    type: PLACE_ORDER_REQUEST
  }
}

export const placeOrderSuccess = (orders) => {
  return {
    type: PLACE_ORDER_SUCCESS,
    payload: orders
  }
}

export const placeOrderFailure = (error) => {
  return {
    type: PLACE_ORDER_FAILURE,
    payload: error
  }
}

export const deleteOrderRequest = () => {
  return {
    type: DELETE_ORDER_REQUEST
  }
}

export const deleteOrderSuccess = (orders) => {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload: orders
  }
}

export const deleteOrderFailure = (error) => {
  return {
    type: DELETE_ORDER_FAILURE,
    payload: error
  }
}

export const updateOrderRequest = () => {
  return {
    type: UPDATE_ORDER_REQUEST
  }
}

export const updateOrderSuccess = (orders) => {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload: orders
  }
}

export const updateOrderFailure = (error) => {
  return {
    type: UPDATE_ORDER_FAILURE,
    payload: error
  }
}

export const getOrders = () => {
  return async (dispatch) => {
    dispatch(getOrderRequest());

    try {
      const result = await axios.post("http://localhost:8900/orderentrysystem",
        {
          query: `
          query {
            orders(order_id:null, customer_name: null, is_items: true) {
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

export const searchOrders = (args) => {
  return async (dispatch) => {
    dispatch(getOrderRequest());

    try {
      const result = await axios.post("http://localhost:8900/orderentrysystem",
        {
          query: `
          query {
            orders(order_id:${args.orderId}, customer_name: "${args.customerName}", is_items: true) {
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
      const result = await axios.post("http://localhost:8900/orderentrysystem",
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
      const result = await axios.post("http://localhost:8900/orderentrysystem",
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
      const result = await axios.post("http://localhost:8900/orderentrysystem",
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