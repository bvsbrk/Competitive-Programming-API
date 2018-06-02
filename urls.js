/**
 * Created by koteswarao on 01-06-2018.
 */



var json = {
    hackerrank_contests: "https://www.hackerrank.com/contests",
    hackerrank_leaderboard: "https://www.hackerrank.com/contests/contest_id/leaderboard/page_no",
    hackerrank_profile: "https://www.hackerrank.com/username?hr_r=1",

    //codechef urls
    codechef_contests: "https://www.codechef.com/contests",
    codechef_contest_link: "https://www.codechef.com/contest_code",
    codechef_leaderboard: "https://www.codechef.com/rankings/contest_id?&page=page_no",
    codechef_profile: "https://www.codechef.com/users/user_name",
    codechef_header: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
        "DNT": 1,
        "Host": "www.codechef.com",
        "Upgrade-Insecure-Requests": 1,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0"
    },

    //codeforces urls
    codeforces_contests: "http://codeforces.com/api/contest.list",


    //hackerearth urls
    hackerearth_contests: "https://www.hackerearth.com/chrome-extension/events/",

    //csacademy urls
    csacademy_contests:"https://csacademy.com/contests/?", // fetching from cs academy api
    //csacademy has api for leaderboard too
    csacademy_leaderboard: "https://csacademy.com/contest/round-number/scoreboard/",
    csacademy_header:{
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
        "Host": "csacademy.com",
        "Upgrade-Insecure-Requests": 1,
        "DNT":1,
        "Referer":"https://csacademy.com/contests/",
        "x-requested-with":"XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0"
    }
};
module.exports = json;