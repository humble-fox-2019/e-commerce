# Update Product

Update single product data.

**URL** : `/products/:id/`

**URL Params** : `id` is the ID of the Product.

**Method** : `PATCH`

**Authentication**

headers:

```json
{
		"token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

**Authorization** : Product `sellerId` equal to `_id` of User.

## Success Response

**Status Code** : `200 OK`

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

## Error Response

**Status Code** : `404 NOT FOUND`

**Content Example**

```json
{
		"message": "Page not found"
}
```

