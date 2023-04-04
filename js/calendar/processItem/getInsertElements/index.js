import { 
	compose,  
	converge, 
	mergeAll,
	__,
 } from 'ramda';
import processEmoji from './processEmoji';
import getEndString from './getEndString';
import getCache from './getCache';

export default compose(mergeAll, converge(Array.of, [getCache, getEndString, processEmoji]));