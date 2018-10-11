var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Boom = require('boom');



var contactsRouter = require('./routes/contacts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/api/v1', contactsRouter);


app.use((req, res, next)=> {    
    const error = Boom.notFound('Sorry!! what you are looking for is not found');
    next(error);
});

app.use((err, req, res, next)=> {
    res.status(err.output.statusCode).json(err.output.payload);

    next(err);
});



module.exports = app;
