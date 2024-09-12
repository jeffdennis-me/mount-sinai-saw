//------------------------------------------------------------------
// Copyright 2019, All rights reserved, Prolecto Resources, Inc.
 
// No part of this file may be copied or used without express, written
// permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
// Description: SAW Client record User Event
// Developer: Sylvain Muise
// Date: August 21, 2019
// Deployment URL:
// Notes:   Adds the Services Arrangement button on the client page.
//------------------------------------------------------------------

/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/url'],

function(url) {

    const SERVER_CONTROLLER = ({
        scriptId : 'customscript_pri_saw_controller',
        deploymentId : 'customdeploy_pri_saw_controller'
    });

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
        if (scriptContext.type == scriptContext.UserEventType.VIEW) {
            var id = scriptContext.newRecord.id;
            var recordType = scriptContext.newRecord.type;


//          if (recordType == 'customer' && id && id.toString() == '307660') {
            if (recordType == 'customer' && id) {
                var confirmMessage = 'This will launch the Service Arrangements'
                                        +' Wizard. Proceed?';
                var controllerUrl = url.resolveScript(SERVER_CONTROLLER);
                var link = controllerUrl +'&decedentId='+ id;
                scriptContext.form.addButton({
                    id : 'custpage_pri_saw_boot',
                    label : 'Service Arrangements',
                    functionName : 'if (window.confirm("'+ confirmMessage +'"))'
                                        +'window.open("'+ link +'");'
                });
            }
        }
    }

    return { beforeLoad: beforeLoad };
});
