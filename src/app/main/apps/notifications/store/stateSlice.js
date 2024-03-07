import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = false;
/**
 * The notificationPanel state slice.
 */
export const stateSlice = createSlice({
	name: 'notificationPanel/state',
	initialState,
	reducers: {
		toggleNotificationPanel: (state) => !state,
		openNotificationPanel: () => true,
		closeNotificationPanel: () => false
	}
});
export const { toggleNotificationPanel, openNotificationPanel, closeNotificationPanel } = stateSlice.actions;
export const selectNotificationPanelState = appSelector((state) => state.notificationPanel.state);
export default stateSlice.reducer;
