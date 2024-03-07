import _ from '@lodash';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data) {
	data = data || {};
	return _.defaults(data, {
		uid: '',
		role: null, // guest
		data: {
			displayName: 'Guest User',
			photoURL: '',
			email: '',
			shortcuts: [],
			settings: {}
		}
	});
}

export default UserModel;
