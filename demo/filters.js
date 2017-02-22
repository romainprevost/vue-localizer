/**
 * Created by romain on 22/02/2017.
 */
export default {
    filters: {
        json: function (value) {
            return JSON.stringify(value, null, 4);
        }
    }
}