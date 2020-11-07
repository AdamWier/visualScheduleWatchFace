import { compose, toString, concat, map, prop, curry } from 'ramda';
import { get } from 'date-fp';
import Either from 'sanctuary-either';
import { attempt } from 'fluture';

const isLessThanTen = curry((minutes) => minutes < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
export const formatMinutes = compose(prop('value'), map(concat('0')), isLessThanTen, get('minutes'));

export const formatHours = compose(toString, get('hours'));

export const bothHelper = (next, accumulator) => accumulator ? accumulator(next) : next;

export const time = attempt(() => new Date());
