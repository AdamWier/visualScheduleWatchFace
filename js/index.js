import { forkCatch, parallel, resolve } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, append, head, objOf, curry, mergeAll, pick, over, lensProp } from 'ramda';
import { tick } from './watchFunctions';
import { time, log } from './utils';
import Maybe from 'sanctuary-maybe';

window.onload = app;

const curriedSetTimeout = curry((y, z) => setTimeout(main, y, z));

const toMaybe = compose(x => x.percentage >= 100 ? Maybe.Nothing : Maybe.Just(resolve(x.item)));

var onSuccess = compose(curriedSetTimeout(500), over(lensProp('progressBar'), Maybe.Just), mergeAll, append({time}), converge(Array.of, [compose(objOf('item'), toMaybe), pick(['progressBar'])]), head, head);

var main = compose(forkCatch(console.log)(console.log)(onSuccess), parallel(2), converge(Array.of, [calendar, tick]));

function app(){
    main({time, item: Maybe.Nothing, progressBar: Maybe.Nothing});
};