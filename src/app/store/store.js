import i18n from 'app/store/i18nSlice';
import apiService from 'app/store/apiService';
import { configureStore, combineSlices, buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { createDynamicMiddleware } from '@reduxjs/toolkit/react';
import { useDispatch } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
/**
 * The dynamic middleware instance.
 */
const dynamicInstance = createDynamicMiddleware();
export const { middleware: dynamicMiddleware } = dynamicInstance;
export const addAppMiddleware = dynamicInstance.addMiddleware.withTypes();
const middlewares = [apiService.middleware, dynamicMiddleware];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({ collapsed: (getState, action, logEntry) => (logEntry ? !logEntry.error : true) });
	middlewares.push(logger);
}

/**
 * The static reducers.
 */
const staticReducers = {
	i18n,
	[apiService.reducerPath]: apiService.reducer
};
/**
 * The root reducer.
 */
export const rootReducer = combineSlices(staticReducers).withLazyLoadedSlices();
/**
 * Configures the app store.
 */
export function configureAppStore(initialState) {
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
	});
	setupListeners(store.dispatch);
	return store;
}
/**
 * Typed hook to get the dispatch function from the Redux store.
 */
export const useAppDispatch = useDispatch;
/**
 * Shortage for the root state selector.
 */
export const appSelector = rootReducer.selector;
/**
 * createAppSlice is a wrapper around createSlice that adds support for asyncThunkCreator.
 */
export const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator }
});
export const withAppMiddleware = dynamicInstance.withMiddleware.withTypes();
const store = configureAppStore();
export default store;
