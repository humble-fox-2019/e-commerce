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
        "name": "Fender Stratocaster",
        "stock": 5,
      	"sellerId": "5d8338e4b801a9bc9d9c39bc"
		},
  	{
      	"name": "Fender Telecaster",
      	"stock": 7,
        "sellerId": "5d8338e4b801a9bc9d9c39bc"
    }
]
```
