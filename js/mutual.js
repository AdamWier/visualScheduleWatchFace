import { compose, toString, concat, map, prop, curry } from 'ramda';
import { get } from 'date-fp';
import Either from 'sanctuary-either';
import { API_KEY, CALENDAR } from './env';

window.onload = app;

const isLessThanTen = curry((minutes) => minutes < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
export const formatMinutes = compose(prop('value'), map(concat('0')), isLessThanTen, get('minutes'));

export const formatHours = compose(toString, get('hours'));

const toIsoString = curry(x => x.toISOString());

const getApiAddress = compose(concat(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR}/events?orderBy=startTime&singleEvents=true&maxResults=10&key=${API_KEY}&timeMin=`), toIsoString);

function app(){
    console.log('ok go')
    console.log('app', getApiAddress(new Date()));
};