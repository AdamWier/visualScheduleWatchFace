import { always, chain, compose, map } from "ramda";
import { SESSION_STORAGE_KEY } from "../../constants";
import getItemFromApi from "./getItemFromApi";
import getItemFromSessionStorage from "./getItemFromSessionStorage";
import storeItemInSessionStorage from "./storeItemInSessionStorage";

export default compose(chain(getItemFromSessionStorage), map(always(SESSION_STORAGE_KEY)), chain(storeItemInSessionStorage), getItemFromApi)