import { compose, objOf, prop } from "ramda";

export default compose(objOf('isCache'), prop('isCache'));