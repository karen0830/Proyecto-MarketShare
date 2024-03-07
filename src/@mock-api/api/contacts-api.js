import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import ContactModel from 'src/app/main/apps/contacts/models/ContactModel';
import mockApi from '../mock-api.json';

const contactsDB = mockApi.components.examples.contacts.value;
const tagsDB = mockApi.components.examples.contacts_tags.value;
export const contactsApiMocks = (mock) => {
	mock.onGet('/contacts').reply(() => {
		return [200, contactsDB];
	});
	mock.onPost('/contacts').reply(({ data }) => {
		const newContact = ContactModel({
			id: FuseUtils.generateGUID(),
			...JSON.parse(data)
		});
		contactsDB.push(newContact);
		return [200, newContact];
	});
	mock.onGet('/contacts/tags').reply(() => {
		return [200, tagsDB];
	});
	mock.onGet('/contacts/:id').reply((config) => {
		const { id } = config.params;
		const contact = _.find(contactsDB, { id });

		if (contact) {
			return [200, contact];
		}

		return [404, 'Requested contact do not exist.'];
	});
	mock.onPut('/contacts/:id').reply((config) => {
		const { id } = config.params;
		const newData = JSON.parse(config.data);
		_.assign(_.find(contactsDB, { id }), newData);
		return [200, _.find(contactsDB, { id })];
	});
	mock.onDelete('/contacts/:id').reply((config) => {
		const { id } = config.params;
		_.remove(contactsDB, { id });
		return [200, id];
	});
};
