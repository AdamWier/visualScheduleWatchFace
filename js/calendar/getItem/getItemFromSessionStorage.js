import { attempt } from "fluture";
import { curry, compose, chain } from "ramda";

const jsonSerializeFuture = curry(x => attempt(() => JSON.parse(x)));

const getFromSessionStorage = curry(x => attempt(() => sessionStorage.getItem(x)));

export default compose(chain(jsonSerializeFuture), getFromSessionStorage);