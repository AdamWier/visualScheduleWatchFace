import { 
	compose,  
	converge, 
	mergeAll,
	__,
 } from 'ramda';
import { resolve } from 'fluture';
import processEmoji from './processEmoji';
import getEndString from './getEndString';

export default compose(mergeAll, converge(Array.of, [getEndString, processEmoji]));