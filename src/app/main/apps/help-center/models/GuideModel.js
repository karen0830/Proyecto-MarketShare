import _ from '@lodash';
/**
 * Creates a new guide object with the specified data.
 */
const GuideModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		categoryId: '',
		slug: '',
		title: '',
		subtitle: '',
		content: ''
	});
export default GuideModel;
