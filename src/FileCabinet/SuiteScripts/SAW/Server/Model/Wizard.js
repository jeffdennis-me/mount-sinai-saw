//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Client/Model/Wizard.js
//              Models the steplist and current sections.
//Developer: Sylvain Muise
//Date: August 22, 2019

function Wizard() {
    var firstSectionId = debug ? CNST.debugSection : CNST.firstSection;
    var firstSectionDef = DEF.SECTION_DEF[firstSectionId];
    this.nav = {
        firstScreenDef : firstSectionDef.screens[firstSectionDef.firstScreen],
        firstSectionDef : firstSectionDef,
        sections : [],

        // Added by Jeff Dennis for navigation tracking
        lastNavigationSection: document.querySelector('#param_lastNavigationSection').value,
        lastNavigationSectionRecordId: document.querySelector('#param_lastNavigationSectionId').value
    };
    this.table = {};
    this.flags = {};
    this.costs = {};
}

Wizard.prototype.addRelationship = function(id, callback) {
    this.db.loadClientRelationship(id, function(data) {
        if (data.success) {
            data.result.toSave = [];
            this.table.immediateFamily.push(data.result);
            var reciprocalId = data.result.getValue('reciprocalRelationship');
            this.db.loadReciprocalRelationship(reciprocalId, function(data) {
                if (data.success) {
                    data.record.toSave = [];
                    this.table.reciprocal.push(data.record);
                    callback();
                }
            }, this)
        }
    }, this);
};

Wizard.prototype.atFirstStep = function() {
    return ((this.nav.sectionIndex == 0) && (this.nav.screenIndex == 0));
};

Wizard.prototype.atLastStep = function() {
    return (this.nav.sectionId == CNST.lastSection);
};

Wizard.prototype.buildNewScreen = function() {
    var sectionDef = DEF.SECTION_DEF[this.nav.sectionId];
    var screen = this.buildScreen(sectionDef.screens[this.nav.screenId]);
    this.getCurrentSection().screens.splice(this.nav.screenIndex, 0, screen);
    return screen;
};

Wizard.prototype.buildNewSection = function() {
    var section = lib.objCopy(DEF.SECTION_DEF[this.nav.sectionId]);
    ['failedSaves',
     'pendingSaves',
     'screens']
    .forEach(function(key) {
        section[key] = [];
    });
    this.nav.sections.splice(this.nav.sectionIndex, 0, section);
    return section;
};

Wizard.prototype.buildNewSection2 = function(id, idx) {
    var theId = id || this.nav.sectionId;
    var theIdx = idx || this.nav.sectionIndex;
    if (theId == 'end') return;

    try {
        var section = lib.objCopy(DEF.SECTION_DEF[theId]);
        ['failedSaves',
        'pendingSaves',
        // 'screens'
        ]
        .forEach(function(key) {
            section[key] = [];
        });

        var screens = lib.objCopy(section.screens);
        section.screens = [];
        for (var screen in screens) {
            section.screens.push(this.buildScreen(screens[screen]))
        }

        // log('about to build new section', theIdx, section);
        this.nav.sections.splice(theIdx, 0, section);
        // log('after to build new section', this.nav.sections);

        if (!!section.nextSection) {
            if (this.nav.lastNavigationSection === '' || this.nav.lastNavigationSection === theId) {
                // log('built last section: '+theId);
                return;
            }
            this.buildNewSection2(section.nextSection, theIdx+1);
        }
    } catch (e) {
        log('cannot build section', theId, e);
    }

    // return section;
};

Wizard.prototype.buildScreen = function(screenDef) {
    // log('call: buildScreen', screenDef);
    var screen = lib.objCopy(screenDef);
    screen.fields = screen.fields.map(function(fieldDef) {
        if (fieldDef.double) {
            return lib.objMap(fieldDef, function(value) {
                if (typeof value == 'object') {
                    var field = lib.objCopy(value);
                    return (field.isInline) ? field : this.fillField(field);
                } else {
                    return value;
                }
            }, this);
        } else {
            var field = lib.objCopy(fieldDef);
            return (field.isInline) ? field : this.fillField(field);
        }
    }, this);
    if (screenDef.header) {
        screen.header = this.buildScreen(screenDef.header);
    }
    return screen;
};

Wizard.prototype.buildSubscreen = function(id) {
    var screen = this.getCurrentScreen();
    var subscreenDef = screen.subscreens[id];
    if (!!subscreenDef) {
        screen.subscreen = this.buildScreen(subscreenDef);
        this.render.drawSubscreen();
        this.execBeforeScreen(subscreenDef.id);
    }
};

Wizard.prototype.checkForDeed = function(callback, ctx) {
    ctx = ctx || this;
    log('current section id', this.getCurrentSection().id);
    var propertyScreenId = this.getCurrentSection().id;
    var spaceId = this.getFieldValue(propertyScreenId, 'intermentSpace');
//  log('spaceId');
//  log(spaceId);
//  if (this.table.propertySpace.length == 0) {
        this.loadPropertySpace(spaceId, function() {
            var unitId = this.getTableRow('propertySpace', spaceId)
                                .getValue('propertyUnit');
//          log('unitId');
//          log(unitId);
            this.table.deed = [];
            this.db.loadDeeds(unitId, function(data) {
                if (data.success) {
                    this.table.deed = data.results;
                    callback.call(ctx);
                }
            }, this);
        }, this)
//  }
};

Wizard.prototype.checkForProperty = function(callback, ctx) {
    ctx = ctx || this;
    this.table.propertySpace = [];
    this.db.loadPropertySpaces(this.getId('decedent'), function(data) {
        if (data.success) {
            this.table.propertySpace = data.results;
        }
        callback.call(ctx);
    }, this);
};

// MHI fix for issue #6
Wizard.prototype.checkForOwner = function(callback, ctx) {
  ctx = ctx || this;
  this.isOwned = true;
  var propertyId = this.getSubFieldValue('propertyTable');
  var property = this.getTableRow('propertySpace', propertyId);
  var propUnitId= property.getValue('propertyUnit');
  
  this.db.checkForOwner({
      decedentId : this.getId('decedent'),
      propertyUnit : propUnitId
  }, function(data) {
  
      if (data.success) {
        this.isOwned = data.isOwned;
      }
      callback.call(ctx);
  }, this);
};
// MHI

Wizard.prototype.checkForRelationshipType = function(clientId, type) {
    return this.table.relationshipTo.reduce(function(acc, relationship) {
        var primaryClientId = relationship.getValue('primaryClient');
        var relationshipType = relationship.getText('relationshipType');
        if ((primaryClientId == clientId) && (relationshipType == type))
            return true;
        else
            return acc;
    }, false);
};

Wizard.prototype.checkForSecondaryProperty = function(callback, ctx) {
    ctx = ctx || this;
    this.table.propertySpace = [];
    this.db.loadSecondaryPropertySpaces({
        decedentId : this.getId('decedent'),
        relations : this.table.relationshipTo
    }, function(data) {
        if (data.success) {
            this.table.propertySpace = data.results;
        }
        callback.call(ctx);
    }, this);
};

Wizard.prototype.checkForTrust = function(callback, ctx) {
    ctx = ctx || this;
    this.table.trust = [];
    this.db.loadTrusts(this.getId('decedent'), function(data) {
        if (data.success){
	//	alert('Decedent Id= '+this.getId('decedent'));
	//	alert('Search Results= '+JSON.stringify(data));
        	//trust search AKA Check For Trust
            this.table.trust = lib.uniq(data.results, function(trust) {
                return trust.id;
            });
            callback.call(ctx);
        }

    }, this);
};

Wizard.prototype.checkIsInformant = function(clientId) {
    return this.checkForRelationshipType(clientId, CNST.informantOf);
};

Wizard.prototype.checkIsNextOfKin = function(clientId) {
    return this.checkForRelationshipType(clientId, CNST.nextOfKinOf);
};

Wizard.prototype.checkIsPresent = function(clientId) {
    return this.checkForRelationshipType(clientId, CNST.atArrangements);
};

Wizard.prototype.checkServiceScheduling = function(callback) {
    this.db.checkServiceScheduling(this.getId('service'), callback);
};

Wizard.prototype.checkTimeSlots = function(callback) {
    // this.showLoadingSubscreen('Checking time slots...');
    this.db.checkTimeSlots(this.getId('service'), callback);
};

Wizard.prototype.checkTimeSlotTBD = function() {
    // JEFFTODO
    var service = this.entity.service
    var scheduleTBD = service.columns.find(function(row) {
        return row.id === 'scheduleToBeDetermined'
    });
    log('checkTimeSlotTBD',scheduleTBD)
    return !!scheduleTBD && scheduleTBD.value || null
};

Wizard.prototype.clearSearch = function() {
    this.table.search = [];
};

Wizard.prototype.clearTimeSlot = function() {
    var timeSlotId = this.flags.reservedTimeSlot;
    this.flags.reservedTimeSlot = undefined;
    var serviceReferenceField = lib.objCopy(DEF.FIELD.timeSlotServiceReference);
    var reservedField = lib.objCopy(DEF.FIELD.timeSlotReserved);
    var toSave = [
        {
            fieldId : serviceReferenceField.id,
            fieldName : serviceReferenceField.name,
            type : serviceReferenceField.type,
            value : ''
        },
        {
            fieldId : reservedField.id,
            fieldName : reservedField.name,
            type : reservedField.type,
            value : ''
        }
    ];
    var section = this.getSection('serviceScheduling');
    if (!section.pendingSaves.includes(timeSlotId) && timeSlotId !== undefined) {
        this.render.setColour('serviceScheduling', 'inform');
        section.pendingSaves.push(timeSlotId);
        var idIndex = section.pendingSaves.indexOf(timeSlotId);

        this.db.saveRecord({
            id : timeSlotId,
            toSave : toSave,
            type : DEF.RECORD_TYPE.timeSlot
        }, function(saveResult) {
            section.pendingSaves.splice(idIndex, 1);
            if (saveResult.success) {
                timeSlotId = saveResult.id;
                if (section.failedSaves.includes(timeSlotId)) {
                    this.render.setTitle('serviceScheduling', '');
                    idIndex = section.failedSaves.indexOf(timeSlotId);
                    section.failedSaves.splice(idIndex, 1);
                }
                this.render.setColour('serviceScheduling', 'success');
            } else {
                var error = saveResult.error;
                var errorMessage = error.name +': '+ error.message;
                this.render.setColour('serviceScheduling', 'error');
                this.render.setTitle('serviceScheduling', errorMessage);
                if (!section.failedSaves.includes(timeSlotId))
                    section.failedSaves.push(timeSlotId);
            }
        }, this);
    }
};

Wizard.prototype.scheduleToBeDetermined = function() {
    var timeSlotId = this.flags.reservedTimeSlot;
    this.flags.reservedTimeSlot = undefined;
    if (!!timeSlotId) {
        this.clearTimeSlot();
    }

    var section = this.getSection('serviceScheduling');
    // log(section)

    var serviceId = this.getId('service');
    // log('service ID='+serviceId);

    var serviceDateField = lib.objCopy(DEF.FIELD.serviceDate);
    var tbdField = lib.objCopy(DEF.FIELD.scheduleToBeDetermined);
    // log('tbdField=',tbdField);
    var toSave = [
        {
            fieldId : tbdField.id,
            fieldName : tbdField.name,
            type : tbdField.type,
            value : true
        }
    ];

    this.db.saveRecord({
        id : serviceId,
        toSave : toSave,
        type : DEF.RECORD_TYPE.service
    }, function(saveResult) {
        if (saveResult.success) {
            log('scheduleToBeDetermined: save success')
        } else {
            log('scheduleToBeDetermined: save failure')
        }
        // section.pendingSaves.splice(idIndex, 1);
        if (saveResult.success) {
            timeSlotId = saveResult.id;
            if (section.failedSaves.includes(timeSlotId)) {
                this.render.setTitle('serviceScheduling', '');
                idIndex = section.failedSaves.indexOf(timeSlotId);
                section.failedSaves.splice(idIndex, 1);
            }
            this.render.setColour('serviceScheduling', 'success');
        } else {
            var error = saveResult.error;
            var errorMessage = error.name +': '+ error.message;
            this.render.setColour('serviceScheduling', 'error');
            this.render.setTitle('serviceScheduling', errorMessage);
            if (!section.failedSaves.includes(timeSlotId))
                section.failedSaves.push(timeSlotId);
        }
        log('scheduleToBeDetermined Save Result', saveResult)
    }, this);
};

