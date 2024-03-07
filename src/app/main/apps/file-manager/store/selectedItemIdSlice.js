import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = null;
/**
 * The File Manager selected item id.
 */
export const selectedItemIdSlice = createSlice({
	name: 'fileManagerApp/selectedItemId',
	initialState,
	reducers: {
		setSelectedItemId: (state, action) => action.payload,
		resetSelectedItemId: () => null
	}
});
export const { setSelectedItemId, resetSelectedItemId } = selectedItemIdSlice.actions;
export const selectSelectedItemId = appSelector((state) => state?.fileManagerApp?.selectedItemId);
export default selectedItemIdSlice.reducer;
