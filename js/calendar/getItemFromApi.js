import { 
	compose, 
	prop, 
	find, 
	propSatisfies, 
	__,
	invoker,
	chain,
	concat,
	map,
	always,
 } from 'ramda';
import { fetchJson, time } from '../utils';
import { API_KEY, CALENDAR } from '../env';

const getFirstNotFullDayItem = compose(find(propSatisfies(item => !!item.dateTime, 'end')), prop('items'));

const toIsoString = invoker(0, 'toISOString');

const getApiAddress = compose(concat(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR}/events?orderBy=startTime&singleEvents=true&maxResults=10&key=${API_KEY}&timeMin=`), toIsoString);

const callApi = compose(fetchJson, getApiAddress);

export default compose(map(getFirstNotFullDayItem), chain(callApi), always(time));