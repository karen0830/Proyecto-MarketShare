import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = {
	dialogOpen: false,
	data: null
};
/**
 * The Scrumboard Card Dialog Slice.
 */
export const cardDialogSlice = createSlice({
	name: 'scrumboardApp/cardDialog',
	initialState,
	reducers: {
		openCardDialog: (state, action) => {
			state.dialogOpen = true;
			state.data = action.payload;
		},
		closeCardDialog: (state) => {
			state.dialogOpen = false;
			state.data = null;
		}
	}
});
export const data = (state) => state.scrumboardApp.cardDialog.data;
export const { openCardDialog, closeCardDialog } = cardDialogSlice.actions;
export const selectCardDialogOpen = appSelector((state) => state.scrumboardApp.cardDialog.dialogOpen);
export const selectCardData = appSelector((state) => state.scrumboardApp.cardDialog.data);
export default cardDialogSlice.reducer;
