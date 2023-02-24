import { compose, lensProp, prop, cond, equals, always, view, map, ifElse, gte, is, find, chain, lte, } from 'ramda';
import { fromEvent } from "rxjs";
import { debounceTime } from 'rxjs/operators';
// import goToNext from './goToNext';
import DEFAULT_STATE from './DEFAULT_STATE';
import {timeout} from './main';
import setUpAlarms from './calendar/alarms';
import { attempt, fork, forkCatch, pap, parallel, resolve } from 'fluture';
import processItem from './calendar/processItem';
import calculatePercentage from './ProgressBar/calculatePercentage';
import { time, log } from './utils';
import { tick } from './watchFunctions';
import setProgressPercent from './ProgressBar/setProgressPercent';
import getItem from './calendar/getItem';
import getItemFromSessionStorage from './calendar/getItem/getItemFromSessionStorage';

window.onload = app;
window.onunload = clearOutState;

let state = DEFAULT_STATE;

const getFingerNumber = compose(prop('length'), prop('touches'));

// const restart = compose(main, always(DEFAULT_STATE), clearOutState);

// const moveOn = compose(goToNext, view(lensProp('item')), always(state))

// const handleAccordingToFingers = cond([[equals(1), restart], [equals(2), moveOn]]);

function clearOutState(){
    clearTimeout(timeout);
    tizen.alarm.removeAll();
}

function app(){
    // main(state);
    const bar = new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30});
    const alarmFuture = (compose(setUpAlarms, getItem)());
    const insertFuture = (compose(processItem, getItem)());
    const parallelNewFutures = (parallel(2)([insertFuture, alarmFuture]))
    const getNewIfEventDone = ifElse(gte(100), resolve, always(parallelNewFutures))
    const calculatePercentageFromItem = (compose(map(log('map hey')), log('hey'), chain(getNewIfEventDone), map(log('logged map here')), log('here'), map(setProgressPercent(bar)), calculatePercentage, getItemFromSessionStorage)('item'))
    const timeFuture = (compose(tick, always(time))());
    const loopFutures = parallel(2)([timeFuture, calculatePercentageFromItem]);
    const loop = () => setTimeout(() => loopFork(loopFutures), 500);
    const loopFork = fork(loop)(loop)
    loopFork(loopFutures);
    const newItemFork = fork(console.log)(console.log);
    newItemFork(parallelNewFutures);

    // fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(compose(handleAccordingToFingers, getFingerNumber));
};