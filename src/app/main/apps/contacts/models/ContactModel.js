import _ from '@lodash';
/**
 * The contact phone number model.
 */
export const ContactPhoneModel = (data) =>
	_.defaults(data || {}, {
		country: '',
		phoneNumber: '',
		label: ''
	});
/**
 * The contact email model.
 */
export const ContactEmailModel = (data) =>
	_.defaults(data || {}, {
		email: '',
		label: ''
	});
/**
 * The contact model.
 */
const ContactModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		avatar: '',
		background: '',
		name: '',
		emails: [ContactEmailModel(null)],
		phoneNumbers: [ContactPhoneModel(null)],
		title: '',
		company: '',
		birthday: '',
		address: '',
		notes: '',
		tags: []
	});
export default ContactModel;
