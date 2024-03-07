import { apiService as api } from 'app/store/apiService';

export const addTagTypes = [
	'notes_list',
	'notes_item',
	'notes_labels',
	'notes_label',
	'notes_archived_items',
	'notes_reminder_items'
];
const NotesApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getNotesList: build.query({
				query: (routeParams) => {
					const { filter, id } = routeParams;
					let url = '';

					if (filter === 'labels') {
						url = `/mock-api/notes/labels/${id}`;
					}

					if (filter === 'archive') {
						url = `/mock-api/notes/archive`;
					}

					if (filter === 'reminders') {
						url = `/mock-api/notes/reminders`;
					}

					if (!filter) {
						url = `/mock-api/notes`;
					}

					return {
						url
					};
				},
				providesTags: ['notes_list']
			}),
			createNotesItem: build.mutation({
				query: (note) => ({
					url: `/mock-api/notes`,
					method: 'POST',
					data: note
				}),
				invalidatesTags: ['notes_list', 'notes_item']
			}),
			getNotesItem: build.query({
				query: (queryArg) => ({ url: `/mock-api/notes/${queryArg.noteId}` }),
				providesTags: ['notes_item']
			}),
			updateNotesItem: build.mutation({
				query: (note) => ({
					url: `/mock-api/notes/${note.id}`,
					method: 'PUT',
					data: note
				}),
				invalidatesTags: ['notes_item', 'notes_list']
			}),
			deleteNotesItem: build.mutation({
				query: (noteId) => ({
					url: `/mock-api/notes/${noteId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notes_list']
			}),
			getNotesLabels: build.query({
				query: () => ({ url: `/mock-api/notes/labels` }),
				providesTags: ['notes_labels']
			}),
			createNotesLabel: build.mutation({
				query: (noteLabel) => ({
					url: `/mock-api/notes/labels`,
					method: 'POST',
					data: noteLabel
				}),
				invalidatesTags: ['notes_label', 'notes_labels']
			}),
			getNotesLabel: build.query({
				query: (queryArg) => ({ url: `/mock-api/notes/labels/${queryArg.labelId}` }),
				providesTags: ['notes_label']
			}),
			updateNotesLabel: build.mutation({
				query: (notesLabel) => ({
					url: `/mock-api/notes/labels/${notesLabel.id}`,
					method: 'PUT',
					data: notesLabel
				}),
				invalidatesTags: ['notes_labels']
			}),
			deleteNotesLabel: build.mutation({
				query: (labelId) => ({
					url: `/mock-api/notes/labels/${labelId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notes_labels']
			}),
			getNotesArchivedItems: build.query({
				query: () => ({ url: `/mock-api/notes/archive` }),
				providesTags: ['notes_archived_items']
			}),
			getNotesReminderItems: build.query({
				query: () => ({ url: `/mock-api/notes/reminder` }),
				providesTags: ['notes_reminder_items']
			})
		}),
		overrideExisting: false
	});
export { NotesApi };
export const {
	useGetNotesListQuery,
	useCreateNotesItemMutation,
	useGetNotesItemQuery,
	useUpdateNotesItemMutation,
	useDeleteNotesItemMutation,
	useGetNotesLabelsQuery,
	useCreateNotesLabelMutation,
	useGetNotesLabelQuery,
	useUpdateNotesLabelMutation,
	useDeleteNotesLabelMutation,
	useGetNotesArchivedItemsQuery,
	useGetNotesReminderItemsQuery
} = NotesApi;
export const selectNoteList = (routeParams) => (state) =>
	NotesApi.endpoints.getNotesList.select(routeParams)(state)?.data ?? [];
