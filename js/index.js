import { fork, parallel, resolve, } from 'fluture';
import { compose, converge, curry, over, lensProp, map, prop, identity, path, assoc, values, objOf, mergeAll } from 'ramda';
import { tick } from './watchFunctions';
import { time, toEither, log, toMaybe2, getEnd } from './utils';
import Maybe from 'sanctuary-maybe';
import { fromEvent } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import getItemFromApi from './calendar/getItemFromApi';
import setUpAlarms from './calendar/alarms';
import processItem from './calendar/processItem';
import setProgressPercent from './ProgressBar/setProgressPercent';

window.onload = app;

let timeout = 0;

const curriedSetTimeout = curry((y, z) => timeout = setTimeout(main, y, z));

const isNotInPast = curry((testTime) => new Date().getTime() < testTime);

const isExpiredItem = compose(isNotInPast, getEnd);

const onSuccess = compose(log('after timeout'), curriedSetTimeout(500), log('before timeout'), over(lensProp('alarms'), compose(resolve, objOf('alarms'))), over(lensProp('progressBar'), Maybe.Just), over(lensProp('item'), toMaybe2(isExpiredItem)), assoc('time', time), mergeAll);

const execute = compose(fork(console.log)(onSuccess), parallel(5), values);

const addTime = over(lensProp('time'), tick);

const handleProgressBar = converge(assoc('progressBar'), [setProgressPercent, identity])

const addHtmlInsert = converge(assoc('insert'), [processItem, identity]);

const addAlarms = converge(assoc('alarms'), [setUpAlarms, identity]);

const addItem = over(lensProp('item'), getItemFromApi);

const setupNewItem = compose(addHtmlInsert, addAlarms, addItem);

const getItemValueFuture = over(lensProp('item'), compose(resolve, prop('value')));

const checkItem = toEither(path(['item', 'isJust']), getItemValueFuture, identity);

var main = compose(execute, over(lensProp('item'), map(objOf('item'))), addTime, handleProgressBar, prop('value'), map(setupNewItem), checkItem);

const DEFAULT_STATE = {time, item: Maybe.Nothing, progressBar: Maybe.Nothing, alarms: []};

let state = DEFAULT_STATE;

function app(){
    main(state);
    fromEvent(document, "touchstart").pipe(debounceTime(500)).subscribe(() => {
        clearTimeout(timeout)
        main(DEFAULT_STATE);
    })
};