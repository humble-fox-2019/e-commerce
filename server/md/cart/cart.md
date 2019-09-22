# Cart



## Get One

Get one cart for authenticated user

**URL** : `/carts/`

**Method** : `GET`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
  	"_id": "5d7f9a39b07e45849cd6d28e",
  	"status": false,
  	"onProgress": false,
    "items": [],
    "userId": "5d7f9338851c487df217d01b",
	  "createdAt": '2019-09-16T14:20:41.753Z',
    "updatedAt": '2019-09-16T14:20:41.753Z'
}
```



## Get One Populate

Get one cart for and populate the items inside.

**URL** : `/carts/populate`

**Method** : `GET`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
  	"_id": "5d7f9a39b07e45849cd6d28e",
  	"status": false,
  	"onProgress": false,
    "items": [], //PRODUCT's ID
    "userId": "5d7f9338851c487df217d01b",
	  "createdAt": '2019-09-16T14:20:41.753Z',
    "updatedAt": '2019-09-16T14:20:41.753Z'
}
```



## Get All On Progress Cart

Get all cart that still  `onProgress`

**URL** : `/carts/on-progress`

**Method** : `GET`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
[
    {
        "_id": "5d7f9a39b07e45849cd6d28e",
        "status": false,
        "onProgress": true,
        "items": [],
        "userId": "5d7f9338851c487df217d01b",
        "createdAt": '2019-09-16T14:20:41.753Z',
        "updatedAt": '2019-09-16T14:20:41.753Z'
    }
]
```



## Get All Done Cart

Get all cart have value `true` in`status`

**URL** : `/carts/history`

**Method** : `GET`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
[
    {
        "_id": "5d7f9a39b07e45849cd6d28e",
        "status": true,
        "onProgress": false,
        "items": [],
        "userId": "5d7f9338851c487df217d01b",
        "createdAt": '2019-09-16T14:20:41.753Z',
        "updatedAt": '2019-09-16T14:20:41.753Z'
    }
]
```



## Add Item To Cart

Add Product's id into Cart's `items`.

**URL** : `/carts/add-to-cart`

**Method** : `PATCH`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
    "_id": "5d7f9a39b07e45849cd6d28e",
    "status": false,
    "onProgress": true,
    "items": [], // PRODUCT's ID
    "userId": "5d7f9338851c487df217d01b",
    "createdAt": '2019-09-16T14:20:41.753Z',
    "updatedAt": '2019-09-16T14:20:41.753Z'
}
```



## Remove Item From Cart

Remove Product's id from Cart's `items`.

**URL** : `/carts/remove-from-cart/:id`

**Method** : `PATCH`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
[
    {
        "_id": "5d7f9a39b07e45849cd6d28e",
        "status": false,
        "onProgress": true,
        "items": [], // ONE REMOVED
        "userId": "5d7f9338851c487df217d01b",
        "createdAt": '2019-09-16T14:20:41.753Z',
        "updatedAt": '2019-09-16T14:20:41.753Z'
    }
]
```



## Update Cart Progress

Update Cart's Progress.

**URL** : `/carts/progress/:id`

**Method** : `PATCH`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
[
    {
        "_id": "5d7f9a39b07e45849cd6d28e",
        "status": false,
        "onProgress": true, // false to true
        "items": [],
        "userId": "5d7f9338851c487df217d01b",
        "createdAt": '2019-09-16T14:20:41.753Z',
        "updatedAt": '2019-09-16T14:20:41.753Z'
    }
]
```

## Delete Cart

Delete Cart.

**URL** : `/cart/:id`

**Method** : `GET`

**Authentication**

`headers: [valid JWT]`



### Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
    "_id": "5d7f9a39b07e45849cd6d28e", // DELETED
    "status": false,
    "onProgress": true,
    "items": [],
    "userId": "5d7f9338851c487df217d01b",
    "createdAt": '2019-09-16T14:20:41.753Z',
    "updatedAt": '2019-09-16T14:20:41.753Z'
}
```



### ALL ERROR RESPONSE

```json
{
		"message": "Unauthorized",
}
```