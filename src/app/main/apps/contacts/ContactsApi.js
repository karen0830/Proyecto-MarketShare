import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['contacts_item', 'contacts', 'contacts_tag', 'contacts_tags', 'countries'];
const ContactsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getContactsList: build.query({
				query: () => ({ url: `/mock-api/contacts` }),
				providesTags: ['contacts']
			}),
			createContactsItem: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/contacts`,
					method: 'POST',
					data: queryArg.contact
				}),
				invalidatesTags: ['contacts']
			}),
			getContactsItem: build.query({
				query: (contactId) => ({ url: `/mock-api/contacts/${contactId}` }),
				providesTags: ['contacts_item']
			}),
			updateContactsItem: build.mutation({
				query: (contact) => ({
					url: `/mock-api/contacts/${contact.id}`,
					method: 'PUT',
					data: contact
				}),
				invalidatesTags: ['contacts_item', 'contacts']
			}),
			deleteContactsItem: build.mutation({
				query: (contactId) => ({
					url: `/mock-api/contacts/${contactId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['contacts']
			}),
			getContactsTag: build.query({
				query: (tagId) => ({ url: `/mock-api/contacts/tags/${tagId}` }),
				providesTags: ['contacts_tag']
			}),
			updateContactsTag: build.mutation({
				query: (tag) => ({
					url: `/mock-api/contacts/tags/${tag.id}`,
					method: 'PUT',
					body: tag
				}),
				invalidatesTags: ['contacts_tags']
			}),
			deleteContactsTag: build.mutation({
				query: (tagId) => ({
					url: `/mock-api/contacts/tags/${tagId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['contacts_tags']
			}),
			getContactsTags: build.query({
				query: () => ({ url: `/mock-api/contacts/tags` }),
				providesTags: ['contacts_tags']
			}),
			getContactsCountries: build.query({
				query: () => ({ url: `/mock-api/countries` }),
				providesTags: ['countries']
			}),
			createContactsTag: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/contacts/tags`,
					method: 'POST',
					body: queryArg.tag
				}),
				invalidatesTags: ['contacts_tags']
			})
		}),
		overrideExisting: false
	});
export default ContactsApi;
export const {
	useGetContactsItemQuery,
	useUpdateContactsItemMutation,
	useDeleteContactsItemMutation,
	useGetContactsListQuery,
	useCreateContactsItemMutation,
	useGetContactsTagQuery,
	useGetContactsCountriesQuery,
	useUpdateContactsTagMutation,
	useDeleteContactsTagMutation,
	useGetContactsTagsQuery,
	useCreateContactsTagMutation
} = ContactsApi;
export const selectContactList = (state) => ContactsApi.endpoints.getContactsList.select()(state)?.data ?? [];
/**
 * Select filtered contacts
 */
export const selectFilteredContactList = (contacts) =>
	createSelector([selectSearchText], (searchText) => {
		if (!contacts) {
			return [];
		}

		if (searchText.length === 0) {
			return contacts;
		}

		return FuseUtils.filterArrayByString(contacts, searchText);
	});
/**
 * Select grouped contacts
 */
export const selectGroupedFilteredContacts = (contacts) =>
	createSelector([selectFilteredContactList(contacts)], (contacts) => {
		if (!contacts) {
			return [];
		}

		const sortedContacts = [...contacts]?.sort((a, b) =>
			a?.name?.localeCompare(b.name, 'es', { sensitivity: 'base' })
		);
		const groupedObject = sortedContacts?.reduce((r, e) => {
			// get first letter of name of current element
			const group = e.name[0];

			// if there is no property in accumulator with this letter create it
			if (!r[group]) r[group] = { group, children: [e] };
			// if there is push current element to children array for that letter
			else {
				r[group]?.children?.push(e);
			}

			// return accumulator
			return r;
		}, {});
		return groupedObject;
	});
