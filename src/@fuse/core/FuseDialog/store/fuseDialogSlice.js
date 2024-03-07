import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'src/app/store/store';
/**
 * The initial state of the dialog slice.
 */
const initialState = {
	open: false,
	children: ''
};
/**
 * The Fuse Dialog slice
 */
export const fuseDialogSlice = createSlice({
	name: 'fuseDialog',
	initialState,
	reducers: {
		openDialog: (state, action) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	}
});
export const { closeDialog, openDialog } = fuseDialogSlice.actions;
export const selectFuseDialogState = appSelector((state) => state.fuseDialog.open);
export const selectFuseDialogProps = appSelector((state) => state.fuseDialog);
export default fuseDialogSlice.reducer;
