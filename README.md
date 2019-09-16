# E-Commerce

## Open Endpoints

Open endpoints require no Authentication.

* User Related
  * [User Register](md/user/userRegister.md): `POST /users/register`
  * [User Login](md/user/userLogin.md): `POST /users/login`

## Endpoints that require Authentication

* Product Related
  * [List All Product](md/product/getAll.md) : `GET /products/`
  * [Show Single Product](md/product/getOne.md) : `GET /products/:id`
  * [Create Product](md/product/create.md) : `POST /products`
* Cart Related
  * [Create Cart](md/cart/create.md) : `POST /cart`
  * [Update Cart](md/cart/update.md) : `PATCH /cart`
  * [Destroy Cart](md/cart/delete.md) : `DELETE /cart`

## Endpoints that require Authentication and Authorization

* [Update Product](md/product/update.md) : `PUT /products/:id`
* [Delete Product](md/product/delete.md) : `DELETE /products/:id`