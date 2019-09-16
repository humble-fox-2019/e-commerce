# e-commerce

## Cheramics Store DB Schema

---------
Users
---------
+ id
+ name - string
+ email - string
+ password - string
+ role - string || default customer
+ image
+ cart - array of product

---------
Products
---------
+ id
+ name - string
+ description - string
+ image - string
+ price - integer
+ stock - integer

---------
Orders
---------
+ id
+ UserId - object id of User
+ Products - array of object id of product
+ status - string 

## API Documentation

---------
**Signup User**
----
  Register a user to the server.

* **Method and URL**

  `POST`  /users/signup

*  **URL Params**

   None

* **Data Params**

  **Required:**
 
   `name=[string]`

   `email=[string]`

   `password=[string]`

   `image=[string]`

   `role=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id : ObjectID, name : "Michael Bloom", email: "michael@mail.com", role: "customer" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ errors : ["Name field is required", "Email field is required", "Password field is required", "Email format is invalid", "Image field is required"] }`


**Signin**
----
  Sign in with registered user to get access token.

* **Method and URL**

  `POST`  /users/signin

*  **URL Params**

   None

* **Data Params**

  **Required:**
 
   `email=[string]`

   `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : "{access token}" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ errors : ["Password field is required", "Email field is required"] }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ errors: ["Incorrect email or password"]}`
