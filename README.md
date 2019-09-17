# FloatOcean Market | E-Commerce TDD



# Error List

| Code                        | Error Name                                                   | Solution                                                  |
| --------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| `400 Bad Request`           | Bad user input / Validation error                            | Insert proper format as requested by the API.             |
| `401 Unauthorized`          | Possibilities:<br />1. Bad Token<br />2. Token Expired<br />3. Token has no authorization on certain features | Change the token to a valid one.                          |
| `403 Forbidden`             | Forbidden Access                                             | Only certain members have authorization on this web page. |
| `404 Not Found`             | Not Found                                                    | The page / feature you are looking for is not available.  |
| `500 Internal Server Error` | Something happens in the server.                             | Wait for solution from the care taker of the API          |

# Authentication

When User is registered or logged in, token is created and given to client.

token format is like this:

```json
{
    "token": "hashedToken"
}
```

Token must be set in the headers with the same format as above for features that required them.

# Authorization

Authorization means about your ownership on certain features like carts and products. Only an owner can access this feature.

# Users Route

## Model

username

email

password, hashed

role, default: customer

timestamps, versionKey: false



## User Register

* **URL**

```
Post /users/register
```

* **Request Body**

| Name     | Type   | Description                                                  |
| -------- | ------ | ------------------------------------------------------------ |
| username | String | Required. Must be unique.                                    |
| email    | String | Required. Must pass validation on email format.              |
| password | String | Will be hashed before entering database. Required. Minimum 8 characters. |

**Success Response** : `201 Created`

```json

```

**Error Response**: `400 Bad Request`

```json
[
    "Please insert username.",
    "Username is already taken.",
    "Invalid email format.",
    "Email is required.",
    "Password is required.",
    "Minimum password length is 8 characters."
]
```



## User Login

- **URL**

```
Post /users/login
```

- **Request Body**

| Name     | Type   | Description                                  |
| -------- | ------ | -------------------------------------------- |
| identity | String | Registered username or email                 |
| password | String | Password must match with registered identity |

**Success Response** : `200 OK`

```

```

**Error Response**: `400 Bad Request`

```json
"Wrong username / email / password"
```

# Shop Route

## Shop Signup

## Shop Signin

# Products Route

**Authentication Required:**  `Yes`

## Model

name

description

stock

image

price

## Product Create

- **URL**

```
Post /products/new
```

- **Request Body**

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| name        | String | Required. Validation Required. |
| description | String | Default: "No description"      |
| stock       | Number | Required. Minimum 1            |
| images      | String | Optional.                      |
| price       | Number | Required. Validation Required. |

**Success Response** : `201 Created`

```json

```

**Error Response**: `400 Bad Request`

```json
[
    "name required.",
    "price required."
]
```



## Product Read

- **URL**

```
GET /products/
```



**Success Response** : `200 OK`

```json

```

**Error Response**: `500 Internal Server Error`

## Product Update

**Authorization Required:** `Yes`

* **URL**

```
PUT /products/:id
```

* **Request Body**

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| name        | String | Required. Validation required. |
| description | String | Default: "No description"      |
| stock       | Number | Default: 1                     |
| image       | String | Optional.                      |
| price       | Number | Required.                      |

**Success Response:** `200 OK`

```

```

**Error Response:** `404 Not Found`

```

```

**Error Response:** `401 Unauthorized`

```

```



## Product Delete

**Authorization Required:** `Yes`

* **URL**

```
DELETE /products/:id
```

**Success Response:** `200 OK`

```

```

**Error Response:** `404 Not Found`

```

```

**Error Response:** `401 Unauthorized`

```

```



# Cart Route

## Model

ProductId

Quantity

UserId

Status

## Product Create

- **URL**

```
Post /Carts/new
```

- **Request Body**

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| name        | String | Required. Validation Required. |
| description | String | Default: "No description"      |
| stock       | Number | Default: 1                     |
| image       | String | Optional.                      |
| price       | Number | Required. Validation Required. |

**Success Response** : `201 Created`

```json

```

**Error Response**: `400 Bad Request`

```json
[
    "name required.",
    "price required."
]
```



## Cart Read

- **URL**

```
GET /Carts/
```



**Success Response** : `200 OK`

```json

```

**Error Response**: `500 Internal Server Error`



## Cart Update

**Authorization Required:** `Yes`

- **URL**

```
PUT /Carts/:id
```

- **Request Body**

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| name        | String | Required. Validation required. |
| description | String | Default: "No description"      |
| stock       | Number | Default: 1                     |
| image       | String | Optional.                      |
| price       | Number | Required.                      |

**Success Response:** `200 OK`

```

```

**Error Response:** `404 Not Found`

```

```

**Error Response:** `401 Unauthorized`

```

```



## Cart Delete

**Authorization Required:** `Yes`

- **URL**

```
DELETE /Carts/:id
```

**Success Response:** `200 OK`

```

```

**Error Response:** `404 Not Found`

```

```

**Error Response:** `401 Unauthorized`

```

```



