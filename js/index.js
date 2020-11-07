import { forkCatch, both, attempt } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, reduceRight, append, nth, merge, objOf, curry } from 'ramda';
import { tick } from './watchFunctions';
import { bothHelper } from './utils';
import Maybe from 'sanctuary-maybe';

window.onload = app;

var curriedSetTimeout = curry((y, z) => setTimeout(main, y, z));

const toMaybe = compose(x => x.percentage >= 100 ? Maybe.Nothing : Maybe.Just(x.original));

const time = attempt(() => new Date());

var onSuccess = compose(curriedSetTimeout(500), merge({time}), objOf('item'), toMaybe, nth(1), nth(1));

var main = compose(forkCatch(console.log)(console.log)(onSuccess), reduceRight(bothHelper, null), append(both), converge(Array.of, [calendar, tick]));

function app(){
    console.log('ok go');
    const mainres = main({time, item: Maybe.Nothing});
    console.log({mainres});
};