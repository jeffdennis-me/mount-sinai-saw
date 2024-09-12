// ------------------------------------------------------------------
// Copyright 2019, All rights reserved, Prolecto Resources, Inc.

// No part of this file may be copied or used without express, written
// permission of Prolecto Resources, Inc.
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Description: Server Database module
// Developer: Sylvain Muise
// Date: August 11, 2019
// Deployment URL:
// Notes:
// ------------------------------------------------------------------

/**
  * @NApiVersion  2.x
  * @NModuleScope Public
*/

//define(['N/record', 'N/search', 'N/util', './Definitions', './Library'],
define(['N/log', 'N/record', 'N/search', 'N/util', '../Library',
        '../../../Prolecto/Shared/mts_Functions'],

//function(record, search, util, DEF, lib) {
function(log, record, search, util, lib, mtsFunctions) {

return {
//  createTimeSlots : createTimeSlots,
    deleteRecord : deleteRecord,
    getOptions : getOptions,
    loadRecord : loadRecord,
    saveRecord : saveRecord,
    searchGlobal : searchGlobal,
    searchResult : searchResult,
    searchResults : searchResults,
    useTrust : useTrust,
    checkForOwner : checkForOwner // MHI add new action
};

//  function createTimeSlots(options) {
//      function addDays(date, days) {
//            var result = new Date(date);
//            result.setDate(result.getDate() + days);
//            return result;
//      }
//      try {
//          var firstDate = new Date(options.year, options.month, options.day);
//          for (i = 0; i < 12; i++) {
//              var date = addDays(firstDate, i);
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 9)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 10)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 2
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 11, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 12, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 2
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 14)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 15)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 2
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 10)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 11)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 1
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 12, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 13, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 1
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 15)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 16)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 1
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 10)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 11)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 3
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 12, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 13, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 3
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 15)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 16)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 3
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 10)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 11)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 4
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 10)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 11)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 5
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 12, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 13, 30)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 5
//              }).save();
//
//              record.create({
//                  type : 'customrecord_mts_svc_time_slot'
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_date',
//                  value : date
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_start_time',
//                  value : new Date(2020, 2, 11, 15)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_end_time',
//                  value : new Date(2020, 2, 11, 16)
//              }).setValue({
//                  fieldId : 'custrecord_mts_sts_resource',
//                  value : 5
//              }).save();
//
//          }
//          return {
//              success : true
//          };
//      } catch(error) {
//          return {
//              error : error,
//              success : false
//          };
//      }
//  }

function deleteRecord(options) {
    try {
        var response = {
            id : record.delete(options),
            success : true
        };
    } catch(error) {
        var response = {
            error : error,
            success : false
        };
    }
    return response;
}

//  getOptions : (options) => Array
//  options : An object containing the following properties:
//      type : The record type that desired field is on.
//      fieldId : The field id of the field to look up the options for.
//  Returns an array of the select options for the field.
function getOptions(options) {
    return record.create({
        type : options.type,
        isDynamic: true
    }).getField({
        fieldId : options.fieldId
    }).getSelectOptions();
}

//  loadRecord : (options) => record.Record
//  options : An object containing the following properties:
//      type : The record type of the record that is to be loaded.
//      id : The id of the record to load.
//  Returns a record.Record object.
function loadRecord(options) {
    try {
        var columns = options.columns.map(lib.objCopy);
        var rec = record.load(options);
        var response = {
            record : lib.extractData(columns, rec),
            success : true
        };
    } catch(error) {
        var response = {
            error : error,
            success : false
        };
    }
    return response;
}

