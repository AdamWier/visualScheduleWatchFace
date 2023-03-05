import { 
	compose, 
	find, 
	propSatisfies, 
	__,
	map,
	always,
 } from 'ramda';
import { fetchJson } from '../../utils';
import { ADDRESS } from '../../env';

const getFirstNotFullDayItem = find(propSatisfies(item => !!item.dateTime, 'end'));

export default compose(map(getFirstNotFullDayItem), fetchJson, always(ADDRESS));