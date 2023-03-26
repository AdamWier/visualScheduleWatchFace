import { compose, toString, concat, map, prop, curry, invoker, chain, replace, lift, always, cond, divide, subtract, __, isNil } from 'ramda';
import Either from 'sanctuary-either';
import { attempt, encaseP, ap, resolve } from 'fluture';
import Maybe from 'sanctuary-maybe';

export const applyFutures = curry((functionToApply, secondArgument, firstArgument) => (ap (secondArgument) (ap (firstArgument) (resolve(functionToApply)))));

const isLessThanTen = curry((minutes) => minutes < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
export const formatMinutes = compose(prop('value'), map(concat('0')), isLessThanTen, invoker(0, 'getMinutes'));

export const formatHours = compose(toString, invoker(0, 'getHours'));

const getTizTime = attempt(() => tizen.time.getCurrentDateTime());

const convertTizToJs = curry(x => attempt(() => new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds())));

export const time = chain(convertTizToJs)(getTizTime);

export const log = curry((x, y) => {console.log(x, y); return y});

const curriedEncaseP = curry(encaseP);

const jsonFuture = curriedEncaseP(invoker(0, 'json'));

const fetchFuture = curriedEncaseP(fetch);

export const fetchJson = compose(chain(jsonFuture), fetchFuture);

export const curriedFloor = curry(x => Math.floor(x))

export const liftedDivide = lift(divide);

export const liftedSub = lift(subtract);

export const toMaybe = cond([
	[isNil, always(Maybe.Nothing)],
	[always(true), x => Maybe.Just(x)]
]);

export const convertToDateTime = curry(x => new Date(x));

export const getTime = curry(x => x.getTime())

export const getStart = compose(getTime, convertToDateTime, prop('dateTime'), prop('start'));

export const getEnd = compose(getTime, convertToDateTime, prop('dateTime'), prop('end'));

export const remove = replace(__, '');