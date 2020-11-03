import { value, ap, resolve } from 'fluture';
import { calendar } from './calendar';
import { compose, converge, concat, append, reduceRight } from 'ramda';
import { tick } from './watchFunctions';

window.onload = app;

const helper = (toApply, accumulator) => accumulator ? toApply(accumulator) : toApply;

const apCalendar = compose(ap, calendar);

const apTick = compose(ap, resolve, tick);

const main = compose(reduceRight(helper, null), append(resolve(concat)), converge(Array.of, [apCalendar, apTick]));

function app(){
    console.log('ok go');
    console.log('main', main(new Date()));
    value(console.log)(main(new Date()));
};