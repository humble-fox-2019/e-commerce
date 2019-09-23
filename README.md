# e-commerce

## Usage
on server
```javascript
$ npm install
$ npm run dev
```

## REST API
All end point routes start with http://localhost:3000 
## /users end point

### **Register New User**

Register new user to the database
| Route | HTTP | Headers |
|---|---|---|
|`/user/register`|POST|`none`|

Body :  
   name: String (Required)
   password: String (Required)
   email : String (Required) (Unique)
Success :
   status: 201
   message: 'Account is successfully created'
error :
   if field or body is undefined
   status: 404
   message: 'Field is require'
   if name length is < 2
   status: 400
   message: 'Email/password salah'

### **Login User**

Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/login`|POST|`none`|

Body :
   email: String (Required)
   password: String (Required)
Success :
   status: 200
   message : 'Login successfull'
   data: 'token'
error :
   if user is not in our database
   status: 404
   message: 'Not Found'
   if name/password is wrong
   status: 400
   message: 'Email/password salah'

## /products end point

### **Create Product**

Create new product into the database
| Route | HTTP | Headers |
|---|---|---|
|`/products`|POST|`token`|
Body :
```
   name: String (Required)
   price: Number (Required)
   image: File (Required)
   stock Number (Required)
```
success :
```
   status : 201
   message : 'product has been created successfully'
```
error :
```
   status: 404
   message : 'failed to create product'
```

### **Find All Products**

Find all products in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products`|GET|`token`|
Body :
   none
success :
   status: 200
   message: 'all user's data'
error:
   status: 404
   message: 'data not found'
   
### **Find One Products**

Find one product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   message: 'all products'
```
error :
```
   status: 404
   message: 'data not found'
```

### **Update product**

Update a product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|PATCH|`token`|

Body :
```
   name: String 
   price: Number 
   image: File 
   stock Number 
```
success :
```
   status: 200
   message: 'update successfull'
```
error:
```
   status: 404
   message: 'update failed'
```
note : one of the body variable have to different from before 

### **Delete Product**
Delete product in the database
| Route | HTTP | Headers |
|---|---|---|
|`/products/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete data'
```

## /carts end point

### **Create carts**

Create a new cart into the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts`|POST|`token`|
Body :
```
   ProductId: String (Required)
   amount: Number (Required)

```
success :
```
   status : 201
   message : 'Cart has been created successfully'
```
error :
```
   status: 404
   message : 'failed to create cart'
```

### **Find All Carts**

Find all User Carts in the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts`|GET|`token`|
Body :
   none
success :
   status: 200
   message: 'all user's carts'
error:
   status: 404
   message: 'data not found'
   
### **Update cart**

Update a cart in the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts/:id`|PATCH|`token`|

Body :
```
   ProductId : String 
   amount : Number 
  
```
success :
```
   status: 200
   message: 'update successfull'
```
error:
```
   status: 404
   message: 'update failed'
```
note : one of the body variable have to different from before 

### **Delete cart**
Delete cart of user in the database
| Route | HTTP | Headers |
|---|---|---|
|`/carts/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete data'
```

## /transactions end point

### **Create transactions**

Create new transactions into the database
| Route | HTTP | Headers |
|---|---|---|
|`/transactions`|POST|`token`|
Body :
```
   CartId : String (Required)
   totalPrice : Number (Required)
   UserId: String(Required)

```
success :
```
   status : 201
   message : 'transactions has been created successfully'
```
error :
```
   status: 404
   message : 'failed to create transactions'
```

### **Find All transactions**

Find all User transactions in the database
| Route | HTTP | Headers |
|---|---|---|
|`/transactions`|GET|`token`|
Body :
```
   none
```
success :
```
   status: 200
   message: 'all user's transactions'
```
error:
```
   status: 404
   message: 'data not found'
```
   
### **Find One transactions**

Find all User transactions in the database
| Route | HTTP | Headers |
|---|---|---|
|`/transactions/one`|GET|`token`|
Body :
```
   none
```
success :
```
   status: 200
   message: 'all user's transactions'
```
error:
```
   status: 404
   message: 'data not found'
```