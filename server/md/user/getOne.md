# Get One User

To get User object

**URL** : `/users/login/`

**Method** : `GET`

**Authentication** : `none`

**Header** : `valid JWT`

## Success Response

**Status Code** : `200 OK`

**Content Example**

```json
{
	     	"_id": "5d7f9338851c487df217d01b",
  			"name": "buzz",
        "email": "buzz@gmail.com",
        "password": "$2a$10$Rr8gpvfC710nXPxX532w0uKCpQwDBY5.mCth16EQVT9ScFHOr9Pga"
}
```



## Error Response

**Condition** : If `token` invalid

**Status Code** : `400 BAD REQUEST`

**Content Example**

```json
{
    "message": "jwt malformed"
}
```