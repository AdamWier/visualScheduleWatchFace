import { forkCatch } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, curry, head, prop, tail } from 'ramda';
import { tick } from './watchFunctions';

window.onload = app;

const insertEventHtml = curry((x) => document.getElementById('event').innerHTML = x);

const insertTimeHtml = curry((x) => document.getElementById('watch').innerHTML = x);

const insertErrorHtml = curry(x => `<span>${x}</span>`);

const insertTime = compose(insertTimeHtml, tail);

const onFail = compose(insertEventHtml, insertErrorHtml, prop('message'));

const onSuccess = compose(insertEventHtml, head);

const insertEvent = compose(forkCatch(onFail)(onFail)(onSuccess), head);

const main = compose(converge(Array.of, [insertEvent, insertTime]), converge(Array.of, [calendar, tick]));

function app(){
    console.log('ok go');
    const mainres = main(new Date());
    console.log({mainres});
};