module.exports = {
	origin(origin, callback) {
		if (process.env.ACCESS_LIST.indexOf(origin) !== -1 || !origin) callback(null, true);
		else callback(new Error('Not allowed by CORS'));
	},
	optionsSuccessStatus: 200,
};
