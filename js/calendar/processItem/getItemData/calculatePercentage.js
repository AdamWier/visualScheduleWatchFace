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
import { time, liftedSub, liftedDivide, curriedFloor, getStart, getEnd } from '../../../utils';
import { resolve } from 'fluture';

const calculateDifference = compose(liftedSub(time), resolve, getStart);

const calculateRange = compose(resolve, converge(subtract, [getEnd, getStart]));

export default compose(map(objOf('percentage')), map(curriedFloor), map(multiply(100)), chain(converge(liftedDivide, [calculateDifference, calculateRange])), prop('item'));