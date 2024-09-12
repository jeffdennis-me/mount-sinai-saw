////------------------------------------------------------------------
////Copyright 2019, All rights reserved, Prolecto Resources, Inc.
//
////No part of this file may be copied or used without express, written
////permission of Prolecto Resources, Inc.
////------------------------------------------------------------------
//
////------------------------------------------------------------------
////Description: Client/Database.js
////                Defines a number of methods to bridge the gap between the
////                SAW app and the Netsuite database.
////Developer: Sylvain Muise
////Date: August 21, 2019

function Database() {
    this.link = new ServerLink(lib.getParam('linkUrl'));
}

Database.prototype.checkServiceScheduling = function(serviceId, callback) {
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.service,
        filters : ['internalid', 'anyof', serviceId],
        type : DEF.RECORD_TYPE.service
    }, callback, 'Database.checkServiceScheduling('+ serviceId +')');
};

Database.prototype.checkTimeSlots = function(serviceId, callback) {
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.timeSlot,
        filters : [name('timeSlotServiceReference'), 'anyof', serviceId],
        type : DEF.RECORD_TYPE.timeSlot
    }, callback, 'Database.checkTimeSlots('+ serviceId +')');
};

Database.prototype.deleteRelationship = function(id, callback, ctx) {
    ctx = ctx || this;
    callback = callback || function() {};
    this.link.deleteRecord({
        id : id,
        type : DEF.RECORD_TYPE.relationship
    }, callback.bind(ctx), 'Database.deleteRelationship('+ id +')');
};

Database.prototype.getMapAndLot = function(intermentSpaceId, callback) {
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.propertySpace,
        filters : ['internalid', 'anyof', intermentSpaceId],
        type : DEF.RECORD_TYPE.propertySpace
    }, callback, 'Database.getMapAndLot('+ intermentSpaceId +')');
};

Database.prototype.loadAltName = function(id, callback) {
    this.link.searchResult({
        columns : [DEF.FIELD.altName],
        filters : ['internalid', 'ANYOF', id],
        type : DEF.RECORD_TYPE.linkedClient
    }, callback, 'Database.loadAltName('+ id +')');
};

Database.prototype.loadAutoIncludeItems = function(callback) {
    this.link.searchResults({
        columns : [],
        filters : [
            ['isinactive', 'IS', false],
            'AND',
            [name('autoIncludeInTrust'), 'IS', true]
        ],
        type : DEF.RECORD_TYPE.item
    }, callback, 'Database.loadAutoIncludeItems()');
};

Database.prototype.loadClientIntermentSpace = function(id, callback) {
    this.link.searchResult({
        columns : [
            { id : 'name', name : 'name' },
            { id : 'custrecord_mts_ps_person_interred', name : 'custrecord_mts_ps_person_interred' }
        ],
        filters : ['internalid', 'is', id],
        type : DEF.RECORD_TYPE.propertySpace
    }, callback, 'Database.loadClientIntermentSpace('+ id +')');
};

Database.prototype.loadClientRelationship = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.immediateFamily,
        filters : ['internalid', 'is', id],
        type : DEF.RECORD_TYPE.relationship
    }, callback.bind(ctx), 'Database.loadClientRelationship('+ id +')');
};

Database.prototype.loadDeeds = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.deed,
        filters : [name('deedPropertyUnit'), 'ANYOF', id],
        type : DEF.RECORD_TYPE.deed
    }, callback.bind(ctx), 'Database.loadDeeds('+ id +')');
};

Database.prototype.loadEntity = function(options, callback, ctx) {
//  log('db.loadEntity', options);
    ctx = ctx || this;
    this.link.loadRecord(options, callback.bind(ctx),
            'Database.loadEntity('+ options.id +')');
};

Database.prototype.loadImmediateFamily =
function(decedentId, nextOfKinValue, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.immediateFamily,
        filters : [
            [name('primaryClient'), 'ANYOF', decedentId],
            'AND',
            [name('relationshipType') +'.'+ name('familialRelation'),
                'IS', 'T'],
            'AND',
            [name('relationshipType'), 'noneof', nextOfKinValue]
        ],
        type : DEF.RECORD_TYPE.relationship
    }, callback.bind(ctx), 'Database.loadImmediateFamily('+ decedentId +')');
};

