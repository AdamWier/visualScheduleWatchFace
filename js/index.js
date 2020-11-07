import { forkCatch, both } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, reduceRight, append, nth, merge, objOf, curry } from 'ramda';
import { tick } from './watchFunctions';
import { bothHelper, time } from './utils';
import Maybe from 'sanctuary-maybe';

window.onload = app;

const curriedSetTimeout = curry((y, z) => setTimeout(main, y, z));

const toMaybe = compose(x => x.percentage >= 100 ? Maybe.Nothing : Maybe.Just(x.original));

var onSuccess = compose(curriedSetTimeout(500), merge({time}), objOf('item'), toMaybe, nth(1), nth(1));

var main = compose(forkCatch(console.log)(console.log)(onSuccess), reduceRight(bothHelper, null), append(both), converge(Array.of, [calendar, tick]));

function app(){
    main({time, item: Maybe.Nothing});
};