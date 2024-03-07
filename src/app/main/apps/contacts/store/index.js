import { combineReducers } from '@reduxjs/toolkit';
import searchText from './searchTextSlice';
/**
 * The Contacts App slices.
 */
const reducer = combineReducers({
	searchText
});
export default reducer;
