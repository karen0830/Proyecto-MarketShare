import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = '';
/**
 * The Contacts App Contacts slice.
 */
export const searchTextSlice = createSlice({
	name: 'mailboxApp/searchText',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => action.payload,
			prepare: (event) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	}
});
export const { setSearchText } = searchTextSlice.actions;
export const selectSearchText = appSelector((state) => state.mailboxApp?.searchText);
const searchTextReducer = searchTextSlice.reducer;
export default searchTextReducer;
