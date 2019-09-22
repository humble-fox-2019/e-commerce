# User Register

Create an account with valid email address.

**URL** : `/users/register/`

**Method** : `POST`

**Authentication** : `none`

**Data Constraints** 

```json
{
    "email": "[valid email address]",
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
      	"_id": "5d7f9338851c487df217d01b",
				"email": "buzz@gmail.com",
				"password": "$2a$10$Rr8gpvfC710nXPxX532w0uKCpQwDBY5.mCth16EQVT9ScFHOr9Pga",
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
    "message": "Email can't be blank"
}
```

