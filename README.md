# E-Commerce [Posterpedia]
## Getting Started
```
Client
===================
1. npm install
2. npm run serve

Server
===================
1. npm install 
2. npm run test

Testing
===================
1. npm run test
2. update role newUser jadi admin di database
3. npm run test
```
Website : http://posterpedia.cado.store/
Postman : https://documenter.getpostman.com/view/6836981/SVmvSe8r

# 
## User
### Login
Route : `/login`  
Method : `POST`  
Headers : -   
Body : 
```
{
    "email" : "johnDoe@email.com",
    "password" : "johnDoe123"
}
```
Response : 

```
Success :
{
    "token": <TOKEN>,
    "user": Object
}
Error : 
{
    "status" : 400,
    "message" : []
}
```
# 

### Register
Route : `/register`  
Method : `POST`  
Headers : -   
Body : 
```
{
    "username" : "johnDoe",
    "email" : "johnDoe@email.com",
    "password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "createdUser"
}
Error :
{
    "status": 401,
    "message": "User already registered"
}
```

# 

## Product

### Get All Product
Route : `/products`  
Method : `GET`  
Body : -  
Response : 
```
Success :
{
    [ productObj ]
}

```

### Get Product By ID
Route : `/products/detail/:id` [ id -> productId ]     
Method : `GET`  
Body : -  
Response : 
```
Success :
{
    { productObj }
}
Error: 
{
    "status" : 404,
    "message": "Product not found"
}
```

```
Must LOGIN to use feature below
```

# 

```
Admin Privilege [MUST LOGIN AS AN ADMIN]
```
### Create New Product
Route : `/products`  
Method : `POST`  
Headers : `TOKEN`    
Body : 
```
{
    "name" : STRING,
    "price" : NUMBER,
    "stock" : NUMBER,
    "category" : STRING,
    "description : STRING,
    "file" : <IMAGE FILE TYPE>
}
```
Response : 
```
Success :
{
    "createdProduct"
}
Error :
{
    status : 400,
    message : []
}
```


### Update Product
Route : `/products/:id`  
Method : `PUT`  
Headers : `TOKEN`    
Body : 
```
{
    "name" : STRING,
    "price" : NUMBER,
    "stock" : NUMBER,
    "category" : STRING,
    "description" : STRING
    "file" : <IMAGE FILE TYPE>
}
```
Response : 
```
Success :
{
    "updatedPreviousProduct"
}
Error :
{
    status : 400,
    message : []
}
```


### Delete Product
Route : `/products/:id`  
Method : `PUT`  
Headers : `TOKEN`    
Body : 
```
{
    "name" : STRING,
    "price" : NUMBER,
    "stock" : NUMBER,
    "category" : STRING,
    "description" : STRING
    "file" : <IMAGE FILE TYPE>
}
```
Response : 
```
Success :
{
    "updatedPreviousProduct"
}
Error :
{
    status : 400,
    message : []
}
```


## Customer 
```
Customer Privilege [MUST LOGIN AS AN Customer]
```
### Get Product in Customer Cart  
Route : `/products/cart`     
Method : `GET`  
Headers : `TOKEN`    
Body : -   
Response : 
```
Success :
{
    [ cartObject ]
}
```

### Add Product to Cart
Route : `/products/cart`     
Method : `GET`  
Headers : `TOKEN`    
Body :    
```
{
	"productId"
	"quantity"
}
```   
Response : 
```
Success :
{
    [ cartObject ]
}
```


### Update Quantity of Product in Cart
Route : `/products/cart/:id` [:id -> cartId]       
Method : `PATCH`  
Headers : `TOKEN`    
Body :    
```
{
	"quantity"
}
```   
Response : 
```
Success :
{
    previousUpdatedCart
}
```


### Delete Product from Customer Cart 
Route : `/products/cart/:id` [:id -> cartId]       
Method : `DELETE`  
Headers : `TOKEN`    
Body : -    
Response : 
```
Success :
{
    deletedCart
}
```
