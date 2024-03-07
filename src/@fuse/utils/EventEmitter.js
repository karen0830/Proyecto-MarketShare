/**
 * The EventEmitter class is a custom implementation of an event emitter.
 * It provides methods for registering and emitting events.
 */
class EventEmitter {
	events;

	constructor() {
		this.events = {};
	}

	/**
	 * The _getEventListByName method returns the event list for a given event name.
	 * If the event list does not exist, it creates a new one.
	 *
	 */
	_getEventListByName(eventName) {
		if (typeof this.events[eventName] === 'undefined') {
			this.events[eventName] = new Set();
		}

		return this.events[eventName];
	}

	/**
	 * The on method registers a callback function for a given event name.
	 *
	 */
	on(eventName, fn) {
		this._getEventListByName(eventName).add(fn);
	}

	/**
	 * The once method registers a callback function for a given event name that will only be called once.
	 *
	 */
	once(eventName, fn) {
		const onceFn = (...args) => {
			this.removeListener(eventName, onceFn);
			fn.apply(this, args);
		};
		this.on(eventName, onceFn);
	}

	/**
	 * The emit method triggers all registered callback functions for a given event name.
	 *
	 */
	emit(eventName, ...args) {
		this._getEventListByName(eventName).forEach((fn) => {
			fn.apply(this, args);
		});
	}

	/**
	 * The removeListener method removes a registered callback function for a given event name.
	 *
	 */
	removeListener(eventName, fn) {
		this._getEventListByName(eventName).delete(fn);
	}
}
export default EventEmitter;
