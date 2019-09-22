## Rest Api

All the API routes start by [http://35.192.45.25](http://35.192.45.25/)

### Users End Point

| HTTP | END POINT       | HEADERS |                             BODY                             |    DESCRIPTION    |
| ---- | --------------- | :-----: | :----------------------------------------------------------: | :---------------: |
| POST | /users/register |  None   | username :  String,<br /> email : String, <br />password : String | Register New User |
| POST | /users/login    |  None   |           email : String, <br />password : String            |    Login User     |

### Products End Point

|  HTTP  |   END POINT    | HEADERS |                             BODY                             |   DESCRIPTION    |
| :----: | :------------: | :-----: | :----------------------------------------------------------: | :--------------: |
|  POST  |   /products    |  token  | name: String,<br />price : String.<br />image : File ,<br />stock : Number | Create products  |
|  GET   |   /products    |  None   |                             None                             | Get All Products |
| PATCH  | /products/:id  |  token  | name : String,<br />price : String,<br />image : File,<br />stock : N |  Edit a Product  |
| DELETE | /products:/:id |  token  |                             None                             | Delete a Product |

### Carts End Point

|  HTTP  | END POINT  | HEADERS |                   BODY                   |    DESCRIPTION     |
| :----: | :--------: | :-----: | :--------------------------------------: | :----------------: |
|  POST  |   /carts   |  token  | ProductId : String,<br />amount : Number | Create user carts  |
|  GET   |   /carts   |  token  |                   None                   | Get all user carts |
| PATCH  | /carts/:id |  token  | ProductId : String,<br />amount : Number |   Edit user cart   |
| DELETE | /carts/:id |  token  |                   None                   |  Delete user cart  |

### Transactions End Point

| HTTP | END POINT     | HEADERS | BODY                                     | DESCRIPTION               |
| ---- | ------------- | ------- | ---------------------------------------- | ------------------------- |
| GET  | /transactions | token   | None                                     | Get all user transactions |
| POST | /transactions | token   | CartId : String<br />totalPrice : Number | Create user transactions  |

