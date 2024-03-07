import _ from '@lodash';
/**
 * Creates a new faq category object with the specified data.
 */
const FaqCategoryModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		slug: '',
		title: ''
	});
export default FaqCategoryModel;
