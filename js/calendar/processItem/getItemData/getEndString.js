import { 
	compose, 
	prop, 
	converge, 
	always, 
	objOf,
	__,
	join,
	map,
 } from 'ramda';
import { formatHours, formatMinutes, convertToDateTime } from '../../../utils';

const createMinuteProperty = compose(formatMinutes, convertToDateTime, prop('dateTime'), prop('end'));

const createHourProperty = compose(formatHours, convertToDateTime, prop('dateTime'), prop('end'));

export default compose(objOf('end'), join(''), converge(Array.of, [createHourProperty, always(':'), createMinuteProperty]));
