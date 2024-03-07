import _ from '@lodash';
/**
 * FileManager Item Model
 */
const FileManagerItemModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		folderId: '',
		name: '',
		createdBy: '',
		createdAt: '',
		modifiedAt: '',
		size: '',
		type: '',
		contents: '',
		description: ''
	});
export default FileManagerItemModel;
