import { compose, curry, converge, toString, map, prop } from 'ramda';
import { get } from 'date-fp';
import Either from 'sanctuary-either';
// import IO from 'fantasy-io';

(function() {

    function init() {
        console.log('tick', tick(tizen.time.getCurrentDateTime()));
    }

    // const setInnerHtml = curry((id, string) => IO.of(() => document.getElementById(id).innerHTML = 8)); 
    
    const insertInTemplate = (hours, minutes) => `
        <span >${hours}:${minutes}</span>
    `;

    const addZero = curry((minutes) => "0" + minutes);

    const isLessThanTen = curry((minutes) => minutes < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
    const formatMinutes = compose(prop('value'), map(addZero), isLessThanTen, get('minutes'));
    
    const formatHours = compose(toString, get('hours'));

    const tick = compose(converge(insertInTemplate, [formatHours, formatMinutes]));

    window.onload = init();
}());
