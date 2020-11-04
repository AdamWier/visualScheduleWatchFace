import { forkCatch } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, concat, curry, head, over, lensIndex, prop } from 'ramda';
import { tick } from './watchFunctions';

window.onload = app;

const insert = curry((x) => document.getElementById('result').innerHTML = x);

const main = compose(over(lensIndex(1), concat), converge(Array.of, [calendar, tick]));

const insertInTemplate = curry(x => `<span>${x}</span>`)

function app(){
    console.log('ok go');
    const mainres = main(new Date());
    console.log({mainres});
    console.log('go go go', forkCatch(compose(insert, mainres[1], insertInTemplate, prop('message')))(compose(insert, mainres[1], insertInTemplate, prop('message')))((x) => compose(insert, mainres[1], head)(x))(mainres[0]))
};