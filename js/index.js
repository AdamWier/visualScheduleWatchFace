import { compose, lensProp, prop, cond, equals, always, view, map } from 'ramda';
import { fromEvent } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import goToNext from './goToNext';
import DEFAULT_STATE from './DEFAULT_STATE';
import main, {timeout} from './main';
import getItemFromApi from './calendar/getItemFromApi';
import setUpAlarms from './calendar/alarms';
import { attempt, fork, forkCatch, pap, parallel, resolve } from 'fluture';
import processItem from './calendar/processItem';
import calculatePercentage from './ProgressBar/calculatePercentage';
import { time, log } from './utils';
import { tick } from './watchFunctions';
import setProgressPercent, { setPercentage } from './ProgressBar/setProgressPercent';

window.onload = app;
window.onunload = clearOutState;

let state = DEFAULT_STATE;

const getFingerNumber = compose(prop('length'), prop('touches'));

const restart = compose(main, always(DEFAULT_STATE), clearOutState);

const moveOn = compose(goToNext, view(lensProp('item')), always(state))

const handleAccordingToFingers = cond([[equals(1), restart], [equals(2), moveOn]]);

function clearOutState(){
    clearTimeout(timeout);
    tizen.alarm.removeAll();
}

function app(){
    // main(state);
    const alarmFuture = (compose(setUpAlarms, getItemFromApi)())
    const insertFuture = (compose(processItem, getItemFromApi)())
    const calculatePercentageFromItem = compose(calculatePercentage, getItemFromApi)()
    const buildBar = resolve(new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30}))
    const barFuture = (pap(buildBar)(pap(calculatePercentageFromItem)(resolve(setPercentage))))
    const timeFuture = (compose(map(log('tick')), tick, always(time))())
    
    const loop = () => setTimeout(() => fork(loop)(loop)(timeFuture), 500)
    fork(loop)(loop)(timeFuture)
    // fork(console.log)(console.log)(parallel(4)([alarmFuture, insertFuture, barFuture, timeFuture, getItemFromApi()]))

    // fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(compose(handleAccordingToFingers, getFingerNumber));
};