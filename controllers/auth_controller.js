const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createUserToken} = require('../services/auth');

exports.signup = (req, res, next) => {
	const {
		email,
		username,
		password
	} = req.body;
	if(!email || !username || !password){
		return res.status(422).send({error: 'You must enter email, username, and password'});
	}
	//put your password and username requirements here

	User.findOne({where: {email: email}})
		.then(existingUser => {
			if(existingUser) throw {error: 'Email is in use'};
			return bcrypt.hash(password, 10);
		})
		.then(hash => {
			return User.create({
				username,
				email,
				password: hash
			});
		})
		.then(newUser => {
			const token = createUserToken(newUser);
			return res.status(200).send({token});
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err);
		});
};

exports.signin = (req, res, next) => {
	const {username, password} = req.body;
	if(!username || !password) return res.status(422).send({error: 'Username and password are required'});

	let foundUser;
	User.findOne({where: {username: username}})
		.then(user => {
			if(!user) throw {error: 'Username not found in our records'};
			foundUser = user;
			return bcrypt.compare(password, foundUser.password);
		})
		.then(passed => {
			if(!passed) throw {error: 'Password is incorrect'};
			const token = createUserToken(foundUser);
			return res.status(200).send({token});
		})
		.catch(err => {
			console.log(err);
			res.status(401).send(err);
		});
};