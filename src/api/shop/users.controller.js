
function getUsersSignin(req, res) {
    res.render('users/signin');
    //res.send('signin'); //httpStatus.OK
}

function getUserSignup(req, res) {
    res.render('users/signup'); //httpStatus.OK
}

module.exports = {
    getUsersSignin,
    getUserSignup
};