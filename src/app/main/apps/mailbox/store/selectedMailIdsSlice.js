import { createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';

const initialState = [];
/**
 * The Mailbox App selectedMailIds slice.
 */
export const selectedMailIdsSlice = createSlice({
	name: 'mailboxApp/selectedMailIds',
	initialState,
	reducers: {
		setSelectedMailIds: (state, action) => action.payload,
		selectAllMails: (state, action) => {
			const mailList = action.payload;
			return mailList.map((mail) => mail.id);
		},
		deselectAllMails: () => initialState,
		toggleInSelectedMails: (state, action) => {
			const mailId = action.payload;
			return _.xor(state, [mailId]);
		}
	}
});
export const { setSelectedMailIds, toggleInSelectedMails, deselectAllMails } = selectedMailIdsSlice.actions;
const selectedMailIdsReducer = selectedMailIdsSlice.reducer;
export default selectedMailIdsReducer;
export const selectSelectedMailIds = (state) => state.mailboxApp?.selectedMailIds;
