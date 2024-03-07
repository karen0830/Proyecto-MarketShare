import _ from '@lodash';
import formatISO from 'date-fns/formatISO';
/**
 * The event model.
 */
const EventModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: '',
		allDay: true,
		start: formatISO(new Date()),
		end: formatISO(new Date()),
		extendedProps: { desc: '', label: '', Dictionary: '' }
	});
export default EventModel;
