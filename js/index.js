import { compose, lensProp, prop, cond, equals, always, view, map, ifElse, gte, is, find, chain, lte, converge, ap, identity, sequence } from 'ramda';
import { fromEvent } from "rxjs";
import { debounceTime } from 'rxjs/operators';
// import goToNext from './goToNext';
import setUpAlarms from './alarms';
import { attempt, fork, forkCatch, go, lastly, pap, parallel, resolve, and } from 'fluture';
import processItem from './calendar/processItem';
import calculatePercentage from './ProgressBar/calculatePercentage';
import { time, log } from './utils';
import { tick } from './watchFunctions';
import setProgressPercent from './ProgressBar/setProgressPercent';
import getItems from './calendar/getItem';
import getItemFromSessionStorage from './calendar/getItem/getItemFromSessionStorage';
import useLoader from './useLoader';
import { SESSION_STORAGE_KEY } from './constants';

window.onload = app;
window.onunload = clearOutState;

function clearOutState(){
    // untested
    clearTimeout(sessionStorage.getItem('timerId'));
    tizen.alarm.removeAll();
}

function app(){
    sessionStorage.setItem(SESSION_STORAGE_KEY, '[]');
    const bar = new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30});

    const doItemStuff = compose(sequence(resolve), converge(Array.of, [processItem, setUpAlarms]));
    const itemstufffuture = compose(chain(doItemStuff), getItems)();
    const loadItem = compose(useLoader, always(itemstufffuture))();
    const getNewIfEventDone = ifElse(gte(99), resolve, always(loadItem));

    const calculatePercentageFromItem = (compose(chain(getNewIfEventDone), map(setProgressPercent(bar)), calculatePercentage, getItemFromSessionStorage)(SESSION_STORAGE_KEY))
    const timeFuture = (compose(tick, always(time))());
    const loopFutures = parallel(2)([timeFuture, calculatePercentageFromItem]);
    const loop = () => setTimeout(() => loopFork(loopFutures), 500);
    const loopFork = fork(loop)(loop)
    loopFork(loopFutures);
    const newItemFork = fork(console.log)(console.log);
    
    newItemFork(loadItem);

    fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(() => (newItemFork(loadItem)));
};