//  saveRecord : (options) => Object
//  options : An object containing the following properties:
//      type : The record type of the record that is to be loaded.
//      id : The id of the record to load.
//      toSave : An array of objects, each containing two properties:
//          fieldName : The field name on the record to save.
//          value : The value to save in the above field.
//  Returns an object with the following properties:
//      success : True if and only if the save was successful.
//      id (if success) : The id of the saved record.
//      error (if !success) : The error that was thrown by the call to save.
function saveRecord(options) {
    if (isNaN(options.id) && options.id.toLowerCase() == 'new') {
        var rec = record.create(options);
        // MHI task 35
        if (rec.type == record.Type.SALES_ORDER) {
            log.debug('Creating new Sales Order...');
          var atNeed = 2;
          rec.setValue({
            fieldId: 'class',
            value: atNeed
          })
        } // MHI TASK 35
    } else {
        var rec = record.load(options);
        if (rec.type == record.Type.SALES_ORDER) {
            log.debug('Loading Sales Order...', options.id);
        }
    }

    options.toSave.forEach(function(toSave) {
        switch(toSave.type) {
        case 'date':
            var arr = toSave.value.split('-');
            var year = +arr[0];
            var month = +arr[1] - 1;
            var day = +arr[2];
            toSave.value = new Date(year, month, day);
            break;
        case 'time':
            var arr = toSave.value.split(':');
            var hour = +arr[0];
            var minute = +arr[1];
            toSave.value = new Date();
            toSave.value.setHours(hour);
            toSave.value.setMinutes(minute);
            toSave.value.setSeconds(0);
            break;
        case 'currency':
        case 'number':
            toSave.value = Number(toSave.value);
            break;
        default:
        }
        if (toSave.sublist == 'addressbook') {
          log.debug('saverecord','setting addressbook');
          log.debug('saverecord','fieldname='+toSave.fieldName + ' || toSave.value='+toSave.value 
              + ' || linecount='+rec.getLineCount('addressbook'));
            if (rec.getLineCount('addressbook') == 0) {
                rec.insertLine({
                    line : 0,
                    sublistId : 'addressbook'
                });
            }
            // changed this behavior to find the default shipping address
            var addressbookLine = 0;
            for (var i=0; i<rec.getLineCount('addressbook'); i++) {
                var defaultShip = rec.getSublistValue({
                    sublistId : 'addressbook',
                    fieldId : 'defaultshipping',
                    line : i
                });
                if (defaultShip) {
                    addressbookLine = i;
                    break;
                }
            }

            // default to residential MHI task 35
            // rec.setSublistValue({
            //   sublistId : 'addressbook',
            //   fieldId : 'isresidential',
            //   line : 0,
            //   value: true
            // });
            // var addressRecord = rec.getSublistSubrecord({
            //     fieldId : 'addressbookaddress',
            //     line : 0,
            //     sublistId : 'addressbook'
            // });
            
            rec.setSublistValue({
              sublistId : 'addressbook',
              fieldId : 'isresidential',
              line : addressbookLine,
              value: true
            });
            var addressRecord = rec.getSublistSubrecord({
                fieldId : 'addressbookaddress',
                line : addressbookLine,
                sublistId : 'addressbook'
            });
            addressRecord.setValue({
                fieldId : toSave.fieldName,
                value : toSave.value
            });
            addressRecord.setValue({
                fieldId : 'addressee',
                value : ''
            });
            log.debug('saverecord','end setting addressbook')
        } else {
            log.debug('saving', toSave.fieldName +' : '+ toSave.value);
            rec.setValue({
                fieldId : toSave.fieldName,
                value : toSave.value
            });
        }
    });
    if (options.itemsToSave) {
        options.itemsToSave.forEach(function(item) {
            var line = rec.getLineCount('item');
            rec.insertLine({
                line : line,
                sublistId : 'item'
            });
            rec.setSublistValue({
                fieldId : 'item',
                line : line,
                sublistId : 'item',
                value : item.id
            });
            rec.setSublistValue({
                fieldId : 'quantity',
                line : line,
                sublistId : 'item',
                value : item.quantity
            });
            if (item.rate || item.rate === 0) { // MHI change rate validation so that zero amount can be set
                rec.setSublistValue({
                    fieldId : 'rate',
                    line : line,
                    sublistId : 'item',
                    value : item.rate
                });
            }
            if (item.description) {
                rec.setSublistValue({
                    fieldId : 'description',
                    line : line,
                    sublistId : 'item',
                    value : item.description
                });
            }
            rec.setValue({
                fieldId : 'istaxable',
                value : false
            });
        });
    }

    try {
        log.debug('Pre save...', JSON.stringify({ type: rec.type, id: rec.id }));
    } catch(_) {}

    var response = {};
    try {
        response.success = true;
        response.id = rec.save();
    } catch(error) {
        response.success = false;
        response.error = error;
    }
    return response;
}

function searchGlobal(keywords) {
    var response = {};

    try {
        response.success = true;
        response.results = search.global(keywords);
    } catch(error) {
        response.success = false;
        response.error = error;
    }
    return response;
}

//  searchResult : (options) => search.Result
//  options : An object containing the following properties:
//      type : The record type to search for.
//      columns : A single column, or an array of columns, to pass to the
//                  search. Each has the same properties of a search.Column
//                  object.
//      filters : A single filter, or an array of filters, to pass to the
//                  search. Each has the same properties of a search.Filter
//                  object, or can also be a filter expression.
//  Returns the first result returned by the search.
function searchResult(options) {
    var data = searchResults(options);
    if (data.success) {
        if (data.results.length > 0) {
            var response = {
                success : true,
                result : data.results[0]
            };
        } else {
            var response = {
                success : false,
                error : {
                    name : 'MY_ERROR',
                    message : 'No result'
                }
            };
        }
    } else {
        var response = data;
    }
    return response;
}

//  searchResults : (options) => search.ResultSet
//  options : An object containing the following properties:
//      type : The record type to search for.
//      columns : A single column, or an array of columns, to pass to the
//                  search. Each has the same properties of a search.Column
//                  object.
//      filters : A single filter, or an array of filters, to pass to the
//                  search. Each has the same properties of a search.Filter
//                  object, or can also be a filter expression.
//  Returns an array of all result objects returned by the search.
//  These are not search.Result objects, as they will be stringified and
//  parsed by JSON through the HTTP request.
//  The call to lib.RSToArray creates an array of objects representing each
//  result, with each text and value for each column stored.
function searchResults(options) {
    try {
        options.columnDefs = options.columns.map(lib.objCopy);
        options.columns = options.columns.filter(function(column) {
            return (!column.constant);
        });
        var resultSet = search.create(options).run();
        var response = {
            success : true,
            results : lib.RSToArray(resultSet, options)
        };
    } catch(error) {
        var response = {
            success : false,
            error : error
        };
    }
    return response;
}

