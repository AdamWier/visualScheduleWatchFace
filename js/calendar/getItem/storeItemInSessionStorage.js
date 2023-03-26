import { attempt } from "fluture";
import { chain, compose, curry } from "ramda";
import { SESSION_STORAGE_KEY } from "../../constants";

const storeInSessionStorage = curry((key, x) => attempt(() => sessionStorage.setItem(key, x) || x))

const jsonStringifyFuture = curry(x => attempt(() => JSON.stringify(x)));

export default compose(chain(storeInSessionStorage(SESSION_STORAGE_KEY)), jsonStringifyFuture);