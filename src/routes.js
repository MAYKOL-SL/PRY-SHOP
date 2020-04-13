'use strict';

function routes(app) {
    console.log('Starting routes...');
    app.use('/api/shop', require('./api/shop'));
}

module.exports = routes;