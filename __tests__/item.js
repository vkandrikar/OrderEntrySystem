/* //jest.mock('../server');
//const app = require('../server');
const express = require("express");
const jsonGraphqlExpress = require('json-graphql-server').default;
const supertest = require('supertest');

const { items } = require('../__mock__/db');

const app = express();
const PORT = 3000;

beforeAll(() => {
  app.use('/orderentrysystem', jsonGraphqlExpress(items));
  app.listen(PORT, () => {
    console.log(`Test App started on port ${PORT}`);
  });
});


const request = supertest(app);

test('fetch all items', (done) => {
  request.post('/orderentrysystem')
    .send({
      query: `
        query {
          allItems {
            id
            code
            description
            rate
            quantity
            tax
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
        expect(res.body.data.allItems.length).toEqual(6);
        done();
      }
    });
}); */

test('sample test', () => {
  expect(2).toBe(2);
});