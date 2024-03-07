import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = '';
/**
 * The Contacts App Contacts slice.
 */
export const searchTextSlice = createSlice({
	name: 'contactsApp/searchText',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => action.payload,
			prepare: (event) => ({
				payload: `${event?.target?.value}` || initialState,
				meta: undefined,
				error: null
			})
		},
		resetSearchText: () => initialState
	}
});
export const { setSearchText, resetSearchText } = searchTextSlice.actions;
export const selectSearchText = appSelector((state) => state.contactsApp?.searchText);
const searchTextReducer = searchTextSlice.reducer;
export default searchTextReducer;
