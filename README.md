# Chargify API Node.js (unofficial module)


## Installation:

```shell
$ npm install --save chargify-promise
```

```js
const chargify = new Chargify(config.subdomain, config.apiKey);
```

Create a new customer in Chargify:

```js
chargify.customer.create({
customer:{
  first_name: "Joe",
  last_name: "Blow",
  email: "joe@test.com"
}
}).then((customer)=>{
  console.log(customer)
});
```
Or

```js
async function createCustomer() {

  const customer = await chargify.customer.create({
  customer:{
    first_name: "Joe",
    last_name: "Blow",
    email: "joe@test.com"
  }
});

console.log(customer)
}
```

### Available resources and methods

- customer
  - `list(queryObject)`
  - `create(customerObject)`
  - `update(updateObject)`
  - `read(customer_id)`
  - `delete(customer_id)`
- subscription
  - `list(queryObject)`
  - `create(subscriptionObject)`
  - `update(updateObject)`
  - `read(id)`
  - `delete(id)`
- product
  - `list(queryObject)`
  - `create(family_id, productObject)`
  - `update(updateObject)`
  - `read(id)`
  - `archive(id)`
