import { compose, lensProp, prop, cond, equals, always, view } from 'ramda';
import { fromEvent } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import goToNext from './goToNext';
import DEFAULT_STATE from './DEFAULT_STATE';
import main, {timeout} from './main';

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
    main(state);

    fromEvent(document, "touchstart").pipe(debounceTime(60)).subscribe(compose(handleAccordingToFingers, getFingerNumber));
};