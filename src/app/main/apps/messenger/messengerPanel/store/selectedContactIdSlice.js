import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = '';
/**
 * The slice for the contacts.
 */
export const selectedContactIdSlice = createSlice({
	name: 'chatPanel/selectedContactId',
	initialState,
	reducers: {
		setSelectedContactId: (state, action) => action.payload,
		removeSelectedContactId: () => ''
	}
});
export const { setSelectedContactId } = selectedContactIdSlice.actions;
export const selectSelectedContactId = appSelector((state) => state.chatPanel.selectedContactId);
export default selectedContactIdSlice.reducer;
