//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Library
//              A collection of various utility functions.
//Developer: Sylvain Muise
//Date: August 2019
/**
 *@NApiVersion 2.x
 *@NModuleScope Public
 */


define([],
function() {
    return {
        arrayIncludes : arrayIncludes,
        arrToObj : arrToObj,
        callMap : callMap,
        compose : compose,
        extractData : extractData,
        formatDate : formatDate,
        formatTime : formatTime,
        objCopy : objCopy,
        objEvery : objEvery,
        objEntries : objEntries,
        objHasEqualValues : objHasEqualValues,
        objForEach : objForEach,
        objMap : objMap,
        objReduce : objReduce,
        objValues : objValues,
        recordToData : recordToData,
        removeHTMLTags : removeHTMLTags,
        RSFilter : RSFilter,
        RSMap : RSMap,
        RSReduce : RSReduce,
        RSToArray : RSToArray,
        uniq : uniq,
        uniqResults : uniqResults,
        yyyymmdd : yyyymmdd
    };

    function arrayIncludes(arr, val) {
        return (arr.indexOf(val) != -1);
    }

    function arrToObj(ids, values) {
        var obj = {};
        ids.forEach(function(id) {
            obj[id] = values(id);
        });
        return obj;
    }

    //  callMap : (f) -> Function
    //  Returns x -> x.map(f)
//  Library.prototype.callMap =
//  function(f) {
    function callMap(f) {
        return function(x) {
            return x.map(f);
        };
    }

    //  compose : ([f, g, ...]) -> Function
    //  Returns x -> f(g(...(x)))
    //  Optional : each element of the array may be either passed in as a single
    //      function, in which case the behaviour is as described above, or as
    //      a two element array [f, context]. In this case, the keyword 'this'
    //      in f will refer to context.
//  Library.prototype.compose =
//  function(arr) {
    function compose(arr) {
        return function(x) {
            return arr.reduceRight(function(acc, f) {
                if (Array.isArray(f)) {
                    return f[0].call(f[1], acc);
                } else {
                    return f(acc);
                }
            }, x);
        };
    }

    function extractData(columnDefs, result) {
        return {
            columns : columnDefs.map(function(columnDef, i) {
                var column = objCopy(columnDef);
                if (column.constant) {
                    column.text = column.constant;
                    column.value = column.constant;
                } else if (column.sublist) {
                  if (result.getLineCount(column.sublist) > 0) {
                      // MHI task 35
                      var lineCount = result.getLineCount(column.sublist);
                      log.debug('extractData' , 'column.sublist='+column.sublist + 'linecount='+lineCount);
                      
                      if (column.sublist == 'addressbook') {
                        var boolDefaultAddress = false;
                        for (var i = 0; i < lineCount; i++) {
                          var defaultShip = result.getSublistValue({
                            sublistId : column.sublist,
                            fieldId : 'defaultshipping',
                            line : i
                          });
                          var isResidential = result.getSublistValue({
                            sublistId : column.sublist,
                            fieldId : 'isresidential',
                            line : i
                          });
                        //   if (defaultShip && isResidential) {
                          if (defaultShip) {
                            boolDefaultAddress = true;
                            column.text = result.getSublistText({
                              sublistId : column.sublist,
                              fieldId : column.name +'_initialvalue',
                              line : i
                            }) || '';
                            column.value = result.getSublistValue({
                              sublistId : column.sublist,
                              fieldId : column.name +'_initialvalue',
                              line : i
                            }) || '';
                          }
                        }
                        if (!boolDefaultAddress) {
                          column.text = result.getSublistText({
                            sublistId : column.sublist,
                            fieldId : column.name +'_initialvalue',
                            line : 0
                          }) || '';
                          column.value = result.getSublistValue({
                            sublistId : column.sublist,
                            fieldId : column.name +'_initialvalue',
                            line : 0
                          }) || '';
                        }
                        // MHI task 35
                      } else {
                        column.text = result.getSublistText({
                          sublistId : column.sublist,
                          fieldId : column.name +'_initialvalue',
                          line : 0
                        }) || '';
                        column.value = result.getSublistValue({
                          sublistId : column.sublist,
                          fieldId : column.name +'_initialvalue',
                          line : 0
                        }) || '';
                      }
                        
                    } else {
                        column.text = '';
                        column.value = '';
                    }
                } else if (column.join) {
                    column.text = result.getText(column) || '';
                    column.value = result.getValue(column) || '';
                } else {
                    column.text = result.getText(columnDef.name) || '';
                    column.value = result.getValue(columnDef.name) || '';
                }
                column.text = safe(column.text);
                column.value = safe(column.value);
                if (column.convertToInt) {
                    var textDotIndex = column.text.indexOf('.');
                    if (textDotIndex != -1)
                        column.text = column.text.slice(0, textDotIndex);
                    var valueDotIndex = column.value.indexOf('.');
                    if (valueDotIndex != -1)
                        column.value = column.value.slice(0, valueDotIndex);
                }
//              if (column.id == 'dateOfBirth') {
//                  log.debug('date of birth text', column.text);
//                  log.debug('date of birth value', column.value);
//                  log.debug('date of birth text typeof', typeof column.text);
//                  log.debug('date of birth value typeof', Object.prototype.toString.call(column.value));
//              }
//              if (column.id == 'serviceStartTime') {
//                  log.debug('service start time text', column.text);
//                  log.debug('service start time value', column.value);
//                  log.debug('service start time text typeof', typeof column.text);
//                  log.debug('service start time value typeof', Object.prototype.toString.call(column.value));
//              }
                return column;
            }),
            id : result.id,
            type : (result.recordType) ? result.recordType : result.type
        };

        function safe(str) {
            return (typeof str == 'string') ? str.replace(/'/g, '&#39;') : str;
        }
    }

    function formatDate(date) {
        return (date.getMonth()+1)
                +'/'+ date.getDate()
                +'/'+ date.getFullYear();
    }

    function formatTime(date) {
        var hour = date.getHours();
        if (hour < 12) {
            var ampm = 'am';
        } else {
            var ampm = 'pm';
            hour = hour - 12;
        }
        hour = (hour == 0) ? 12 : hour;
        var minutes = date.getMinutes();
        minutes = (minutes < 10) ? '0'+ minutes : minutes;
        return hour +':'+ minutes +' '+ ampm;
    }

    //  objCopy : (obj) -> Object
    //  Builds and returns a new object with the same own properties and values
    //  as the given object.
//  Library.prototype.objCopy =
//  function(obj) {
    function objCopy(obj) {
        return objMap(obj, function(v) {
            return v;
        });
    }

    //  objEntries : (obj) -> Array
    //  Mimics Object.entries()
    //  Takes a single object and returns an array of key/value pair
    //  arrays, for each key which the object has as its own.
    //  Note that since we are dealing with an object, the order in which we
    //  process the object's properties is not known.
//  Library.prototype.objEntries =
//  function(obj) {
    function objEntries(obj) {
        return Object.keys(obj).map(function(e) {
            return [e, obj[e]];
        })
    }

    //  objEvery : (obj, f, ctx) => Boolean
    //      obj : The object over which to iterate.
    //      f : The test function to apply to each property of obj.
    //          (value, key, obj) => Boolean
    //          value : The value of the current property being processed.
    //          key : The key of the current property being processed.
    //          obj : The object being processed.
    //      ctx (optional) : Will be used as this in the call to f.
    //  Returns true if and only if every property of obj passes the given f.
//  Library.prototype.objEvery =
//  function(obj, f, ctx) {
    function objEvery(obj, f, ctx) {
        ct = ctx || this;
        return objEntries(obj).every(function(kvpair) {
            return f.call(ctx, kvpair[1], kvpair[0], obj);
        });
    }

    //  objForEach : (obj, f, ctx) -> undefined
    //  Mimics Array.forEach, but for an Object.
    //  Executes the given callback function for each key of the
    //  given object.
    //  Takes three parameters:
    //      obj - The object we are processing.
    //      f - The callback function, which takes 3 parameters:
    //          v - The value of the current property being processed.
    //          k - The key of the current property being processed.
    //          o - The object we are processing.
    //      ctx - (optional) The value to use as this when executing
    //          the callback function.
    //  Returns undefined. Does not create a new object.
    //  Note that since we are dealing with an object, the order in which we
    //  process the object's properties is not known.
//  Library.prototype.objForEach =
//  function(obj, f, ctx) {
    function objForEach(obj, f, ctx) {
        ctx = ctx || this;
        Object.keys(obj).forEach(function(k) {
            f.call(ctx, obj[k], k, obj);
        });
    }

    //  objHasEqualValues : (obj1, obj2) -> boolean
    //  Returns true if and only if for each key/value pair in obj1, the same
    //  pair also exists in obj2.
    //  Note that objHasEqualValue(obj1, obj2) does not necessarily equal
    //  objHasEqualValue(obj2, obj1).
//  Library.prototype.objHasEqualValues =
//  function(obj1, obj2) {
    function objHasEqualValues(obj1, obj2) {
        var equal = true;
        objForEach(obj1, function(value, key) {
            equal = equal && (value == obj2[key]);
        });
        return equal;
    }

    //  objMap : (obj, f, ctx) -> Object
    //  Mimics Array.map, but for an Object.
    //  Builds a new object with the same keys as the given object,
    //  but whose values are the result of applying the given
    //  callback function.
    //  Takes three parameters:
    //      obj - The object we are mapping over.
    //      f - The callback function, which takes 3 parameters:
    //          v - The value of the current property being processed.
    //          k - The key of the current property being processed.
    //          o - The object we are processing.
    //      ctx - (optional) The value to use as this when executing
    //          the callback function.
    //  Returns a new object whose values are the results of the callback.
    //  Note that since we are dealing with an object, the order in which we
    //  process the object's properties is not known.
//  Library.prototype.objMap =
//  function(obj, f, ctx) {
    function objMap(obj, f, ctx) {
        ctx = ctx || this;
        var result = {};
        objForEach(obj, function(v, k) {
            result[k] = f.call(ctx, v, k, obj);
        });
        return result;
    }

    //  objReduce : (obj, f, initialValue) -> Anything
    //  Mimics Array.reduce, but for an object.
    //  The function f will be called on each property of obj, that is its own,
    //  and a final single value will be returned.
    //  Parameters:
    //      obj - The object to reduce over.
    //      f - The reducing function, with the following parameters:
    //          acc - The accumulator, which was returned from the previous call
    //                  to f, or, in the first case, some initial value.
    //          value - The value of the current property being processed.
    //          key - The key of the current property being processed.
    //          obj - The object we are reducing over.
    //      initialValue - The initial value to assign to the accumulator,
    //                      which gets used in the first call to f. Defaults to
    //                      the empty string.
    //  Note that since we are dealing with an object, the order in which we
    //  process the object's properties is not known.
//  Library.prototype.objReduce =
//  function(obj, f, initialValue) {
    function objReduce(obj, f, initialValue) {
        var acc = initialValue || '';
        objForEach(obj, function(value, key) {
            acc = f(acc, value, key, obj);
        });
        return acc;
    }

    //  objValues : (obj) -> Array
    //  Mimics Object.values()
    //  Takes a single object and returns an array of all the values
    //  of all the keys that are its own.
    //  Note that since we are dealing with an object, the order in which we
    //  process the object's properties is not known.
//  Library.prototype.objValues =
//  function(obj) {
    function objValues(obj) {
        return Object.keys(obj).map(function(e) {
            return obj[e]
        })
    }

    //  recordToData : (rec, columns) => Object
    //      rec : A record.Record object.
    //      columns : An array of record fields to extract data for.
    //  Transforms a record.Record object into an object of the following form:
    //  {
    //      id : string,
    //      type : string,
    //      columns : [{
    //          name : string
    //          text : string
    //          value : string
    //      },
    //      ...
    //      ]
    //  }
//  Library.prototype.recordToData =
//  function(rec, columns) {
    function recordToData(rec, columns) {
        var recordData = {};
        recordData.id = ''+ rec.id;
        recordData.type = rec.type;
        recordData.columns = columns.map(function(column) {
//          log.debug('recordToData.column', column);
            var columnData = {};
            columnData.id = column.id;
            columnData.name = column.name;
            columnData.text = rec.getText(column.name) || '';
            columnData.value = rec.getValue(column.name) || '';
            return columnData;
        });
        return recordData;
    }

    //  removeHTMLTags : (str) -> string
    //  Takes out all HTML <...> tags from str and returns the result.
//  Library.prototype.removeHTMLTags =
//  function(str) {
    function removeHTMLTags(str) {
        //return str.replace(/<[/]?\w+>/g, "");
        return str.replace(/<.*?>/g, "");
    }

    //  resultToData : (result, type, columns) => Object
    //      result : A search.Result object.
    //      type : The record type associated to the search result.
    //      columns : An array of record fields to extract data for.
    //  Transforms a search.Result object into an object of the following form:
    //  {
    //      id : string,
    //      type : string,
    //      columns : [{
    //          name : string
    //          text : string
    //          value : string
    //      },
    //      ...
    //      ]
    //  }
//  Library.prototype.resultToData =
//  function(type, columns, result) {
//  function resultToData(options, result) {
////        options.columns = options.columns || [];
//      var resultData = {};
//      resultData.id = result.id;
//      resultData.type = options.type;
//      resultData.columns = options.columnDefs.map(function(columnDef, i) {
//          var column = objCopy(columnDef);
//          var searchColumn = options.columns[i];
//          column.text = result.getText(searchColumn) || '';
//          column.value = result.getValue(searchColumn) || '';
//          return column;
//      });
//      return resultData;
//  }

    //  RSFilter : (resultSet, f, ctx) -> Array
    //  Mimics Array.filter, but for a search.ResultSet object.
    //  Returns an array of those results in resultSet that return true when
    //  passed to f.
    //  ctx is an optional parameter which will be used as this in f.
//  Library.prototype.RSFilter =
//  function(resultSet, f, ctx) {
    function RSFilter(resultSet, f, ctx) {
        ctx = ctx || this;
        return RSReduce(resultSet, function(acc, result) {
            (f.call(ctx, result) ? acc.push(result) : null);
            return acc;
        });
    }

    //  RSMap : (resultSet, f, ctx) -> Array
    //  Mimics Array.map, but for a search.ResultSet object.
    //  Applies f to each result in resultSet, and returns the outputs in a
    //  new Array.
    //  ctx is an optional parameter which will be used as this in f.
//  Library.prototype.RSMap =
//  function(resultSet, f, ctx) {
    function RSMap(resultSet, f, limit, ctx) {
        ctx = ctx || this;
        return RSReduce(resultSet, function(acc, result) {
            acc.push(f.call(ctx, result));
            return acc;
        }, limit);
    }

    //  RSReduce : (resultSet, f, ctx, initialValue) -> *, Array by default
    //  Mimics Array.reduce, but for a search.ResultSet object.
    //  Executes f on each result of the resultSet, reducing to a single value.
    //  f takes the following parameters:
    //      acc : The accumulator which holds the value returned by the previous
    //              call to f.
    //      result : The current result being proccesed in the ResultSet.
    //  ctx is an optional parameter which will be used as this in f.
    //  initialValue is an optional value, which is [] by default.
//  Library.prototype.RSReduce =
//  function(resultSet, f, ctx, initialValue) {
    function RSReduce(resultSet, f, limit, ctx, initialValue) {
        ctx = ctx || this;
        var acc = initialValue || [];
        if ((!limit) || (isNaN(limit)) || (limit > 4000) || (limit <= 0))
            limit = 4000;
        var count = 0;
        resultSet.each(function(result) {
            count++;
            acc = f.call(ctx, acc, result);
            return (count < limit);
        });
        return acc;
    }

    //  RSToArray : (resultSet, options) -> Array
    //      options : An object containing the following properties.
    //          type : The record type for each result in the resultSet.
    //          columns : An array of column definitions to extract the data
    //                      for.
    //          limit (optional) : A maximum number of results to extract.
    //  Transforms a search.ResultSet object into an array, where each element
    //  of the array is an object of the form
    //  {
    //      id : string,
    //      type : string,
    //      columns : [{
    //          name : string
    //          text : string
    //          value : string
    //      },
    //      ...
    //      ]
    //  }
//  Library.prototype.RSToArray =
//  function(resultSet, options) {
    function RSToArray(resultSet, options) {
//      log.debug('columnDefs', options.columnDefs);
        var f = extractData.bind(this, options.columnDefs);
        return RSMap(resultSet, f, options.limit);
    }

    //  uniq : (arr, compareBy) -> Array
    //  Returns a new array with each element of arr appearing once.
    //  compareBy returns what property of item to compare by.
//  Library.prototype.uniq =
//  function(arr, compareBy) {
    function uniq(arr, compareBy) {
        var seen = {};
        return arr.filter(function(item) {
            return seen.hasOwnProperty(compareBy(item)) ?
                    false : (seen[compareBy(item)] = true);
        });
    }

    function uniqResults(data) {
        var seen = [];
        return data.results.filter(function(result) {
            if (arrayIncludes(seen, result.id)) {
                return false
            } else {
                seen.push(result.id);
                return true;
            }
        });
    }

    //  utility to get quick format of dates
//  Library.prototype.yyyymmdd =
//  function() {
    function yyyymmdd() {
        function twoDigit(n) { return (n < 10 ? '0' : '') + n; }

        var now = new Date();
        return '' + now.getFullYear() + twoDigit(now.getMonth() + 1) + twoDigit(now.getDate());
    }

//  var lib = new Library();


});
