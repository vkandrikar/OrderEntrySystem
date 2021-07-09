const supertest = require('supertest');

const app = require('../server');
const db = require("../database/index");

const request = supertest(app);

beforeAll(async () => {
  await db.fnConnect();
});

test('fetch all items', (done) => {
  request.post('/orderentrysystem')
    .send({
      query: `
        query {
          items {
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
        console.log(res.body)
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.items.length).toEqual(6);
        done();
      }
    });
});

test('items sales details', (done) => {
  request.post('/orderentrysystem')
    .send({
      query: `
        query {
          sales {
            item_id
            code
            sale_count
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
        expect(res.body.data.sales.length).toEqual(6);
        done();
      }
    });
});
