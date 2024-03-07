import FuseUtils from '@fuse/utils';
import _ from '@lodash';

/**
 * The checklist item model.
 */
function ChecklistItemModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		checked: false
	});
}

export default ChecklistItemModel;
