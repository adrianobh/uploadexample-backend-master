import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import { models } from '../models';

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map((model) => model.init(this.connection))

			.map((model) => model && model.associate(this.connection.models));
	}
}

export default new Database();
