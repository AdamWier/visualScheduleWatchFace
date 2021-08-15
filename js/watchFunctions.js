import { compose, converge, toString,  __, equals, cond, always, modulo, nth, join, curry, prop, map, chain, invoker } from 'ramda';
import { formatHours, formatMinutes } from './utils';
import { attempt } from 'fluture';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const insertTimeHtml = curry((x) => attempt(() => document.getElementById('watch').innerHTML = x));

const insertInTemplate = (time, date) => `
    <div class="small-text">${date}</div>
    <div class="big-text">${time}</div>
`;

const getDate = compose(toString, invoker(0, 'getDate'));

const getMonth = compose(nth(__, months), invoker(0, 'getMonth'));

const getDay = compose(nth(__, days), invoker(0, 'getDay'));

const addSpan = curry(x => `<span>${x}</span>`)

const formatDate = compose(join(' '), converge(Array.of, [getDay, getMonth, getDate]));

const returnConsole = cond([
    [equals(true), always(':')],
    [equals(false), always('&nbsp;')],
]);

const isOdd = compose(equals(1), modulo(__, 2));

const formatConsole = compose(returnConsole, isOdd, invoker(0, 'getSeconds'));

const formatTime = compose(join(''), map(addSpan), converge(Array.of, [formatHours, formatConsole, formatMinutes]))

export const tick = compose(chain(insertTimeHtml), map(converge(insertInTemplate, [formatTime, formatDate])));
