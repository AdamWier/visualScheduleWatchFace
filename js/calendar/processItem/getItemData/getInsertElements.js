import { 
	compose, 
	prop, 
	converge, 
	mergeAll,
	__,
	map,
	sequence,
 } from 'ramda';
import { resolve } from 'fluture';
import processEmoji from './processEmoji';
import getEndString from './getEndString';

export default compose(map(mergeAll), sequence(resolve), converge(Array.of, [getEndString, processEmoji]));