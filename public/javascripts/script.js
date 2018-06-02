/**
 * Created by koteswarao on 02-06-2018.
 */


function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

$(document).ready(function () {
    var json = {
        "live": [
            {
                "code": "JUNE18",
                "name": "June Challenge 2018",
                "start": 1527865200,
                "end": 1528729200,
                "duration": 864000,
                "divA_link": "https://www.codechef.com/JUNE18A",
                "divB_link": "https://www.codechef.com/JUNE18B",
                "normal_link": "https://www.codechef.com/JUNE18"
            }
        ],
        "future": [
            {
                "code": "COOK95",
                "name": "June Cook-Off 2018",
                "start": 1529271000,
                "end": 1529280000,
                "duration": 9000,
                "divA_link": "https://www.codechef.com/COOK95A",
                "divB_link": "https://www.codechef.com/COOK95B",
                "normal_link": "https://www.codechef.com/COOK95"
            }
        ],
        "past": [
            {
                "code": "LOCMAY18",
                "name": "LoC May 2018",
                "start": 1527379200,
                "end": 1527552000,
                "duration": 172800,
                "divA_link": "https://www.codechef.com/LOCMAY18A",
                "divB_link": "https://www.codechef.com/LOCMAY18B",
                "normal_link": "https://www.codechef.com/LOCMAY18"
            }
        ]
    };
    var str = JSON.stringify(json, undefined, 4);
    var styled = "<pre>" + syntaxHighlight(str) + "</pre>";
    $("#codechef-contests-response").html(styled);
});