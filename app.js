var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Boom = require('boom');



var contactRouter = require('./routes/contacts');
var addressRouter = require('./routes/addresses');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/address', addressRouter);


app.use((req, res, next)=> {    
    const error = Boom.notFound('Sorry!! what you are looking for is not found');
    next(error);
});
// Generic error handler
app.use((err, req, res, next) => {
    let status, message;
    if(err.output){
      status = err.output.statusCode;
      message = err.output.payload;
    } else {
      status = err.status || 500;
      message = {
        message: err.message || 'Oops, something bad happened'
      };
    }
  
    res
      .status(status)
      .json(message);
  });

app.use((err, req, res, next)=> {
    res.status(err.output.statusCode).json(err.output.payload);

    next(err);
});



module.exports = app;
