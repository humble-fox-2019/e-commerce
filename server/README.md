# E-Commerce

## Open Endpoints

Open endpoints require no Authentication.

* User Related
  * [User Register](md/user/userRegister.md): `POST /users/register/`
  * [User Login](md/user/userLogin.md): `POST /users/login/`
  * [Get One User](md/user/getOne.md) : `GET /users/`

## Endpoints that require Authentication

* Product Related
  * [List All Product](md/product/getAll.md) : `GET /products/`
  * [Create Product](md/product/create.md) : `POST /products/`
  * [Show Single Product](md/product/getOne.md) : `GET /products/:id/`

* Cart Related
  * [Create Cart](md/cart/cart.md)

## Endpoints that require Authentication and Authorization

* [Update Product](md/product/update.md) : `PATCH /products/:id/`
* [Delete Product](md/product/delete.md) : `DELETE /products/:id/`