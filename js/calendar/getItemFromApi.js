import { 
	compose, 
	find, 
	propSatisfies, 
	__,
	map,
	always,
 } from 'ramda';
import { fetchJson } from '../utils';
import { ADDRESS } from '../env';
import { cache } from 'fluture';

const getFirstNotFullDayItem = find(propSatisfies(item => !!item.dateTime, 'end'));

export default compose(map(getFirstNotFullDayItem), cache, fetchJson, always(ADDRESS));