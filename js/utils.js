import { compose, toString, concat, map, prop, curry, invoker, chain, replace, lift, equals, always, cond, divide, subtract, __, min } from 'ramda';
import Either from 'sanctuary-either';
import { attempt, encaseP, ap, resolve } from 'fluture';
import Maybe from 'sanctuary-maybe';

export const toMaybe2 = curry((condition, x) => condition(x) ? Maybe.Just(x) : Maybe.isNothing);

export const applyFutures = curry((functionToApply, secondArgument, firstArgument) => (ap (secondArgument) (ap (firstArgument) (resolve(functionToApply)))));

const isLessThanTen = curry((minutes) => minutes < 10 ? Either.Right(toString(minutes)) : Either.Left(toString(minutes)));
    
export const formatMinutes = compose(prop('value'), map(concat('0')), isLessThanTen, invoker(0, 'getMinutes'));

export const formatHours = compose(toString, invoker(0, 'getHours'));

const getTizTime = attempt(() => tizen.time.getCurrentDateTime());

const convertTizToJs = curry(x => attempt(() => new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds())));

export const time = chain(convertTizToJs)(getTizTime);

export const log = curry((x, y) => {console.log(x, y); return y});

export const toEither = curry((condition, Left, Right, x) => condition(x) ? Either.Left(Left(x)) : Either.Right(Right(x)));

const curriedEncaseP = curry(encaseP);

const jsonFuture = curriedEncaseP(invoker(0, 'json'));

const fetchFuture = curriedEncaseP(fetch);

export const fetchJson = compose(chain(jsonFuture), fetchFuture);

export const curriedFloor = curry(x => Math.floor(x))

export const liftedDivide = lift(divide);

export const liftedSub = lift(subtract);

export const toMaybe = cond([
	[equals(undefined), () => Maybe.Nothing],
	[always(true), string => Maybe.Just(string)]
]);

export const convertToDateTime = curry(x => new Date(x));

export const getTime = curry(x => x.getTime())

export const getStart = compose(min(new Date().getTime()), getTime, convertToDateTime, prop('dateTime'), prop('start'));

export const getEnd = compose(getTime, convertToDateTime, prop('dateTime'), prop('end'));

export const remove = replace(__, '');