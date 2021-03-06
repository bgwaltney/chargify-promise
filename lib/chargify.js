const rp = require('request-promise-native');
const request = require('request');
const qs = require('querystring');

var Chargify = function(subdomain, apiKey) {
  const chargify = this;
  this.apiKey = apiKey;
  this.rootPath = `https://${subdomain}.chargify.com`;

  this.customer = {
    create: function(options) {
      return chargify._post('/customers.json', options);
    },
    read: function(id) {
      return chargify._get('/customers/' + id + '.json', options=null);
    },
    list: function(id) {
      return chargify._get('/customers.json', options=null);
    },
    update: function(id, options) {
      return chargify._put('/customers/' + id + '.json', options);
    },
    delete: function(id) {
      return chargify._delete('/customers/' + id + '.json');
    }
  };
  this.subscription = {
    list: function() {
      return chargify._get('/subscriptions.json', options={});
    },
    create: function(options) {
      return chargify._post('/subscriptions.json', options);
    },
    read: function(id) {
      return chargify._get('/subscriptions/' + id + '.json');
    },
    update: function(id, options) {
      return chargify._put('/subscriptions/' + id + '.json', options);
    },
    delete: function(id) {
      return chargify._delete('/subscriptions/' + id + '.json');
    }
  };
  this.product = {
    list: function() {
      return chargify._get('/products.json', options);
    },
    create: function(family_id, options) {
      return chargify._post('/product_families/' + family_id + '/products.json', options);
    },
    read: function(id) {
      return chargify._get('/products/' + id + '.json');
    },
    update: function(id, options) {
      return chargify._put('/products/' + id + '.json', options);
    },
    archive: function(id) {
      return chargify._delete('/products/' + id + '.json');
    }
  };

  this.webhooks = {
    verify: function() {
      return "unfinished"
    }
  };

  this.directSignature = {
    verify: function() {
      return "unfinished"
    }
  };
};
Chargify.prototype._request = function(options) {
  options.auth = {
    user: this.apiKey,
    pass: 'x'
  };
  options.json = true;
    return rp(options)
}

Chargify.prototype._post = function(path, options) {
  options = {
    uri: this.rootPath + path,
    body: options,
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST'
  };

  return this._request(options);
};

Chargify.prototype._get = function(path, parameters) {
  var options = {
    uri: this.rootPath + path,
    method: 'GET',
    qs: parameters
  };

  return this._request(options);
};

Chargify.prototype._put = function(path, options) {
  options = {
    uri: this.rootPath + path,
    body: options,
    headers: {
      'Content-type': 'application/json'
    },
    method: 'PUT'
  };

  return this._request(options);
};

Chargify.prototype._delete = function(path) {
  var options = {
    uri: this.rootPath + path,
    method: 'DELETE'
  };
  return this._request(options);
};

module.exports = exports = Chargify;
