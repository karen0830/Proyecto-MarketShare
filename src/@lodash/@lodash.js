/* eslint-disable  */
import _ from 'lodash';
_.mixin({
    /**
   * A function that sets a value at a given path in an object.
   */
    setIn: (state, name, value) => _.setWith(_.clone(state), name, value, _.clone)
});
export default _;
