import { 
	compose, 
	find, 
	propSatisfies, 
	__,
	map,
	always,
 } from 'ramda';
import { fetchJson, toMaybe } from '../utils';
import { ADDRESS } from '../env';
import { cache } from 'fluture';

const getFirstNotFullDayItem = compose(toMaybe, find(propSatisfies(item => !!item.dateTime, 'end')));

export default compose(map(getFirstNotFullDayItem), cache, fetchJson, always(ADDRESS));