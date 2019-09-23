

# TOKOPADIA | Ecommerce TDD 

<img src="https://cdn1.imggmi.com/uploads/2019/9/16/9d9aab1445a8dc71d743ad8b012ece6a-full.png" style="zoom:50%;" />

------



This is a API documentations for Tokopa'dia ecommerce.

Base root for all endpoint :

```
http://35.187.247.146/
```



### <u>Users Route</u>

- **User Signup**

  ```
  POST /user/signup
  ```

  **Request body**

  | Name       | Type     | Description |
  | ---------- | -------- | ----------- |
  | `username` | `string` |             |
  | `email`    | `string` |             |
  | `password` | `string` |             |

  **Sample success response**

  ```json
  STATUS CODE: 201 (Created)
  {
    "message": "success signup",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y0OTlkODk3ZGYzMGJjZTNmNTIyMyIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1Njg2MjMwMDV9.bRZxvC1OWpmfP8kLuLLsgdHx8tm9wFWDc1dfXz2x0gg"
  }
  ```

  **Sample error response**

  If error has occurred it will send `errors` as an array that include error message

  ```
  STATUS CODE: 400 (Bad request)
  {
    "errors": [
      "username required",
      "email required",
      "password required"
    ]
  }
  ```

  

- **User Signin**

  ```
  POST /user/signin
  ```

  **Request body**

  | Name       | Type     | Description |
  | ---------- | -------- | ----------- |
  | `email`    | `string` |             |
  | `password` | `string` |             |

  **Sample success response**

  ```
  STATUS CODE: 200 (ok)
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y2MDkwNjY0NmY5MGM4OGI1YzA5MSIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1Njg2Mjg5MTl9.KdV6QwmcLkg8PCk6JewOdNY2brlEIggJRZ_jKGWwl5E",
    "message": "success signin"
  }
  ```

  **Sample error response**

  ```
  STATUS CODE: 401 (Unauthorized)
  {
    "errors": [
      "wrong email/password"
    ]
  }
  ```

### <u>Store Route</u>

- **Store Signup**

  ```
  POST /store/signup
  ```

  **Request body**

  | Name       | Type     | Description    |
  | ---------- | -------- | -------------- |
  | `name`     | `string` | Store name     |
  | `email`    | `string` | Store email    |
  | `password` | `string` | Store password |
  | `city`     | `string` | Store city     |
  | `province` | `string` | Store province |

  **Sample success response**

  ```
  STATUS CODE: 201 (Created)
  {
    "message": "success signup",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y3NzQ0OWU0OTRjMGY2OWNjYjMxMyIsIm5hbWUiOiJ0b2tvIGFiYWRpIGpheWEiLCJlbWFpbCI6ImFiYWRpamF5YUBnbWFpbC5jb20iLCJpYXQiOjE1Njg2MzQ2OTJ9.1wid8_m5Ol16b-19E8ODj8DlpEwIJ-hyq_9m_RdNouk"
  }
  ```

  **Sample error response**

  ```
  STATUS CODE: 400(Bad request)
  {
    "errors": [
      "name required",
      "email required",
      "password required",
      "city required",
      "province required"
    ]
  }
  ```

  

- **Store Signin**

  ```
  POST /store/signin
  ```

  **Request body**

  | Name       | Type     | Description |
  | ---------- | -------- | ----------- |
  | `email`    | `string` |             |
  | `password` | `string` |             |

  **Sample success response**

  ```
  STATUS CODE: 200(Ok)
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Y3NzQ0OWU0OTRjMGY2OWNjYjMxMyIsIm5hbWUiOiJ0b2tvIGFiYWRpIGpheWEiLCJlbWFpbCI6ImFiYWRpamF5YUBnbWFpbC5jb20iLCJpYXQiOjE1Njg2MzQ4MjZ9.tJVTcRLSpKYu73XPptm8TzM97SvXw65xWgx1MY-Hbv8",
    "message": "success signin"
  }
  ```

  **Sample error response**

  ```
  STATUS CODE: 401(Anauthorized)
  {
    "errors": [
      "wrong email/password"
    ]
  }
  ```

  



### <u>Products Route</u>

- **Create product**

  To create a product, you must authenticated store

  ```
  POST /product
  ```

  **Request Headers**

  | Name    | Type     | Description                                            |
  | ------- | -------- | ------------------------------------------------------ |
  | `token` | `string` | Token that you received from server for authenticating |

  **Request Body**

  | Name          | Type     | Description         |
  | ------------- | -------- | ------------------- |
  | `name`        | `string` | product name        |
  | `description` | `string` | Product description |
  | `image`       | `string` | Product image       |
  | `price`       | `number` | product price       |
  | `stock`       | `number` | product quantity    |

  **Sample success response**

  ```
  STATUS CODE: 201(Created)
  {
    "product": {
      "_id": "5d7f974d58a49813007022e7",
      "name": "Handphone asus",
      "description": "handphone asus",
      "image": "https://storage.googleapis.com/image-ecommerce-josprima-site/1568642892075tokopadia.png",
      "price": 200000000,
      "stock": 20,
      "store": "5d7f77449e494c0f69ccb313",
      "__v": 0
    }
  }
  ```

  **Sample error response**

  ```
  STATUS CODE: 400(Bad request)
  {
    "errors": [
      "name required",
      "description required",
      "image required",
      "price required",
      "stock required"
    ]
  }
  ```

  

- **Get all product**

  ```
  GET /product
  ```

  **Sample success response**

  ```
  STATUS CODE: 200(Ok)
  {
    "products": [
      {
        "_id": "5d7f974d58a49813007022e7",
        "name": "Handphone asus",
        "description": "handphone asus",
        "image": "https://storage.googleapis.com/image-ecommerce-josprima-site/1568642892075tokopadia.png",
        "price": 200000000,
        "stock": 20,
        "store": "5d7f77449e494c0f69ccb313",
        "__v": 0
      }
    ]
  }
  ```

  

- **Get one product**

  ```
  GET /product/:productId
  ```

  **Sample success response**

  ```
  STATUS CODE: 200(Ok)
  {
    "product": {
      "_id": "5d7f974d58a49813007022e7",
      "name": "Handphone asus",
      "description": "handphone asus",
      "image": "https://storage.googleapis.com/image-ecommerce-josprima-site/1568642892075tokopadia.png",
      "price": 200000000,
      "stock": 20,
      "store": "5d7f77449e494c0f69ccb313",
      "__v": 0
    }
  }
  ```

  

- **Update product**

  ```
  PUT /product/:productId
  ```

  **Request Headers**

  | Name | Type | Description |
  | ---- | ---- | ----------- |
  |      |      |             |

  

- **Delete product**

  ```
  DELETE /product/:productId
  ```

  **Request headers**

  | Name | Type | Description |
  | ---- | ---- | ----------- |
  |      |      |             |

  

### <u>Cart Route</u>

- Create cart
- Remove cart
- Update cart

### <u>Transaction Route</u>

- Create transaction