Database.prototype.loadInvoice = function(unitId, callback) {
    this.link.searchResult({
        columns : [],
        filters : [name('propertyUnit').transaction, 'ANYOF', unitId],
        type : 'invoice'
    }, function(data) {
        if (data.success) {
            var invoiceId = data.result.id;
            this.link.loadRecord({
                columns : Object.values(DEF.SEARCH_COLUMNS.invoice),
                id : invoiceId,
                type : 'invoice'
            }, callback, 'Database.loadInvoice('+ invoiceId +')');
        } else {
            callback(data);
        }
    }.bind(this), 'Database.loadInvoice('+ unitId +')');
};

Database.prototype.loadLinkedClientResult = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.linkedClient,
        filters : [
            ['internalid', 'anyof', id],
//          'AND',
//          ['isdefaultshipping', 'is', 'T']
        ],
        type : DEF.RECORD_TYPE.linkedClient
    }, callback.bind(ctx), 'Database.loadLinkedClientResult('+ id +')');
};

Database.prototype.loadOutsideCemetery = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.outsideCemetery,
        filters : [
            ['internalid', 'anyof', id],
        ],
        type : DEF.RECORD_TYPE.linkedClient
    }, callback.bind(ctx), 'Database.loadLinkedClientResult('+ id +')');
}

Database.prototype.loadMortCase = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : DEF.MORT_CASE_FIELDS,
        filters : ['internalid', 'IS', id],
        type : DEF.RECORD_TYPE.mortCase
    }, callback.bind(ctx), 'Database.loadMortCase('+ id +')');
};

Database.prototype.loadNearServices = function(options, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.nearService,
        filters : [
            [name('timeSlotServiceReference'), 'noneof', '@NONE@'],
            'AND',
            [name('timeSlotDate'), 'on', options.date],
            'AND',
            [name('timeSlotResource') +'.'+ name('resourcePark'), 'anyof',
                                                    options.park],
            'AND',
            [name('timeSlotStartTime'), 'between', options.startTime,
                                                    options.endTime]
        ],
        type : DEF.RECORD_TYPE.timeSlot
    }, callback.bind(ctx), 'Database.loadNearServices('
                                                    + options.startTime +')');
};

Database.prototype.loadPropertySpace = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.propertySpace,
        filters : ['internalid', 'ANYOF', id],
        type : DEF.RECORD_TYPE.propertySpace
    }, callback.bind(ctx), 'Database.loadPropertySpace('+ id +')');
};

Database.prototype.loadPropertySpaces = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.propertySpace,
        filters : [
//          [
                [name('intendedInteree'), 'ANYOF', id],
//              'OR',
//              [name('purchaser').propertySpace, 'ANYOF', id]
//          ],
            'AND',
            ['isinactive', 'IS', false]
        ],
        type : DEF.RECORD_TYPE.propertySpace
    }, callback.bind(ctx), 'Database.loadPropertySpaces('+ id +')');
};

Database.prototype.loadReciprocalRelationship = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.loadRecord({
        columns : DEF.SEARCH_COLUMNS.reciprocal,
        id : id,
        type : DEF.RECORD_TYPE.relationship
    }, callback.bind(ctx), 'Database.loadReciprocalRelationship('+ id +')');
};

Database.prototype.loadRelationshipTo = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.relationshipTo,
        filters : [name('linkedClient'), 'ANYOF', id],
        type : DEF.RECORD_TYPE.relationship
    }, callback.bind(ctx), 'Database.loadRelationshipTo(' + id +')');
};

Database.prototype.loadSearch = function(keywords, callback, ctx) {
    ctx = ctx || this;
    this.link.searchGlobal(keywords, callback.bind(ctx),
                            'Database.loadSearch('+ keywords +')');
};

Database.prototype.loadSearchProperty = function(keywords, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.propertySearch,
        filters : ['name', 'haskeywords', keywords],
        type : DEF.RECORD_TYPE.propertySpace
    }, callback.bind(ctx), 'Database.loadSearchProperty('+ keywords +')');
};

Database.prototype.loadSearchFamily = function(keywords, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.searchFamily,
        filters : [
            ['entityid', 'haskeywords', keywords]
        ],
        type : DEF.RECORD_TYPE.client
    }, callback.bind(ctx), 'Database.loadSearchFamily('+ keywords +')');
};

Database.prototype.loadSearchEarthOffPerson = function(keywords, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.earthOffClient,
        filters : [
            ['entityid', 'haskeywords', keywords]
        ],
        type : DEF.RECORD_TYPE.client
    }, callback.bind(ctx), 'Database.loadSearchEarthOffPerson('+ keywords +')');
}

