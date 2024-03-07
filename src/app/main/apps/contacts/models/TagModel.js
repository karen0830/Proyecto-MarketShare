import _ from '@lodash';
/**
 * The tag model.
 */
const TagModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: ''
	});
export default TagModel;
