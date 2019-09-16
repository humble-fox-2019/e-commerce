# List All Product

Fetch all products data from database.

**URL** : `products`

**Method** : `GET`

**Authentication**

headers:

```json
{
		"token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Success Response

**Status Code** : `200 OK`

**Content Example**

```json
[
		{
        "name": "Fender Stratocaster",
        "stock": 5,
      	"sellerId": 
		},
  	{
      	"name": "Fender Telecaster",
      	"stock": 7,
        "sellerId": 
    }
]
```
