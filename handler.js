'use strict';
var CheckoutChoice = require('./CheckoutChoice');
var SMS = require('./SMS');
const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var sns = new AWS.SNS();

var moduleName = 'checkoutchoice-svc';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from the checkoutchoice microservice for FuelStationApp'
//      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'GET from the checkoutchoice microservice for FuelStationApp'
    })
  };
    //check the event path params for an employee id to use during lookup
    var id = (event.pathParameters && event.pathParameters.cid) ? event.pathParameters.cid : null;
    var filter = ((event.queryStringParameters != null) && (event.queryStringParameters.filter != null))?	
		event.queryStringParameters.filter.split(','):null;
    console.log(moduleName, 'filter created - ' + JSON.stringify(filter));
    CheckoutChoice.get(id,filter).then(function(result) {
        if (result.count == 0) response.statusCode = 404;
        response.body = JSON.stringify({
            message: 'Successful get command found: ' + result.count,
            checkoutchoices: result.checkoutchoices
        });
        callback(null, response);
    }).catch(function(err) {
        console.log(moduleName, 'there was an error during the get call');
        console.error(err);
    }).finally(function() {
        console.info(moduleName, 'completed the employee model get');
    });
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'POST from the checkoutchoice microservice for FuelStationApp'
    })
  };
    
    var json = JSON.parse(event.body);
    var checkoutchoice;
    
    CheckoutChoice.create(json).then(function(c) {
        console.log(moduleName, 'checkoutchoice created, sending sms alert to confirm');
        checkoutchoice = c;	//stash the checkoutchoice in a function scoped variable
        var msg = moduleName + ': successfully created a new checkoutchoice - ' + checkoutchoice.CheckoutChoiceID;
        return SMS.sendText(msg, '+13108771151');
    }).then(function(result) {
        response.body = JSON.stringify({
            message: 'Successfully created a new checkoutchoice: ' + checkoutchoice.CheckoutChoiceID,
            checkoutchoice: checkoutchoice
        });
        callback(null, response);
    }).catch(function(err) {
        console.log(moduleName, 'there was an error creating the checkoutchoice');
        console.error(err);
    }).finally(function() {
        console.info(moduleName, 'completed the checkoutchoice model create');
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'PUT from the checkoutchoice microservice for FuelStationApp'
    })
  };
    var json = JSON.parse(event.body);
    var id = (event.pathParameters && event.pathParameters.cid) ? event.pathParameters.cid : null;
	
  CheckoutChoice.update(json).then(function(checkoutchoice) {
      console.log('checkoutchoice updated using the SPORT utility module');
      callback(null, response);
  }).catch(function(err) {
      console.log('There was an error updating the checkoutchoice record');
      console.error(err);
      callback(err);
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'DELETE from the checkoutchoice microservice for FuelStationApp'
    })
  };

  var id = (event.pathParameters && event.pathParameters.cid) ? event.pathParameters.cid : null;
  if (!id) {
      callback(null, {
          statusCode: 400,
          body: JSON.stringify({ message: 'Valid checkoutchoice id was not passed to the delete method.' })
      })
  }
	
  CheckoutChoice.delete(id).then(function(count) {
      console.log('(' + count + ') - checkoutchoice successfully deleted');
      callback(null, response);
  }).catch(function(err) {
      console.log('There was an error deleting the checkoutchoice record');
      console.error(err);
      callback(err);
  });
};
