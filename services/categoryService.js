const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoryService {

	constructor() {
		this.categories = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.categories.push({
				name: faker.commerce.productAdjective(),
				isBlock: faker.datatype.boolean(),
				products: [faker.commerce.productName()]
			});
		}
	}

	async create(data) {
		const newCategory = data;
		this.categories.push(newCategory);
		return newCategory;
	}

	async find() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.categories);
			}, 5000);
		})
	}

	async findOne(name) {
		const category = this.categories.find(item => item.name === name);
		if (!category) {
			throw boom.notFound('Category not found');
		} else if (category.isBlock) {
			throw boom.conflict('Category is block');
		}
		return category.products;
	}

	async update(name, changes) {
		const index = this.categories.findIndex(item => item.name === name);
		if (index === -1) {
			throw boom.notFound('Category not found');
		}
		const category = this.categories[index];
		this.categories[index] = {
			...category,
			...changes
		};
		return this.categories[index];
	}

	async delete(name) {
		const index = this.categories.findIndex(item => item.name === name);
		if (index === -1) {
			throw boom.notFound('Category not found');
		}
		this.categories.splice(index, 1);
		return { name };
	}

}

module.exports = CategoryService;