

# TokoPadia | Ecommerce TDD 

<img src="https://cdn1.imggmi.com/uploads/2019/9/16/9d9aab1445a8dc71d743ad8b012ece6a-full.png" style="zoom:50%;" />



This is a API documentations for Tokopa'dia ecommerce.

Base root for all endpoint :

```
http://34.87.19.30
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

  ```
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
  
  ```

  **Sample error response**

  ```
  
  ```

### <u>Shop Route</u>

- **Shop Signup**

  ```
  POST /shop/signup
  ```

  **Request body**

  | Name       | Type     | Description |
  | ---------- | -------- | ----------- |
  | `name`     | `string` |             |
  | `email`    | `string` |             |
  | `password` | `string` |             |
  | `address`  | `string` |             |

  **Sample success response**

  ```
  
  ```

  **Sample error response**

  ```
  
  ```

  

- **Shop Signin**

  ```
  POST /shop/signin
  ```

  **Request body**

  | Name       | Type     | Description |
  | ---------- | -------- | ----------- |
  | `email`    | `string` |             |
  | `password` | `string` |             |

  **Sample success response**

  ```
  
  ```

  **Sample error response**

  ```
  
  ```

  



### <u>Products Route</u>

- Create product
- Get all product
- Get one product
- Update product
- Delete product

### <u>Cart Route</u>

- Create cart
- Remove cart
- Update cart

### <u>Transaction Route</u>

- Create transaction