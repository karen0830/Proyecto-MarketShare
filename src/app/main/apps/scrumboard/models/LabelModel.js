import FuseUtils from '@fuse/utils';
import _ from '@lodash';

/**
 * The label model.
 */
function LabelModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		boardId: '',
		title: ''
	});
}

export default LabelModel;
