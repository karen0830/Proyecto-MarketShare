import { combineReducers } from '@reduxjs/toolkit';
import searchText from './searchTextSlice';
import selectedMailIds from './selectedMailIdsSlice';
/**
 * The Mailbox App reducer.
 */
const reducer = combineReducers({
	selectedMailIds,
	searchText
});
export default reducer;
