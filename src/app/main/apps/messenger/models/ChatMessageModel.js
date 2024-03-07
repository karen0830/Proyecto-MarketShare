import _ from '@lodash';

/**
 * Chat message model.
 */
function ChatMessageModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		chatId: '',
		contactId: '',
		value: '',
		createdAt: ''
	});
}

export default ChatMessageModel;
