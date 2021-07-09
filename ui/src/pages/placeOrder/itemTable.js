import React from 'react'
import { Table } from 'react-bootstrap'

import homeStyle from '../../styles/home.module.css'
import { prepareItemList } from './helper'

function ItemTable({ items, mode, existingItems }) {
  //console.log("***Item Table***")
  return (
    <Table responsive striped bordered hover varient="light" size="sm" className={homeStyle.orderTable}>
      <thead>
        <tr className="text-center">
          <th>Item Code</th>
          <th>Item Description</th>
          <th>Rate</th>
          <th>Quantity</th>
          {
            mode !== "ADD" ?
              <th>Tax</th>
              :
              null
          }
        </tr>
      </thead>
      <tbody>
        {prepareItemList(items, mode, existingItems)}
      </tbody>
    </Table>
  )
}

export default React.memo(ItemTable);
