# Create Product

Create a product.

**URL** : `/products/`

**Method** : `POST`

**Authentication**

`headers: [valid JWT]`

**Data Constraint**

```json
{
    "name": "[name in plain text]",
    "stock": "[stock in plain text]"
}
```

**Data Example**

```json
{
      "name": "Fender Stratocaster",
      "description": "A guitar",
      "image": "some url",
      "price": 5000,
      "stock": 5,
}
```

## Success Response

**Status Code** : `201 OK`

**Content Example**

```json
{
  		"_id": "5d7f9a39b07e45849cd6d28e",
      "name": "Fender Stratocaster",
      "description": "A guitar",
      "image": "some url",
      "price": 5000,
      "stock": 5,
      "sellerId": "5d8338e4b801a9bc9d9c39bc"
}
```