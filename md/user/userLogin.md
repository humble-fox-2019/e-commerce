# User Login

Used to get a `token` for a registered user.

**URL** : `users/login`

**Method** : `POST`

**Authentication** : `none`

**Data Constraints** 

```json
{
    "email": "[valid email address]"
    "password": "[password in plain text]"
}
```

**Data Example**

```json
{
    "email": "buzz@gmail.com"
    "password": "buzz123"
}
```

## Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
    "user": {
        "email": "buzz@gmail.com"
        "password": "buzz123"
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

