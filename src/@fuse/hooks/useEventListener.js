import { useEffect, useRef } from 'react';

function useEventListener(eventName, handler, element = window) {
	// Create a mutable ref object to store the handler
	const savedHandler = useRef();
	// Update ref.current value if handler changes
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
	useEffect(() => {
		// Check and ensure the element supports addEventListener
		const isSupported = Boolean(element && element.addEventListener);
		// Create event listener that calls handler function stored in ref
		const eventListener = (event) => {
			if (savedHandler.current) {
				savedHandler.current(event);
			}
		};

		if (isSupported) {
			// Add event listener
			element.addEventListener(eventName, eventListener);
		}

		// Clean up event listener on component unmount
		return () => {
			if (isSupported) {
				element.removeEventListener(eventName, eventListener);
			}
		};
	}, [eventName, element]);
}

export default useEventListener;