Wizard.prototype.createIntermentOrder = function(intermentSpace, sectionName) {
	var informant = this.getText('service', 'informant');
	
    var iphoney = this.getText('linkedClient', 'phone');
  
	if(iphoney){
		iphone=iphoney;
	}
	else{
		iphone='0000000';
	}
	
    this.loadPropertySpace(intermentSpace, function() {
        var propertyUnit = this.getTableRow('propertySpace', intermentSpace)
                                .getValue('propertyUnit');

        this.pushToSave('intermentOrder', 'decedent', this.getId('decedent'));
        this.pushToSave('intermentOrder', 'intermentDate',
                this.getValue('service', 'serviceDate'));
        this.pushToSave('intermentOrder', 'intermentOrderType',
                this.getListOptionValue('intermentOrderType', CNST.interment));
        this.pushToSave('intermentOrder', 'mortCase', this.getId('mortCase'));
        this.pushToSave('intermentOrder', 'permanentTemporary',
                this.getListOptionValue('permanentTemporary', CNST.permanent));
        this.pushToSave('intermentOrder', 'intermentOrderServiceRef',
                this.getId('service'));

        this.pushToSave('intermentOrder', 'otherContact', informant);
        this.pushToSave('intermentOrder', 'otherPhone', iphone);

        this.pushToSave('intermentOrder', 'intermentVault', this.getValue('service', 'vault'));
        this.pushToSave('intermentOrder', 'intermentTent', this.getValue('service', 'tent'));
        this.pushToSave('intermentOrder', 'intermentChairs', this.getValue('service', 'chairs'));

        this.db.loadUnitSalesOrder(propertyUnit, function(data) {
            if (data.success) {
                var result = data.result;
                this.pushToSave('intermentOrder', 'purchaser',
                                data.result.getValue('entity'));
                this.pushToSave('intermentOrder', 'propertyContract',
                                data.result.id);
            }
            this.saveEntity('intermentOrder', sectionName,
            function(saveResult) {
                if (saveResult.success) {
                    this.pushToSave('service', 'intermentOrder', saveResult.id);
                    this.saveEntity('service', sectionName);
                }
            }, function() {}, this);
        }, this);
    }, this);
};

Wizard.prototype.createNewRelationship = function(callback) {
    var screen = this.getCurrentScreen();
    var primaryClientField = lib.objCopy(DEF.FIELD.primaryClient);
    var toSave = [
        {
            fieldId : primaryClientField.id,
            fieldName : primaryClientField.name,
            type : primaryClientField.type,
            value : this.getId('decedent')
        }
    ];
    screen.fields.forEach(function(field) {
        switch(field.id) {
        case 'additionalInfo':
            toSave.push({
                fieldId : field.id,
                fieldName : field.name,
                type : field.type,
                value : field.value
            });
            break;
        case 'relationToPrimaryClient':
            var relationshipType = this.getRelationshipType(field.value);
            var typeField = lib.objCopy(DEF.FIELD.relationshipType);
            toSave.push({
                fieldId : typeField.id,
                fieldName : typeField.name,
                type : typeField.type,
                value : relationshipType
            });
            toSave.push({
                fieldId : field.id,
                fieldName : field.name,
                type : field.type,
                value : field.value
            });
        case 'linkedClient':
            toSave.push({
                fieldId : field.id,
                fieldName : field.name,
                type : field.type,
                value : field.value
            });
            break;
        case 'phone':
        case 'email':
            case 'dateOfBirth':
            if (field.value) {
                this.pushToSave('linkedClient', field.id, field.value);
            }
            break;
        default:
        }
    }, this);
    this.saveEntity('linkedClient', 'family', function() {
        this.saveNewRelationship('family', toSave, callback);
    }, null, this);
};

Wizard.prototype.createSalesContract = function(callback) {

    var decedentId = this.getId('decedent');
    var intermentOrderId = this.getId('intermentOrder');
    var toSaves = [
        ['customForm', CNST.salesContractCustomFormId],
        ['contractType', this.getListOptionValue('contractType',
                                                    CNST.mortuary)],
        ['purchaser', this.getValue('service', 'informant')],
        ['purchaserRelationship',
                    this.getValue('service', 'informantRelationToDecedent')],
//      ['entity', decedentId],
        ['park', this.getValue('service', 'park')],
        ['decedent', decedentId],
        ['mortCase', this.getId('mortCase')],
        ['service', this.getId('service').toString()]
    ];
 
    
   var docsTest = this.getValue('service', 'documentation');
   var cost = this.costs['documentation'];
    
    
    toSaves.forEach(function(toSave) {
        this.pushToSave('salesOrder', toSave[0], toSave[1]);
    }, this);


    // task 24
    var itemGroup = this.getFieldValue('goodsAndServices', 'itemGroup');
    var groupMembers = [];
    if (itemGroup) {
        itemGroupData = this.getGroupPackageData(itemGroup);
        if (!!itemGroupData) {
            for (var member of itemGroupData.members) {
                if (!member || !member.item || !member.item.id) continue
                groupMembers.push(member.item.id)
            }
        }
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : +itemGroup,
            quantity : 1
        });
    }

    var casketId = this.getValue('service', 'casket');
    if (casketId && !groupMembers.includes('casket')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : casketId,
            quantity : 1
        });
    }
    var flowersProvidedBy = this.getText('service', 'flowersProvidedBy');
    if (flowersProvidedBy == CNST.MSMP) {
        var description = this.getValue('service', 'flowersArrangementNumber')
                            +' '
                            + this.getValue('service', 'descriptionNotes');
        debugger
                            this.pushItemToSave({
            description : description,
            entityName : 'salesOrder',
            itemId : CNST.flowersProvidedByMSMP,
            quantity : 1,
            rate : this.costs.flowers /*this.getValue('service', 'flowersEstimate')*/
        });
    }
    var basicMortuaryServices = this.getValue('service', 'basicMortuaryServices')
    if (basicMortuaryServices && !groupMembers.includes('basicMortuaryServices')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.basicMortuaryServicesItemId,
            quantity : 1
        });
    }

    // JEFF - Cremation items
    var cremation = this.getValue('service', 'cremation')
    if (cremation && !groupMembers.includes('cremation')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.cremationItemId,
            quantity : 1,
            rate: this.getValue('service', 'cremationFee')
        });
    }
    var cremationReceptacle = this.getValue('service', 'cremationReceptacle')
    if (cremationReceptacle && !groupMembers.includes('cremationReceptacle')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.cremationReceptacleItemId,
            quantity : 1
        });
    }

    var transferOfRemains = this.getValue('service', 'transferOfRemains');
    if (transferOfRemains && !groupMembers.includes('transferOfRemains')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : +transferOfRemains,
            quantity : 1
        });
    }
    if (this.getValue('service', 'documentation') && !groupMembers.includes('documentation')) {
      var cost = this.costs['documentation'] ? parseFloat(this.costs['documentation']) :0 ;
    	if (parseFloat(cost) != 0){ // MHI task 35
	        debugger
            this.pushItemToSave({
	            entityName : 'salesOrder',
	            itemId : CNST.documentationItemId,
	            quantity : 1
	        });
    	}
    }
    var standardPreparation = this.getValue('service', 'standardPreparation')
    if (standardPreparation && !groupMembers.includes('standardPreparation')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.standardPreparationItemId,
            quantity : 1
        });
    }
    var staff = this.getValue('service', 'staff');
    if (staff && !groupMembers.includes('staff')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : +staff,
            quantity : 1
        });
    }
    var hearse = this.getValue('service', 'hearse')
    if (hearse && !groupMembers.includes('hearse')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.hearseItemId,
            quantity : 1
        });
    }
    var tahara = this.getValue('service', 'tahara')
    if (this.costs.tahara > 0 && !groupMembers.includes('tahara')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.taharaItemId,
            quantity : 1
        });
    }
    var shmira = this.getValue('service', 'shmira')
    if (this.costs.shmira > 0 && !groupMembers.includes('shmira')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.shmiraItemId,
            quantity : this.getValue('service', 'shmiraHours')
        });
    }
    var honorariumToBeConveyedBy = this.getText('service', 'honorariumToBeConveyedBy')
    if (honorariumToBeConveyedBy == /*CNST.family*/CNST.MSMP) { // change condition as per issue #6
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.honorariumItemId,
            quantity : 1
        });
    }
    var tachrichimCotton = this.getValue('service', 'tachrichimCotton')
    if ( this.costs.tachrichimCotton > 0 && !groupMembers.includes('tachrichimCotton')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.tachrichimCottonItemId,
            quantity : 1
        });
    }
    var tachrichimLinen = this.getValue('service', 'tachrichimLinen')
    if (this.costs.tachrichimLinen > 0 && !groupMembers.includes('tachrichimLinen')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.tachrichimLinenItemId,
            quantity : 1
        });
    }
    var tallit = this.getValue('service', 'tallit')
    if (this.costs.tallit > 0 && !groupMembers.includes('tallit')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.tallitItemId,
            quantity : 1
        });
    }
    var certifiedCopiesAmount = this.getValue('service', 'certifiedCopiesAmount');
    if (certifiedCopiesAmount && !groupMembers.includes('certifiedCopiesAmount')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.certifiedCopiesItemId,
            quantity : certifiedCopiesAmount,
            rate : this.getValue('service', 'certifiedCopiesCost')
        });
    }

    var laTimes = this.getValue('service', 'laTimesNotice');
    var jewishJournal = this.getValue('service', 'jewishJournalNotice');
    if (laTimes || jewishJournal) {
        var qty = 0;
        var rate = 0;
        var desc = '';
        if (laTimes && !groupMembers.includes('laTimesNotice')) {
            qty++;
            rate += this.getValue('service', 'laTimesEstimatedCharges');
            desc = 'LA Times';
        }
        if (jewishJournal && !groupMembers.includes('jewishJournalNotice')) {
            qty++;
            rate += this.getValue('service', 'jewishJournalEstimatedCharges');
            desc = 'Jewish Journal';
        }
        debugger
        this.pushItemToSave({
            description : desc,
            entityName : 'salesOrder',
            itemId : CNST.courtesyObituaryItemId,
            quantity : qty,
            rate : rate
        });
    }

    var vault = this.getValue('service', 'vault')
    if (vault && !groupMembers.includes('vault')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.vaultItemId,
            quantity : 1,
            rate : this.getValue('service', 'vaultAmount')
        });
    }

    var openClose = this.getValue('service', 'openingClosing');
    if (openClose && !groupMembers.includes('openingClosing')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : openClose,
            quantity : 1,
            rate : this.getValue('service', 'openCloseAmount')
        });
    }

    var webcast = this.getText('service', 'websiteWebcast')
    if (!groupMembers.includes('websiteWebcast')) {
        debugger
        if (webcast == CNST.yes && webcast == 'Chapel') {
            this.pushItemToSave({
                entityName : 'salesOrder',
                itemId : CNST.webcastItemId,
                quantity : 1
            });
        } else if (webcast == 'Graveside') {
            this.pushItemToSave({
                entityName : 'salesOrder',
                itemId : CNST.webcastItemGravesideId,
                quantity : 1
            });
        } else if (webcast == 'Both') {
            this.pushItemToSave({
                entityName : 'salesOrder',
                itemId : CNST.webcastItemBothId,
                quantity : 1
            });
        }
    }

    var mortuary = this.getText('service', 'mortuary')
    if (mortuary == CNST.outside && !groupMembers.includes('mortuary')) {
        debugger
        this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.outsideItemId,
            quantity : 1
        });
    }

    var serviceDate = this.getValue('service', 'serviceDate');
    if (typeof serviceDate == 'string')
        serviceDate = new Date(serviceDate);
    var serviceMonth = serviceDate.getMonth();
    var serviceTime = this.getValue('service', 'serviceTime');
    var serviceHours = (new Date(serviceTime)).getHours();

    if (serviceMonth >= 3
            && serviceMonth <= 9
            && serviceHours >= 16) {
        debugger
                this.pushItemToSave({
            entityName : 'salesOrder',
            itemId : CNST.lateServiceFeeItemId,
            quantity : 1
        });
    }

    this.saveEntity('salesOrder', 'wrapUp', null, callback);
};

