import './watchFunctions.js';
import './calendar.js';
import './utils';
import { value } from 'fluture';
import { calendar } from './calendar';
import { compose } from 'ramda';

window.onload = app;

const main = compose(calendar);

function app(){
    console.log('ok go')
    console.log('main', main(new Date()))
    value(console.log)(main(new Date()));
};