import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = '';
export const searchTextSlice = createSlice({
	name: 'notesApp/searchText',
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
const searchTextReducer = searchTextSlice.reducer;
export const selectSearchText = appSelector((state) => state.notesApp?.searchText);
export default searchTextReducer;