Database.prototype.loadSearchRabbi = function(keywords, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.rabbiSearch,
        filters : [
            [name('category'), 'anyof', CNST.rabbiClergyValue],
            'AND',
            ['entityid', 'haskeywords', keywords]
        ],
        type : DEF.RECORD_TYPE.client
    }, callback.bind(ctx), 'Database.loadSearchRabbi('+ keywords +')');
}

Database.prototype.loadSearchOutsideCemetery = function(keywords, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.outsideCemetery,
        filters : [
            [name('category'), 'anyof', CNST.outsideCemeteryValue],
            'AND',
            ['entityid', 'haskeywords', keywords]
        ],
        type : DEF.RECORD_TYPE.client
    }, callback.bind(ctx), 'Database.loadSearchOutsideCemetery('+ keywords +')');
}

Database.prototype.loadSearchTrust = function(keywords, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.trust,
        filters : [
            ['type', 'anyof', 'Estimate'],
            'AND',
            ['account', 'anyof', CNST.accountEstimates],
            'AND',
            ['tranid', 'haskeywords', keywords]
        ],
        type : DEF.RECORD_TYPE.trust
    }, callback.bind(ctx), 'Database.loadSearchTrust('+ keywords +')');
}

Database.prototype.loadSecondaryPropertySpaces =
function(options, callback, ctx) {
    ctx = ctx || this;
    var relations = options.relations.map(function(relation) {
        return relation.getValue('primaryClient');
    });
//  log('relations');
//  log(relations);
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.propertySpace,
//      filters : [
//          {
//              name : 'isinactive',
//              operator : 'IS',
//              values : false
//          },
//          {
//              name : name('personInterred'),
//              operator : 'ANYOF',
//              values : '@NONE@'
//          },
//          {
//              name : name('purchaser').propertyUnit,
//              operator : 'ANYOF',
//              join : name('propertyUnit').propertySpace,
//              values : relations
//          }
//      ],
        filters : [
            ['isinactive', 'IS', false],
            'AND',
            [name('personInterred'), 'ANYOF', '@NONE@'],
            'AND',
            [
                [name('propertyUnit').propertySpace
                    +'.'+ name('purchaser').propertyUnit, 'ANYOF', relations],
                'OR',
                [name('purchaser').propertySpace, 'ANYOF', options.decedentId]
            ]
        ],
        type : DEF.RECORD_TYPE.propertySpace
    }, callback.bind(ctx), 'Database.loadSecondaryPropertySpaces('+
                            options.decedentId +')');
};

//Database.prototype.loadSelectOptions =
//function(id, callback, ctx) {
//  ctx = ctx || this;
//  this.link.searchResults({
//      columns : [DEF.FIELD.name],
//      filters : [],
//      type : 'customlist_mts_mc_cust_marital'
//  }, function(data) {
//      if (data.success) {
//
//      }
//      callback.call(ctx, data);
//  }, 'Database.loadSelectOptions('+ id +')');
//};

Database.prototype.loadTimeSlots = function(options, callback, ctx) {
    ctx = ctx || this;
    var functionName = 'Database.loadTimeSlots';
    var logMessage = functionName +'('+ options.start +', '+ options.end +')';
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.timeSlot,
        filters : [
            [name('timeSlotServiceReference'), 'anyof', '@NONE@'],
            'AND',
            [name('timeSlotDate'), 'onorafter', options.start],
            'AND',
            [name('timeSlotDate'), 'onorbefore', options.end],
            'AND',
            [name('timeSlotResource') +'.'+ name('resourcePark'), 'anyof',
                                                                options.park]
        ],
        type : DEF.RECORD_TYPE.timeSlot
    }, callback.bind(ctx), logMessage);
};


Database.prototype.loadTrust = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.trust,
        filters : ['internalid', 'ANYOF', id],
        type : 'estimate'
    }, callback.bind(ctx), 'Database.loadTrust('+ id +')');
};


Database.prototype.loadTrustItems = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : [
            { name: 'item' },
            { name: 'quantity' },
            { name: 'rate' },
            { name: 'amount' },
            { name: 'total' }
        ],
        filters : [
            { name: 'mainline', operator: 'is', values: false },
            { name: 'internalid', operator: 'is', values: id }
        ],
        type : 'estimate'
    }, callback.bind(ctx), 'Database.loadTrustItems('+ id +')');
}

