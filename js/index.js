import { forkCatch, both } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, reduceRight, append, nth, merge, objOf } from 'ramda';
import { tick } from './watchFunctions';
import { bothHelper } from './utils';
import Maybe from 'sanctuary-maybe';

window.onload = app;

const toMaybe = compose(x => x.percentage >= 100 ? Maybe.Nothing : Maybe.Just(x.original));

var onSuccess = compose(merge({time: new Date()}), objOf('item'), toMaybe, nth(1), nth(1));

var main = compose(forkCatch(console.log)(console.log)(onSuccess), reduceRight(bothHelper, null), append(both), converge(Array.of, [calendar, tick]));

function app(){
    console.log('ok go');
    const mainres = main({time: new Date(), item: Maybe.Nothing});
    console.log({mainres});
};