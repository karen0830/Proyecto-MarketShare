import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';
/**
 * The initial state of the navbar slice.
 */
const initialState = {
	open: true,
	mobileOpen: false,
	foldedOpen: false
};
/**
 * The navbar slice.
 */
export const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {
		navbarToggleFolded: (state) => {
			state.foldedOpen = !state.foldedOpen;
		},
		navbarOpenFolded: (state) => {
			state.foldedOpen = true;
		},
		navbarCloseFolded: (state) => {
			state.foldedOpen = false;
		},
		navbarToggleMobile: (state) => {
			state.mobileOpen = !state.mobileOpen;
		},
		navbarOpenMobile: (state) => {
			state.mobileOpen = true;
		},
		navbarCloseMobile: (state) => {
			state.mobileOpen = false;
		},
		navbarClose: (state) => {
			state.open = false;
		},
		navbarOpen: (state) => {
			state.open = true;
		},
		navbarToggle: (state) => {
			state.open = !state.open;
		}
	}
});
export const {
	navbarToggleFolded,
	navbarOpenFolded,
	navbarCloseFolded,
	navbarOpen,
	navbarClose,
	navbarToggle,
	navbarOpenMobile,
	navbarCloseMobile,
	navbarToggleMobile
} = navbarSlice.actions;
export const selectFuseNavbar = appSelector(({ navbar }) => navbar);
export default navbarSlice.reducer;
