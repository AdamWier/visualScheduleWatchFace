import { always, assoc, chain, compose, map } from "ramda";
import { SESSION_STORAGE_KEY } from "../../constants";
import getItemsFromApi from "./getItemsFromApi";
import getItemFromSessionStorage from "./getItemFromSessionStorage";
import storeItemInSessionStorage from "./storeItemsInSessionStorage";
import { after, fork, race, resolve } from "fluture";
import { log } from "../../utils";

const assocCacheValue = assoc('isCache');

const getCachedItem = compose(map(assocCacheValue(true)), chain(getItemFromSessionStorage), always(after(5000)(SESSION_STORAGE_KEY)));

const getFreshApiItems = compose(map(assocCacheValue(false)), chain(getItemFromSessionStorage), chain(always(resolve(SESSION_STORAGE_KEY))), chain(storeItemInSessionStorage), getItemsFromApi);

export default always((race(getCachedItem())(getFreshApiItems())));