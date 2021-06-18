import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { Container, Row, Alert, Spinner } from 'react-bootstrap'

import { getSalesData } from '../../redux/index'
import { options, generateChartData } from './config'
import BodyOverlay from '../../elements/overlay'

function Stats({ salesData, getSalesData }) {
  useEffect(() => {
    getSalesData();
  }, []);

  return (
    <Container fluid className="d-inline-block position-relative">
      {
        salesData.loading ?
          <BodyOverlay><Spinner animation="border" variant="info" /></BodyOverlay>
          :
          salesData.error ?
            <Alert variant="danger" className="m-5">
              <Alert.Heading>Error:</Alert.Heading>
              <p>
                {salesData.error}
              </p>
            </Alert>
            :
            <>
              {
                salesData.sales.sales ?
                  <>
                    <Row className="p-1 my-2" className='header text-center'>
                      <h1 className='title'>Sales Chart</h1>
                    </Row>
                    <Row className="p-1 my-2" className='header'>
                      <Bar data={generateChartData(salesData.sales.sales)} options={options} />
                    </Row>
                  </>
                  :
                  null
              }
            </>
      }
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    salesData: state.item
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSalesData: () => dispatch(getSalesData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
