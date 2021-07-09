const supertest = require('supertest');

const app = require('../server');
const db = require("../database/index");

const request = supertest(app);

beforeAll(async () => {
  await db.fnConnect();
});

test('fetch order by id: 12', (done) => {
  request.post('/orderentrysystem')
    .send({
      query: `
        query {
          orders(order_id:12){
            total
            data {
              id
            }
          }
        }
      `
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        console.log(res.body);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.orders.total).toEqual(1);
        expect(res.body.data.orders.data[0].id).toEqual(12);
        done();
      }
    });
});


/* test('fetch order by customer name: Richard', (done) => {
  request.post('/orderentrysystem')
    .send({
      query: `
        query {
          orders(customer_name:"Richard"){
            id
            customer_name
          }
        }
      `
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.orders.length).toEqual(2);
        expect(res.body.data.orders[0].customer_name).toEqual('Richard');
        done();
      }
    });
}); */

/* test('place order', (done) => {
  request.post('/orderentrysystem')
    .send({
      query: `
        mutation {
          placeOrder(
            orderInput: {
              customer_name: "test user", 
              customer_address: "test address", 
              items: [
                {
                  id: 2, quantity: 3
                }, 
                {
                  id: 4, quantity: 10
                }
              ], 
              order_type: 1
            }
          )
        }
      `
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.placeOrder).toMatch(/successfully/);
        done();
      }
    });
}); */


/* test(`delete order`, (done) => {
  request.post('/orderentrysystem')
    .send({
      query: `
        mutation {
          deleteOrder(order_id: 61)
        }      
      `
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        expect(res.body).toBeInstanceOf(Object);
        done();
      }
    });
}); */
