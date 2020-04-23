'use strict';

function routes(app) {
    console.log('Starting routes...');
    //app.use('/api/shop', require('./api/shop'));
    app.use('/', require('./api/shop'));
}

module.exports = routes;