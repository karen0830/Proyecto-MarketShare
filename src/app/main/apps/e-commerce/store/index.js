import { combineReducers } from '@reduxjs/toolkit';
import searchText from './searchTextSlice';
/**
 * The E-Commerce store reducer.
 */
const reducer = combineReducers({
	searchText
});
export default reducer;
