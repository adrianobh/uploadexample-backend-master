require('dotenv').config();

module.exports = {
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	logging: (process.env.DB_LOGGING === 'true'),
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