Wizard.prototype.createSpouseRelationship = function(spouseId, callback) {
    var relationship = this.listOptions.relationship.reduce(function(acc, rel) {
        return rel.text == 'Spouse' ? rel : acc;
    }, null);
    var primaryClientField = lib.objCopy(DEF.FIELD.primaryClient);
    var typeField = lib.objCopy(DEF.FIELD.relationshipType);
    var linkedClientField = lib.objCopy(DEF.FIELD.linkedClient);
    var relationField = lib.objCopy(DEF.FIELD.relationToPrimaryClient);
    var toSave = [
        {
            fieldId : primaryClientField.id,
            fieldName : primaryClientField.name,
            type : primaryClientField.type,
            value : this.getId('decedent')
        },
        {
            fieldId : typeField.id,
            fieldName : typeField.name,
            type : typeField.type,
            value : relationship.type
        },
        {
            fieldId : linkedClientField.id,
            fieldName : linkedClientField.name,
            type : linkedClientField.type,
            value : spouseId
        },
        {
            fieldId : relationField.id,
            fieldName : relationField.name,
            type : relationField.type,
            value : relationship.value
        }
    ];
    this.saveNewRelationship('decedent', toSave, callback);
};

Wizard.prototype.deleteRelationship = function(relationshipId, callback) {
    callback = callback || function() {};
    var relationship = this.getTableRow('immediateFamily', relationshipId);
    var reciprocalId = relationship.getValue('reciprocalRelationship');
    this.db.deleteRelationship(relationshipId, function() {
        this.db.deleteRelationship(reciprocalId, callback);
    }, this);
};

Wizard.prototype.eSign = function() {
    var eSignUrl = lib.getParam('eSignUrl');
    var serviceId = this.getId('service');
    eSignUrl += '&recordtype='+ DEF.RECORD_TYPE.service
                +'&recordid='+ serviceId
                +'&creProfileId=461'
                +'&creRecordId='+ serviceId
                +'&senderSigns=T';
    window.open(eSignUrl, '_blank');
};

Wizard.prototype.execAfterScreen = function(screen, callback) {
    // Added by Jeff
    if (screen.id == 'vitals1') {
        this.handler.afterScreen.vitals1(function() {
            log(this);
            this.nav.screenId = screen.nextScreen;
            this.saveEntities(this.nav.sectionId);
            callback();
        }.bind(this));
    } 
    
    else if (screen.id == 'vitals3') {
        this.handler.afterScreen.vitals3(function() {
            log(this);
            this.nav.screenId = screen.nextScreen;
            this.saveEntities(this.nav.sectionId);
            callback();
        }.bind(this));
    } else {
        if (this.handler.afterScreen[screen.id])
            this.nav.screenId = this.handler.afterScreen[screen.id]()
                                || screen.nextScreen;
        else
            this.nav.screenId = screen.nextScreen;

        if (this.nav.sectionId == 'decedent')
            this.saveEntities(this.nav.sectionId);
        callback();
    }
};

Wizard.prototype.execAfterSection = function(section) {
    if (this.handler.afterSection[section.id]) {
        this.nav.sectionId = this.handler.afterSection[section.id](section)
                                || section.nextSection;
    } else {
        this.nav.sectionId = section.nextSection;
        if (section.id != 'decedent')
            this.saveEntities(section.id);
    }
};

Wizard.prototype.execBeforeScreen = function(id) {
    if (this.handler.beforeScreen[id])
        this.handler.beforeScreen[id]();

    var screen = this.getScreen(id);
//  log(screen);
    if (screen) {
        screen.fields.forEach(function(field) {
            if (this.render.handler.changeField[field.id])
                this.render.handler.changeField[field.id]();
        }, this);
    }
};

Wizard.prototype.execBeforeSection = function(id) {
    if (this.handler.beforeSection[id])
        this.handler.beforeSection[id]();
};

Wizard.prototype.fillField = function(field) {
//  log(field.id);
    lib.objForEach(DEF.FIELD[field.id], function(value, key) {
        if (!field[key])
            field[key] = value;
    });

    if (field.source) {
        field.text = field.text
                        || this.getText(field.source, field.id);
        field.value = field.value
                        || this.getValue(field.source, field.id);
    }

    if (this.prices[field.id])
        field.label += this.prices[field.id];

    if (!field.text)
        field.text = '';
    if (!field.value)
        field.value = '';

    return field;
};

Wizard.prototype.getCurrentField = function(id) {
    return this.getField(this.nav.screenId, id);
};

Wizard.prototype.getCurrentFieldText = function(id) {
    var field = this.getCurrentField(id);
    if (field.text == '' && field.textIfEmpty)
        return field.textIfEmpty;
    else
        return field.text;
}

Wizard.prototype.getCurrentFieldValue = function(id) {
    return this.getFieldValue(this.nav.screenId, id);
};

Wizard.prototype.getCurrentScreen = function() {
    return this.getCurrentSection().screens[this.nav.screenIndex];
};

Wizard.prototype.getCurrentSection = function() {
    // log('getCurrentSection', this.nav.sections[this.nav.sectionIndex]);
    return this.nav.sections[this.nav.sectionIndex];
};

Wizard.prototype.getHeader = function() {
    return this.getCurrentScreen().header;
};

Wizard.prototype.getHeaderField = function(id) {
    return this.getHeader().fields.reduce(function(acc, field) {
        if (field.double) {
            if (field.left.id == id)
                return field.left;
            else if (field.right.id == id)
                return field.right;
            else
                return acc;
        } else {
            return field.id == id ? field : acc;
        }
    }, null);
};

Wizard.prototype.getHeaderFieldText = function(id) {
    return this.getHeaderField(id).text;
};

Wizard.prototype.getHeaderFieldValue = function(id) {
    return this.getHeaderField(id).value;
};

Wizard.prototype.getField = function(screenId, fieldId) {
    var screen = this.getScreen(screenId);
    if (screen) {
        return screen.fields.reduce(function(acc, field) {
            if (field.double) {
                if (field.left.id == fieldId)
                    return field.left;
                else if (field.right.id == fieldId)
                    return field.right;
                else
                    return acc;
            } else {
                return field.id == fieldId ? field : acc;
            }
        }, null);
    }
};

Wizard.prototype.getFieldText = function(screenId, fieldId) {
    var screen = this.getScreen(screenId);
    if (screen) {
        return screen.fields.reduce(function(acc, field) {
            return field.id == fieldId ? field.text : acc;
        }, '');
    } else {
        return '';
    }
};

Wizard.prototype.getFieldValue = function(screenId, fieldId) {
    var screen = this.getScreen(screenId);
    if (screen) {
        return screen.fields.reduce(function(acc, field) {
            return field.id == fieldId ? field.value : acc;
        }, '');
    } else {
        return '';
    }
};

Wizard.prototype.getId = function(entity) {
    return this.entity[entity].id;
};

Wizard.prototype.getListOptionText = function(listId, value) {
    return this.listOptions[listId].reduce(function(acc, option) {
        return option.value == value ? option.text : acc;
    }, '');
};

Wizard.prototype.getGroupPackageData = function(groupId) {
    return this.groups[groupId];
}

Wizard.prototype.getListOptionValue = function(listId, text) {
    return this.listOptions[listId].reduce(function(acc, option) {
        return option.text == text ? option.value : acc;
    }, '');
};

Wizard.prototype.getPrice = function(id) {
    return lib.extractDollars(this.prices[id]);
};

Wizard.prototype.getReciprocalRelationshipType = function(relationshipType) {
    return this.table.relationshipType.reduce(function(acc, type) {
        return type.id == relationshipType ?
                    type.getValue('reciprocalRelationshipType') :
                        acc;
    }, '');
};

Wizard.prototype.getRelationshipType = function(relationshipId) {
    return this.listOptions.relationship.reduce(function(acc, relationship) {
        return relationship.value == relationshipId ? relationship.type : acc;
    }, '');
};

Wizard.prototype.getScreen = function(id) {
    return this.nav.sections.reduce(function(acc, section) {
        return section.screens.reduce(function(acc, screen) {
            return screen.id == id ? screen : acc;
        }, acc);
    }, null);
};

Wizard.prototype.getScreenIndex = function(id) {
    return this.nav.sections.reduce(function(acc, section) {
        return section.screens.reduce(function(acc, screen, i) {
            return screen.id == id ? i : acc;
        }, acc);
    }, -1);
};

Wizard.prototype.getSection = function(id) {
    return this.nav.sections.reduce(function(acc, section) {
        return section.id == id ? section : acc;
    }, null);
};

Wizard.prototype.getSectionIndex = function(id) {
    return this.nav.sections.reduce(function(acc, section, i) {
        return section.id == id ? i : acc;
    }, -1);
};

Wizard.prototype.getSpouseRelationship = function() {
    return this.table.immediateFamily.reduce(function(acc, rel) {
        if (rel.getText('relationshipType') == CNST.spouseOf)
            return rel;
        else
            return acc;
    }, null);
};

Wizard.prototype.getSubField = function(id) {
    return this.getSubscreen().fields.reduce(function(acc, field) {
        return field.id == id ? field : acc;
    }, null);
};

Wizard.prototype.getSubFieldText = function(id) {
    return this.getSubField(id).text;
};

Wizard.prototype.getSubFieldValue = function(id) {
    try {
        return this.getSubField(id).value;
    } catch (e) {
        return null
    }
};

Wizard.prototype.getSubscreen = function() {
    return this.getCurrentScreen().subscreen;
};

Wizard.prototype.getTableRow = function(tableId, rowId) {
    return this.table[tableId].reduce(function(acc, row) {
        return (row.id == rowId ? row : acc);
    }, null);
};

Wizard.prototype.getTableRowByName = function(tableId, name) {
    return this.table[tableId].reduce(function(acc, row) {
        return (row.getValue('name') == name ? row : acc);
    }, null);
};

Wizard.prototype.getText = function(entity, id) {
    return this.entity[entity].getText(id);
};

Wizard.prototype.getValue = function(entity, id) {
//  log(this.entity[entity]);
    return this.entity[entity].getValue(id);
};

Wizard.prototype.hideField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('wizard hiding', id);
        var field = this.getCurrentField(id);
        field.hidden = true;
        field.mandatory = false;
        if (field.type == 'number')
            field.value = 0;
    }, this);
    this.render.hideField(ids);
};

Wizard.prototype.hideHeaderField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('wizard hiding', id);
        var field = this.getHeaderField(id);
        field.hidden = true;
        field.mandatory = false;
        if (field.type == 'number')
            field.value = 0;
    }, this);
    this.render.hideHeaderField(ids);
};

