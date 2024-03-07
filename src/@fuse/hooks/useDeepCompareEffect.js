import React from 'react';
import deepEqual from 'lodash/isEqual';

/**
 * The checkDeps function checks if the dependency list is valid for use with useDeepCompareEffect.
 * It throws an error if the dependency list is empty or contains only primitive values.
 */
function checkDeps(deps) {
	if (!deps || !deps.length) {
		throw new Error('useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.');
	}

	if (deps.every(isPrimitive)) {
		throw new Error(
			'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
		);
	}
}

/**
 * The isPrimitive function checks if a value is a primitive type.
 * It returns true if the value is null, undefined, a string, a boolean, or a number.
 */
function isPrimitive(val) {
	return val == null || /^[sbn]/.test(typeof val);
}

/**
 * The isPrimitive function checks if a value is a primitive type.
 * It returns true if the value is null, undefined, a string, a boolean, or a number.
 */
export function useDeepCompareMemoize(value) {
	const ref = React.useRef(value);
	const signalRef = React.useRef(0);

	if (!deepEqual(value, ref.current)) {
		ref.current = value;
		signalRef.current += 1;
	}

	return React.useMemo(() => ref.current, [signalRef.current]);
}

/**
 * The isPrimitive function checks if a value is a primitive type.
 * It returns true if the value is null, undefined, a string, a boolean, or a number.
 */
function useDeepCompareEffect(callback, dependencies) {
	if (process.env.NODE_ENV !== 'production') {
		checkDeps(dependencies);
	}

	return React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export function useDeepCompareEffectNoCheck(callback, dependencies) {
	return React.useEffect(callback, useDeepCompareMemoize(dependencies));
}
export default useDeepCompareEffect;
