import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';
/**
 * State slice for the quick panel.
 */
export const stateSlice = createSlice({
	name: 'quickPanel/state',
	initialState: false,
	reducers: {
		toggleQuickPanel: (state) => !state,
		openQuickPanel: () => true,
		closeQuickPanel: () => false
	}
});
export const { toggleQuickPanel, openQuickPanel, closeQuickPanel } = stateSlice.actions;
export const selectQuickPanelState = appSelector((state) => state.quickPanel.state);
export default stateSlice.reducer;
