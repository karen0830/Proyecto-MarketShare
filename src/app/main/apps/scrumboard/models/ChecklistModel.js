import FuseUtils from '@fuse/utils';
import _ from '@lodash';

/**
 * The checklist model.
 */
function ChecklistModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		checkItems: []
	});
}

export default ChecklistModel;
