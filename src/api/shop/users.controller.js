
function getUsersSignin(req, res) {
    res.send('signin'); //httpStatus.OK
}

function getUserSignup(req, res) {
    res.send('signup'); //httpStatus.OK
}

module.exports = {
    getUsersSignin,
    getUserSignup
};