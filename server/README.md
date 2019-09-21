# E-Commerce

## API Documentation

All endpoints can be access on:

```javascript
http://localhost:3000
```

* [User](#users)
  * [Sign Up](#sign-up)
  * [Sign in](#sign-in)
  * [Add Cart](#add-cart)
  * [Get Cart](#get-cart)
  * [Checkout](#checkout)
  * [Delete Cart](#delete-cart)
* [Product](#product)
  * [Create](#create)
  * [Find All](#find-all)
  * [Find One](#find-one)
  * [Update](#update)
  * [Delete](#delete)
* [Another Error](#another-error)



## Users

+ ### Sign Up

  Method : `POST`<br>Endpoint: `/users/signup`

  ### _Request_ :

  * body:

    ```javascript
    {
        name: String (required),
        email: String (required),
        password: String (required),
        image: Image (optional)
    }
    ```

  

  ###  _Response_ :

  - 201 (Created)

    ```javascript
    {
        token: "{your token}",
        payload: {
            name: "{your name}",
            email: "{your email}",
            role: "customer"
        }
    }
    ```

  * 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Name field is required", 
            "Email field is required", 
            "Password field is required"
        ]
    }
    ```

    

+ ### Sign In

  Method : `POST`<br>Endpoint :  `/users/signin`

  ### _Request_ :

  * Body :

    ```javascript
    {
        email: String (required),
        password: String (required)
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        token: "{your token}",
        payload: {
            name: "{your name}",
            email: "{your email}",
            role: "customer"
        }
    }
    ```

    

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Incorrect email or password"
        ]
    }
    ```

    

+ ### Add Cart

  Method : `POST`<br>Endpoint : `/users/cart`

  ### _Request_ :

  * headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  * body :

    ```javascript
    {
        ProductId: Number (required),
        count: Number (optional)
    }
    ```

  ### _Response_ :

   - 201 (Created)

     ```javascript
     {
         message: 'Added to cart'
     }
     ```

   - 400 (Bad Request)

     ```javascript
     {
         errors: [
             "Product ID is not valid"
         ]
     }
     ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Product ID not found"
        ]
    }
    ```

   - 403 (Not Authenticated)

     ```javascript
     {
         errors: [
             "You must login first"
         ]
     }
     ```

     

+ ### Get Cart

  Method : `GET`<br>Endpoint : `/users/cart`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
     [
          {
            "count": 12,
            "_id": "5d62123313555d735b1ea4ce",
            "ProductId": {
              "_id": "5d5ffbd47f4f75162e44d4be",
              "name": "Cheramics Bayat",
              "stock": 70,
              "price": 100000,
              "description": "Sangat bagus sekali",
              "image": "https://www.pdma.org/global_graphics/default-store-350x350.jpg",
              "createdAt": "2019-08-23T14:44:36.440Z",
              "updatedAt": "2019-08-23T14:44:36.440Z"
            },
            "subtotal": 110000
          }
        ]
    ```
    

    
- 403 (Not Authenticated)
  
  ```javascript
    {
        errors: [
            "You must login first"
        ]
    }
  ```
  
  
  
+ ### Checkout

  Method : `POST`<br>Endpoint : `/users/cart/checkout`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body :

    ```javascript
    {
        CartId: Number (required)
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Success checkout.'
    }
    ```  

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Cart ID is not found"
        ]
    }
    ```

  - 403 (Not Authenticated)

    ```javascript
    {
        errors: [
            "You must login first"
        ]
    }
    ```

  - 401 (Unauthorized)

    ```javascript
    {
        errors: [
            "You haven't authorized"
        ]
    }
    ```


+ ### Delete Cart

  Method : `DELETE`<br>Endpoint : `/users/cart/:CartId`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - params :

    ```javascript
    
    CartId = Number (required)
    
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Cart deleted'
    }
    ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Cart ID is not found"
        ]
    }
    ```

  - 403 (Not Authenticated)

    ```javascript
    {
        errors: [
            "You must login first"
        ]
    }
    ```

  - 401 (Unauthorized)

    ```javascript
    {
        errors: [
            "You haven't authorized"
        ]
    }
    ```

## Product

+ ### Create

  Method : `POST`<br>Endpoint : `/products`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body :

    ```javascript
    {
       name: String(required),
       description: String(required),
       image: String(optional),
       price: Number(required),
       stock: Number(required)
    }
    ```

  ### _Response_ :

  - 201 (Created)

    ```javascript
    {
        "_id": "5d5ffbf0180c3f167c03afc2",
        "name": "Cheramic Bayat",
        "stock": 70,
        "price": 10000,
        "image": "https://www.pdma.org/global_graphics/default-store-350x350.jpg",
        "createdAt": "2019-08-23T14:45:04.769Z",
        "updatedAt": "2019-08-23T14:45:04.769Z"
      }
    ```

    

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Name field is required",
            "Description field is required",
            "Stock field description is required",
            "Price field is required"
        ]
    }
    ```
    
  - 403 (Not Authenticated)
    
    ```javascript
      {
          errors: [
              "You must login first"
          ]
      }
  ```
  
  - 401 (Unauthorized)
    
    ```javascript
      {
          errors: [
              "You haven't authorized"
          ]
      }
  ```


+ ### Find All

  Method : `GET`<br>Endpoint : `/products`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    [
        {
        "_id": "5d5ffbf0180c3f167c03afc2",
        "name": "Cheramic Bayat",
        "description": "bagus sekali",
        "stock": 70,
        "price": 10000,
        "image": "https://www.pdma.org/global_graphics/default-store-350x350.jpg",
        "createdAt": "2019-08-23T14:45:04.769Z",
        "updatedAt": "2019-08-23T14:45:04.769Z"
      }
    ]
    ```

    

  - 403 (Not Authenticated)

    ```javascript
    {
        errors: [
            "You must login first"
        ]
    }
    ```

+ ### Find One

  Method : `GET`<br>Endpoint : `/products/:ProductId`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - params :

    ```javascript
    ProductId = String (required)
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        "_id": "5d5ffbf0180c3f167c03afc2",
        "name": "Cheramic Bayat",
        "stock": 70,
        "price": 10000,
        "image": "https://www.pdma.org/global_graphics/default-store-350x350.jpg",
        "createdAt": "2019-08-23T14:45:04.769Z",
        "updatedAt": "2019-08-23T14:45:04.769Z"
      }
    ```
  - 403 (Not Authenticated)

    ```javascript
    {
        errors: [
            "You must login first"
        ]
    }
    ```
  
+ ### Update

  Method : `PUT`<br>Endpoint : `/products/:ProductId`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```
  - params :

    ```javascript
    ProductId = String (required)
    ```
  - body :

    ```javascript
    {
       name: String(required),
       description: String(required),
       image: String(optional),
       price: Number(required),
       stock: Number(required)
    }
    ```

  ### _Response_ :

  - 20 (OK)

    ```javascript
    {
      	message: 'Product updated'
    }
    ```

    

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Name field is required",
            "Description field is required",
            "Stock field description is required",
            "Price field is required",
            
        ]
    }
    ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
           "Product ID is not found"
        ]
    }
    ```

  
- 403 (Not Authenticated)
  
  ```javascript
    {
      errors: [
            "You must login first"
        ]
    }
  ```
  
  - 401 (Unauthorized)
  
  ```javascript
    {
      errors: [
            "You haven't authorized"
        ]
    }
  ```
  
  
  
+ ### Delete

  Method : `DELETE`<br>Endpoint : `/products/:ProductId`

  ### _Request_ :

  - headers : 

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - params :

    ```javascript
    ProductId = String (required)
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
      	message: "Product deleted"
    }
    ```
  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Product ID is not found"
        ]
    }
    ```
  - 403 (Not Authenticated)

    ```javascript
    {
        errors: [
            "You must login first"
        ]
    }
    ```
  - 401 (Unauthorized)

    ```javascript
    {
        errors: [
            "You haven't authorized"
        ]
    }
    ```

  

## Another Error

+ 500 (Internal Server Error)

  ```javascript
  {
  	errors: [
  		"Internal Server Error"
  	]
  }
  ```

  

