## Dirty Paws
	There is an old phrase that said "We dont deserve dog", maybe you asking "why ?".
	Dog is known for the most loyal living creature in this world.
	Dog can feel and understand your emotion.
	They doesnt care about how you looks like, they will love you whatever it takes.
	So..., why dont you start your own journey with us?


## Link
### User Site
	http://dirtypaws.ardynn14.com
### Admin Site
    http://dirtypaws-admin.ardynn14.com/
## Users
	Before can use Dirty paws, you must create an account.
	Then login with it next time you want to open the apps.
### Customers
### register
	Method		: POST
	Endpoint	: http://localhost:3000/users/register
	Requierment	: 
		1. username : String
		2. email	: String (email format)
		3. password : String
	Responses	:
		Success	: 
			1. status   : 201
			2. token    : String
			3. username : String
		Error	:
			1. status 	: 400
			2. message	: Array
### login
	Method		: POST
	Endpoint	: http://localhost:3000/users/login
	Requierment	: 
		1. email	: String (email format)
		2. password : String
	Responses	:
		Success	: 
			1. status   : 200
			2. token    : String
			3. username : String
		Error	:
			1. status 	: 400
			2. message	: String || `Wrong email or password`
### admin 
### login
	Method		: POST
	Endpoint	: http://localhost:3000/users/admin
	Requierment	: 
		1. email	: String (email format)
		2. password : String
	Responses	:
		Success	: 
			1. status   : 200
			2. token    : String
			3. username : String
		Error	:
			1. status 	: 400
			2. message	: String || `Wrong email or password`
## Pet
### 	findAll
	Method		: get
	Endpoint	: http://localhost:3000/pets
	Requierment	: 
		1. headers : token (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : Array
		Error	:
			1. status 	: 500
			2. message	: Internal server error
### create
	Method		: POST
	Endpoint	: http://localhost:3000/pets
	Requierment	: 
		1. species	: String
		2. photo	: file (.jpg)
		3. price 	: Number
		4. stock 	: Number
		5. headers	: token (admin)
	Responses	:
		Success	: 
			1. status   : 201
			2. message  : Object ({species, price, stock, photo})
		Error	:
			1. status 	: 400
			2. message	: Array
### delete
	Method		: delete
	Endpoint	: http://localhost:3000/pets/:id
	Requierment	: 
		1. headers	: token (admin)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : `Success delete dog from list`
		Error	:
			1. status 	: 403
			2. message	: `Forbidden, only authorize user can do this action`
### Cart
### 	readOne
	Method		: get
	Endpoint	: http://localhost:3000/cart
	Requierment	: 
		1. headers : token (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : Cart {Object}
		Error	:
			1. status 	: 500
			2. message	: Internal server error
### setIn
	Method		: patch
	Endpoint	: http://localhost:3000/cart/add/:id
	Requierment	: 
		1. headers	: token
		2. :id		: String (Dog's Id)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : `Success add this pet to your cart`
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### setOut
	Method		: patch
	Endpoint	: http://localhost:3000/cart/remove/:id
	Requierment	: 
		1. headers	: token
		2. :id		: String (Dog's Id)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : `Success remove this pet from your cart`
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### checkOut
	Method		: patch
	Endpoint	: http://localhost:3000/cart/checkout/:id
	Requierment	: 
		1. headers	: token
		2. :id		: String (Cart's Id)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : `Success remove this pet from your cart`
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### Transaction
### findAll
	Method		: get
	Endpoint	: http://localhost:3000/transactions
	Requierment	: 
		1. headers	: token
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : Array of Object
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### find
	Method		: get
	Endpoint	: http://localhost:3000/transactions/admin
	Requierment	: 
		1. headers	: token (admin)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : Array of Object
		Error	:
			1. status 	: 403
			2. message	: `Forbidden, only authorize user can do this action`
### pay
	Method		: patch
	Endpoint	: http://localhost:3000/transactions/pay/:id
	Requierment	: 
		1. headers	: token
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : transaction (updated in field payment)
		Error	:
			1. status 	: 403
			2. message	: `Forbidden, only authorize user can do this action`
### verified
	Method		: patch
	Endpoint	: http://localhost:3000/transactions/verified/:id
	Requierment	: 
		1. headers	: token (admin)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : transaction (updated in field delivery)
		Error	:
			1. status 	: 403
			2. message	: `Forbidden, only authorize user can do this action`
### recievied
	Method		: patch
	Endpoint	: http://localhost:3000/transactions/recievied/:id
	Requierment	: 
		1. headers	: token
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : transaction (updated in field recieved)
		Error	:
			1. status 	: 403
			2. message	: `Forbidden, only authorize user can do this action`