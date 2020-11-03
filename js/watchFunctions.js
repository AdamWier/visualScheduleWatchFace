import { compose, converge, toString,  __, equals, cond, always, modulo, nth, join } from 'ramda';
import { formatHours, formatMinutes } from './utils';
import { get } from 'date-fp';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const insertInTemplate = (time, date) => `
    <div class="small-text">${date}</div>
    <div class="big-text">${time}</div>
`;

const getDate = compose(toString, get('date'));

const getMonth = compose(nth(__, months), get('month'));

const getDay = compose(nth(__, days), get('day'));

const formatDate = compose(join(' '), converge(Array.of, [getDay, getMonth, getDate]));

const returnConsole = cond([
    [equals(true), always(':')],
    [equals(false), always(' ')],
]);

const isOdd = compose(equals(1), modulo(__, 2));

const formatConsole = compose(returnConsole, isOdd, get('milliseconds'));

const formatTime = compose(join(''), converge(Array.of, [formatHours, formatConsole, formatMinutes]))

export const tick = converge(insertInTemplate, [formatTime, formatDate]);