function useTrust(options) {
    try {
        log.debug('useTrust','options='+JSON.stringify(options));
        record.load({
            id : options.trustId,
            type : record.Type.ESTIMATE
        }).setValue({
            fieldId : 'custbody_mts_trust_confirm_use',
            value : true
        }).setValue({
            fieldId : 'custbody_mts_desig_benef',
            value : options.decedentId
        }).save();
        // start Fix for issue #5
        var soId = mtsFunctions.useTrust(record.load({
            id : options.trustId,
            type : record.Type.ESTIMATE
        }));
        if (soId) {
          // MHI -load SO and remove lines to replace items with wizard items
          var objRecord = record.load({
              id : soId,
              type : record.Type.SALES_ORDER,
              isDynamic : true
          });
          
          var currentDate = new Date();
          // set trandate & custbody_mts_trust_orig_date to currentdate
          objRecord.setValue({fieldId : 'trandate', value : currentDate});
          objRecord.setValue({fieldId : 'custbody_mts_trust_orig_date', value : currentDate});
          var lineCount = objRecord.getLineCount({sublistId : 'item'});
          for (var i = lineCount-1; i >= 0 ; i -= 1) {
            objRecord.removeLine({
              sublistId: 'item',
              line: i,
              ignoreRecalc: true
            });
          }
          log.debug('useTrust', 'MHI- adding wizard items')
          if (options.items.length > 0) {
            for (var j = 0; j < options.items.length; j++) {
              var objItems = options.items[j];
              objRecord.selectNewLine({
                sublistId: 'item'
              });
              var itemId = objItems.itemId;
              var qty = objItems.quantity;
              var rate = objItems.rate;
              if (parseFloat(rate) != 0) { //mhi task 35
                var description = objItems.description;
                objRecord.setCurrentSublistValue({
                  sublistId: 'item',
                  fieldId: 'item',
                  value: itemId
                });
                if (qty) {
                  objRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: qty
                  });
                }
                if (rate || rate === 0) { // MHI change validation  to rate
                  objRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    value: rate
                  });
                }
                if (description) {
                  objRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'description',
                    value: description
                  });
                }
                
                objRecord.commitLine({
                  sublistId: 'item'
                });
              }
            }
          }
          log.debug('useTrust', 'MHI- saving SO after adding wizard items')
          objRecord.save({ignoreMandatoryFields : true});
        }
        
        // end Fix for issue #5
        return {
            soId : soId,
            success : true
        };
    } catch(error) {
        return {
            error : error,
            success : false
        };
    }
}

// MHI fix for issue 6
function checkForOwner(options){
  log.debug('checkForOwner','options='+JSON.stringify(options));
  var arrPurchasers = [];
  try {
    log.debug('checkForOwner','Searching SO');
    var objScSearch = search.create({
      type:   search.Type.SALES_ORDER,
      filters:  [
                  ["mainline",search.Operator.IS,'F']
                  ,"AND",["custcol_mts_property_unit",search.Operator.ANYOF,[options.propertyUnit]]
                  ,"AND",["status",search.Operator.NONEOF,["SalesOrd:C","SalesOrd:H"]]
                 ],
      columns:  ["entity",search.createColumn({name: "trandate", sort: search.Sort.DESC})]
    });
    
    var ownerFound = false;
    objScSearch.run().each(function(result){
      arrPurchasers.push(result.getValue("entity"));
      if (options.decedentId == result.getValue("entity")) {
        ownerFound = true;
        return false;
      }
      return true;
    });
    log.debug('checkForOwner','arrPurchasers='+JSON.stringify(arrPurchasers));
    if (!ownerFound && arrPurchasers.length>0) {
      log.debug('checkForOwner','Searching relationships');
      var relationshipSearchObj = search.create({
        type: "customrecord_mts_cust_rel",
        filters:
        [
           ["custrecord_mts_cust_rel_primary","anyof",arrPurchasers]
        ],
        columns:
        [
           search.createColumn({name: "custrecord_mts_cust_rel_linked"}),
        ]
       });
       
       relationshipSearchObj.run().each(function(result){
         log.debug('checkForOwner','rel linked='+result.getValue('custrecord_mts_cust_rel_linked'))
        if (options.decedentId == result.getValue('custrecord_mts_cust_rel_linked')) {
          ownerFound = true;
          return false;
        }
        return true;
       });
     }
    return {
      isOwned: ownerFound,
      success: true
    }
  } catch (ex) {
    const errorStr = (ex.getCode != null) ? ex.getCode() + '\n'
        + ex.getDetails() + '\n' : ex.toString();
    log.error('ERROR_ENCOUNTERED : ', errorStr);
    return {
      error: ex,
      success: false
    }
  }
  
  
  
}
//
});
