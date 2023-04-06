import { attempt } from "fluture";
import { curry, compose, map, find, prop, where, has, filter, gte, lt, invoker, } from "ramda";
import { convertToDateTime, log, toMaybe } from "../../utils";

const callGetTime = invoker(0, 'getTime');

const isBeforeNow = compose(lt(new Date().getTime()), callGetTime, convertToDateTime, prop('dateTime'));

const getCurrentItem = find(where({
    end: isBeforeNow,
}));

const getFirstNotFullDayItem = filter(where({
    start: has('dateTime'),
    end: has('dateTime')
}));

const getFromSessionStorage = curry(x => attempt(() => sessionStorage.getItem(x)));

export default compose(map(prop('value')), map(map(getCurrentItem)), map(map(getFirstNotFullDayItem)), map(map(JSON.parse)), map(toMaybe), getFromSessionStorage);