Wizard.prototype.hideSubField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('wizard hiding', id);
        var field = this.getSubField(id);
        field.hidden = true;
        field.mandatory = false;
        if (field.type == 'number')
            field.value = 0;
    }, this);
    this.render.hideSubField(ids);
};

Wizard.prototype.initDate = function(field) {
    if (field.type == 'date' && field.value != '') {
//      field.value = new Date(field.value);
//      field.text = field.value.toISOString().slice(0, 10);
        field.value = field.value.slice(0, 10);
    }
    return field;
};

Wizard.prototype.initEntities = function() {
    this.entity = lib.objMap(DEF.ENTITY, function(columns, id) {
        var param = lib.getParam(id);
        if (param) {
            if (param == '{}') {
                return {};
            } else {
                var entity = lib.dataToResult(param);
                var initFunctions = lib.compose([this.initDate,
                                                 this.initTime,
                                                 [this.fillField, this]
                                                ]);
                entity.columns.forEach(initFunctions);
                entity.itemsToSave = [];
                entity.toSave = [];
                return entity;
            }
        } else {
            columns.forEach(this.fillField.bind(this));
            return lib.dataToResult({
                columns : columns,
                id : 'new',
                itemsToSave : [],
                toSave : [],
                type : DEF.RECORD_TYPE[id]
            });
        }
    }, this);

};

Wizard.prototype.initListOptions = function() {
//  var listOptions = lib.getParam('listOptions');
//  this.listOptions = lib.objMap(JSON.parse(listOptions), function(arr, id) {
//      if (id == 'casket' || id == 'staff') {
//          return arr;
//      } else {
//          return arr.sort(function(a, b) {
//              var x = Number(a.value);
//              var y = Number(b.value);
//              return x - y;
//          });
//      }
//  });
//  this.listOptions.serviceLocationHH =
//      this.listOptions.serviceLocation.filter(function(option) {
//          return option.text.slice(0, 2) == 'HH';
//      });
//  this.listOptions.serviceLocationSV =
//      this.listOptions.serviceLocation.filter(function(option) {
//          return option.text.slice(0, 2) == 'SV';
//      });
    this.listOptions = listOptions;
    this.listOptions.scheduleMonths =
        Array.from(Array(12).keys()).map(function(n) {
            return {
                text : n + 1,
                value : n +1
            };
        });
};

Wizard.prototype.initPrices = function() {
    this.prices = JSON.parse(lib.getParam('prices'));
    this.groups = JSON.parse(lib.getParam('itemGroups'))
};

Wizard.prototype.initTables = function(callback) {
    this.table = lib.objMap(DEF.SEARCH_COLUMNS, function(columns, id) {
        var param = lib.getParam(id);
        if (param)
            var arr = lib.dataToResult(param);
        else
            var arr = [];

        if (id == 'immediateFamily' || id == 'reciprocal') {
            arr = arr.map(function(result) {
                if (result == null || result == undefined) {
                    return
                }
                result.toSave = [];
                return result;
            })
        }

        return arr;
    });
};

Wizard.prototype.initTime = function(field) {
    if (field.type == 'time' && field.value != '') {
        var time = lib.extractTime(field.text);
        field.value = lib.zeroPad(time.hour) +':'+ lib.zeroPad(time.minute);
    }
    return field;
};

Wizard.prototype.initWizard = function() {
    this.db = new Database();
    this.user = new User(this.db);
    this.initListOptions();
    this.initPrices();
    this.initEntities();
    this.initTables();
    this.moveToFirstScreen();
};

Wizard.prototype.isFieldVisible = function(id) {
    return !this.getCurrentField(id).hidden;
};

Wizard.prototype.loadAltName = function(callback) {
    this.db.loadAltName(this.entity.linkedClient.id, function(data) {
        if (data.success) {
            callback(data.result.getValue('altName'));
        }
    });
};

Wizard.prototype.loadAmountDue = function(unitId, callback) {
    this.db.loadInvoice(unitId, function(data) {
        if (data.success)
            callback(data.record.getText('amountRemainingTotalBox') || 'N/A');
        else
            callback('N/A');
    });
};

Wizard.prototype.loadAutoIncludeItems = function(callback) {
    this.db.loadAutoIncludeItems(function(data) {
        if (data.success)
            callback(data.results);
    });
};

Wizard.prototype.loadClientIntermentSpace = function(id, callback) {
    this.db.lookupClientIntermentSpace(id, function(data) {
        if (data.success) {
            this.db.loadClientIntermentSpace(data.spaceId, function(data) {
                if (data.success)
                    callback(data.result);
            });
        }
    }, this);
};

Wizard.prototype.loadIntermentSpaceClient = function(id, callback) {
    this.db.lookupClientByIntermentSpace(id, function(data) {
        if (data.success) {
            callback(data);
        }
    }, this);
};

Wizard.prototype.loadEntity = function(entityName, callback, ctx) {
    ctx = ctx || this;
    callback = callback || function() {};
    var entity = this.entity[entityName];
    var initFunctions = lib.compose([this.initDate, this.initTime]);
    this.db.loadEntity({
        columns : entity.columns,
        id : entity.id,
        type : DEF.RECORD_TYPE[entityName]
    }, function(data) {
        if (data.success) {
            this.entity[entityName] = data.record;
            this.entity[entityName].columns.forEach(initFunctions);
            this.entity[entityName].itemsToSave = [];
            this.entity[entityName].toSave = [];
        }
        callback.call(ctx);
    }, this);
};

Wizard.prototype.loadImmediateFamily = function() {
    this.table.immediateFamily = [];
    var nextOfKinValue = this.table.relationshipType.reduce(function(acc, rel) {
        return rel.columns.reduce(function(acc, col) {
            return (col.id == 'name' && col.value == 'Next of Kin of') ?
                    rel.id :
                    acc;
        }, acc);
    }, '');
    this.db.loadImmediateFamily(this.getId('decedent'), nextOfKinValue,
    function(data) {
        if (data.success) {
            var seen = [];
            data.results.forEach(function(result) {
                var linkedClientId = result.getValue('linkedClient');
                if (!seen.includes(linkedClientId)) {
                    seen.push(linkedClientId);
                    this.table.immediateFamily.push(result);
                }
            }, this);
        }
        this.table.immediateFamily.forEach(function(result) {
            var linkedClientId = result.getValue('linkedClient');

            result.columns.push(lib.objCopy(DEF.FIELD.isPresentAtArrangement));
            result.setText('isPresentAtArrangement', '');
            result.setValue('isPresentAtArrangement',
                            this.checkIsPresent(linkedClientId));

            result.columns.push(lib.objCopy(DEF.FIELD.isInformant));
            result.setText('isInformant', '');
            result.setValue('isInformant',
                            this.checkIsInformant(linkedClientId));

            result.columns.push(lib.objCopy(DEF.FIELD.isNextOfKin));
            result.setText('isNextOfKin', '');
            result.setValue('isNextOfKin',
                            this.checkIsNextOfKin(linkedClientId));
        }, this);
        this.render.redrawHeaderField('immediateFamily');
    }, this)
};

Wizard.prototype.loadLinkedClientResult = function(callback) {
    this.db.loadLinkedClientResult(this.entity.linkedClient.id, function(data) {
        if (data.success)
            callback(data.result);
    });
};

Wizard.prototype.loadMortCase = function(callback) {
    var mortCaseId = this.getValue('decedent', 'mortCase');
    this.db.loadMortCase(mortCaseId, function(data) {
        if (data.success)
            this.entity.mortCase = data.result;
        callback();
    }, this);
};

Wizard.prototype.loadNearServices = function(timeSlotId) {
    this.render.showLoadingNearServices(timeSlotId);

    var timeSlot = this.getTableRow('timeSlot', timeSlotId);
    var date = timeSlot.getValue('timeSlotDate');
    var park = this.getValue('service', 'park');
    var time = lib.extractTime(timeSlot.getValue('timeSlotStartTime'));
    var startHour = (time.hour - 2) % 24;
    var endHour = (time.hour + 2) % 24;
    var startTime = lib.formatTime(startHour +':'+ time.minute);
    var endTime = lib.formatTime(endHour +':'+ time.minute);

    this.db.loadNearServices({
        date : date,
        endTime : endTime,
        park : park,
        startTime : startTime
    }, function(data) {
        if (data.success) {
            this.render.showNearServices(timeSlotId, data.results);
        }
    }, this);
};

Wizard.prototype.loadPropertySpace = function(propertySpaceId, callback, ctx) {
    ctx = ctx || this;
    this.table.propertySpace = [];
    this.db.loadPropertySpace(propertySpaceId, function(data) {
        if (data.success) {
            this.table.propertySpace = [data.result];
        }
        callback.call(ctx);
    }, this);
};

Wizard.prototype.loadRelationshipTo = function(sectionId, callback, ctx) {
    ctx = ctx || this;
    callback = callback || function() {};
    this.render.setColour(sectionId, 'inform');
    this.table.relationshipTo = [];
    this.db.loadRelationshipTo(this.getId('decedent'), function(data) {
        if (data.success) {
            this.render.setColour(sectionId, 'success');
            this.table.relationshipTo = data.results;
        } else {
            this.render.setColour(sectionId, 'error');
        }
        callback.call(ctx);
    }, this);
};

Wizard.prototype.loadSearch = function(searchField, callback) {
    switch(searchField.filter) {
    case 'property':
        var keywords = searchField.value;
        var searchFunction = this.db.loadSearchProperty;
        break;
    case 'rabbi':
        CNST.rabbiClergyValue = this.getListOptionValue('clientAttributes',
                                                    CNST.rabbiClergyText);
        var keywords = searchField.value;
        var searchFunction = this.db.loadSearchRabbi;
        break;
    case 'outsideCemetery':
        debugger
        // CNST.outsideCemeteryValue = this.getListOptionValue('clientAttributes',
        //                                             CNST.rabbiClergyText);
        var keywords = searchField.value;
        var searchFunction = this.db.loadSearchOutsideCemetery;
        break;
    case 'trust':
        var keywords = searchField.value;
        var searchFunction = this.db.loadSearchTrust;
        break;
    case 'earthOffPerson':
        console.log('earth off person search');
        var keywords = searchField.value;
        var searchFunction = this.db.loadSearchEarthOffPerson;
        break;
    default:
        var keywords = searchField.prefix +': '+ searchField.value;
        var searchFunction = this.db.loadSearch;
    }
    searchFunction.call(this.db, keywords, function(data) {
        if (data.success) {
            this.table.search = data.results;
            log('searchFunction call success', data.results);
        }
        else
            this.table.search = [];
        callback();
    }, this);
};

Wizard.prototype.loadSearchFamily = function(searchField, callback) {
    var keywords = searchField.value;
    var searchFunction = this.db.loadSearchFamily;

    searchFunction.call(this.db, keywords, function(data) {
        if (data.success) {
            this.table.searchFamily = data.results;
        }
        else
            this.table.search = [];
        callback();
    }, this);
};

Wizard.prototype.loadTimeSlots = function(startDate, endDate) {
    startDate = lib.formatDate(startDate);
    endDate = lib.formatDate(endDate);
    var loadingMessage = 'Loading time slots for '+ startDate;
    if (endDate != startDate)
        loadingMessage += ' to '+ endDate;
    this.showLoadingSubscreen(loadingMessage);
    function byDate(a, b) {
        var x = lib.extractDate(a.getValue('timeSlotDate'));
        var y = lib.extractDate(b.getValue('timeSlotDate'));
        return x.getTime() - y.getTime();
    }
    function byResource(a, b) {
        var x = a.getText('timeSlotResource');
        var y = b.getText('timeSlotResource');
        return x.localeCompare(y);
    }
    function byTime(a, b) {
        var x = lib.extractTime(a.getValue('timeSlotStartTime'));
        var y = lib.extractTime(b.getValue('timeSlotStartTime'));
        if (x.hour == y.hour)
            return x.minute - y.minute;
        else
            return x.hour - y.hour;
    }

    this.table.timeSlot = [];
    this.db.loadTimeSlots({
        end : endDate,
        park : this.getValue('service', 'park'),
        start : startDate
    }, function(data) {
        if (data.success) {
            this.table.timeSlot = data.results;
            this.table.timeSlot.sort(byTime);
            this.table.timeSlot.sort(byResource);
            this.table.timeSlot.sort(byDate);
            this.render.drawTimeSlotList();
        }
    }, this);
};

