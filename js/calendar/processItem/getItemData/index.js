import { 
	compose, 
	prop, 
	converge, 
	objOf,
	mergeAll,
	__,
	map,
	identity,
	sequence,
 } from 'ramda';
import { resolve } from 'fluture';
import calculatePercentage from './calculatePercentage';
import processEmoji from './processEmoji';
import getEndString from './getEndString';
import createProgressBar from './createProgressBar';

const keepAlarmData = compose(map(objOf('alarms')), map(identity), prop('alarms'));

const keepItemData = compose(map(objOf('item')), map(identity), prop('item'));

export default compose(map(mergeAll), sequence(resolve), converge(Array.of, [createProgressBar, keepAlarmData, keepItemData, getEndString, processEmoji, calculatePercentage]));