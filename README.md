![]()

# TokoPa'dia | Ecommerce TDD 

This is a API documentations for Tokopa'dia ecommerce.

Base root for all endpoint :

```
http://
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
  | `address`  | `string` |             |

  **Sample success response**

  ```
  
  ```

  **Sample error response**

  ```
  
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