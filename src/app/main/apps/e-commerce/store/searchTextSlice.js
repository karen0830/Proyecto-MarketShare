import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = '';
/**
 * The ECommerce App SearchText.
 */
export const searchTextSlice = createSlice({
	name: 'eCommerceApp/searchText',
	initialState,
	reducers: {
		resetSearchText: () => initialState,
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
export const { setSearchText, resetSearchText } = searchTextSlice.actions;
export const selectSearchText = appSelector((state) => state.eCommerceApp?.searchText);
const searchTextReducer = searchTextSlice.reducer;
export default searchTextReducer;
