// ------------------------------------------------------------------
// Copyright 2019, All rights reserved, Prolecto Resources, Inc.

// No part of this file may be copied or used without express, written
// permission of Prolecto Resources, Inc.
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Description: SAW.js
// Developer: Sylvain Muise
// Date: October 16, 2019
// Deployment URL:
// Notes:
// ------------------------------------------------------------------

/**
  * @NApiVersion  2.x
  * @NModuleScope Public
*/

define(['N/record', 'N/search', '../Library', './Definitions', './Database'],

function(record, search, lib, DEF, db) {

return {
    checkForMortCase : checkForMortCase,
    checkForMortPrep : checkForMortPrep,
    checkForService : checkForService,
    createNewMortCase : createNewMortCase,
    createNewService : createNewService,
    loadCaskets : loadCaskets,
    loadContactRelationships : loadContactRelationships,
    loadClient : loadEntity.bind(this, 'client'),
    loadImmediateFamily : loadImmediateFamily,
    loadListOptions : loadListOptions,
    loadMortCase : loadEntity.bind(this, 'mortCase'),
    loadMortPrep : loadEntity.bind(this, 'mortPrep'),
    loadOpeningClosingOptions : loadOpeningClosingOptions,
    loadPrices : loadPrices,
    loadPurchaserRelationship : loadPurchaserRelationship,
    loadCongregations: loadCongregations,
    loadReciprocals : loadReciprocals,
    loadRelationshipTo : loadRelationshipTo,
    loadRelationshipTypes : loadRelationshipTypes,
    loadService : loadEntity.bind(this, 'service'),
    linkServiceToMortPrep : linkServiceToMortPrep,
    loadStaffList : loadStaffList,
    loadTransferOfRemainsList : loadTransferOfRemainsList,
    loadItemGroupList : loadItemGroupList, // task 24
    loadItemGroups: loadItemGroups, // Added by Jeff Dennis
    loadLastNavigationSection: loadLastNavigationSection, // Added by Jeff Dennis
    loadOutSideCemeteryNames: loadOutSideCemeteryNames, // Added by Jeff Dennis
};

function checkForMortCase(params) {
    var data = db.searchResult({
        columns : [],
        filters : [name('decedent').mortCase, 'anyof', params.decedentId],
        type : DEF.RECORD_TYPE.mortCase
    });
    if (data.success) {
        var id = data.result.id;
        db.saveRecord({
            id : params.decedentId,
            toSave : [
                {
                    fieldName : name('mortCase').decedent,
                    value : id
                }
            ],
            type : DEF.RECORD_TYPE.client
        });
        return id;
    } else {
        return undefined;
    }
}

function checkForMortPrep(params) {
    var data = db.searchResult({
        columns : [],
        filters : [name('decedent').mortPrep, 'anyof', params.decedentId],
        type : DEF.RECORD_TYPE.mortPrep
    });
    if (data.success) {
        var id = data.result.id;
        db.saveRecord({
            id : params.decedentId,
            toSave : [
                {
                    fieldName : name('mortPrep'),
                    value : id
                }
            ],
            type : DEF.RECORD_TYPE.client
        });
        return id;
    } else {
        return undefined;
    }
}

function checkForService(params) {
    var data = db.searchResult({
        columns : [],
        filters : [name('decedent').service, 'anyof', params.decedentId],
        type : DEF.RECORD_TYPE.service
    });
    if (data.success) {
        var id = data.result.id;
        db.saveRecord({
            id : params.decedentId,
            toSave : [
                {
                    fieldName : name('service'),
                    value : id
                }
            ],
            type : DEF.RECORD_TYPE.client
        });
        return id;
    } else {
        return undefined;
    }
}

function createNewMortCase(params, decedent) {
    var now = new Date();
    var covidNoInfo = params.listOptions.covid19.reduce(function(acc, option) {
        return option.text == 'No Information' ? option.value : acc;
    }, '');
    var saveResult = db.saveRecord({
        id : 'new',
        toSave : [
            {
                fieldName : name('decedent').mortCase,
                value : decedent.id
            },
            {
                fieldName : 'name',
                value : 'Case '+ decedent.getValue(name('entityId'))
            },
            {
                fieldName : name('firstCallDate'),
                value : now
            },
            {
                fieldName : name('firstCallTime'),
                value : now
            },
            {
                fieldName : name('firstCallTakenBy'),
                value : params.user.id
            },
            {
                fieldName : name('covid19'),
                value : covidNoInfo
            }
        ],
        type : DEF.RECORD_TYPE.mortCase
    });

    if (saveResult.success) {
        log.debug('createNew', saveResult);
        db.saveRecord({
            id : params.decedentId,
            toSave : [
                {
                    fieldName : name('mortCase').decedent,
                    value : saveResult.id
                }
            ],
            type : DEF.RECORD_TYPE.client
        });
        return saveResult.id;
    } else {
        log.debug('createNewMortCase failed:', saveResult.error);
    }
}

function createNewService(params, mortCase, decedent) {
    var now = new Date();
    var date = (now.getMonth() + 1)
                +'/'+ now.getDate()
                +'/'+ now.getFullYear();
    var entityId = decedent.getValue(name('entityId'));
    var firstName = decedent.getValue(name('firstName'));
    var middleName = decedent.getValue(name('middleName'));
    var lastName = decedent.getValue(name('lastName'));
    var displayName = ((firstName) ? firstName +' ' : '')
                        + ((middleName) ? middleName +' ' : '')
                        + lastName;
    var insideValue = getListOptionValue(params.listOptions.cemetery,
                                            'Inside');
//      var yesValue = getListOptionValue(params.listOptions.yesNo, 'Yes');
//      var otherValue = getListOptionValue(params.listOptions.serviceTypeOld,
//                                              'Other');
//      var locationValue =
//          getListOptionValue(params.listOptions.serviceLocation,
//                              'HH - Other');
//      var parkValue = getListOptionValue(params.listOptions.park,
//                                          'Los Angeles');

//  var atNeedDeptId = record.load({
//      id : '182',
//      type : 'employee'
//  }).getValue('department');
//  var familyDeptId = record.load({
//      id : '113',
//      type : 'employee'
//  }).getValue('department');
//  var mortuaryDeptId = record.load({
//      id : '157',
//      type : 'employee'
//  }).getValue('department');
//  var itDeptId = record.load({
//      id : '134',
//      type : 'employee'
//  }).getValue('department');
//  log.debug('at need dept id', atNeedDeptId);
//  log.debug('family dept id', familyDeptId);
//  log.debug('mortuary dept id', mortuaryDeptId);
//  log.debug('it dept id', itDeptId);

    var userDepartment = record.load({
        id : params.user.id,
        type : 'employee'
    }).getValue('department');

    var validDepartments = [
        DEF.DEPARTMENT.atNeed,
        DEF.DEPARTMENT.family,
        DEF.DEPARTMENT.it,
        DEF.DEPARTMENT.mortuary
    ];

    if (!lib.arrayIncludes(validDepartments, userDepartment))
        var counselorId = DEF.DEFAULT_COUNSELOR_ID;
    else
        var counselorId = params.user.id;

    var saveResult = db.saveRecord({
        id : 'new',
        toSave : [
            {
                fieldName : name('customForm'),
                value : '46'
            },
//              {
//                  fieldName : name('serviceTypeOld'),
//                  value : otherValue
//              },
//              {
//                  fieldName : name('serviceLocation'),
//                  value : locationValue
//              },
//              {
//                  fieldName : name('park'),
//                  value : parkValue
//              },
//              {
//                  fieldName : name('attendanceExpected'),
//                  value : '1'
//              },
            {
                fieldName : name('serviceStatus'),
                value : 'TENTATIVE'
            },
            {
                fieldName : name('title'),
                value : 'Service for '+ entityId +' ('+ date +')'
            },
            {
                fieldName : name('decedent').service,
                value : decedent.id
            },
            {
                fieldName : name('mortCase').service,
                value : mortCase.id
            },
            {
                fieldName : name('displayName'),
                value : displayName
            },
            {
                fieldName : name('counselor'),
//              value : params.user.id
                value : counselorId
            },
            {
                fieldName : name('cemetery'),
                value : insideValue
            },
            {
                fieldName : name('mortuary'),
                value : insideValue
            }
//              {
//                  fieldName : name('flowersAcceptable'),
//                  value : yesValue
//              }
        ],
        type : DEF.RECORD_TYPE.service
    });

    if (saveResult.success) {
//          var newId = String(saveResult.id);
//          saveResult = db.saveRecord({
//              id : newId,
//              toSave : [
//                  {
//                      fieldName : name('serviceTypeOld'),
//                      value : ''
//                  },
//                  {
//                      fieldName : name('serviceLocation'),
//                      value : ''
//                  },
//                  {
//                      fieldName : name('park'),
//                      value : ''
//                  }
//              ],
//              type : DEF.RECORD_TYPE.service
//          });
//
//          if (saveResult.success) {
//              return String(saveResult.id);
//          } else {
//              log.debug('createNewService second save failed:',
//                          saveResult.error);
//          }
        return saveResult.id;
    } else {
        log.debug('createNewService failed:', saveResult.error);
    }
}

function getListOptionValue(options, text) {
    return options.reduce(function(acc, option) {
        return option.text == text ? option.value : acc;
    }, '');
}

function loadCaskets() {
    var casketsAndUrnsValue = lib.RSReduce(search.create({
        columns : [],
        filters : ['name', 'is', 'Caskets and Urns'],
        type : name('itemCategoryList')
    }).run(), function(acc, result) {
        return result.id;
    });

    var arr = lib.RSMap(search.create({
        columns : [
            {
                name : 'itemid',
                sort : search.Sort.ASC
            },
            {
                name : 'baseprice'
            }
        ],
//          filters : ['name', 'contains', 'Opening/Closing'],
        filters : [
            [name('itemCategory'), 'anyof', casketsAndUrnsValue],
            'AND',
            ['name', 'doesnotcontain', 'DO NOT USE']
        ],
        type : 'item'
    }).run(), function(item) {
        var name = item.getValue('itemid');
        name = name.replace(/'/, '&#39;');
        var price = item.getValue('baseprice');
        return {
            text : name +' - $'+ price,
            value : item.id
        };
    });
    arr.unshift({
        text : '',
        value : ''
    });
    return arr;
}

function loadContactRelationships() {
    return lib.RSMap(search.create({
        columns : [
            {
                name : 'name',
                sort : 'ASC'
            },
            {
                name : name('clientRelationshipType')
            }
        ],
        filters : [
            [name('clientRelationshipType'), 'noneof', '@NONE@'],
            "AND",
            ['isinactive', 'IS', 'F'],
        ],
        type : DEF.RECORD_TYPE.contactRelationship
    }).run(), function(relationship) {
        return {
            text : relationship.getValue('name'),
            type : relationship.getValue(name('clientRelationshipType')),
            value : relationship.id
        };
    });
}

function loadEntity(entity, id) {
    log.debug('DEF.RECORD_TYPE[entity]', DEF.RECORD_TYPE[entity]);
    log.debug('id', id);
    return record.load({
        id : id,
        type : DEF.RECORD_TYPE[entity]
    });
}

function loadImmediateFamily(decedentId, nextOfKinValue) {
//      log.debug('columns', DEF.SEARCH_COLUMNS.immediateFamily);
//      return lib.uniqResults(db.searchResults({
    var data = db.searchResults({
        columns : DEF.SEARCH_COLUMNS.immediateFamily,
        filters : [
            [name('primaryClient'), 'ANYOF', decedentId],
            "AND",
            [name('relationshipType') +'.'+ name('familialRelation'),
                    'IS', 'T'],
//          'AND',
//          ['custrecord_mts_cust_rel_linked.isdefaultshipping', 'is', 'T'],
            'AND',
            [name('relationshipType'), 'noneof', nextOfKinValue]
        ],
        type : DEF.RECORD_TYPE.relationship
//      }));
    });
    var seen = {};
    data.results = data.results.filter(function(result) {
        var linkedClient = result.columns.reduce(function(acc, column) {
            return column.id == 'linkedClient' ? column.value : acc;
        }, null);
        if (seen[linkedClient]) {
            return false;
        } else {
            seen[linkedClient] = true;
            return true;
        }
    });
    return data;
}

function loadListOptions(id) {
    if (DEF.FIELD[id].sublist == 'addressbook') {
        return record.create({
            isDynamic : true,
            type : DEF.RECORD_TYPE.client
        }).selectNewLine({
            sublistId : 'addressbook'
        }).getCurrentSublistSubrecord({
            fieldId : 'addressbookaddress',
            sublistId : 'addressbook'
        }).getField({
            fieldId : DEF.FIELD[id].name
        }).getSelectOptions().map(function(option) {
            return {
                text : option.text.replace(/'/, '&#39;'),
                value : option.value
            };
        });
    } else {
        return lib.RSMap(search.create({
            columns : ['name'],
            filters : [["isinactive","is","F"]],// update to fix listdefinitions creations from script "SAW List Creator"
            type : DEF.FIELD[id].list
        }).run(), function(result) {
            var text = result.getValue('name');
            text = text.replace(/'/, '&#39;');
            return {
                text : text,
                value : result.id
            };
        }).filter(function(option) {
            return isNaN(Number(option.text));
        });
    }
}

function loadOpeningClosingOptions() {
    var arr = lib.RSMap(search.create({
        columns : [
            {
                name : 'itemid',
                sort : 'ASC'
            },
            {
                name : 'baseprice'
            }
        ],
        filters : ['name', 'contains', 'Opening/Closing'],
        type : 'item'
    }).run(), function(item) {
        var name = item.getValue('itemid');
        name = name.slice(name.indexOf('(') + 1, name.indexOf(')'));
        var price = item.getValue('baseprice');
        return {
            text : name +' - $'+ price,
            value : item.id
        };
    });
    arr.unshift({
        text : '',
        value : ''
    });
    return arr;
}

function loadItemGroups() {
    var itemMappings = {};
    for (var item in DEF.ITEM) {
        if (!DEF.ITEM.hasOwnProperty(item)) continue;
        itemMappings[DEF.ITEM[item]] = {
            id: item,
            internalid: DEF.ITEM[item],
            rate: record.load({ type: 'noninventoryitem', id: DEF.ITEM[item] }).getValue('rate')
        };
    }
    var groupings = {};
    for (var key in DEF.ITEM_GROUP) {
        if (!DEF.ITEM_GROUP.hasOwnProperty(key)) continue;
        var id = DEF.ITEM_GROUP[key];

        var group = record.load({ type: 'itemgroup', id: id });
        var memberCount = group.getLineCount({ sublistId: 'member' });
        var members = [];
        var groupPrice = 0;
        for (var i=0; i<memberCount; i++) {
            var item = group.getSublistValue({ sublistId: 'member', line: i, fieldId: 'item' });
            var qty = group.getSublistValue({ sublistId: 'member', line: i, fieldId: 'quantity' });
            var memberMap = itemMappings[item];
            if (!!memberMap) {
                groupPrice += memberMap.rate * qty;
            } else {
                try {
                    var rec = record.load({ id: item, type: 'serializedinventoryitem' });
                    var rate = rec.getValue('rate');
                    memberMap = {
                        id: 'casket',
                        internalid: item,
                        rate: rate
                    }
                    groupPrice += rate * qty;
                } catch (e) {}
            }
            members.push({ item: memberMap, qty: qty });
        }
        groupings[id.toString()] = {
            groupPrice: groupPrice,
            groupPriceFormatted: ' - $'+groupPrice,
            members: members
        }
    }
    return groupings;

    // return lib.objMap(DEF.ITEM_GROUP, function(id) {
    //     var group = record.load({ type: 'itemgroup', id: id });
    //     var memberCount = group.getLineCount({ sublistId: 'member' });
    //     var members = [];
    //     var groupPrice = 0;
    //     for (var i=0; i<memberCount; i++) {
    //         var item = group.getSublistValue({ sublistId: 'member', line: i, fieldId: 'item' });
    //         var qty = group.getSublistValue({ sublistId: 'member', line: i, fieldId: 'quantity' });
    //         var memberMap = itemMappings[item];
    //         if (!!memberMap) {
    //             groupPrice += memberMap.rate * qty;
    //         } else {
    //             try {
    //                 var rec = record.load({ id: item, type: 'serializedinventoryitem' })
    //                 var rate = rec.getValue('rate')
    //                 groupPrice += rate * qty;
    //             } catch (e) {}
    //         }
    //         members.push({ item: memberMap, qty: qty });
    //     }
    //     return {
    //         groupPrice: groupPrice,
    //         groupPriceFormatted: ' - $'+groupPrice,
    //         members: members
    //     }
    // })
}

function loadPrices() {
//      var rec = record.load({
//          id : '1499793',
//          type : 'salesorder'
//      });
//      var fields = rec.getSublistFields('item');
//      for (var i = 0; i < rec.getLineCount('item'); i++) {
//          [
//              'istaxable',
//              'item',
//              'taxcode',
//              'taxrate1'
//          ].forEach(function(id) {
//              log.debug(id + i, rec.getSublistValue({
//                  fieldId : id,
//                  line : i,
//                  sublistId : 'item'
//              }));
//          });
//      }



    return lib.objMap(DEF.ITEM, function(id) {
        return ' - $'+ record.load({
            id : id,
            type : 'noninventoryitem'
        }).getValue('rate');
    });

//      return {
//          certifiedCopiesAmount : ' - $'+ record.load({
//              id : '134128',
//              type : 'noninventoryitem'
//          }).getValue('rate'),
//          shmira : ' - $'+ record.load({
//              id : '134133',
//              type : 'noninventoryitem'
//          }).getValue('rate'),
//          tachrichimCotton : ' - $'+ record.load({
//              id : '133929',
//              type : 'noninventoryitem'
//          }).getValue('rate'),
//          tachrichimLinen : ' - $'+ record.load({
//              id : '133931',
//              type : 'noninventoryitem'
//          }).getValue('rate'),
//          tahara : ' - $'+ record.load({
//              id : '134134',
//              type : 'noninventoryitem'
//          }).getValue('rate'),
//          tallit : ' - $'+ record.load({
//              id : '133933',
//              type : 'noninventoryitem'
//          }).getValue('rate'),
//          vault : ' - $'+ record.load({
//              id : '133924',
//              type : 'noninventoryitem'
//          }).getValue('rate')
//      };
}

function loadPurchaserRelationship() {
    return lib.RSMap(search.create({
        columns : [
            {
                name : 'name',
                sort : 'ASC'
            }
        ],
        filters : [
            ['isinactive', 'IS', 'F']
        ],
        type : DEF.RECORD_TYPE.contactRelationship
    }).run(), function(relationship) {
        return {
            text : relationship.getValue('name'),
            value : relationship.id
        };
    });
};

function loadCongregations() {
    return lib.RSMap(search.create({
        columns : [
            { name: 'altname', sort: 'ASC' }
        ],
        filters : [
            ['custentity_mts_customer_attributes', 'is', '4']
        ],
        type : DEF.RECORD_TYPE.client
    }).run(), function(relationship) {
        return {
            text : relationship.getValue('altname'),
            value : relationship.id
        };
    });
};

function loadReciprocals(immediateFamily) {
    if (immediateFamily.success) {
        return immediateFamily.results.map(function(relationship) {
            log.debug('relationship', relationship);
//              var id = relationship.getoValue('reciprocalRelationship');
            var id = relationship.columns.reduce(function(acc, column) {
                return column.id == 'reciprocalRelationship' ?
                        column.value :
                            acc;
            }, '');
            log.debug('id', id);
            log.debug('typeof id', typeof id);
//              var data = db.searchResult({
            var data = db.loadRecord({
                columns : DEF.SEARCH_COLUMNS.reciprocal,
//                  filter : ['internalid', 'anyof', id],
                id : id,
                type : DEF.RECORD_TYPE.relationship
            });
            log.debug('result', data);
            if (data.success)
//                  return data.result;
                return data.record;
            else
                return null;
        });
    } else {
        return [];
    }
}

function loadRelationshipTo(decedentId) {
    return db.searchResults({
        columns : DEF.SEARCH_COLUMNS.relationshipTo,
        filters : [name('linkedClient'), 'ANYOF', decedentId],
        type : DEF.RECORD_TYPE.relationship
    });
}

function loadRelationshipTypes() {
    return db.searchResults({
        columns : DEF.SEARCH_COLUMNS.relationshipType,
        filters : [],
        type : DEF.RECORD_TYPE.relationshipType
    });
}

function linkServiceToMortPrep(serviceId, mortPrepId) {
    log.audit('Link service to mort prep', JSON.stringify({ serviceId: serviceId, mortPrepId: mortPrepId }));
    db.saveRecord({
        id : mortPrepId,
        type : DEF.RECORD_TYPE.mortPrep,
        toSave : [
            {
                fieldName : name('mortPrepService'),
                value : serviceId
            }
        ],
    });
}

function loadStaffList() {
    var arr = lib.RSMap(search.create({
        columns : [
            {
                name : 'itemid',
                sort : 'ASC'
            },
            {
                name : 'baseprice'
            }
        ],
        filters : ['name', 'contains', 'Staff for'],
        type : 'item'
    }).run(), function(item) {
        return {
            text : item.getValue('itemid') +' - $'+ item.getValue('baseprice'),
            value : item.id
        };
    });
    arr.unshift({
        text : '',
        value : ''
    });
    return arr;
}

function loadTransferOfRemainsList() {
    var arr = lib.RSMap(search.create({
        columns : [
            {
                name : 'itemid',
                sort : 'ASC'
            },
            {
                name : 'baseprice'
            }
        ],
        filters : ['name', 'contains', 'Transfer of Remains'],
        type : 'item'
    }).run(), function(item) {
        var name = item.getValue('itemid');
        name = name.slice(name.indexOf('-') + 2);
        var price = item.getValue('baseprice');
        return {
            text : name +' - $'+ price,
            value : item.id
        };
    });
    arr.unshift({
        text : '',
        value : ''
    });
    return arr;
}

// ADD Task 24
function loadItemGroupList() {
    var arr = lib.RSMap(search.create({
        columns : [
            {
                name : 'itemid',
                sort : 'ASC'
            }
        ],
        filters : [
        ['isinactive','is','F'], 
        'AND', 
        ['type','anyof','Group']
        ],
        type : 'item'
    }).run(), function(item) {
        var name = item.getValue('itemid');
        return {
            text : name,
            value : item.id
        };
    });
    arr.unshift({
        text : '',
        value : ''
    });
    return arr;
}
// ADD task 24

// ADDED BY JEFF
function loadLastNavigationSection(decedentId) {
    var id = '';
    var nav = '';
    search.create({
        type: 'customrecord_mts_saw_navigation',
        filters: [{ name: 'custrecord_saw_mts_nav_entity', operator: 'is', values: decedentId }],
        columns: ['custrecord_saw_mts_nav_section']
    }).run().each(function (row) {
        id = row.id;
        nav = row.getValue({ name: 'custrecord_saw_mts_nav_section' });
        return true;
    });
    return {
        id: id,
        nav: nav
    };
}

function loadOutSideCemeteryNames() {
    var eventId = null
    // search and return the first active calendar event in the db
    search.create({
        type: 'calendarevent',
        filters: [{ name: 'custevent_mts_svc_cem', operator: 'is', values: '2' }],
        columns: ['custevent_mts_svc_cem']
    }).run().each(function(row) {
        eventId = row.id;
        return false;
    })

    if (!eventId) return;

    var event = record.load({ type: 'calendarevent', id: eventId, isDynamic: true });
    var field = event.getField({ fieldId: 'custevent_mts_svc_outsd_cem_name' });
    var options = field.getSelectOptions({ filter: '', operator: 'contains' });
    return options;
}

// ADDED BY JEFF

function name(id) {
    return DEF.FIELD[id].name;
}
});
    