import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'apps',
		title: 'Applications',
		subtitle: 'Custom made application designs',
		type: 'group',
		icon: 'heroicons-outline:cube',
		translate: 'APPLICATIONS',
		children: [
			{
				id: 'apps.messenger',
				title: 'Messenger',
				type: 'item',
				icon: 'heroicons-outline:chat-alt',
				url: '/apps/messenger',
				translate: 'MESSENGER'
			},
			{
				id: 'apps.contacts',
				title: 'Contacts',
				type: 'item',
				icon: 'heroicons-outline:user-group',
				url: '/apps/contacts',
				translate: 'CONTACTS'
			},
			{
				id: 'apps.ecommerce',
				title: 'ECommerce',
				type: 'collapse',
				icon: 'heroicons-outline:shopping-cart',
				translate: 'ECOMMERCE',
				children: [
					{
						id: 'e-commerce-products',
						title: 'Products',
						type: 'item',
						url: 'apps/e-commerce/products',
						end: true
					},
					{
						id: 'e-commerce-product-detail',
						title: 'Product Detail',
						type: 'item',
						url: 'apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print'
					},
					{
						id: 'e-commerce-new-product',
						title: 'New Product',
						type: 'item',
						url: 'apps/e-commerce/products/new'
					},
					{
						id: 'e-commerce-orders',
						title: 'Orders',
						type: 'item',
						url: 'apps/e-commerce/orders',
						end: true
					},
					{
						id: 'e-commerce-order-detail',
						title: 'Order Detail',
						type: 'item',
						url: 'apps/e-commerce/orders/1'
					}
				]
			},
			{
				id: 'apps.help-center',
				title: 'Help Center',
				type: 'collapse',
				icon: 'heroicons-outline:support',
				url: '/apps/help-center',
				children: [
					{
						id: 'apps.help-center.faqs',
						title: 'FAQs',
						type: 'item',
						url: '/apps/help-center/faqs'
					},
					{
						id: 'apps.help-center.support',
						title: 'Support',
						type: 'item',
						url: '/apps/help-center/support'
					}
				]
			},
			{
				id: 'apps.profile',
				title: 'Profile',
				type: 'item',
				icon: 'heroicons-outline:user-circle',
				url: '/apps/profile'
			},
		]
	},
	{
		id: 'divider-1',
		type: 'divider'
	}
];
export default navigationConfig;
