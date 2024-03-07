import _ from '@lodash';

/**
 * The note model.
 */
function NoteModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		content: '',
		tasks: [],
		image: '',
		reminder: '',
		labels: [],
		archived: false,
		createdAt: '',
		updatedAt: ''
	});
}

export default NoteModel;
