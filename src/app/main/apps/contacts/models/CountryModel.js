import _ from '@lodash';
/**
 * The country model.
 */
const CountryModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		iso: '',
		name: '',
		code: '',
		flagImagePos: ''
	});
export default CountryModel;
