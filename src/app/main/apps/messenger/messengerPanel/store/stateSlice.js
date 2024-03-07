import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';
/**
 * The chat panel state slice.
 */
export const stateSlice = createSlice({
	name: 'chatPanel/state',
	initialState: false,
	reducers: {
		toggleChatPanel: (state) => !state,
		openChatPanel: () => true,
		closeChatPanel: () => false
	}
});
export const { toggleChatPanel, openChatPanel, closeChatPanel } = stateSlice.actions;
export const selectChatPanelState = appSelector((state) => state.chatPanel.state);
export default stateSlice.reducer;
