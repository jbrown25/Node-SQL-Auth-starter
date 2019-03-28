require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/user');

const app = express();

//configure app
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
app.use(cors()); //just let everyone in for now

//configure routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);


app.use('/', (req, res, next) => {
	res.status(404).send({error: 'boy you lost'});
});

//configure database and launch app
sequelize.sync()
	.then(result => {
		//console.log(result);
		app.listen(process.env.PORT || 8080, () => {
			console.log('server started');
		});
	})
	.catch(err => console.log(err));