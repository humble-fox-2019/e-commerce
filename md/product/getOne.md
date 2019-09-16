# Show Single Product

Fetch specific product data from database.

**URL** : `products/:id`

**URL Params** : `id=[integer]` where `id` is the ID of the product.

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
{
    "name": "Fender Stratocaster",
    "stock": 5,
    "sellerId": 
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

