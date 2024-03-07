import { rootReducer } from './store';
/**
 * A Higher Order Component that injects a reducer into the Redux store.
 */
const withReducer = (key, reducer) => (WrappedComponent) => {
	rootReducer.inject(
		{
			reducerPath: key,
			reducer
		},
		{
			overrideExisting: true
		}
	);
	/**
	 * The component that wraps the provided component with the injected reducer.
	 */
	return function WithInjectedReducer(props) {
		return <WrappedComponent {...props} />;
	};
};
export default withReducer;
