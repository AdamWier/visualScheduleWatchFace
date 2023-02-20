import { compose, lensProp, prop, cond, equals, always, view } from 'ramda';
import { fromEvent } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import goToNext from './goToNext';
import DEFAULT_STATE from './DEFAULT_STATE';
import main, {timeout} from './main';
import getItemFromApi from './calendar/getItemFromApi';
import setUpAlarms from './calendar/alarms';
import { attempt, fork, forkCatch, pap, resolve } from 'fluture';
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
    fork(x => console.log(x))(x => console.log(x))(compose(setUpAlarms, getItemFromApi)())
    fork(x => console.log(x))(x => console.log(x))(compose(processItem, getItemFromApi)())
    const calculatePercentageFromItem = compose(calculatePercentage, getItemFromApi)()
    const buildBar = resolve(new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30}))
    fork(x => console.log(x))(x => console.log(x))(pap(buildBar)(pap(calculatePercentageFromItem)(resolve(setPercentage))))
    fork(x => console.log(x))(x => console.log(x))(compose(tick, always(time))())

    // fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(compose(handleAccordingToFingers, getFingerNumber));
};