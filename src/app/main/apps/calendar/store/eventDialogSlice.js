import { createSlice } from '@reduxjs/toolkit';
import formatISO from 'date-fns/formatISO';
import { appSelector } from 'app/store/store';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
const initialState = {
	type: 'new',
	props: {
		open: false,
		anchorPosition: { top: 200, left: 400 }
	},
	data: null
};
/**
 * The Calendar App events slice.
 */
export const eventDialogSlice = createSlice({
	name: 'calendarApp/eventDialog',
	initialState,
	reducers: {
		openNewEventDialog: {
			prepare: (selectInfo) => {
				const { start, end, jsEvent } = selectInfo;
				const payload = {
					type: 'new',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						start: formatISO(start),
						end: formatISO(end)
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => action.payload
		},
		openEditEventDialog: {
			prepare: (clickInfo) => {
				const { jsEvent, event } = clickInfo;
				const { id, title, allDay, start, end, extendedProps } = event;
				const payload = {
					type: 'edit',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						id,
						title,
						allDay,
						extendedProps,
						start: formatISO(start),
						end: formatISO(end)
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => action.payload
		},
		closeNewEventDialog: (_state) => initialState,
		closeEditEventDialog: (_state) => ({
			...initialState,
			type: 'edit'
		})
	}
});
export const { openNewEventDialog, closeNewEventDialog, openEditEventDialog, closeEditEventDialog } =
	eventDialogSlice.actions;
export const selectEventDialog = appSelector((state) => state.calendarApp.eventDialog);
export default eventDialogSlice.reducer;
