//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Server/ClientLink.js
//              Defines a number of methods used to provide a bridge between
//              the SAW app and the Netsuite database.
//Developer: Sylvain Muise
//Date: August 20, 2019

/**
 *@NApiVersion 2.x
 *@NScripttype Suitelet
 *@NModuleScope Public
 */

define(['./Database'],
function(db) {

    return { onRequest : onRequest };

    //  post : (requestBody) => string | Object
    //  Restlet Script Entry Point
    //  Receives a request from the client-to-server link, and passes it along
    //  to the Database script.
    //  requestBody : An object with the following properties:
    //      action : The name of the function to call in the Database script.
    //      options : An object holding the options to pass to the function
    //                  described by the action parameter.
    //  Returns the response to be sent back to the client-to-server link, in
    //  JSON format.
//  function post(requestBody) {
    function onRequest(context) {
//      var action = requestBody.action;
//      var options = requestBody.options;
//      var params = context.request.parameters;
//      log.debug('context.request', context.request);
//      log.debug('context.request.body', context.request.body);
//      log.debug('post.params', params);
//      var action = params.action;
//      var options = JSON.parse(params.options);
////    var options = params.options;

        var body = JSON.parse(context.request.body);
//      var body = context.request.body;
        var action = body.action;
        var options = JSON.parse(body.options);

        log.debug('post.action : ', action);
        log.debug('post.options : ', options);

//      var errorMesg = 'Error : No such action.';
        var errorResponse = {
            error : new Error('No such action'),
            success : false
        };
        errorResponse.error.name = 'LinkError';
        var response = ((db[action]) ? db[action](options) : errorResponse);

        log.debug('post.response', response);

//      return response;
        context.response.write(JSON.stringify(response));
    }
});
