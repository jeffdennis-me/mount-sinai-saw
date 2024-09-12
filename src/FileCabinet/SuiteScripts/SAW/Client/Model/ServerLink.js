//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Client/ServerLink.js
//              Defines a number of methods used to provide a bridge between
//              the SAW app and the Netsuite database.
//Developer: Sylvain Muise
//Date: August 20, 2019

//  ServerLink : (url) => a new ServerLink object.
//  Constructor
//  Sets its own property linkUrl to the provided url, which will be used
//  to send POST requests.
function ServerLink(url) {
    this.linkUrl = url;
}

ServerLink.prototype.deleteRecord =
function(deleteParams, callback, logMessage) {
    this.sendRequest('deleteRecord', deleteParams, callback, logMessage);
};

//  getOptions : (optionsParams, callback, logMessage) => undefined
//  Sends a request to the server to fetch the select options for the
//  provided field.
//  optionsParams is an object with the following properties:
//      type : The record type that desired field is on.
//      fieldId : The field id of the field to look up the options for.
//  The request will callback with an array of the options for the field.
ServerLink.prototype.getOptions =
function(optionsParams, callback, logMessage) {
    this.sendRequest('getOptions', optionsParams, callback, logMessage);
};

ServerLink.prototype.loadRecord =
function(loadParams, callback, logMessage) {
    var f = function(data) {
        if (data.success) {
            data.record = lib.dataToResult(data.record);
        }
        return data;
    }
    var functions = [callback, f];
    loadParams.columns = loadParams.columns || [];
    this.sendRequest('loadRecord', loadParams, functions, logMessage);
}

//  saveRecord : (saveParams, callback, logMessage) => undefined
//  Sends a request to the server to save a record with the provided fields
//  and values.
//  saveParams is an object with the following properties:
//      type : The record type of the record that is to be saved.
//      id : The id of the record to save.
//      toSave : An array of objects, each containing two properties:
//          fieldName : The field name on the record to save.
//          value : The value to save in the above field.
//  The request will callback with an object with the following properties:
//      success : True if and only if the save was successful.
//      id (if success) : The id of the saved record.
//      error (if !success) : The error that was thrown by the call to save.
ServerLink.prototype.saveRecord =
function(saveParams, callback, logMessage) {
    this.sendRequest('saveRecord', saveParams, callback, logMessage);
};

ServerLink.prototype.searchGlobal =
function(keywords, callback, logMessage) {
    this.sendRequest('searchGlobal', keywords, function(data) {
        if (data.success)
            data.results = lib.searchDataToResult(data)
        callback(data);
    }, logMessage);
};

//  searchResult : (searchParams, callback, logMessage) => undefined
//  Sends a request to the server to search and return a single result.
//  searchParams is an object with the following properties:
//      type : The record type to search for.
//      columns : A single column, or an array of columns, to pass to the
//                  search. Each has the same properties of a search.Column
//                  object.
//      filters : A single filter, or an array of filters, to pass to the
//                  search. Each has the same properties of a search.Filter
//                  object, or can also be a filter expression.
//  The request will callback with a single search result object.
//  This is not a search.Result object, as it has been stringified and
//  parsed by JSON through the HTTP request.
//  The call to lib.dataToResult re-attaches the .getText and .getValue
//  methods on the result, which take a column's name as parameter and
//  returns the corresponding text, or value, from  the result.
ServerLink.prototype.searchResult =
function(searchParams, callback, logMessage) {
    var f = function(data) {
        if (data.success) {
            data.result = lib.dataToResult(data.result);
        }
        return data;
    };
    var functions = [callback, f];
    searchParams.columns = searchParams.columns || [];
    this.sendRequest('searchResult', searchParams, functions, logMessage);
};

//  searchResults : (searchParams, callback, logMessage) => undefined
//  Sends a request to the server to search and return all results from a
//  search.
//  searchParams is an object with the following properties:
//      type : The record type to search for.
//      columns : A single column, or an array of columns, to pass to the
//                  search. Each has the same properties of a search.Column
//                  object.
//      filters : A single filter, or an array of filters, to pass to the
//                  search. Each has the same properties of a search.Filter
//                  object, or can also be a filter expression.
//  The request will callback with an array of search result objects.
//  These are not a search.Result objects, as they have been stringified and
//  parsed by JSON through the HTTP request.
//  The call to lib.dataToResult re-attaches the .getText and .getValue
//  methods on the result, which take a column's name as parameter and
//  returns the corresponding text, or value, from  the result.
ServerLink.prototype.searchResults =
function(searchParams, callback, logMessage) {
    this.sendRequest('searchResults', searchParams, function(data) {
        if (data.success)
            data.results = data.results.map(lib.dataToResult);
        callback(data);
    }, logMessage);
};

//  sendRequest : (action, options, functions, logMessage) => undefined
//  Sends a post request to the ClientLink Restlet on the server.
//  Parameters:
//      action : A string containing the name of the function to call on the
//                  server side.
//      options : An object to pass to the above function as parameter.
//      functions : A single function, or an array of functions, to callback
//                  with the response from the server. If it is an array,
//                  the functions are called on the response from right to
//                  left.
//      logMessage : A message to log when sending and receiving the POST.
ServerLink.prototype.sendRequest =
function(action, options, functions, logMessage) {
    logMessage = logMessage || '';
    var params = {
        action : action,
        options : JSON.stringify(options)
    };
//  if (Array.isArray(functions)) {
//      var callback = lib.compose(functions);
//  } else {
//      var callback = functions;
//  }
    var callback = lib.compose(functions);
    var postStart = Date.now();
    log('POST Request : '+ logMessage);
    log('action : '+ action);
    log('options : ', options);
//  $.post(this.linkUrl, params, function(data) {
    fetch(this.linkUrl, {
        body : JSON.stringify(params),
//      body : params,
        headers : {
            'Accept' : 'application/json, text/plain, */*',
            'Content-Type' : 'application/json'
        },
        method : 'post'
    })
    .then(response => response.text())
    .then(function(body) {
        var postEnd = Date.now();
        var postTime = postEnd - postStart;
//      var body = response.body;
//      log(body);
        var firstChar = body[0];
        var lastChar = body[body.length - 1];
//      log(lastChar);
        if (['{', '['].includes(firstChar)) {
            while (!['}', ']'].includes(lastChar)) {
                body = body.substring(0, body.lastIndexOf('<!'));
                lastChar = body[body.length - 1];
            }
        }
        var data = JSON.parse(body);
        log('POST Response ('+ postTime +' msec) : '+ logMessage);
        log(data);
//        if (!data.success)
//            window.alert(JSON.stringify(data.error));
        callback(data);
//  }, 'json');
    });
};
