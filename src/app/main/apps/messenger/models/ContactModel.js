import _ from '@lodash';

/**
 * Contact model.
 */
function ContactModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		avatar: '',
		name: '',
		about: '',
		status: 'offline',
		details: {
			emails: [],
			phoneNumbers: [],
			title: '',
			company: '',
			birthday: '',
			address: ''
		},
		attachments: {
			media: [],
			docs: [],
			links: []
		}
	});
}

export default ContactModel;
