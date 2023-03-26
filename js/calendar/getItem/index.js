import { always, chain, compose, map } from "ramda";
import { SESSION_STORAGE_KEY } from "../../constants";
import getItemsFromApi from "./getItemsFromApi";
import getItemFromSessionStorage from "./getItemFromSessionStorage";
import storeItemInSessionStorage from "./storeItemsInSessionStorage";

export default compose(chain(getItemFromSessionStorage), map(always(SESSION_STORAGE_KEY)), chain(storeItemInSessionStorage), getItemsFromApi)