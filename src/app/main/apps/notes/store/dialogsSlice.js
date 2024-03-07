import { createSelector, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import { appSelector } from 'app/store/store';
import { selectNoteList } from '../NotesApi';

const initialState = {
	noteDialogId: null,
	labelsDialogOpen: false
};
/**
 * The Notes App notes slice.
 */
export const dialogsSlice = createSlice({
	name: 'notesApp/dialogs',
	initialState,
	reducers: {
		openNoteDialog: (state, action) => {
			state.noteDialogId = action.payload;
		},
		closeNoteDialog: (state) => {
			state.noteDialogId = null;
		},
		openLabelsDialog: (state) => {
			state.labelsDialogOpen = true;
		},
		closeLabelsDialog: (state) => {
			state.labelsDialogOpen = false;
		}
	}
});
export const { openNoteDialog, closeNoteDialog, closeLabelsDialog, openLabelsDialog } = dialogsSlice.actions;
export const selectNoteDialogId = appSelector((state) => state.notesApp?.dialogs?.noteDialogId);
export const selectDialogNote = (routeParams) =>
	createSelector([selectNoteDialogId, selectNoteList(routeParams)], (noteId, notes) => {
		return _.find(notes, { id: noteId });
	});
export const selectLabelsDialogOpen = (state) => state.notesApp?.dialogs?.labelsDialogOpen;
export default dialogsSlice.reducer;
