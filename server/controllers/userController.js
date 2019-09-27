const User = require('../models/user');
const { comparePassword } = require('../helpers/bycryptjs');
const { getToken } = require('../helpers/jwt');

class UserController {
	static create(req, res, next) {
		const { name, address, email, password } = req.body;
		User.create({
			name,
			address,
			email,
			password
		})
			.then((data) => {
				res.status(200).json({
					message: 'Success Create User',
					data: data
				});
			})
			.catch((err) => {
				next({
					status: 400,
					error: err
				});
			});
	}

	static login(req, res, next) {
		const { email, password } = req.body;
		if (!email || !password) {
			next({
				status: 400,
				message: 'Email/Password is required'
			});
		} else {
			User.findOne({ email })
				.then((isFound) => {
					if (isFound) {
						const { _id, name, email, role } = isFound;
						if (comparePassword(password, isFound.password)) {
							let payload = {
								_id,
								name,
								email,
								role
							};
							res.status(200).json({
								token: getToken(payload),
								role: role
							});
						} else {
							next({
								status: 400,
								message: 'Wrong email/password'
							});
						}
					} else {
						next({
							status: 400,
							message: 'Wrong email/password'
						});
					}
				})
				.catch(next);
		}
	}
}

module.exports = UserController;
