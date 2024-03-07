import { combineReducers } from '@reduxjs/toolkit';

export const generateReducersFromSlices = (slices) => {
	const reducerGroups = {};
	// Group reducers based on common key derived from slice name.
	slices?.forEach((slice) => {
		const [primary, secondary] = slice.name.split('/');

		if (secondary) {
			if (!reducerGroups[primary]) {
				reducerGroups[primary] = {};
			}

			reducerGroups[primary][secondary] = slice.reducer;
		} else {
			reducerGroups[primary] = slice.reducer;
		}
	});
	const combinedReducers = {};
	// Combine the grouped reducers.
	Object.entries(reducerGroups).forEach(([key, reducerGroup]) => {
		if (typeof reducerGroup === 'function') {
			combinedReducers[key] = reducerGroup;
		} else if (typeof reducerGroup === 'object') {
			combinedReducers[key] = combineReducers(reducerGroup);
		}
	});
	return combinedReducers;
};
export default generateReducersFromSlices;
