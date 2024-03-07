import _ from '@lodash';
/**
 * The section model.
 */
const SectionModel = (data) =>
	_.defaults(data || {}, {
		type: 'section',
		title: '',
		notes: '',
		completed: false,
		dueDate: null,
		priority: 0,
		tags: [],
		assignedTo: null,
		subTasks: [],
		order: 1
	});
export default SectionModel;
