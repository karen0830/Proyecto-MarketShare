import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = false;
/**
 * The Notes variateDescSlice.
 */
export const variateDescSlice = createSlice({
	name: 'notesApp/variateDesc',
	initialState,
	reducers: {
		toggleVariateDescSize: (state) => !state
	}
});
export const { toggleVariateDescSize } = variateDescSlice.actions;
export const selectVariateDescSize = appSelector((state) => state.notesApp?.variateDesc);
export default variateDescSlice.reducer;
