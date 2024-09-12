//------------------------------------------------------------------
// Copyright 2019, All rights reserved, Prolecto Resources, Inc.
 
// No part of this file may be copied or used without express, written
// permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
// Description: SAW Controller Suitelet
// Developer: Sylvain Muise
// Date: August 21, 2019
// Deployment URL:
// Notes:   The main entry point of the SAW app.
//          Controls the state of the app, defining which mode and submode
//          the app operates in.
//------------------------------------------------------------------

/**
  * @NApiVersion  2.x
  * @NScripttype  Suitelet
  * @NModuleScope Public
*/

define(['N/runtime', './Library', './Model/Definitions', './Model/SAW',
        './View/Render', 'N/log'],

function(runtime, lib, DEF, SAW, render, NSlog) {

    return { onRequest : onRequest };

    function name(id) {
        return DEF.FIELD[id].name;
    }

    function onRequest(context) {
        var params = context.request.parameters;
        params.user = runtime.getCurrentUser();

//      log.debug('test', 'test1');
//      params.listOptions = lib.arrToObj(DEF.LISTS, SAW.loadListOptions);
//      params.listOptions.casket = SAW.loadCaskets();
//      params.listOptions.openingClosing = SAW.loadOpeningClosingOptions();
//      params.listOptions.relationship = SAW.loadContactRelationships();
//      params.listOptions.transferOfRemains = SAW.loadTransferOfRemainsList();
//      params.listOptions.staff = SAW.loadStaffList();
//      params.listOptions.purchaserRelationship =
//          SAW.loadPurchaserRelationship();
        params.listOptions = DEF.LISTOPTIONS;

        var decedent = SAW.loadClient(params.decedentId);

//      log.debug('test', 'test2');
        var spouseId = decedent.getValue(name('spouse').decedent);
        if (spouseId)
            var spouse = SAW.loadClient(spouseId);

        var mortCaseId = decedent.getValue(name('mortCase').decedent);
        if (!mortCaseId) {
            mortCaseId = SAW.checkForMortCase(params);
            log.debug('searching for mortCase', mortCaseId);
            if (!mortCaseId) {
                mortCaseId = SAW.createNewMortCase(params, decedent);
                log.debug('created mort case', mortCaseId);
            }
            decedent = SAW.loadClient(params.decedentId);
        }
        var mortCase = SAW.loadMortCase(mortCaseId);
//      log.debug('test', 'test3');

        var mortPrepId = decedent.getValue(name('mortPrep'));
        if (!mortPrepId) {
            mortPrepId = SAW.checkForMortPrep(params);
            log.debug('searching for mortprep', mortPrepId);
            decedent = SAW.loadClient(params.decedentId);
        }
        var mortPrep = SAW.loadMortPrep(mortPrepId);

        var serviceId = decedent.getValue(name('service'));
        if (!serviceId) {
            serviceId = SAW.checkForService(params);
            log.debug('searching for service', serviceId);
            if (!serviceId) {
                serviceId = SAW.createNewService(params, mortCase, decedent);
                log.debug('created service', serviceId);
            }
            decedent = SAW.loadClient(params.decedentId);
        }
        var service = SAW.loadService(serviceId);

        // JEFF - Bind Service to Mort Prep
        SAW.linkServiceToMortPrep(serviceId, mortPrepId);

//      log.debug('test', 'test4');
        var rabbiId = service.getValue(name('nameOfRabbi'));
        if (rabbiId)
            var rabbi = SAW.loadClient(rabbiId);


        params.sawUrl = DEF.URL.serverController;
        params.linkUrl = DEF.URL.serverClientLink;
//        params.creLinkUrl = DEF.URL.serverCRELink;
        params.creSuitelet = DEF.URL.serverCRESuitelet;
        params.mapUrl = DEF.URL.mapLink;
        params.eSignUrl = DEF.URL.eSign;
        params.decedent = lib.extractData(DEF.ENTITY.decedent, decedent);
        if (spouse)
            params.spouse = lib.extractData(DEF.ENTITY.spouse, spouse);
//      else
//          params.spouse = {};
        params.mortCase = lib.extractData(DEF.ENTITY.mortCase, mortCase);
        params.mortPrep = lib.extractData(DEF.ENTITY.mortPrep, mortPrep);
        params.service = lib.extractData(DEF.ENTITY.service, service);
        if (rabbi)
            params.rabbi = lib.extractData(DEF.ENTITY.rabbi, rabbi);
        params.relationshipType = SAW.loadRelationshipTypes();
        params.relationshipTo = SAW.loadRelationshipTo(params.decedentId);
        var nextOfKinValue = params.relationshipType.results.reduce(
        function(acc, rel) {
            return rel.columns.reduce(function(acc, col) {
                return (col.id == 'name' && col.value == 'Next of Kin of') ?
                        rel.id :
                        acc;
            }, acc);
        }, '');
        params.immediateFamily =
                    SAW.loadImmediateFamily(params.decedentId, nextOfKinValue);
        params.reciprocal = SAW.loadReciprocals(params.immediateFamily);

        // Added item groups - Jeff Dennis
        params.itemGroups = SAW.loadItemGroups();

        // Add SAW section as param - Jeff Dennis
        var lastNavData = SAW.loadLastNavigationSection(params.decedentId);
        params.lastNavigationSection = lastNavData.nav;
        params.lastNavigationSectionId = lastNavData.id;

        params.prices = SAW.loadPrices();
        NSlog.debug('prices', JSON.stringify(params.prices))
//      log.debug('test', 'test5');



        context.response.write(render.wizard(DEF, SAW, params));
    }
});
