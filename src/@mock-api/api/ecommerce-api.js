import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';

let productsDB = mockApi.components.examples.ecommerce_products.value;
let ordersDB = mockApi.components.examples.ecommerce_orders.value;
export const eCommerceApiMocks = (mock) => {
	mock.onGet('/ecommerce/products').reply(() => {
		return [200, productsDB];
	});
	mock.onPost('/ecommerce/products').reply(({ data }) => {
		const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
		productsDB.unshift(newProduct);
		return [200, newProduct];
	});
	mock.onDelete('/ecommerce/products').reply(({ data }) => {
		const ids = JSON.parse(data);
		productsDB = productsDB.filter((item) => !ids.includes(item.id));
		return [200, productsDB];
	});
	mock.onGet('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params;
		const product = _.find(productsDB, { id });

		if (product) {
			return [200, product];
		}

		return [404, 'Requested product do not exist.'];
	});
	mock.onPut('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params;
		_.assign(_.find(productsDB, { id }), JSON.parse(config.data));
		return [200, _.find(productsDB, { id })];
	});
	mock.onDelete('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params;
		_.remove(productsDB, { id });
		return [200, id];
	});
	mock.onGet('/ecommerce/orders').reply(() => {
		return [200, ordersDB];
	});
	mock.onPost('/ecommerce/orders').reply((config) => {
		const newOrder = { id: FuseUtils.generateGUID(), ...JSON.parse(config.data) };
		ordersDB.push(newOrder);
		return [200, newOrder];
	});
	mock.onDelete('/ecommerce/orders').reply((config) => {
		const ids = JSON.parse(config.data);
		ordersDB = ordersDB.filter((item) => !ids.includes(item.id));
		return [200, ordersDB];
	});
	mock.onGet('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params;
		const order = _.find(ordersDB, { id });

		if (order) {
			return [200, order];
		}

		return [404, 'Requested order do not exist.'];
	});
	mock.onPut('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params;
		_.assign(_.find(ordersDB, { id }), JSON.parse(config.data));
		return [200, _.find(ordersDB, { id })];
	});
	mock.onDelete('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params;
		_.remove(ordersDB, { id });
		return [200, id];
	});
};
