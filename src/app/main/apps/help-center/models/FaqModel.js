import _ from '@lodash';
/**
 * Creates a new faq object with the specified data.
 */
const FaqModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		categoryId: '',
		question: '',
		answer: ''
	});
export default FaqModel;
