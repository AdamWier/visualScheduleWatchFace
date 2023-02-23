import { compose, lensProp, prop, cond, equals, always, view, map, } from 'ramda';
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
    const calculatePercentageFromItem = (compose(map(setProgressPercent(bar)), calculatePercentage, getItem)())
    const timeFuture = (compose(tick, always(time))());
    const loopFutures = parallel(2)([timeFuture, calculatePercentageFromItem]);
    const loop = () => setTimeout(() => fork(loop)(loop)(loopFutures), 500);
    fork(loop)(loop)(loopFutures);
    
    const alarmFuture = (compose(setUpAlarms, getItem)());
    const insertFuture = (compose(processItem, getItem)());
    fork(console.log)(console.log)(parallel(2)([insertFuture, alarmFuture]))

    // fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(compose(handleAccordingToFingers, getFingerNumber));
};