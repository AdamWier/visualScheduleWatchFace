import { 
	compose, 
	prop, 
	converge, 
	subtract, 
	curry, 
	multiply, 
	objOf,
	__,
	chain,
	map,
 } from 'ramda';
import { time, liftedSub, liftedDivide, curriedFloor, convertToDateTime } from '../../../utils';
import { resolve } from 'fluture';

const getTime = curry(x => x.getTime())

const getStart = compose(getTime, convertToDateTime, prop('dateTime'), prop('start'));

const calculateDifference = compose(liftedSub(time), resolve, getStart);

const getEnd = compose(getTime, convertToDateTime, prop('dateTime'), prop('end'));

const calculateRange = compose(resolve, converge(subtract, [getEnd, getStart]));

export default compose(map(objOf('percentage')), map(curriedFloor), map(multiply(100)), chain(converge(liftedDivide, [calculateDifference, calculateRange])), prop('item'));