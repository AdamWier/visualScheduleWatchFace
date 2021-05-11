import { compose, toString, concat, map, prop, curry, invoker, chain } from 'ramda';
import Either from 'sanctuary-either';
import { attempt } from 'fluture';

const isLessThanTen = curry((minutes) => minutes < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
export const formatMinutes = compose(prop('value'), map(concat('0')), isLessThanTen, invoker(0, 'getMinutes'));

export const formatHours = compose(toString, invoker(0, 'getHours'));

const getTizTime = attempt(() => tizen.time.getCurrentDateTime());

const convertTizToJs = curry(x => attempt(() => new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds())));

export const time = chain(convertTizToJs)(getTizTime);

export const log = curry(x => {console.log(x); return x});