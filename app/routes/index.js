"use strict";

const h = require('../helpers');

module.exports = () => {
    let routes = {
        'get' : {
            '/' : (req, res, next) => {
                    console.log(process.cwd());
                    res.sendFile(process.cwd() + '/public/views/index.html')
            },
            '/api/timestamp' : (req, res, next) => {
                    let ts1 = h.getTodaysDate();
                    res.send(JSON.stringify(ts1));
            },
            '/api/timestamp/:id' : (req, res, next) => {
                        let ts2 = h.getRelaventDate(req.params.id);
                        res.send(JSON.stringify(ts2));
            },
            '/:id' :  (req, res, next) => {
                        let ts2 = h.getRelaventDate(req.params.id);
                        res.send(JSON.stringify(ts2));
            }
        },
        'post' : {

        },
        'NA' : (req, res, next) => {
                    const invalidDate = { error : 'Invalid Date'};
                    res.send(JSON.stringify(invalidDate));
        }
    };

    return h.route(routes);
}
