import { forkCatch, both } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, reduceRight, append } from 'ramda';
import { tick } from './watchFunctions';
import { bothHelper } from './utils';

window.onload = app;

const main = compose(forkCatch(console.log)(console.log)(console.log), reduceRight(bothHelper, null), append(both), converge(Array.of, [calendar, tick]));

function app(){
    console.log('ok go');
    const mainres = main(new Date());
    console.log({mainres});
};