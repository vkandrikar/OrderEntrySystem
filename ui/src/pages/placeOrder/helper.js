import { Form, Col, Alert } from 'react-bootstrap'

let selectedItems = [];

const handleOnChange = (evt, item) => {
  item["quantity"] = parseInt(evt.target.value);
  selectedItems[item.id] = item;
}

export const getSelectedItems = () => {
  return selectedItems;
}

export const setDefaultItems = (items) => {
  //console.log(items);
  if (items)
    selectedItems = items;
}

const checkItem = (item, array) => {
  if (!array || !item)
    return null;

  const result = array.filter((i) => {
    if (i && item.id === i.id)
      return i;
  })

  return result;
}

export const prepareItemList = (items, mode, existingItems) => {
  //console.log(items);
  //console.log(existingItems);
  if (items === null || items === undefined || items.length === 0) {
    return (
      <tr>
        <td colSpan="5">
          <Alert variant="secondary" className="text-center">
            Add Items
        </Alert>
        </td>
      </tr>
    )
  }

  return (items.map((item, index) => {
    if (item) {
      const matchItem = checkItem(item, existingItems);
      //console.log(matchItem)
      return (
        <tr key={index}>
          <td>{item.code}</td>
          <td>{item.description}</td>
          <td>{item.rate}</td>
          {
            mode === "ADD" ?
              <>
                <td>
                  <Form.Group as={Col} className="d-inline-block" controlId={`item_${index}`}>
                    <Form.Control type="number" placeholder="0" defaultValue={matchItem && matchItem.length !== 0 ? matchItem[0].quantity : 0} min="0" max="10" onChange={(evt) => handleOnChange(evt, item)} />
                  </Form.Group>
                </td>
              </>
              :
              <>
                <td>{item.quantity}</td>
                <td>{(item.quantity * item.tax).toFixed(3)}</td>
              </>
          }
        </tr>
      )
    }
  }));
}

export const getFormData = (evt, formAction, sItems, id = null) => {
  //console.log(selectedItems)
  //console.log(evt.target.customer_name.value) 
  let type = 1;
  if (formAction === "Place Order")
    type = 2;

  const data = {
    id: id,
    customerName: (evt.target.customer_name.value).trim(),
    customerAddress: (evt.target.customer_address.value).trim(),
    type: type
  };
  data.items = sItems.map((item) => {
    if (item)
      return (`{id: ${item.id}, quantity: ${item.quantity}}`)
  });
  //console.log(data);
  return data;
}

export const mergeArrayObjects = (arr1, arr2) => {
  let result = [];
  arr1.forEach(function (item1) {
    if (item1) {
      let match = null;
      arr2.forEach(function (item2, index) {
        if (item2 && item2.id === item1.id) {
          match = item2;
          arr2.splice(index, 1);
        }
      })
      //console.log(match)
      if (match) {
        result.push(match);
      } else {
        result.push(item1);
      }
    }
  })
  return [...result, ...arr2];
}

export const validateFormData = (data) => {
  const errors = {};
  if (data.customerName === "") errors.name = "Name cannot be blank";
  if (data.customerAddress === "") errors.address = "Address cannot be blank";
  if (data.items.length === 0) errors.items = "Select at least one item";

  return errors;
}