Wizard.prototype.loadTrust = function(trustId, callback) {
    this.table.trust = [];
    this.db.loadTrust(trustId, function(data) {
        if (data.success) {
            this.table.trust = [data.result];
        }
        callback();
    }, this);
};

Wizard.prototype.getTrustItems = function(trustId, callback) {
    this.db.loadTrustItems(trustId, function(data) {
        if (data.success) {
            data.items = {};
            for (var i=0; i<data.results.length; i++) {
                var result = data.results[i];
                var obj = {};
                var id = null;
                for (var ii=0; ii<result.columns.length; ii++) {
                    var column = result.columns[ii];
                    if (column.name === 'item') {
                        id = column.value;
                        obj['id'] = id;
                        obj[column.name] = column.text;
                    } else {
                        obj[column.name] = column.value;
                    }
                }
                if (!!id) {
                    data.items[id] = obj;
                }
            }
        }
        callback(data);
    }, this);
};

Wizard.prototype.makeAbsent = function(linkedClient) {
    var relationship = this.table.relationshipTo.reduce(function(acc, rel) {
        var primaryClientId = rel.getValue('primaryClient');
        var relationshipType = rel.getText('relationshipType');
        if (primaryClientId == linkedClient
                && relationshipType == CNST.atArrangements)
            return rel;
        else
            return acc;
    }, null);
    if (relationship) {
        var reciprocalId = relationship.getValue('reciprocalRelationship');
        this.render.setColour('family', 'inform');
        this.db.deleteRelationship(relationship.id, function() {
            this.db.deleteRelationship(reciprocalId, function() {
                this.loadRelationshipTo('family');
            }, this);
        }, this);
    }
};

Wizard.prototype.makeInformant = function(linkedClient) {
    var relationship = this.table.relationshipTo.reduce(function(acc, rel) {
        var primaryClientId = rel.getValue('primaryClient');
        var relationshipType = rel.getText('relationshipType');
        if (relationshipType == CNST.informant)
            return rel;
        else
            return acc;
    }, null);
    if (relationship) {
        var reciprocalId = relationship.getValue('reciprocalRelationship');
        this.render.setColour('family', 'inform');
        this.db.deleteRelationship(relationship.id, function() {
            this.db.deleteRelationship(reciprocalId, complete.bind(this));
        }, this);
    } else {
        complete.call(this);
    }
    function complete() {
        var relType = this.table.relationshipType.reduce(function(acc, type) {
            return type.getValue('name') == CNST.informantOf ? type : acc;
        }, null);
        var primaryClientField = lib.objCopy(DEF.FIELD.primaryClient);
        var typeField = lib.objCopy(DEF.FIELD.relationshipType);
        var linkedClientField = lib.objCopy(DEF.FIELD.linkedClient);
        var toSave = [
            {
                fieldId : primaryClientField.id,
                fieldName : primaryClientField.name,
                type : primaryClientField.type,
                value : this.getId('decedent')
            },
            {
                fieldId : typeField.id,
                fieldName : typeField.name,
                type : typeField.type,
                value : relType.id
            },
            {
                fieldId : linkedClientField.id,
                fieldName : linkedClientField.name,
                type : linkedClientField.type,
                value : linkedClient
            }
        ];
        this.saveNewRelationship('family', toSave, function() {
            this.loadRelationshipTo('family', function() {
                this.pushToSave('service', 'informant', linkedClient);
                var relationToDecedent = this.table.immediateFamily.reduce(
                function(acc, rel) {
                    return rel.getValue('linkedClient') == linkedClient ?
                            rel.getValue('relationToPrimaryClient') :
                            acc;
                }, '');
                this.pushToSave('service', 'informantRelationToDecedent',
                                            relationToDecedent);
                this.saveEntity('service', 'family');
            }, this);
        }, this);
    }
};

Wizard.prototype.makeNextOfKin = function(linkedClient) {
    var relationship = this.table.relationshipTo.reduce(function(acc, rel) {
        var primaryClientId = rel.getValue('primaryClient');
        var relationshipType = rel.getText('relationshipType');
        if (relationshipType == CNST.nextOfKin)
            return rel;
        else
            return acc;
    }, null);
    if (relationship) {
        var reciprocalId = relationship.getValue('reciprocalRelationship');
        this.render.setColour('family', 'inform');
        this.db.deleteRelationship(relationship.id, function() {
            this.db.deleteRelationship(reciprocalId, complete.bind(this));
        }, this);
    } else {
        complete.call(this);
    }
    function complete() {
        var relType = this.table.relationshipType.reduce(function(acc, type) {
            return type.getValue('name') == CNST.nextOfKinOf ? type : acc;
        }, null);
        var primaryClientField = lib.objCopy(DEF.FIELD.primaryClient);
        var typeField = lib.objCopy(DEF.FIELD.relationshipType);
        var linkedClientField = lib.objCopy(DEF.FIELD.linkedClient);
        var toSave = [
            {
                fieldId : primaryClientField.id,
                fieldName : primaryClientField.name,
                type : primaryClientField.type,
                value : this.getId('decedent')
            },
            {
                fieldId : typeField.id,
                fieldName : typeField.name,
                type : typeField.type,
                value : relType.id
            },
            {
                fieldId : linkedClientField.id,
                fieldName : linkedClientField.name,
                type : linkedClientField.type,
                value : linkedClient
            }
        ];
        this.saveNewRelationship('family', toSave, function() {
            this.loadRelationshipTo('family', function() {
                this.pushToSave('decedent', 'nextOfKin', linkedClient);
                var relationToDecedent = this.table.immediateFamily.reduce(
                function(acc, rel) {
                    return rel.getValue('linkedClient') == linkedClient ?
                            rel.getValue('relationToPrimaryClient') :
                            acc;
                }, '');
                this.pushToSave('decedent', 'nextOfKinRelation',
                                            relationToDecedent);
                this.saveEntity('decedent', 'family');
            }, this);
        }, this);
    }
};

Wizard.prototype.makePresent = function(linkedClient) {
    var relType = this.table.relationshipType.reduce(function(acc, type) {
        return type.getValue('name') == CNST.atArrangementsOf ? type : acc;
    }, null);
    var primaryClientField = lib.objCopy(DEF.FIELD.primaryClient);
    var typeField = lib.objCopy(DEF.FIELD.relationshipType);
    var linkedClientField = lib.objCopy(DEF.FIELD.linkedClient);
    var toSave = [
        {
            fieldId : primaryClientField.id,
            fieldName : primaryClientField.name,
            type : primaryClientField.type,
            value : this.getId('decedent')
        },
        {
            fieldId : typeField.id,
            fieldName : typeField.name,
            type : typeField.type,
            value : relType.id
        },
        {
            fieldId : linkedClientField.id,
            fieldName : linkedClientField.name,
            type : linkedClientField.type,
            value : linkedClient
        }
    ];
    this.saveNewRelationship('family', toSave, function() {
        this.loadRelationshipTo('family');
    }, this);
};

Wizard.prototype.moveToFirstScreen = function() {
    this.nav.screenIndex = 0;
    this.nav.screenId = this.nav.firstScreenDef.id;
    this.nav.sectionIndex = 0;
    this.nav.sectionId = this.nav.firstSectionDef.id;

    // Added by Jeff Dennis
    // this.buildNewSection();
    this.buildNewSection2();

    this.buildNewScreen();
    this.render.initPage();
    this.render.drawWizard();
    this.execBeforeSection(this.nav.sectionId);
    this.execBeforeScreen(this.nav.screenId);
};

Wizard.prototype.moveToNextScreen = function(nextScreen) {
    var oldScreen = this.getCurrentScreen();
//  log(oldScreen);
    oldScreen.fields.forEach(this.saveFieldToEntity, this);
    if (oldScreen.header)
        oldScreen.header.fields.forEach(this.saveFieldToEntity, this);

    if (nextScreen) {
        this.nav.screenId = nextScreen;
        complete.call(this);
    } else {
        this.execAfterScreen(oldScreen, complete.bind(this));
    }
//  log('Moving to '+ this.nav.screenId);

    function complete() {
        this.nav.screenIndex++;
        if (this.nav.screenId == 'nextSection') {
            var oldSection = this.getCurrentSection();
            if (oldSection.screens.length > this.nav.screenIndex)
                oldSection.screens.splice(this.nav.screenIndex);

//          this.execAfterSection(oldSection.id);
//
//          this.nav.sectionId = oldSection.nextSection;

            this.execAfterSection(oldSection);

            this.nav.sectionIndex++;
            var newSection = this.getSection(this.nav.sectionId)
                                || this.buildNewSection();

            this.nav.screenIndex = 0;
            this.nav.screenId = newSection.firstScreen;

            this.execBeforeSection(newSection.id);

            // save navigation - Jeff Dennis
            var self = this;
            this.db.saveNavigationSection(this.nav.lastNavigationSectionRecordId, this.entity.decedent.id, newSection.id, function(result) {
                log('wizard:saveNavigationSection result', result);
                if (result.success) {
                    self.nav.lastNavigationSectionRecordId = result.id;
                    self.nav.lastNavigationSection = newSection.id;
                }
            }, this);
        }

        var newScreen = this.getScreen(this.nav.screenId);
        if (newScreen) {
            var screens = this.getCurrentSection().screens;
            var newScreenIndex = screens.map(function(screen) {
                return screen.id;
            }).indexOf(newScreen.id);
            if (newScreenIndex != this.nav.screenIndex) {
                screens.splice(this.nav.screenIndex,
                                newScreenIndex - this.nav.screenIndex);
            }
        } else {
            var newScreen = this.buildNewScreen();
        }

        this.render.drawWizard();

        this.execBeforeScreen(newScreen.id);

    //  log(this);
    }
};

Wizard.prototype.moveToPrevScreen = function() {
    this.nav.screenIndex--;
    if (this.nav.screenIndex < 0) {
        this.nav.sectionIndex--;
        this.nav.sectionId = this.getCurrentSection().id;
        this.execBeforeSection(this.nav.sectionId);
        this.nav.screenIndex = this.getCurrentSection().screens.length - 1;
    }
    this.nav.screenId = this.getCurrentScreen().id;

    this.render.drawWizard();

    this.execBeforeScreen(this.nav.screenId);

//  log(this);
};

Wizard.prototype.moveToSection = function(id) {
    this.nav.sectionId = id;
    this.nav.sectionIndex = this.getSectionIndex(id);
    this.nav.screenId = this.getCurrentSection().firstScreen;
    this.nav.screenIndex = 0;
    this.render.drawWizard();
    this.execBeforeSection(this.nav.sectionId);
    this.execBeforeScreen(this.nav.screenId);
};

Wizard.prototype.pushItemToSave = function(options) {
    var entity = this.entity[options.entityName];
    entity.itemsToSave.push({
        description : options.description,
        id : options.itemId,
        quantity : options.quantity,
        rate : options.rate
    });
};

