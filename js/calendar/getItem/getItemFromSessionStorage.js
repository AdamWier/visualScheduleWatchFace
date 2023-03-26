import { attempt } from "fluture";
import { curry, compose, chain, propSatisfies, map, find, prop } from "ramda";
import { log, toMaybe } from "../../utils";

const getFirstNotFullDayItem = find(propSatisfies(item => !!item.dateTime, 'end'));

const getFromSessionStorage = curry(x => attempt(() => sessionStorage.getItem(x)));

export default compose(map(prop('value')), map(map(getFirstNotFullDayItem)), map(map(JSON.parse)), map(toMaybe), getFromSessionStorage);