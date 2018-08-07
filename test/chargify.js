'use strict';
var Chargify = require('../lib/chargify.js'),
  config = require('../config.json'),
  assert = require('assert');

function randomString() {
  return Math.floor(Math.random() * 10000).toString();
}

describe('Chargify Customer API', function () {
  this.timeout(10000);

  var chargify
  beforeEach(() => {
    chargify = new Chargify(config.subdomain, config.apiKey);
  })

  it('should create, read, updated, and delete a customer.', function () {

    return chargify.customer.create({ //create
      "customer": {
        first_name: 'Jack',
        last_name: 'Johnson',
        email: 'acme@gmail.com'
      }
    }).then(function (data) {
      return chargify.customer.read(data.customer.id); //read
    }).then(function (data) {
      return chargify.customer.update(data.customer.id, { //update
        "customer": {
          first_name: 'Jacob'
        }
      });
    }).then(function (data) {
      return chargify.customer.delete(data.customer.id); //delete
    }).then(function (data) {
      assert(data == null);
    })
  });

  it('should throw an error if attempting to create a customer without email', function (done) {
    chargify.customer.create({
      customer:{
        email:null,
        first_name: null,
        last_name: null
      }
    }).then(function () {
      done(new Error('This should have failed'))
    }, function (err) {
      done();
    });
  });
});

describe('Chargify Subscription API', function () {
  this.timeout(10000);

  var chargify
  beforeEach(() => {
    chargify = new Chargify(config.subdomain, config.apiKey);
  })

  it('should create, read, updated, and cancel a customer and subscription.', function () {

    return chargify.subscription.create({ //create
      "subscription": {
        "product_handle": "test",
        customer_attributes:{
        first_name: 'Jones',
        last_name: 'Japoli',
        email: 'acme@test.com'
      },
      "credit_card_attributes": {
    			"full_number": "1",
    			"expiration_month": "10",
    			"expiration_year": "2020"
    		}
      }
    }).then(function (data) {
      return chargify.subscription.read(data.subscription.id); //read
    }).then(function (data) {
      return chargify.subscription.update(data.subscription.id, { //update
        "subscription": {
          "product_handle": "test2",
        }
      });
    }).then(function (data) {
      return chargify.subscription.delete(data.subscription.id); //delete
      assert(data.subscription.state == 'canceled');
    })
  });

  it('should throw an error if attempting to pass an incorrect payload', function (done) {
    chargify.subscription.create({
      customer:{
        email:null,
        first_name: null,
        last_name: null
      }
    }).then(function () {
      done(new Error('This should have failed'))
    }, function (err) {
      done();
    });
  });
});

describe('Chargify Product API', function () {
  this.timeout(10000);

  var chargify
  beforeEach(() => {
    chargify = new Chargify(config.subdomain, config.apiKey);
  })

  it('should create, read, updated, and cancel a customer and products.', function () {

    return chargify.product.create(995476,
      {
        "product": {
          "name": "Gold Plan",
          "handle": randomString(),
          "description": "This is our gold plan.",
          "request_credit_card": true,
          "price_in_cents": 1000,
          "interval": 1,
          "interval_unit": "month",
          "auto_create_signup_page": true,
          "tax_code": "D0000000"
        }
      }).then(function (data) {
      return chargify.product.read(data.product.id); //read
    }).then(function (data) {
      return chargify.product.update(data.product.id, { //update
        "product": {
          "product_handle": randomString(),
        }
      });
    }).then(function (data) {
      return chargify.product.archive(data.product.id); //delete
      assert(data.product.archived_at != null);
    })
  });

  it('should throw an error if attempting to pass an incorrect payload', function (done) {
    chargify.product.create({
      customer:{
        email:null,
        first_name: null,
        last_name: null
      }
    }).then(function () {
      done(new Error('This should have failed'))
    }, function (err) {
      done();
    });
  });
});