Wizard.prototype.pushToSave = function(entityName, fieldId, value) {
    // debugger;
    // var ent = this.entity[entityName];
    // log('pushToSave entity: '+entityName, ent);
    var field = this.entity[entityName].column(fieldId);
    // log('pushToSave field: '+fieldId, value, field);
    switch(field.type) {
    case 'checkbox':
        if (typeof value == 'string')
            value = (['true', 't'].includes(value.toLowerCase()));
        break;
    default:
    }
    if (![CNST.doesNotExist,
         CNST.notAvailable,
         CNST.toBeDecided,
         CNST.toBePurchased].includes(value)) {
        this.entity[entityName].toSave.push({
            fieldId : field.id,
            fieldName : field.name,
            sublist : field.sublist,
            type : field.type,
            value : value
        });
    }
    // log('pushToSave entity after:', this.entity[entityName]);
};

Wizard.prototype.redrawFamilyTable = function() {
    this.render.redrawHeaderField('immediateFamily');
    var informant = this.getValue('service', 'informant');
    if (informant) {
        var relationshipId = this.table.immediateFamily.reduce(
        function(acc, relationship) {
            return relationship.getValue('linkedClient') == informant ?
                    relationship.id :
                        acc;
        }, '');
        if (relationshipId) {
            var fieldId = 'immediateFamily_'
                            + relationshipId
                            +'_isInformant';
            this.render.checkCheckbox(fieldId, true);
        }
    }

    var nextOfKin = this.getValue('decedent', 'nextOfKin');
    if (nextOfKin) {
        var relationshipId = this.table.immediateFamily.reduce(
        function(acc, relationship) {
            return relationship.getValue('linkedClient') == nextOfKin ?
                    relationship.id :
                        acc;
        }, '');
        if (relationshipId) {
            var fieldId = 'immediateFamily_'
                            + relationshipId
                            +'_isNextOfKin';
            this.render.checkCheckbox(fieldId, true);
        }
    }

    this.table.immediateFamily.forEach(function(rel) {
        var linkedClient = rel.getValue('linkedClient');
        var isPresent = this.checkIsPresent(linkedClient);
        var fieldId = 'immediateFamily_'+ rel.id +'_isPresentAtArrangement';
        this.render.checkCheckbox(fieldId, this.checkIsPresent(linkedClient));
    }, this);
};

Wizard.prototype.reloadRelationship = function(id, callback) {
    log(id, typeof id);
    this.db.loadClientRelationship(id, function(data) {
        if (data.success) {
            data.result.toSave = [];
            var rowIndex = this.table.immediateFamily.map(function(rel) {
                log(rel.id, typeof rel.id)
                return rel.id;
            }).indexOf(id);
            this.table.immediateFamily.splice(rowIndex, 1, data.result);
            callback(data.result);
        }
    }, this);
};

Wizard.prototype.removeRelationship = function(id) {
    var relationshipTable = this.table.immediateFamily;
    var reciprocalTable = this.table.reciprocal;
    var index = relationshipTable.map(function(relation) {
        return relation.id;
    }).indexOf(id);
    relationshipTable.splice(index, 1);
    reciprocalTable.splice(index, 1);
};

Wizard.prototype.removeSubscreen = function() {
    var screen = this.getCurrentScreen();
    screen.subscreen = undefined;
    this.render.clearSubscreen();
};

Wizard.prototype.replaceScreen = function(nextScreen) {
    this.nav.screenId = nextScreen;
    var newScreen = this.getScreen(this.nav.screenId);
    if (newScreen) {
        var screens = this.getCurrentSection().screens;
        var newScreenIndex = screens.map(function(screen) {
            return screen.id;
        }).indexOf(newScreen.id);
        if (newScreenIndex != this.nav.screenIndex) {
            screens.splice(this.nav.screenIndex,
                            newScreenIndex - this.nav.screenIndex);
        }
    } else {
        var newScreen = this.buildNewScreen();
    }

    this.render.drawWizard();

    this.execBeforeScreen(newScreen.id);
};

Wizard.prototype.resetField = function(id, options) {
    var field = this.getCurrentField(id);
    lib.objForEach(options, function(value, key) {
        field[key] = value;
    });
    this.render.redrawField(field);
};

Wizard.prototype.runCRE = function() {
    this.showLoadingSubscreen('Running CRE profiles...');
    var query = '&profileid=461&id='+ this.getId('service');
    window.open(lib.getParam('creSuitelet') + query, '_blank');
}

Wizard.prototype.runMap = function() {
   this.showLoadingSubscreen('Loading Map...');
   var creLinkUrl = lib.getParam('creLinkUrl');
   var mapUrl = lib.getParam('mapUrl');
   var intermentOrderId = Number(this.getValue('service', 'intermentOrder'));
   var salesOrderId = this.getId('salesOrder');
   var serviceId = this.getId('service');

   var profiles = [];
   function pushProfile(profileId) {
       switch(profileId) {
       case 91:
           var recordId = intermentOrderId;
           break;
       case 85:
       case 93:
           var recordId = salesOrderId;
           break;
       default:
           var recordId = serviceId;
       }
       profiles.push({
           profileId : profileId,
           recordId : recordId
       });
   }

//  pushProfile(328);
   pushProfile(113);
   pushProfile(110);
   if (!this.getValue('service', 'postNeed'))
       pushProfile(79);
   pushProfile(331);
   pushProfile(334);
   if (this.getValue('service', 'outsideCasket'))
       pushProfile(123);
   if (this.getText('service', 'intermentType') == CNST.cremation)
       pushProfile(76);
   if (this.getValue('service', 'intermentOrder')) {
       pushProfile(91);
       var intermentSpaceId = this.getValue('service', 'intermentSpace');
       this.db.getMapAndLot(intermentSpaceId, function(data) {
           if (data.success) {
               var map = data.result.getText('propertyMap');
               var lot = data.result.getText('propertyUnit');
               lot = lot.replace(/-/g, '_');
               mapUrl += '&page=browse&map='+ map +'&lot=' +lot;
               window.open(mapUrl, '_blank');
           }
       });
//      var intermentSpace = this.getText('service', 'intermentSpace');
//      var arr = intermentSpace.split('-');
//      var lot = arr.join('_');
//      arr.splice(3);
//      var map = arr.join('-');
//      window.open(mapUrl +'&page=browse&map='+ map +'&lot='+ lot, '_blank');
   }
   if (this.flags.buyingProperty)
       pushProfile(85);
   pushProfile(93);
   pushProfile(430);

   var postStart = Date.now();
   this.render.setColour('wrapUp', 'inform');
   log('Running CRE profiles', profiles);

   profiles.forEach(function(profile) {

       fetch(creLinkUrl, {
           body : JSON.stringify(profile),
           headers : {
               'Accept' : 'application/json, text/plain, */*',
               'Content-Type' : 'application/json'
           },
           method : 'post'
       })
       .then(function(response) {
           return response.text();
       })
       .then(function(body) {
           var firstChar = body[0];
           var lastChar = body[body.length - 1];
           if (['{', '['].includes(firstChar)) {
               while (!['}', ']'].includes(lastChar)) {
                   body = body.substring(0, body.lastIndexOf('<!'));
                   lastChar = body[body.length - 1];
               }
           }
           body = JSON.parse(body);
           profile.fileName = body.fileName;
           profile.url = body.url;
           complete.call(this);
       }.bind(this))

   }, this);

   async function complete() {
       if (profiles.every(function(profile) {
           return (profile.url);
       })) {

           var response = await fetch(profiles[0].url);
           var buffer = await response.arrayBuffer();
           var pdfDoc = await PDFLib.PDFDocument.load(buffer);

           for (var i = 1; i < profiles.length; i++) {
               var nextResponse = await fetch(profiles[i].url);
               var nextBuffer = await nextResponse.arrayBuffer();
               var nextDoc = await PDFLib.PDFDocument.load(nextBuffer);
               var indices = Array.from(Array(nextDoc.getPageCount()).keys());
               var copiedPages = await pdfDoc.copyPages(nextDoc, indices);
               copiedPages.forEach(function(page) {
                   pdfDoc.addPage(page);
               });
           }
           var base64DataUri = await pdfDoc.saveAsBase64({
               dataUri : true
           });

           var element = document.createElement('a');
           element.href = base64DataUri;
           element.download = 'merged_'+ serviceId +'.pdf';
           element.style.display = 'none';
           document.body.appendChild(element);
           element.click();
           document.body.removeChild(element);

           this.render.setColour('wrapUp', 'success');
           var postEnd = Date.now();
           var postTime = postEnd - postStart;
           log('CRE Response ('+ postTime +' msec) :');
           log(profiles);
           var subscreenDef = {
               fields : profiles.map(function(profile) {
                   return {
                       isInline : true,
                       text : '<a href="'+ profile.url +'" target="_blank"'
                               +' style="color:white">'
                               + profile.fileName +'</a>'
                   };
               }),
               id : 'fileList'
           };
           this.getCurrentScreen().subscreen = this.buildScreen(subscreenDef);
           this.render.drawSubscreen();
       }
   }

};

Wizard.prototype.saveEntities = function(sectionId) {
//  log('Saving Entities:', Object.keys(this.entity));

//  var render = this.render;
//  render.setColour(sectionId, 'inform');
//  render.disable('next');
//  var count = 0;
//  var success = true;
//  var numEntities = Object.keys(this.entity).length;
//  lib.objForEach(this.entity, function(entity, entityName) {
//      this.saveEntity(entityName, sectionId, function(data) {
//          count++;
//          log(count);
//          success = success && data.success;
//          if (count == numEntities) {
//              render.setColour(sectionId, (success) ? 'success' : 'error');
//              render.enable('next');
//          }
//      });
//  }, this);

    var entityNotes = this.entity.service.column('wizardNotes').value;
    var formNotes = this.render.getWizardNotes();

    if (((!formNotes || !entityNotes) && (formNotes || entityNotes))
        || (formNotes != entityNotes))
        this.pushToSave('service', 'wizardNotes', formNotes);

    var entityName = Object.keys(this.entity);
    var saveEntity = this.saveEntity;
    var wizard = this;
    var render = this.render;
    var success = true;
    function f(i) {
        render.setColour(sectionId, 'inform');
        render.disable('next');
        saveEntity.call(wizard, entityName[i], sectionId, function(data) {
            success = success && data.success;
            if (i < entityName.length - 1) {
                f(i+1);
            } else {
                render.setColour(sectionId, (success) ? 'success' : 'error');
                render.enable('next');
            }
        });
    }
    f(0);
};

Wizard.prototype.saveEntity = function(entityName, sectionId, callback, loadCallback, ctx) {
    ctx = ctx || this;
    callback = callback || function() {};
    loadCallback = loadCallback || function() {};
    var entity = this.entity[entityName];
//  log('saving', entityName, entity.toSave)
    if (entity.toSave && entity.toSave.length > 0) {
        var section = this.getSection(sectionId);
        if (!section.pendingSaves.includes(entityName)) {
            this.render.setColour(sectionId, 'inform');
            section.pendingSaves.push(entityName);
            var entityNameIndex = section.pendingSaves.indexOf(entityName);

            this.db.saveRecord({
                id : entity.id,
                itemsToSave : entity.itemsToSave,
                toSave : entity.toSave,
                type : entity.type
            }, function(saveResult) {
//              log('saved', entityName, entity.toSave);
                section.pendingSaves.splice(entityNameIndex, 1);
                if (saveResult.success) {
                    entity.id = saveResult.id;
                    if (section.failedSaves.includes(entityName)) {
                        this.render.setTitle(sectionId, '');
                        entityNameIndex =
                            section.failedSaves.indexOf(entityName);
                        section.failedSaves.splice(entityNameIndex, 1);
                    }
                    this.loadEntity(entityName, function() {
                        this.render.setColour(sectionId, 'success');
                        callback.call(ctx, saveResult);
                        loadCallback.call(ctx, entity.id);
                    }, this);
                } else {
                    var error = saveResult.error;
                    var errorMessage = error.name +': '+ error.message;
                    this.render.setColour(sectionId, 'error');
                    this.render.setTitle(sectionId, errorMessage);
                    if (!section.failedSaves.includes(entityName))
                        section.failedSaves.push(entityName);
                    callback.call(ctx, saveResult);
                }
            }, this);
        } else {
            callback.call(ctx, {
                error : {
                    message : 'Already saving '+ entityName,
                    name : 'SAWERROR'
                },
                success : false
            });
        }
    } else {
        callback.call(ctx, {
            success : true
        });
    }
};

