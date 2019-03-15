//will be for retrieving user data (bio, avatar, social links) and updating authed user's own data
const User = require('../models/user');

//only need this for getting bio, avatar, etc
exports.getUserData = (req, res, next) => {
	//should def have user in res.locals
	const {authenticatedUser} = res.locals;
	//right now I'm sending all the data (id, username, email) thru jwt, but in future will have bio, avatar, links
	//that I won't send this way
	User.findOne({where: {id: authenticatedUser.id}})
		.then(result => {
			if(!result) throw {error: 'user not found somehow.'};
			console.log(result);
			return res.status(200).send(result);
		})
		.catch(err => {
			console.log(err);
			res.status(401).send(err);
		});
};