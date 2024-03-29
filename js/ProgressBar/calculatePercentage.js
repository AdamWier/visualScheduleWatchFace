import { 
	compose, 
	converge, 
	subtract, 
	multiply, 
	__,
	chain,
	map,
	max,
 } from 'ramda';
import { time, liftedSub, liftedDivide, curriedFloor, getStart, getEnd } from '../utils';
import { resolve } from 'fluture';

const calculateDifference = compose(liftedSub(time), resolve, getStart);

const calculateRange = compose(resolve, converge(subtract, [getEnd, getStart]));

export default compose(map(max(0)), map(curriedFloor), map(multiply(100)), chain(converge(liftedDivide, [calculateDifference, calculateRange])));