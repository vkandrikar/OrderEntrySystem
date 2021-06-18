import React from 'react'
import { Form, Button, Col, Row, Modal, ButtonGroup } from 'react-bootstrap'

import ItemTable from './itemTable'
import { getSelectedItems } from './helper'

function Items(props) {
  console.log("---Items---")
  return (
    <Modal
      show={props.show} 
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Item List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ItemTable
          items={props.itemlist.items}
          mode="ADD"
          existingItems={props.existingItems}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          props.updateitems(getSelectedItems());
          props.togglemodel();
        }
        }
        >Add / Update</Button>
        <Button onClick={props.togglemodel}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default React.memo(Items);
