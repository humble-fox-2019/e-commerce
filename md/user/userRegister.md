# User Register

Create an account with valid email address.

**URL** : `users/register`

**Method** : `POST`

**Authentication** : `none`

**Data Constraints** 

```json
{
    "email": "[valid email addres]"
    "password": "[password in plain text]"
}
```

**Data Example**

```json
{
    "email": "buzz@gmail.com",
    "password": "buzz123"
}
```

## Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
		"created": {
				"email": "buzz@gmail.com",
				"password": "buzz123",
				"money": 0
		},
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```



## Error Response

**Condition** 

* If `email` or `password` is not given a value.
* Invalid `email` format.

**Status Code** : `400 BAD REQUEST`

**Content Example**

```json
{
    "message": "Email can't be blank."
}
```

