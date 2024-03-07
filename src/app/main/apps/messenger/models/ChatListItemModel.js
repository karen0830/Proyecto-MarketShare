import _ from '@lodash';

/**
 * Chat list item model.
 */
function ChatListItemModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		contactId: null,
		unreadCount: 0,
		muted: false,
		lastMessage: '',
		lastMessageAt: null
	});
}

export default ChatListItemModel;
