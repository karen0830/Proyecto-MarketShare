import _ from '@lodash';

/**
 * User model.
 */
function UserModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		name: '',
		email: '',
		status: '',
		avatar: '',
		about: ''
	});
}

export default UserModel;
