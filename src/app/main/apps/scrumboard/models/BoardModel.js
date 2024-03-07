import _ from '@lodash';

/**
 * The board model.
 */
function BoardModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		title: 'Untitled Board',
		description: '',
		icon: 'heroicons-outline:template',
		lastActivity: new Date(),
		members: [],
		settings: {
			subscribed: true,
			cardCoverImages: true
		},
		lists: [],
		labels: []
	});
}

export default BoardModel;
