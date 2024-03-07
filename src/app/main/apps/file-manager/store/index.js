import { combineReducers } from '@reduxjs/toolkit';
import selectedItemId from './selectedItemIdSlice';
/**
 * The File Manager store reducer.
 */
const reducer = combineReducers({
	selectedItemId
});
export default reducer;
