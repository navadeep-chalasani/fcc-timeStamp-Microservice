"use strict";

const router = require('express').Router();

let _registerRoutes = (routes, method) => {
    for(let key in routes){
        if( typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)){
            _registerRoutes(routes[key], key)
        }else {
            // Register the routes
            if(method === 'get'){
                router.get(key, routes[key]); // in a nutshell our route is added to the get method on the router object. this means router object is modified here
            }else if(method === 'post'){
                router.post(key, routes[key]);
            }else{
                router.use(routes[key]);
            }
        }
    }
};

let route = (routes) => {
    _registerRoutes(routes);
    return router;
}

// todays date
let getTodaysDate = () => {
    let utcDate = new Date();
    let unixMilliseconds = Date.parse(utcDate);
    return {
        unix : unixMilliseconds,
        utc : utcDate.toGMTString()
    };
}

// relavent date
let getRelaventDate = (dateString) => {
    console.log(dateString);
    let dateStr = typeof dateString === String ? dateString : dateString.toString();
    const utcRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    const milliRegex = /^\d+\d$/;
    if(utcRegex.test(dateStr)){
        let utcOnDate = new Date(dateStr);
        // console.log(utcDate);
        let unixOnDate = Date.parse(dateStr);
        // console.log(unixMilliseconds);
        return {
            unix : unixOnDate,
            utc : utcOnDate.toGMTString()
        }
    }else if (milliRegex.test(dateStr)) {
        let unixOnMilliseconds = parseInt(dateStr, 10);
        // console.log(unixMilliseconds);
        let utcOnMilliseconds = new Date(unixOnMilliseconds);
        // console.log(utcDate);
        return {
            unix : unixOnMilliseconds,
            utc : utcOnMilliseconds.toGMTString()
        };
    }else {
        return {
            error:"invalid date"
        };
    }
}



module.exports = {
    route,
    getTodaysDate,
    getRelaventDate
};
