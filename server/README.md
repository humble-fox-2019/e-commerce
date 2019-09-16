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
Link : 


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
    "token": <TOKEN>
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
Admin Privilege
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
    "description : STRING,
    "imageURL" : <IMAGE FILE TYPE>
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