import { compose, lensProp, prop, cond, equals, always, view, map, ifElse, gte, is, find, chain, lte, converge, ap, identity, } from 'ramda';
import { fromEvent } from "rxjs";
import { debounceTime } from 'rxjs/operators';
// import goToNext from './goToNext';
import setUpAlarms from './calendar/alarms';
import { attempt, fork, forkCatch, go, lastly, pap, parallel, resolve, and } from 'fluture';
import processItem from './calendar/processItem';
import calculatePercentage from './ProgressBar/calculatePercentage';
import { time, log } from './utils';
import { tick } from './watchFunctions';
import setProgressPercent from './ProgressBar/setProgressPercent';
import getItem from './calendar/getItem';
import getItemFromSessionStorage from './calendar/getItem/getItemFromSessionStorage';
import useLoader from './useLoader';

window.onload = app;
window.onunload = clearOutState;

const getFingerNumber = compose(prop('length'), prop('touches'));

// const restart = compose(main, always(DEFAULT_STATE), clearOutState);

// const moveOn = compose(goToNext, view(lensProp('item')), always(state))

const removeAllAlarms = attempt(tizen.alarm.removeAll);

function clearOutState(){
    // untested
    clearTimeout(sessionStorage.getItem('timerId'));
    tizen.alarm.removeAll();
}

function app(){
    // main(state);
    const bar = new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30});

    const doItemStuff = converge(map(identity), [processItem, setUpAlarms]);
    const itemstufffuture = compose(chain(doItemStuff), getItem)();
    const loadItem = compose(useLoader, always(itemstufffuture))();
    const getNewIfEventDone = ifElse(gte(99), resolve, always(loadItem));

    const calculatePercentageFromItem = (compose(chain(getNewIfEventDone), map(setProgressPercent(bar)), calculatePercentage, getItemFromSessionStorage)('item'))
    const timeFuture = (compose(tick, always(time))());
    const loopFutures = parallel(2)([timeFuture, calculatePercentageFromItem]);
    const loop = () => setTimeout(() => loopFork(loopFutures), 500);
    const loopFork = fork(loop)(loop)
    loopFork(loopFutures);
    const newItemFork = fork(console.log)(console.log);
    
    newItemFork(loadItem);

    fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(() => (newItemFork(loadItem)));
    // fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(compose(handleAccordingToFingers, getFingerNumber));
};