Wizard.prototype.saveFieldToEntity = function(field) {
//  log('saveFieldToEntity', field);
    if (field.id == 'immediateFamily' || field.id == 'itemGroup') { // task 24 add itemgroup validation
//      this.saveImmediateFamily();
    } else if (field.double) {
        this.saveFieldToEntity(field.left);
        this.saveFieldToEntity(field.right);
    } else if (field.destination) {
        if (!Array.isArray(field.destination))
            field.destination = [field.destination];

        field.destination.forEach(function(entityName) {
            if (field.saveBy == 'value') {
                var formValue = field.value;
                var entityValue = this.getValue(entityName, field.id);
            } else {
                var formValue = field.text;
                var entityValue = this.getText(entityName, field.id);
            }

//          log(formValue, entityValue);

            if (!formValue && !entityValue) {
                var pushCondition = false;
            } else if (!formValue || !entityValue) {
                var pushCondition = true;
            } else {
                var pushCondition = (formValue != entityValue);
            }

            if (pushCondition) {
                this.pushToSave(entityName, field.id, formValue);
                if (field.id == 'serviceStartTime') {
//                  var endTime = new Date(formValue.getTime() + CNST.oneHour);
                    var arr = formValue.split(':');
                    var hour = (+arr[0] + 1) % 24;
                    var minute = arr[1];
                    var endTime = hour +':'+ minute;
                    this.pushToSave('service', 'serviceEndTime', endTime);
                } else if (field.id == 'specialInstructions') {
                    this.pushToSave(entityName, 'serviceSheetInstructions',
                                                                    formValue);
                }
            }
        }, this);
    }
};

Wizard.prototype.saveImmediateFamily = function() {
    var fieldPrefixId = {
        family : 'altName',
        familyAddress : 'shippingAddress',
        familyAtArrangements : 'isPresentAtArrangement',
        familyEmail : 'email',
        familyPhone : 'phone',
        familyRelation : 'relationToPrimaryClient'
    };
    var table = this.table.immediateFamily;
    for (var i = 0; i < 10; i++) {
        if (i < table.length) {
            var record = table[i];
            lib.objForEach(fieldPrefixId, function(fieldId, fieldPrefix) {
                fieldPrefix = fieldPrefix + (i+1);
                if (fieldId == 'relationToPrimaryClient')
                    var formValue = record.getText(fieldId);
                else
                    var formValue = record.getValue(fieldId);

                if (fieldId == 'phone')
                    var entityValue = this.getText('service', fieldPrefix);
                else
                    var entityValue = this.getValue('service', fieldPrefix);

                if (formValue != entityValue)
                    this.pushToSave('service', fieldPrefix, formValue);
            }, this);
        } else {
            lib.objForEach(fieldPrefixId, function(fieldId, fieldPrefix) {
                fieldPrefix = fieldPrefix + (i+1);
                var entityValue = this.getValue('service', fieldPrefix);
                if (entityValue != '')
                    this.pushToSave('service', fieldPrefix, '');
            }, this);
        }
    }
};

Wizard.prototype.saveNewRelationship = function(sectionId, toSave, callback, ctx) {
    ctx = ctx || this;
    callback = callback || function() {};
    var section = this.getSection(sectionId);
    var id = 'new';
    if (!section.pendingSaves.includes(id)) {
        this.render.setColour(sectionId, 'inform');
        section.pendingSaves.push(id);
        var idIndex = section.pendingSaves.indexOf(id);

        this.db.saveRecord({
            id : id,
            toSave : toSave,
            type : DEF.RECORD_TYPE.relationship
        }, function(saveResult) {
            section.pendingSaves.splice(idIndex, 1);
            if (saveResult.success) {
                id = saveResult.id;
                if (section.failedSaves.includes(id)) {
                    this.render.setTitle(sectionId, '');
                    idIndex = section.failedSaves.indexOf(id);
                    section.failedSaves.splice(idIndex, 1);
                }
                this.render.setColour(sectionId, 'success');
            } else {
                var error = saveResult.error;
                var errorMessage = error.name +': '+ error.message;
                this.render.setColour(sectionId, 'error');
                this.render.setTitle(sectionId, errorMessage);
                if (!section.failedSaves.includes(id))
                    section.failedSaves.push(id);
            }
            callback.call(ctx, saveResult);
        }, this);
    } else {
        callback.call(ctx, {
            error : {
                message : 'Already creating new record',
                name : 'SAWERROR'
            },
            success : false
        });
    }
};

Wizard.prototype.saveReciprocal = function(relationship, saveResult, callback) {
    var reciprocalId = relationship.getValue('reciprocalRelationship');
    var reciprocal = this.getTableRow('reciprocal', reciprocalId);
    if (reciprocal.toSave && reciprocal.toSave.length > 0) {
        var section = this.getSection('family');
        if (!section.pendingSaves.includes(reciprocalId)) {
            this.render.setColour('family', 'inform');
            section.pendingSaves.push(reciprocalId);
            var reciprocalIdIndex = section.pendingSaves.indexOf(reciprocalId);

            this.db.saveRecord({
                id : reciprocalId,
                toSave : reciprocal.toSave,
                type : reciprocal.type
            }, function(reciprocalSaveResult) {
                section.pendingSaves.splice(reciprocalIdIndex, 1);
                if (reciprocalSaveResult.success) {
                    reciprocal.id = reciprocalSaveResult.id;
                    if (section.failedSaves.includes(reciprocalId)) {
                        this.render.setTitle('family', '');
                        reciprocalIdIndex =
                                    section.failedSaves.indexOf(reciprocalId);
                        section.failedSaves.splice(reciprocalIdIndex, 1);
                    }
                    this.render.setColour('family', 'success');
                } else {
                    var error = reciprocalSaveResult.error;
                    var errorMessage = error.name +': '+ error.message;
                    this.render.setColour('family', 'error');
                    this.render.setTitle('family', errorMessage);
                    if (!section.failedSaves.includes(reciprocalId))
                        section.failedSaves.push(reciprocalId);
                }
                callback(saveResult, reciprocalSaveResult);
            }, this);
        } else {
            callback(saveResult, {
                error : {
                    message : 'Already saving '+ reciprocalId,
                    name : 'SAWERROR'
                },
                success : false
            });
        }
    } else {
        callback(saveResult, {
            success : true
        });
    }
};

Wizard.prototype.saveRelationship = function(relationshipId, callback) {
    callback = callback || function() {};
    var relationship = this.getTableRow('immediateFamily', relationshipId);
    if (relationship.toSave && relationship.toSave.length > 0) {
        var section = this.getSection('family');
        if (!section.pendingSaves.includes(relationshipId)) {
            this.render.setColour('family', 'inform');
            section.pendingSaves.push(relationshipId);
            var relationshipIdIndex =
                                section.pendingSaves.indexOf(relationshipId);

            this.db.saveRecord({
                id : relationshipId,
                toSave : relationship.toSave,
                type : relationship.type
            }, function(saveResult) {
                section.pendingSaves.splice(relationshipIdIndex, 1);
                if (saveResult.success) {
                    relationship.id = saveResult.id.toString();
                    if (section.failedSaves.includes(relationshipId)) {
                        this.render.setTitle('family', '');
                        relationshipIdIndex =
                                    section.failedSaves.indexOf(relationshipId);
                        section.failedSaves.splice(relationshipIdIndex, 1);
                    }
                    this.render.setColour('family', 'success');
                } else {
                    var error = saveResult.error;
                    var errorMessage = error.name +': '+ error.message;
                    this.render.setColour('family', 'error');
                    this.render.setTitle('family', errorMessage);
                    if (!section.failedSaves.includes(relationshipId))
                        section.failedSaves.push(relationshipId);
                }
//              callback(saveResult);
                this.saveReciprocal(relationship, saveResult, callback);
            }, this);
        } else {
            callback({
                error : {
                    message : 'Already saving '+ relationshipId,
                    name : 'SAWERROR'
                },
                success : false
            });
        }
    } else {
//      this.saveReciprocal(relationshipIp, callback);
        callback({
            success : true
        });
    }
};

Wizard.prototype.saveTimeSlot = function(timeSlotId) {
    // log('wizard: saveTimeSlot')
    var timeSlot = this.getTableRow('timeSlot', timeSlotId);
//  var date = lib.extractDate(timeSlot.getValue('timeSlotDate'));
//  var dateStr = date.toISOString().slice(0, 10);
    var dateStr = timeSlot.getValue('timeSlotDate');
    dateStr = lib.arrayCW(dateStr.split('/')).join('-');
    var time = lib.extractTime(timeSlot.getValue('timeSlotStartTime'));
    var hour = lib.zeroPad(time.hour);
    var endHour = lib.zeroPad((time.hour + 1) % 24);
    var minute = lib.zeroPad(time.minute);
    var timeStr = hour +':'+ minute;
    var endTimeStr = endHour +':'+ minute;

    var serviceReferenceField = lib.objCopy(DEF.FIELD.timeSlotServiceReference);
    var toSave = [
        {
            fieldId : serviceReferenceField.id,
            fieldName : serviceReferenceField.name,
            type : serviceReferenceField.type,
            value : this.getId('service')
        }
    ];


//  log('dates pushed', timeSlot.getValue('timeSlotDate'), dateStr);
    this.pushToSave('service', 'serviceDate', dateStr);
    this.pushToSave('service', 'serviceStartTime', timeStr);
    this.pushToSave('service', 'serviceEndTime', endTimeStr);
    this.pushToSave('service', 'scheduleToBeDetermined', false);

    this.saveEntity('service', 'serviceScheduling', function() {
        var section = this.getSection('serviceScheduling');
        if (!section.pendingSaves.includes(timeSlotId)) {
            this.render.setColour('serviceScheduling', 'inform');
            section.pendingSaves.push(timeSlotId);
            var idIndex = section.pendingSaves.indexOf(timeSlotId);

            this.db.saveRecord({
                id : timeSlotId,
                toSave : toSave,
                type : DEF.RECORD_TYPE.timeSlot
            }, function(saveResult) {
                section.pendingSaves.splice(idIndex, 1);
                if (saveResult.success) {
                    timeSlotId = saveResult.id;
                    if (section.failedSaves.includes(timeSlotId)) {
                        this.render.setTitle('serviceScheduling', '');
                        idIndex = section.failedSaves.indexOf(timeSlotId);
                        section.failedSaves.splice(idIndex, 1);
                    }
                    this.render.setColour('serviceScheduling', 'success');
                } else {
                    var error = saveResult.error;
                    var errorMessage = error.name +': '+ error.message;
                    this.render.setColour('serviceScheduling', 'error')
                    this.render.setTitle('serviceScheduling', errorMessage);
                    if (!section.failedSaves.includes(timeSlotId))
                        section.failedSaves.push(timeSlotId);
                }
            }, this);
        }
    }, null, this);
};

