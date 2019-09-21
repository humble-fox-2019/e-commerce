# Update Product

Update single product data.

**URL** : `/products/:id/`

**URL Params** : `id` is the ID of the Product.

**Method** : `PUT`

**Authentication**

headers:

```json
{
		"token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

**Authorization** : Product `userId` equal to `_id` of User.

## Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
    "name": "Fender Stratocaster",
    "stock": 7,
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

