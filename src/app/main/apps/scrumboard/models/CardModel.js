import _ from '@lodash';

/**
 * The card model.
 */
function CardModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		boardId: '',
		listId: '',
		title: '',
		description: '',
		labels: [],
		dueDate: 0,
		attachmentCoverId: '',
		memberIds: [],
		attachments: [],
		subscribed: false,
		checklists: [],
		activities: []
	});
}

export default CardModel;