Wizard.prototype.saveToRelationship = function(relationshipId, fieldId, value) {
    var relationship = this.getTableRow('immediateFamily', relationshipId);
    var field = relationship.column(fieldId);
    relationship.toSave.push({
        fieldId : field.id,
        fieldName : field.name,
        type : field.type,
        value : value
    });

    var reciprocalId = relationship.getValue('reciprocalRelationship');
    var reciprocal = this.getTableRow('reciprocal', reciprocalId);
    switch(fieldId) {
    case 'linkedClient':
        var primaryClientField = reciprocal.column('primaryClient');
        reciprocal.toSave.push({
            fieldId : 'primaryClient',
            fieldName : primaryClientField.name,
            type : primaryClientField.type,
            value : value
        });
        break;
    case 'relationshipType':
        reciprocal.toSave.push({
            fieldId : field.id,
            fieldName : field.name,
            type : field.type,
            value : this.getReciprocalRelationshipType(value)
        });
        break;
    default:
    }
};

Wizard.prototype.selectFamily = function(id) {
    var table = this.getHeaderField('immediateFamily');
    table.selection = id;
    var screen = this.getCurrentScreen();
    var family = this.getTableRow('immediateFamily', id);
    var altName = family.getValue('altName');
    this.render.hideAllMainFields();
    this.showLoadingSubscreen('Loading linked client record for '+ altName);
    var linkedClient = this.entity['linkedClient'];
    linkedClient.id = +family.getValue('linkedClient');
    this.loadEntity('linkedClient', function() {
        screen.fields.forEach(function(field) {
            if (field.type == 'date') {
                var val = family.getValue(field.id);
                if (!!val && val !== '') {
                    var dt = lib.extractDate(val);
                    field.value = dt.getFullYear()+'-'+(dt.getMonth()+1).toString().padStart(2, '0')+'-'+dt.getDate().toString().padStart(2, '0');
                    this.render.redrawField(field);
                }
            } else if (field.type != 'button') {
                field.text = family.getText(field.id);
                field.value = family.getValue(field.id);
                this.render.redrawField(field);
            }
        }, this)
        this.render.showAllMainFields();
        this.removeSubscreen();
    }, this);
};

Wizard.prototype.setCost = function(id, cost) {
    this.costs[id] = cost;
    console.log('set cost', id, cost)
    this.render.drawSummary();
};

Wizard.prototype.resetCosts = function() {
    for (var cost in this.costs) {
        if (!this.costs.hasOwnProperty(cost)) continue;
        delete this.costs[cost];
    }
    this.render.drawSummary();
};

Wizard.prototype.showAlreadyScheduled = function(timeSlot) {
    var date = timeSlot.getValue('timeSlotDate');
    var time = timeSlot.getValue('timeSlotStartTime');
    var resource = timeSlot.getText('timeSlotResource');
    var subscreenDef = {
        fields : [
            {
                id : 'alreadyScheduled',
                label : 'This service is already scheduled as follows:',
                type : 'inline',
                text : time +' '+ date +', '+ resource
            },
            {
                id : 'rescheduleService'
            }
        ],
        id : 'alreadyScheduled'
    };
    this.getCurrentScreen().subscreen = this.buildScreen(subscreenDef);
    this.render.drawSubscreen();
//  this.render.hideAllMainFields();
};

Wizard.prototype.showField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('wizard showing', id);
        var field = this.getCurrentField(id);
        field.hidden = false;
        if (!['button', 'inline'].includes(field.type)
            && field.id != 'charityAddress'
            && field.id != 'stateText'
            && field.id != 'notes')
            field.mandatory = true;
    }, this);
    this.render.showField(ids);
};

Wizard.prototype.showHeaderField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('wizard showing', id);
        var field = this.getHeaderField(id);
        field.hidden = false;
//      if (!['button', 'inline'].includes(field.type)
//          && field.id != 'charityAddress'
//          && field.id != 'stateText')
//          field.mandatory = true;
    }, this);
    this.render.showHeaderField(ids);
};

Wizard.prototype.showLoadingSubscreen = function(message) {
    var subscreenDef = {
        fields : [
            {
                isInline : true,
                text : message
            }
        ],
        id : 'loading'
    };
    this.getCurrentScreen().subscreen = this.buildScreen(subscreenDef);
    this.render.drawSubscreen();
    this.execBeforeScreen(subscreenDef.id);
};

Wizard.prototype.showSubField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('wizard showing', id);
        var field = this.getSubField(id);
        field.hidden = false;
//      if (!['button', 'inline'].includes(field.type)
//          && field.id != 'charityAddress'
//          && field.id != 'stateText')
//          field.mandatory = true;
    }, this);
    this.render.showSubField(ids);
};

Wizard.prototype.toggleFamilySelection = function(id) {
    var table = this.getHeaderField('immediateFamily');
    if (table.selection == id) {
        this.unselectFamily();
    } else {
        this.selectFamily(id);
    }
    this.render.showSelection(table);
};

Wizard.prototype.toSaveIncludes = function(entityName, fieldId) {
    return this.entity[entityName].toSave.reduce(function(acc, toSave) {
        return acc || (toSave.fieldId == fieldId);
    }, false);
};

Wizard.prototype.unselectFamily = function() {
    var table = this.getHeaderField('immediateFamily');
    var screen = this.getCurrentScreen();
    table.selection = undefined;
    screen.fields.forEach(function(field) {
        if (field.type != 'button') {
            field.text = '';
            field.value = '';
            this.render.redrawField(field);
        }
    }, this);
    this.render.hideAllMainFields();
    this.removeSubscreen();
};

Wizard.prototype.useTrust = function(callback) {
    log('using trust');
    this.db.useTrust({
        decedentId : this.getId('decedent'),
        trustId : this.getValue('service', 'trust'),
        items : this.getItems()
    }, function(result) {
        if (result.success) {
            this.entity.salesOrder.id = result.soId;
            this.loadEntity('salesOrder', function() {
                this.render.setColour('wrapUp', 'success');
                callback(result);
            }, this);
        } else {
            var error = result.error;
            var errorMessage = error.name +': '+ error.message;
            this.render.setColour('wrapUp', 'error');
            this.render.setTitle('wrapUp', errorMessage);
            callback(result);
        }
    }, this);
};

// get wizard items for use in trust
Wizard.prototype.getItems = function(options) {
  var arrItems = [];
  var casketId = this.getValue('service', 'casket');
  if (casketId) {
      arrItems.push({
          itemId : casketId,
          quantity : 1
      });
  }
  var flowersProvidedBy = this.getText('service', 'flowersProvidedBy');
  if (flowersProvidedBy == CNST.MSMP) {
      var description = this.getValue('service', 'flowersArrangementNumber')
                          +' '
                          + this.getValue('service', 'descriptionNotes');
      arrItems.push({
          description : description,
          itemId : CNST.flowersProvidedByMSMP,
          quantity : 1,
          rate : this.costs.flowers/*this.getValue('service', 'flowersEstimate')*/
      });
  }
  if (this.getValue('service', 'basicMortuaryServices')) {
      arrItems.push({
          itemId : CNST.basicMortuaryServicesItemId,
          quantity : 1
      });
  }
  
  // task 24
  var itemGroup = this.getFieldValue("goodsAndServices",'itemGroup');
  if (itemGroup) {
      arrItems.push({
          itemId : +itemGroup,
          quantity : 1
      });
  }
  
  var transferOfRemains = this.getValue('service', 'transferOfRemains');
  if (transferOfRemains) {
      arrItems.push({
          itemId : +transferOfRemains,
          quantity : 1
      });
  }
  if (this.getValue('service', 'documentation')) {
    var cost = this.costs['documentation'] ? parseFloat(this.costs['documentation']) :0 ;
    if (parseFloat(cost) != 0){ // mhi task 35
        arrItems.push({
          itemId : CNST.documentationItemId,
            quantity : 1
        });
    }
  }
  if (this.getValue('service', 'standardPreparation')) {
      arrItems.push({
          itemId : CNST.standardPreparationItemId,
          quantity : 1
      });
  }
  var staff = this.getValue('service', 'staff');
  if (staff) {
      arrItems.push({
          itemId : +staff,
          quantity : 1
      });
  }
  if (this.getValue('service', 'hearse')) {
      arrItems.push({
          itemId : CNST.hearseItemId,
          quantity : 1
      });
  }
  if (this.getValue('service', 'tahara')) {
      arrItems.push({
          itemId : CNST.taharaItemId,
          quantity : 1
      });
  }
  if (this.getValue('service', 'shmira')) {
      arrItems.push({
          itemId : CNST.shmiraItemId,
          quantity : this.getValue('service', 'shmiraHours')
      });
  }
  if (this.getText('service', 'honorariumToBeConveyedBy') == /*CNST.family*/CNST.MSMP) { // change condition as per issue #6
      arrItems.push({
          itemId : CNST.honorariumItemId,
          quantity : 1
      });
  }
  if (this.getValue('service', 'tachrichimCotton')) {
      arrItems.push({
          itemId : CNST.tachrichimCottonItemId,
          quantity : 1
      });
  }
  if (this.getValue('service', 'tachrichimLinen')) {
      arrItems.push({
          itemId : CNST.tachrichimLinenItemId,
          quantity : 1
      });
  }
  if (this.getValue('service', 'tallit')) {
      arrItems.push({
          itemId : CNST.tallitItemId,
          quantity : 1
      });
  }
  var certifiedCopiesAmount = this.getValue('service',
                                      'certifiedCopiesAmount');
  if (certifiedCopiesAmount) {
      arrItems.push({
          itemId : CNST.certifiedCopiesItemId,
          quantity : certifiedCopiesAmount,
          rate : this.getValue('service', 'certifiedCopiesCost')
      });
  }

  var laTimes = this.getValue('service', 'laTimesNotice');
  var jewishJournal = this.getValue('service', 'jewishJournalNotice');
  if (laTimes || jewishJournal) {
      var qty = 0;
      var rate = 0;
      var desc = '';
      if (laTimes) {
          qty++;
          rate += this.getValue('service', 'laTimesEstimatedCharges');
          desc = 'LA Times';
      }
      if (jewishJournal) {
          qty++;
          rate += this.getValue('service', 'jewishJournalEstimatedCharges');
          desc = 'Jewish Journal';
      }
      arrItems.push({
          description : desc,
          itemId : CNST.courtesyObituaryItemId,
          quantity : qty,
          rate : rate
      });
  }

  if (this.getValue('service', 'vault')) {
      arrItems.push({
          itemId : CNST.vaultItemId,
          quantity : 1,
          rate : this.getValue('service', 'vaultAmount')
      });
  }

  var openClose = this.getValue('service', 'openingClosing');
  if (openClose) {
      arrItems.push({
          itemId : openClose,
          quantity : 1,
          rate : this.getValue('service', 'openCloseAmount')
      });
  }

  var webcast = this.getText('service', 'websiteWebcast')
  if (webcast == CNST.yes || webcast == 'Chapel') {
      arrItems.push({
          itemId : CNST.webcastItemId,
          quantity : 1
      });
} else if (webcast == 'Graveside') {
    arrItems.push({
        itemId : CNST.webcastItemGravesideId,
        quantity : 1
    });
} else if (webcast == 'Both') {
    arrItems.push({
        itemId : CNST.webcastItemBothId,
        quantity : 1
    });
}

  if (this.getText('service', 'mortuary') == CNST.outside) {
      arrItems.push({
          itemId : CNST.outsideItemId,
          quantity : 1
      });
  }

  var serviceDate = this.getValue('service', 'serviceDate');
  if (typeof serviceDate == 'string')
      serviceDate = new Date(serviceDate);
  var serviceMonth = serviceDate.getMonth();
  var serviceTime = this.getValue('service', 'serviceTime');
  var serviceHours = (new Date(serviceTime)).getHours();

  if (serviceMonth >= 3
          && serviceMonth <= 9
          && serviceHours >= 16) {
      arrItems.push({
          itemId : CNST.lateServiceFeeItemId,
          quantity : 1
      });
  }

  return arrItems;
};

//
