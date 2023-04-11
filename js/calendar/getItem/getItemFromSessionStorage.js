import { encase } from "fluture";
import { curry, compose, map, find, prop, where, has, filter, lt, invoker, chain, propSatisfies, } from "ramda";
import { convertToDateTime } from "../../utils";

const callGetTime = invoker(0, 'getTime');

const isBefore = curry((y, x) => compose(lt(y), callGetTime, convertToDateTime, prop('dateTime'))(x));

const getCurrentItem = encase((x) => find(propSatisfies(isBefore(new Date().getTime()), 'end'))(x));

const getFirstNotFullDayItem = filter(where({
    start: has('dateTime'),
    end: has('dateTime')
}));

const getFromSessionStorage = encase(sessionStorage.getItem.bind(sessionStorage));

export default compose(chain(getCurrentItem), map(getFirstNotFullDayItem), map(JSON.parse), getFromSessionStorage);