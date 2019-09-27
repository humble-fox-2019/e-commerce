# E-Commerce Documentation

---

## Register
URL:  `/api/user/register`
Method: `POST`
Status Code:  **`201`**
## **Register User**

Method : POST

Routes : /users/register

Request :

```json
{
	name :  Luffy Cat,

	address : Rawamangun, Jakarta Timur,

  email : customer@mail.com,

	password : happycat123 
}
```

Response :

```
{
	message : 'Create new account',
	
	data : {
	
		name :  Luffy Cat,

		address : Rawamangun, Jakarta Timur,

  	email : customer@mail.com,

		password : happycat123 		
	}
}
```


## Login
URL:  `/api/user/login`
Method: `POST`
Status Code:  **`200`**

Request (Example): 
```
{
  email : "customer@mail.com",
  password : "happycat123"
}
```

Respond (Example):
```
{
	token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg2YzYzMmVlOTQ5OWU4MDdjZDY2MTIiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTY5MTEzNzg0fQ.P2fJ4FCBLsaTfnjv3dqWgKkxIlavkakTT0YVKmxwsDY",
	role : 'customer'
}
```

# Product
## Create Product

Url: `/api/products/create`
Method: `POST`
Status: **`201`**
Authentication: **`Required`**

Error:
- **`400`** : 
Validation: 
    - Product Name is required
    - Image is required
    - Category is required
    - Description is require
    - Price is required


Data: 
```
{
  name: 'Mochi Mochi',
  image : file.jpeg,
  category : 'Snack',
  description : 'Manis rasanya',
  price: 80000,
  stock: 15
}
```

Response: 
```
{
  message : Success create new product',
  data : {
      _id : '11177h5gpl'
      name: 'Mochi Mochi',
      image : (gcs public url),
      category : 'Snack',
      description : 'Manis rasanya',
      price: 80000,
      stock: 15,
      createdAt : date, 
      updatedAt : date
  }
}
```

## Edit Product

Url: `/api/products/:id`
Method: `PUT`
Status: **`200`**
Authentication: **`Required`**

Data: 
```
{
  name: 'Mochi',
  img : file.pneg,
  category : 'Snack',
  description : 'Manis rasanya',
  price: 100000,
  stock: 15
}
```

Response: 
```
{
 message : 'Success Update'
}
```

## Find All Products

Url: `/api/products/`
Method: `GET`
Status: **`200`**

Response: 
```
{
    [
        {
      _id : '11177h5gpl'
      name: 'Mochi Mochi',
      image : (gcs public url),
      category : 'Snack',
      description : 'Manis rasanya',
      price: 80000,
      stock: 15,
      createdAt : date, 
      updatedAt : date
  }
 , ......
 ]
}
```

## Find One Product

Url: `/api/products/:id`
Method: `GET`
Status: **`200`**

Response:
```
{
    data : {
      _id : '11177h5gpl'
      name: 'Mochi Mochi',
      image : (gcs public url),
      category : 'Snack',
      description : 'Manis rasanya',
      price: 80000,
      stock: 15,
      createdAt : date, 
      updatedAt : date
  }
}
```

## Delete Product

Url: `/api/products/:id`
Method: `GET`
Status: **`200`**
Authentication: **`Required`**

Response:
```
{
  message: `Success deleted`,
  data: {
      "n" : 1, 
      "nModified" : 1,
       "ok" : 1
  }
}
```

## Get By Category
Url : `/api/products/category`
Method: 'GET'
Status : 200
Data : 
```
{
 category : 'Snack'
}
```

Response: 
```
{
    [
        {
      _id : '11177h5gpl'
      name: 'Mochi Mochi',
      image : (gcs public url),
      category : 'Snack',
      description : 'Manis rasanya',
      price: 80000,
      stock: 15,
      createdAt : date, 
      updatedAt : date
  }
 , ......
 ]
}
```


# CART
## Create Cart

Url: `/api/carts/create`
Method: `POST`
Status: **`200`**
Authentication: **`Required`**


Data: 
```
{
  listItem : {
      {
          _id: '456789oi7654876',
          productName : 'Cemilan',
          stock : 10,
          quantity : 2,
          price : 25000,
          total : 50000
      }, ....
  },
  totalPayment : 150000
}
```
Response:
```
{
    message: 'Your cart request has been process'
}
```
# Error Handler

Error Status:

`400` : 
  - Validation

`401` : 
  - Unauthorized access
  - Authentication needed

`403` : 
  - Wrong Email/Password
  - No Access to certain post

`404` : 
  - Cart not found
  - Product not found

`406`: 
  - Error Validation
  
`500`:
  - Internal Server Error
 
