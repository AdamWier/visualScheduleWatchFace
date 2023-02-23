import { always, chain, compose, map } from "ramda";
import getItemFromApi from "./getItemFromApi";
import getItemFromSessionStorage from "./getItemFromSessionStorage";
import storeItemInSessionStorage from "./storeItemInSessionStorage";

export default compose(chain(getItemFromSessionStorage), map(always('item')), chain(storeItemInSessionStorage), getItemFromApi)