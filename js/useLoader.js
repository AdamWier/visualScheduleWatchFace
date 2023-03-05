import { and, attempt, lastly } from "fluture";

const showLoader = attempt(() => document.getElementById('loading').style.display = 'block');

const hideLoader = attempt(() => document.getElementById('loading').style.display = 'none');

export default x => lastly(hideLoader)(and(x)(showLoader))