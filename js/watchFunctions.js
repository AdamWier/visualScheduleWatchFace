import { compose, curry, converge, toString, map, prop, __, equals, cond, always, modulo, concat } from 'ramda';
import { get } from 'date-fp';
import Either from 'sanctuary-either';
// import IO from 'fantasy-io';

(function() {

    function init() {
        console.log('tick', tick(tizen.time.getCurrentDateTime()));
    }

    // const setInnerHtml = curry((id, string) => IO.of(() => document.getElementById(id).innerHTML = 8)); 
    
    const insertInTemplate = (hours, minutes, consoleChar) => `
        <span>${hours}${consoleChar}${minutes}</span>
    `;

    const returnConsole = cond([
        [equals(true), always(':')],
        [equals(false), always(' ')],
    ]);

    const isOdd = compose(equals(1), modulo(__, 2));

    const formatConsole = compose(returnConsole, isOdd, get('milliseconds'));

    const isLessThanTen = curry((minutes) => 1 < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
    const formatMinutes = compose(prop('value'), map(concat('0')), isLessThanTen, get('minutes'));
    
    const formatHours = compose(toString, get('hours'));

    const tick = converge(insertInTemplate, [formatHours, formatMinutes, formatConsole]);

    window.onload = init();
}());
