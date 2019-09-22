# Delete Product

Delete a product.

**URL** : `/products/:id`

**Method** : `DELETE`

**Authentication**

`headers: [valid JWT]`



## Success Response

**Status Code** : `201 OK`

**Content Example**

```json
{
  	"product" : {
        "_id": "5d7f9a39b07e45849cd6d28e",
        "name": "Fender Stratocaster",
      	"description": "A guitar",
      	"image": "some url",
      	"price": 5000,
        "stock": 5,
      	"sellerId": "5d8338e4b801a9bc9d9c39bc"
		},
  	"message" : "Product deleted"
}
```