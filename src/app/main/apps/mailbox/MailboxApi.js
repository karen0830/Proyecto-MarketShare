import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import _ from '@lodash';

export const addTagTypes = [
	'mailbox_mail',
	'mailbox_mails',
	'mailbox_filters',
	'mailbox_labels',
	'mailbox_label',
	'mailbox_folders'
];
const MailboxApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMailboxMails: build.query({
				query: (routeParams) => {
					let url = '/mock-api/mailbox/mails/';

					if (routeParams) {
						if (routeParams.folderHandle) {
							url += routeParams.folderHandle;
						}

						if (routeParams.labelHandle) {
							url += `labels/${routeParams.labelHandle}`;
						}

						if (routeParams.filterHandle) {
							url += `filters/${routeParams.filterHandle}`;
						}
					}

					return {
						url
					};
				},
				providesTags: ['mailbox_mails']
			}),
			getMailboxMail: build.query({
				query: (mailId) => ({
					url: `/mock-api/mailbox/mail/${mailId}`
				}),
				providesTags: ['mailbox_mail']
			}),
			applyMailboxMailAction: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/actions`,
					method: 'POST',
					data: queryArg
				}),
				invalidatesTags: ['mailbox_mails', 'mailbox_mail']
			}),
			createMailboxMail: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/${queryArg.folderSlug}`,
					method: 'POST',
					data: queryArg.mail
				}),
				invalidatesTags: ['mailbox_mails']
			}),
			getMailboxMailsByLabel: build.query({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/labels/${queryArg.labelSlug}`
				}),
				providesTags: ['mailbox_mails']
			}),
			getMailboxMailsByFilter: build.query({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/filters/${queryArg.filterSlug}`
				}),
				providesTags: ['mailbox_mails']
			}),
			getMailboxFilters: build.query({
				query: () => ({ url: `/mock-api/mailbox/filters` }),
				providesTags: ['mailbox_filters']
			}),
			getMailboxLabels: build.query({
				query: () => ({ url: `/mock-api/mailbox/labels` }),
				providesTags: ['mailbox_labels']
			}),
			updateMailboxLabel: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/labels/${queryArg.labelSlug}`,
					method: 'PUT',
					data: queryArg.label
				}),
				invalidatesTags: ['mailbox_label', 'mailbox_labels']
			}),
			getMailboxFolders: build.query({
				query: () => ({ url: `/mock-api/mailbox/folders` }),
				providesTags: ['mailbox_folders']
			})
		}),
		overrideExisting: false
	});
export default MailboxApi;
export const {
	useGetMailboxMailsQuery,
	useApplyMailboxMailActionMutation,
	useCreateMailboxMailMutation,
	useGetMailboxMailsByLabelQuery,
	useGetMailboxMailsByFilterQuery,
	useGetMailboxFiltersQuery,
	useGetMailboxLabelsQuery,
	useUpdateMailboxLabelMutation,
	useGetMailboxFoldersQuery,
	useGetMailboxMailQuery
} = MailboxApi;
export const selectMails = (routeParams) => (state) =>
	MailboxApi.endpoints.getMailboxMails.select(routeParams)(state)?.data ?? [];
export const selectFolders = (state) => MailboxApi.endpoints.getMailboxFolders.select()(state)?.data ?? [];
export const selectLabels = (state) => MailboxApi.endpoints.getMailboxLabels.select()(state)?.data ?? [];
export const selectLabelById = (id) =>
	createSelector([selectLabels], (labels) => {
		return _.find(labels, { id });
	});
export const selectFilters = (state) => MailboxApi.endpoints.getMailboxLabels.select()(state)?.data ?? [];
export const selectMailsTitle = (routeParams) =>
	createSelector([selectFolders, selectLabels, selectFilters], (folders, labels, filters) => {
		let title = '';

		if (routeParams.folderHandle) {
			title = _.find(folders, { slug: routeParams.folderHandle })?.title;
		}

		if (routeParams.labelHandle) {
			title = _.find(labels, { slug: routeParams.labelHandle })?.title;
		}

		if (routeParams.filterHandle) {
			title = _.find(filters, { slug: routeParams.filterHandle })?.title;
		}

		return title;
	});
