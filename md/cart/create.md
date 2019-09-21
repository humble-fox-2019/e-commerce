# Create Cart

Create a cart for authenticated user.

**URL** : `/cart/`

**Method** : `POST`

**Authentication**

`headers: [valid JWT]`

## Success Response

**Status Code** : `201 OK`

**Content Example**

```json
{
  	"_id": "5d7f9a39b07e45849cd6d28e",
  	"status": false,
    "items": [],
    "userId": "5d7f9338851c487df217d01b",
	  "createdAt": '2019-09-16T14:20:41.753Z',
    "updatedAt": '2019-09-16T14:20:41.753Z'
}
```