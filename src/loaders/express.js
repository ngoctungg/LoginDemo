const express = require('express');
const config = require('../config');
const routes = require('../api');
/**
 * 
 * @param {express.application} app 
 */
module.exports = function (app) {

    app.use(express.json());
    /**
     * middleware run basis order of declaring
     */
    app.use(config.api.prefix, routes());
    
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['error'] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            }
        });
    });
};
