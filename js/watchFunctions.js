import { compose, curry, converge, toString, map, prop, __, equals, cond, always, modulo, concat, nth, join } from 'ramda';
import { get } from 'date-fp';
import Either from 'sanctuary-either';
// import IO from 'fantasy-io';

(function() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function init() {
        console.log(tizen.time.getCurrentDateTime())
        console.log('tick', tick(tizen.time.getCurrentDateTime()));
    }

    // const setInnerHtml = curry((id, string) => IO.of(() => document.getElementById(id).innerHTML = 8)); 
    
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

    const isLessThanTen = curry((minutes) => minutes < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
    const formatMinutes = compose(prop('value'), map(concat('0')), isLessThanTen, get('minutes'));
    
    const formatHours = compose(toString, get('hours'));

    const formatTime = compose(join(''), converge(Array.of, [formatHours, formatConsole, formatMinutes]))

    const tick = converge(insertInTemplate, [formatTime, formatDate]);

    window.onload = init();
}());
