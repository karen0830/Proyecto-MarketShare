import _ from '@lodash';

/**
 * The list model.
 */
function ListModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		boardId: '',
		title: ''
	});
}

export default ListModel;
