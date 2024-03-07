import { combineReducers } from '@reduxjs/toolkit';
// import { removeReducer } from 'app/store';
import dialogs from './dialogsSlice';
import searchText from './searchTextSlice';
import variateDesc from './variateDescSlice';
/**
 * The Notes store reducer.
 */
const reducer = combineReducers({
	searchText,
	variateDesc,
	dialogs
});
//
// if (module.hot && module.hot.status() === 'apply') {
// 	removeReducer('notesApp');
// 	// replaceReducer(
// 	// 	'notesApp',
// 	// 	combineReducers(
// 	// 		_.cloneDeep({
// 	// 			searchText,
// 	// 			variateDesc,
// 	// 			dialogs
// 	// 		})
// 	// 	)
// 	// );
// }
// const createdReducer = reducer;
export default reducer;
