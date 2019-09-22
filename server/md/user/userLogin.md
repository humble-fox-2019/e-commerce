# User Login

Used to get a `token` for a registered user.

**URL** : `/users/login/`

**Method** : `POST`

**Authentication** : `none`

**Data Constraints** 

```json
{
    "name": "[name in plain text]"
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data Example**

```json
{
		"name": "buzz",
    "email": "buzz@gmail.com",
    "password": "buzz123"
}
```

## Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
    "user": {
      	"_id": "5d7f9338851c487df217d01b"
      	"name": "buzz",
        "email": "buzz@gmail.com",
        "password": "$2a$10$Rr8gpvfC710nXPxX532w0uKCpQwDBY5.mCth16EQVT9ScFHOr9Pga"
    },
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```



## Error Response

**Condition** : If `email` or `password` combination is invalid.

**Status Code** : `400 BAD REQUEST`

**Content Example**

```json
{
    "message": "Invalid login or password"
}
```

