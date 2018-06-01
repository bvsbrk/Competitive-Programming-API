/**
 * Created by koteswarao on 31-05-2018.
 */


module.exports = function (app) {
    app.use('/', require('../routes'));

    //hackerrank routes here
    app.use('/hackerrank', require('./hackerrank'));
    app.use('/hackerrank/contests', require('./hackerrank/contests'));
    app.use('/hackerrank/leaderboard', require('./hackerrank/leaderboard'));
    app.use('/hackerrank/profile', require('./hackerrank/profile'));

    //codechef routes here
    app.use('/codechef', require('./codechef'));
    app.use('/codechef/contests', require('./codechef/contests'));
    app.use('/codechef/leaderboard', require('./codechef/leaderboard'));
    app.use('/codechef/profile', require('./codechef/profile'));
    
    //codeforces routes here
    app.use('/codeforces', require('./codeforces'));
    app.use('/codeforces/contests', require('./codeforces/contests'));
    app.use('/codeforces/leaderboard', require('./codeforces/leaderboard'));
    app.use('/codeforces/profile', require('./codeforces/profile'));
};