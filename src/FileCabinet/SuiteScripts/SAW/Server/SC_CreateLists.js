//------------------------------------------------------------------
// Copyright 2020, All rights reserved, Prolecto Resources, Inc.

// No part of this file may be copied or used without express, written
// permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
// Description: List Creator Schedule Script
// Developer: Sylvain Muise
// Date: May 11 2020
// Deployment URL:
// Notes:   Nightly scheduled list to create lists initialization data for SAW.
//------------------------------------------------------------------

/**
  * @NApiVersion  2.x
  * @NScripttype  ScheduledScript
  * @NModuleScope Public
*/

define(['N/file', './Library', './Model/Definitions', './Model/SAW'],

function(file, lib, DEF, SAW) {

return { execute : execute };

function execute(context) {
    var lists = lib.arrToObj(DEF.LISTS, SAW.loadListOptions);
    lists.casket = SAW.loadCaskets();
    lists.openingClosing = SAW.loadOpeningClosingOptions();
    lists.relationship = SAW.loadContactRelationships();
    lists.transferOfRemains = SAW.loadTransferOfRemainsList();
    lists.staff = SAW.loadStaffList();
    lists.purchaserRelationship = SAW.loadPurchaserRelationship();
    lists.congregation = SAW.loadCongregations();
    lists.serviceLocation = lists.serviceLocation.filter(function(option) {
        return (option.text.indexOf('HH') != -1
                || option.text.indexOf('SV') != -1
                || option.text == 'N/A');
    });
    lists.serviceLocationHH = lists.serviceLocation.filter(function(option) {
        return (option.text.indexOf('HH') != -1 || option.text == 'N/A');
    });
    lists.serviceLocationSV = lists.serviceLocation.filter(function(option) {
        return (option.text.indexOf('SV') != -1 || option.text == 'N/A');
    });
    lists.itemGroup = SAW.loadItemGroupList(); // task 24
    lists.cemeteryNames = SAW.loadOutSideCemeteryNames();

    var listFile = file.create({
        encoding : file.Encoding.UTF_8,
//      folder : '53008',   // Sandbox
        folder : '67131',   // Production
        name : 'ListDefinitions.js',
        fileType : file.Type.JAVASCRIPT
    });

    [
        '//------------------------------------------------------------------',
        '// Copyright 2020, All rights reserved, Prolecto Resources, Inc.',

        '// No part of this file may be copied or used without express, written',
        '// permission of Prolecto Resources, Inc.',
        '//------------------------------------------------------------------',

        '//------------------------------------------------------------------',
        '// Description: SAW List Definitions',
        '// Developer: Sylvain Muise',
        '// Date: April 17, 2020',
        '// Deployment URL:',
        '// Notes:  A large set of hardcoded list to speed up launching of SAW.',
        '//------------------------------------------------------------------',
        ' ',
        '// This file was generated on '+ (new Date()).toString(),
        ' ',
        'const listOptions = '+ JSON.stringify(lists).replace(/&#39;/g, "'") +';'
    ].forEach(function(line) {
        listFile.appendLine({
            value : line
        });
    });

    listFile.save();
}
});
