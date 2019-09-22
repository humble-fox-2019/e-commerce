

# Product API

|   ROUTE   | HTTP | HEADERS | BODY |   DESCRIPTION    | ADDITIONAL INFO |
| :-------: | :--: | :-----: | :--: | :--------------: | :-------------: |
| /products | GET  |    -    |  -   | Get all products |        -        |

Response:

Status: 200

```
[
	{
		_id: 10j1010j2i102ijd102j203
		title: "macbook",
		description: "laptop from apple to stupid people"
		price: 1000000,
		qty: 100,
		image: "http://google.com/laptop/macbook",
		brand: 'New Balance',
		createdAt: 1999-12-12,
		updatedAt: 2000-12-12
	}
]
```

Status: 500

```
{
	message: "No response from server"
}
```

|   ROUTE   | HTTP | HEADERS |                             BODY                             |   DESCRIPTION    | ADDITIONAL INFO |
| :-------: | :--: | :-----: | :----------------------------------------------------------: | :--------------: | :-------------: |
| /products | POST |  token  | title:String(required)<br />description:String(required)<br />price:Number(required)<br />qty:Number(required)<br />image:File(required)<br />brand:String(required) | Create a product |  Authorization  |

Response:

Status: 201

```
{
		_id: 3248203u203dj203d203
		title: "macbook",
		description: "laptop from apple to stupid people"
		price: 1000000,
		qty: 100,
		image: "http://google.com/laptop/macbook",
		brand: 'New Balance',
		createdAt: 1999-12-12,
		updatedAt: 2000-12-12
}
```

Status: 400

```
{
	message: "An item must a name"
}
```



|     ROUTE     |  HTTP  | HEADERS | BODY |   DESCRIPTION    | ADDITIONAL INFO |
| :-----------: | :----: | :-----: | :--: | :--------------: | :-------------: |
| /products/:id | DELETE |  token  |  -   | Remove a product |  Authorization  |

Response:

Status: 200

```
{
    "message": "Product successfully deleted"
}
```

Status: 400

```
{
	message: "Item does not exist"
}
```

|         ROUTE          | HTTP | HEADERS | BODY |          DESCRIPTION          | ADDITIONAL INFO |
| :--------------------: | :--: | :-----: | :--: | :---------------------------: | :-------------: |
| /products/brand/:brand | GET  |    -    |  -   | get all items with this brand |        -        |

Response:

Status: 200

```
[
    {
        "qty": 2,
        "_id": "5d86d168ab67a15f21d5665b",
        "title": "Yeezy 700",
        "description": "Adidas x Kanye",
        "price": 300,
        "image": "https://storage.googleapis.com/wood_pecker/1569116519153802501_01.jpg",
        "brand": "Adidas",
        "createdAt": "2019-09-22T01:42:00.851Z",
        "updatedAt": "2019-09-22T13:08:31.877Z",
        "__v": 0
    }
]
```

Status: 500

```
{
	message: "No response from server"
}
```



|     ROUTE     | HTTP | HEADERS |                             BODY                             | DESCRIPTION |        ADDITIONAL INFO        |
| :-----------: | ---- | :-----: | :----------------------------------------------------------: | :---------: | :---------------------------: |
| /products/:id | PUT  |  token  | title:String<br />description:String<br />price:Number<br />qty:Number<br />image:File<br />brand:String |  Edit item  | Authenticated<br />Authorized |

Response:

Status: 200

```
{
    "message": "Succefully updated"
}
```

Status: 403

```
{
    "message": "you don't have the authority to do this action"
}
```



# User API

|      ROUTE       | HTTP | HEADERS |                         BODY                          | DESCRIPTION  | ADDITIONAL INFO |
| :--------------: | ---- | :-----: | :---------------------------------------------------: | :----------: | :-------------: |
| /users/loginform | POST |    -    | email:String(required)<br />password:String(required) | login a user |        -        |

Response:

Status: 200

```
{
	token: 'aksdjfaksjdfnkasdknfadsf12oi3u12iu19s2s1921js12',
	username: 'tole'
}
```

Status: 400

```
{
	message: "Email is invalid"
}
```

|      ROUTE      | HTTP | HEADERS |                             BODY                             |   DESCRIPTION   | ADDITIONAL INFO |
| :-------------: | :--: | :-----: | :----------------------------------------------------------: | :-------------: | :-------------: |
| /users/register | POST |    -    | username:String(required)<br />password:String(required)<br />email:String(required)<br /> | Register a user |        -        |

Response:
Status: 201

```
{
	username: "tole",
	email: "tole@mail.com"
}
```

Status: 400

```
{
	message: "Email must be filled"
}
```



|      ROUTE      | HTTP  | HEADERS | BODY |           DESCRIPTION           | ADDITIONAL INFO |
| :-------------: | :---: | :-----: | :--: | :-----------------------------: | :-------------: |
| /users/cart/:id | PATCH |  token  |  -   | Register an item to User's cart |  Authenticated  |

Response:

Status: 200

```
{
    "message": "Successfully added item to cart"
}
```

Status: 401

```
{
    "message": "You need to login first"
}
```





| ROUTE       | HTTP | HEADERS | BODY | DESCRIPTION     | ADDITIONAL INFO |
| ----------- | ---- | ------- | ---- | --------------- | --------------- |
| /users/cart | GET  | token   | -    | Get user's cart | Authenticated   |

Response:

Status: 200

```
[
    {
        "qty": 1,
        "_id": "5d86354e0a80164023397d23",
        "title": "Nike Yard",
        "description": "Nike finest second most expensive shoes",
        "price": 20000,
        "image": "https://storage.googleapis.com/wood_pecker/1569076557997801185_1.jpg",
        "brand": "Nike",
        "createdAt": "2019-09-21T14:35:58.513Z",
        "updatedAt": "2019-09-22T13:06:32.886Z",
        "__v": 0
    }
]
```

Status: 401

```
{
    "message": "You need to login first"
}
```





| ROUTE       | HTTP   | HEADERS | BODY | DESCRIPTION        | ADDITIONAL INFO |
| ----------- | ------ | ------- | ---- | ------------------ | --------------- |
| /users/cart | DELETE | token   | -    | Delete user's cart | Authenticated   |

Response:

Status: 200

```
{
    "message": "Successfully delete items in cart"
}
```

Status: 401

```
{
    "message": "You need to login first"
}
```

