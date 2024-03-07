import generateReducersFromSlices from './generateReducersFromSlices';
import { rootReducer } from './store';
/**
 * Injects reducers grouped by common key.
 */
export const injectReducersGroupedByCommonKey = async (slices) => {
	const reducers = generateReducersFromSlices(slices);

	if (reducers) {
		Object.keys(reducers).forEach((key) => {
			const reducer = reducers[key];

			if (!key || !reducer) {
				return;
			}

			rootReducer.inject(
				{
					reducerPath: key,
					reducer
				},
				{
					overrideExisting: true
				}
			);
		});
	}

	return true;
};
/**
 * A Higher Order Component that injects reducers for the provided slices.
 */
const withSlices = (slices) => (WrappedComponent) => {
	injectReducersGroupedByCommonKey(slices);
	return function WithInjectedReducer(props) {
		return <WrappedComponent {...props} />;
	};
};
export default withSlices;
