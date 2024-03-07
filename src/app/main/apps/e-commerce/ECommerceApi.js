import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from './store/searchTextSlice';
import ProductModel from './product/models/ProductModel';

export const addTagTypes = ['eCommerce_products', 'eCommerce_product', 'eCommerce_orders', 'eCommerce_order'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getECommerceProducts: build.query({
				query: () => ({ url: `/mock-api/ecommerce/products` }),
				providesTags: ['eCommerce_products']
			}),
			deleteECommerceProducts: build.mutation({
				query: (productIds) => ({
					url: `/mock-api/ecommerce/products`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['eCommerce_products']
			}),
			getECommerceProduct: build.query({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`
				}),
				providesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			createECommerceProduct: build.mutation({
				query: (newProduct) => ({
					url: `/mock-api/ecommerce/products`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['eCommerce_products', 'eCommerce_product']
			}),
			updateECommerceProduct: build.mutation({
				query: (product) => ({
					url: `/mock-api/ecommerce/products/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			deleteECommerceProduct: build.mutation({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			}),
			getECommerceOrders: build.query({
				query: () => ({ url: `/mock-api/ecommerce/orders` }),
				providesTags: ['eCommerce_orders']
			}),
			getECommerceOrder: build.query({
				query: (orderId) => ({ url: `/mock-api/ecommerce/orders/${orderId}` }),
				providesTags: ['eCommerce_order']
			}),
			updateECommerceOrder: build.mutation({
				query: (order) => ({
					url: `/mock-api/ecommerce/orders/${order.id}`,
					method: 'PUT',
					data: order
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			}),
			deleteECommerceOrder: build.mutation({
				query: (orderId) => ({
					url: `/mock-api/ecommerce/orders/${orderId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			}),
			deleteECommerceOrders: build.mutation({
				query: (ordersId) => ({
					url: `/mock-api/ecommerce/orders`,
					method: 'DELETE',
					data: ordersId
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			})
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetECommerceProductsQuery,
	useDeleteECommerceProductsMutation,
	useGetECommerceProductQuery,
	useUpdateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useGetECommerceOrdersQuery,
	useGetECommerceOrderQuery,
	useUpdateECommerceOrderMutation,
	useDeleteECommerceOrderMutation,
	useDeleteECommerceOrdersMutation,
	useCreateECommerceProductMutation
} = ECommerceApi;
/**
 * Select products
 */
/**
 * Select filtered products
 */
export const selectFilteredProducts = (products) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText.length === 0) {
			return products;
		}

		return FuseUtils.filterArrayByString(products, searchText);
	});
/**
 * Select filtered orders
 */
export const selectFilteredOrders = (orders) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText.length === 0) {
			return orders;
		}

		return FuseUtils.filterArrayByString(orders, searchText);
	});
