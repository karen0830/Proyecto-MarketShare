import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';

const eventsDB = mockApi.components.examples.calendar_events.value;
const labelsDB = mockApi.components.examples.calendar_labels.value;
export const calendarApiMocks = (mock) => {
	mock.onGet('/calendar/labels').reply(() => {
		return [200, labelsDB];
	});
	mock.onPost('/calendar/labels').reply(({ data }) => {
		const newLabel = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
		labelsDB.push(newLabel);
		return [200, newLabel];
	});
	mock.onPut('/calendar/labels/:id').reply((config) => {
		const { id } = config.params;
		_.assign(_.find(labelsDB, { id }), JSON.parse(config.data));
		return [200, _.find(labelsDB, { id })];
	});
	mock.onGet('/calendar/labels/:id').reply((config) => {
		const { id } = config.params;
		const response = _.find(labelsDB, { label: id });

		if (response) {
			return [200, response];
		}

		return [404, 'Requested label do not exist.'];
	});
	mock.onGet('/calendar/labels/:id').reply((config) => {
		const { id } = config.params;
		const response = _.find(labelsDB, { label: id });

		if (response) {
			return [200, response];
		}

		return [404, 'Requested label do not exist.'];
	});
	mock.onDelete('/calendar/labels/:id').reply((config) => {
		const { id } = config.params;
		_.remove(labelsDB, { id });
		_.remove(eventsDB, { extendedProps: { label: id } });
		return [200, id];
	});
	mock.onGet('/calendar/events').reply(() => {
		return [200, eventsDB];
	});
	mock.onPost('/calendar/events').reply(({ data }) => {
		const newEvent = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
		eventsDB.push(newEvent);
		return [200, newEvent];
	});
	mock.onPut('/calendar/events/:id').reply((config) => {
		const { id } = config.params;
		_.assign(_.find(eventsDB, { id }), JSON.parse(config.data));
		return [200, _.find(eventsDB, { id })];
	});
	mock.onGet('/calendar/events/:id').reply((config) => {
		const { id } = config.params;
		const response = _.find(eventsDB, { event: id });

		if (response) {
			return [200, response];
		}

		return [404, 'Requested event do not exist.'];
	});
	mock.onDelete('/calendar/events/:id').reply((config) => {
		const { id } = config.params;
		_.remove(eventsDB, { id });
		return [200, id];
	});
};
