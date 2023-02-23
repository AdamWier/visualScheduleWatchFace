import { attempt } from "fluture";
import { chain, compose, curry } from "ramda";

const storeInSessionStorage = curry((key, x) => attempt(() => sessionStorage.setItem(key, x) || x))

const jsonStringifyFuture = curry(x => attempt(() => JSON.stringify(x)));

export default compose(chain(storeInSessionStorage('item')), jsonStringifyFuture);