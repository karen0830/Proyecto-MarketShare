import { combineReducers } from '@reduxjs/toolkit';
import cardDialog from './cardDialogSlice';
/**
 * The Scrumboard Reducer.
 */
const reducer = combineReducers({
	cardDialog
});
export default reducer;
