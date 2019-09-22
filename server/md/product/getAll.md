# List All Product

Fetch all products data from database.

**URL** : `/products/`

**Method** : `GET`

**Authentication**

`headers: [valid JWT]`


## Success Response

**Status Code** : `200 OK`

**Content Example**

```json
[
		{
      	"_id": "5d7f9a39b07e45849cd6d28e",
        "name": "Fender Stratocaster",
      	"description": "A guitar",
      	"image": "some url",
      	"price": 5000,
        "stock": 5,
      	"sellerId": "5d8338e4b801a9bc9d9c39bc"
		},
  	{
      	"_id": "5d7f9a39b08e45849cd6d28e",
      	"name": "Fender Telecaster",
        "description": "A guitar",
        "image": "some url",
        "price": 5000,
      	"stock": 7,
        "sellerId": "5d8338e4b801a9bc9d9c39bc"
    }
]
```
