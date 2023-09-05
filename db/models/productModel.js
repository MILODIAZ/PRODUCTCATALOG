const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'product';

const ProductSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
		validate: {
			len: [3, 100]
		}
	},
	price: {
		allowNull: false,
		type: DataTypes.INTEGER
	},
	description: {
		type: DataTypes.INTEGER,
		validate: {
			len: [0, 200]
		}
	},
	isAvailable: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		field: 'is_available'
	},
	stock: {
		allowNull: false,
		type: DataTypes.INTEGER
	},
	isBlock: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		field: 'is_block'
	},
	imagenUrl: {
		type: DataTypes.INTEGER,
		field: 'imagen_url'
	}
};

class Product extends Model {
	static associate() {

	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_TABLE,
			modelName: 'Product',
			timestamps: false
		}
	}
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };