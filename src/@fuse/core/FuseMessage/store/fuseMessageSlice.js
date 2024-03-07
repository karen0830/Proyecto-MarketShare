import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';
/**
 * The initial state of the message slice.
 */
const initialState = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};
/**
 * The Message slice.
 */
export const fuseMessageSlice = createSlice({
	name: 'fuseMessage',
	initialState,
	reducers: {
		showMessage(state, action) {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			};
		},
		hideMessage(state) {
			state.state = false;
		}
	}
});
export const { hideMessage, showMessage } = fuseMessageSlice.actions;
export const selectFuseMessageState = appSelector((state) => state.fuseMessage.state);
export const selectFuseMessageOptions = appSelector((state) => state.fuseMessage.options);
export default fuseMessageSlice.reducer;
