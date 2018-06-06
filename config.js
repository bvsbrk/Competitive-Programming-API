/**
 * Created by koteswarao on 01-06-2018.
 */

var json = {
    cache_duration: 60 * 1000,
    codechef_contests_cache: "cc_contests_cache",
    normal_to_unix: function toUnix(date_string) {
        var date = new Date(date_string);
        return date.getTime() / 1000;
    },
    ics_to_unix: function (ics_string) {
        var year = parseInt(ics_string.slice(0, 4));
        var month = parseInt(ics_string.slice(4, 6)) - 1; // Jan is 0
        var date = parseInt(ics_string.slice(6, 8));
        var hours = parseInt(ics_string.slice(9, 11));
        var minutes = parseInt(ics_string.slice(11, 13));
        var seconds = parseInt(ics_string.slice(13, 15));
        return Date.UTC(year, month, date, hours, minutes, seconds) / 1000;
    }
};

module.exports = json;


