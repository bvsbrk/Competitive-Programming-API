/**
 * Created by koteswarao on 01-06-2018.
 */

var json = {
    normal_to_unix: function toUnix(date_string) {
        var date = new Date(date_string);
        return date.getTime() / 1000;
    }
};

module.exports = json;