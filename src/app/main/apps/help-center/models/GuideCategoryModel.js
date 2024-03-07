import _ from '@lodash';
/**
 * Creates a new guide category object with the specified data.
 */
const GuideCategoryModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		slug: '',
		title: ''
	});
export default GuideCategoryModel;