//Pretty sure this needs to be a customer search for role as bene as opposed to trust search.....
/*
Database.prototype.loadTrusts = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.trust,
        filters : [name('designatedBeneficiary'), 'ANYOF', id],
        type : 'estimate'
    }, callback.bind(ctx), 'Database.loadTrusts('+ id +')');
};
*/

//working search on Trustor
Database.prototype.loadTrusts = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.trust,
        filters : [name('designatedBeneficiary'), 'ANYOF', id],
        type : 'estimate'
    }, callback.bind(ctx), 'Database.loadTrusts('+ id +')');
};


/*
//working on search to get Bene Role instead of Trustor
Database.prototype.loadTrusts = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResults({
        columns : DEF.SEARCH_COLUMNS.trust,
        filters : [
			[name('trustor'), 'ANYOF', id ],
			'AND', 
			['role', 'ANYOF', 'Beneficiary'],
			],
        type : 'estimate'
    }, callback.bind(ctx), 'Database.loadTrusts('+ id +')');
};

*/

Database.prototype.loadUnitSalesOrder = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : DEF.SEARCH_COLUMNS.unitSalesOrder,
        filters : [
            ['mainline', 'is', false],
            'AND',
            ['custcol_mts_property_unit', 'anyof', id]
        ],
        type : DEF.RECORD_TYPE.salesOrder
    }, callback.bind(ctx), 'Database.loadUnitSalesOrder('+ id +')');
};

Database.prototype.lookupClientIntermentSpace = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : [{
            id : 'intermentSpace',
            name : DEF.FIELD.intermentSpace.name.client
        }],
        filters : ['internalid', 'is', id],
        type : DEF.RECORD_TYPE.client
    }, function(data) {
        if (data.success) {
            log(data);
            callback.call(ctx, {
                spaceId : data.result.getValue('intermentSpace'),
                success : true
            });
        } else {
            callback.call(ctx, data);
        }
    }, 'Database.lookupClientIntermentSpace('+ id +')');
};

Database.prototype.lookupClientByIntermentSpace = function(id, callback, ctx) {
    ctx = ctx || this;
    this.link.searchResult({
        columns : [{
            id : 'intermentSpace',
            name : DEF.FIELD.intermentSpace.name.client
        }, {
            id: 'entityid',
            name: 'entityid'
        }, {
            id: 'firstname',
            name: 'firstname'
        }, {
            id: 'lastname',
            name: 'lastname'
        }, {
            id: 'internalid',
            name: 'internalid'
        }],
        filters : ['custentity_mts_inter_space', 'is', id],
        type : DEF.RECORD_TYPE.client
    }, function(data) {
        if (data.success) {
            log(data);
            callback.call(ctx, {
                clientId: data.result.getValue('internalid'),
                entity: data.result.getValue('entityid'),
                firstname: data.result.getValue('firstname'),
                lastname: data.result.getValue('lastname'),
                spaceId : data.result.getValue('intermentSpace'),
                success : true
            });
        } else {
            callback.call(ctx, data);
        }
    }, 'Database.lookupClientIntermentSpace('+ id +')');
};

Database.prototype.saveRecord = function(options, callback, ctx) {
    ctx = ctx || this;
    this.link.saveRecord(options, callback.bind(ctx),
        'Database.saveRecord('+ options.type +', '+ options.id +')');
};

Database.prototype.useTrust = function(options, callback, ctx) {
    ctx = ctx || this;
    this.link.sendRequest('useTrust', options, callback.bind(ctx),
        'Database.useTrust('+ options.trustId +')');
};

// MHI fix for issue 6
Database.prototype.checkForOwner = function(options, callback, ctx) {
  ctx = ctx || this;
  this.link.sendRequest('checkForOwner', options, callback.bind(ctx),
      'Database.checkForOwner('+ options.propertyUnit +')');
};
// fix for issue 6

Database.prototype.saveNavigationSection = function(navRecordId, decedentId, navSectionId, callback, ctx) {
    // debugger;

    var options = {
        id: !!navRecordId && navRecordId !== '' && navRecordId || 'new',
        type: 'customrecord_mts_saw_navigation',
        toSave: [
            {
                fieldName: 'custrecord_saw_mts_nav_entity',
                value: decedentId
            },
            {
                fieldName: 'custrecord_saw_mts_nav_section',
                value: navSectionId
            }
        ]
    };

    this.link.saveRecord(options, callback.bind(ctx),
        'Database.saveNavigationSection('+ options.type +', '+ options.id +')');
}