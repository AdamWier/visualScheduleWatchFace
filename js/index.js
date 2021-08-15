import { forkCatch, parallel, resolve, ap } from 'fluture';
import { compose, converge, curry, over, lensProp, map, prop, identity, path, assoc, values } from 'ramda';
import { tick } from './watchFunctions';
import { time, toEither, log } from './utils';
import Maybe from 'sanctuary-maybe';
// import { fromEvent } from "rxjs";
import getItemFromApi from './calendar/getItemFromApi';
import setUpAlarms from './calendar/alarms';
import createProgressBar from './calendar/processItem/getItemData/createProgressBar';
import processItem from './calendar/processItem';
import calculatePercentage from './calendar/processItem/getItemData/calculatePercentage';

const setPercentage = curry((percentage, progressBar) => {console.log("per, pro", percentage, progressBar); return (ap (percentage) (ap (progressBar) (resolve((progressBar) => percent => {console.log('two rgas', progressBar, percent); progressBar.value(percent); return progressBar}))))});

const setProgressPercent = converge(setPercentage, [calculatePercentage, createProgressBar]);

const handleProgressBar = converge(assoc('progressBar'), [setProgressPercent, identity], log('before reset'))

window.onload = app;

// const curriedSetTimeout = curry((y, z) => setTimeout(main, y, z));

// const toMaybe = compose(x => x.percentage >= 100 ? Maybe.Nothing : Maybe.Just(resolve(x.item)));

// var onSuccess = compose(curriedSetTimeout(500), over(lensProp('alarms'), resolve), over(lensProp('progressBar'), Maybe.Just), mergeAll, append({time}), converge(Array.of, [compose(objOf('item'), toMaybe), pick(['progressBar', 'alarms'])]), head, head);

const execute = compose(forkCatch(console.log)(console.log)(console.log), parallel(5), values);

const addTime = over(lensProp('time'), tick);

const addHtmlInsert = converge(assoc('insert'), [processItem, identity]);

const addAlarms = converge(assoc('alarms'), [setUpAlarms, identity]);

const addItem = over(lensProp('item'), getItemFromApi);

const setupNewItem = compose(addHtmlInsert, addAlarms, addItem);

const checkItem = toEither(path(['item', 'isJust']), identity, identity);

var main = compose(execute, addTime, handleProgressBar, prop('value'), map(setupNewItem), checkItem);

function app(){
    main({time, item: Maybe.Nothing, progressBar: Maybe.Nothing, alarms: []});
    // fromEvent(document, "touchstart").subscribe(() => {
    //     result();
    //     app();
    // })
};