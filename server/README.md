## Getting Started
```
Client
===================
1. npm install
2. 

Server
===================
1. npm install 
2. 

```
Website : 
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

```
Must LOGIN to use feature below
```
### Get All Product
Route : `/products`  
Method : `GET`  
Headers : `TOKEN`    
Body : -  
Response : 
```
Success :
{
    [ productObj ]
}

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



### Add Product to Cart



### Update Quantity of Product in Cart




### Delete Product from Customer Cart 