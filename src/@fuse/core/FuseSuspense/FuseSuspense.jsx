import FuseLoading from '@fuse/core/FuseLoading';
import { Suspense } from 'react';

/**
 * The FuseSuspense component is a wrapper around the React Suspense component.
 * It is used to display a loading spinner while the wrapped components are being loaded.
 * The component is memoized to prevent unnecessary re-renders.
 * React Suspense defaults
 * For to Avoid Repetition
 */
function FuseSuspense(props) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<FuseLoading {...loadingProps} />}>{children}</Suspense>;
}

export default FuseSuspense;
