import { createSelector, createSlice } from '@reduxjs/toolkit';
import i18n from 'src/i18n';
import { setDefaultSettings } from '@fuse/core/FuseSettings/store/fuseSettingsSlice';
/**
 * Changes the language of the application and updates the settings if necessary.
 */
export const changeLanguage = (languageId) => async (dispatch, getState) => {
	const AppState = getState();
	const { direction } = AppState.fuseSettings.defaults;
	const newLangDirection = i18n.dir(languageId);

	/*
    If necessary, change theme direction
     */
	if (newLangDirection !== direction) {
		await dispatch(setDefaultSettings({ direction: newLangDirection }));
	}

	/*
    Change Language
     */
	return i18n.changeLanguage(languageId).then(() => {
		dispatch(i18nSlice.actions.languageChanged(languageId));
	});
};
/**
 * The i18n slice
 */
export const i18nSlice = createSlice({
	name: 'i18n',
	initialState: {
		language: i18n.options.lng,
		languages: [
			{ id: 'en', title: 'English', flag: 'US' },
			{ id: 'tr', title: 'Turkish', flag: 'TR' },
			{ id: 'ar', title: 'Arabic', flag: 'SA' }
		]
	},
	reducers: {
		/**
		 * Updates the state with the new language.
		 */
		languageChanged: (state, action) => {
			state.language = action.payload;
		}
	}
});
export const selectCurrentLanguageId = (state) => state.i18n.language;
export const selectLanguages = (state) => state.i18n.languages;
export const selectCurrentLanguageDirection = createSelector([selectCurrentLanguageId], (id) => i18n.dir(id));
export const selectCurrentLanguage = createSelector([selectCurrentLanguageId, selectLanguages], (id, languages) =>
	languages.find((lng) => lng.id === id)
);
export default i18nSlice.reducer;
