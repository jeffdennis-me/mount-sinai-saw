	//------------------------------------------------------------------
	// Copyright 2019, All rights reserved, Prolecto Resources, Inc.
	
	// No part of this file may be copied or used without express, written
	// permission of Prolecto Resources, Inc.
	//------------------------------------------------------------------
	
	//------------------------------------------------------------------
	// Description: Definitions for SAW.
	// Developer: Sylvain Muise
	// Date: July 9, 2019
	// Deployment URL:
	// Notes:
	//------------------------------------------------------------------
	
	function Definitions() {
	    this.CONSTANT = {
	        accountEstimates : 120,
	        alreadyInterred : 'Already Interred',
	        atArrangements : 'At Arrangements',
	        atArrangementsOf : 'At Arrangements Of',
	        basicMortuaryServicesItemId : 134239,
	        certifiedCopiesItemId : 134128,
	        clickToCreateSearch : 'Click to create/search ->',
	        clickToEnter : 'Click to enter ->',
	        clickToSearch : 'Click to search ->',
	        courtesyObituaryItemId : 134130,
	        createSearch : 'Create/Search',
	        cremation : 'Cremation',
			cremationItemId : 134127,
			cremationReceptacleItemId : 137293,
	        defaultDaySpan : 14,
	        documentationItemId : 134241,
	//        doesNotExist : 'dne',
	//      debugSection : 'intro',
	    //    debugSection : 'decedent',
	        // debugSection : 'family',
	//        debugSection : 'serviceType',
	//      debugSection : 'property',
	       debugSection : 'earthOff',
	    //  debugSection : 'serviceScheduling',
	    //    debugSection : 'trust',
	//        debugSection : 'serviceInfo',
	    //    debugSection : 'goodsAndServices',
	    //  debugSection : 'casket',
	//      debugSection : 'certifiedCopies',
	      notices : 'notices',
	//      debugSection : 'website',
	//      debugSection : 'property2',
	//        debugSection : 'wrapUp',
	        family : 'Family',
	//      firstSection : 'intro',
	        firstSection : 'decedent', 
	        flowersProvidedByMSMP : 134124,
	        funeral : 'Funeral',
	        halfHourInSeconds : 30 * 60,
	        hearseItemId : 134224,
	        hhMSChapel : 'HH - MS Chapel',
	        hhTanachChapel : 'HH - Tanach Chapel',
	        home : 'Home',
	        hispanic : 'Hispanic',
	        honorariumItemId : 134132,
	        informant : 'Informant',
	        informantOf : 'Informant Of',
	        inside : 'Inside',
	        interment : 'Interment',
	        kamenirChapel : 'Kamenir Chapel',
	        lastSection : 'wrapUp',
	        lateServiceFeeItemId : 137723,
	        laTimeOffset : 8,
	        married : 'Married',
	        marriedWidowed : 'Mar./Wid.',
	        memorial : 'Memorial',
	        mortuary : 'Mortuary',
	        msChapel : 'MS Chapel',
	        msConvenience : 'M/S Convenience',
	        MSMP : 'MSMP',
	        nextOfKin : 'Next of Kin',
	        nextOfKinOf : 'Next of Kin of',
			no : 'No',
	        noDeed : 'No Deed',
	        noInterment : 'No Interment',
	        notAvailable : 'na',
	        noTrust : 'No Trust',
	        oneHour : 60 * 60 * 1000,
	        oneYear : 365 * 24 * 60 * 60 * 1000,
	        outside : 'Outside',
	        outsideItemId : 137733,
	        permanent : 'Permanent',
	        rabbiClergyText : 'Rabbi / Clergy',
	        outsideCemeteryValue : '5',
	        salesContractCustomFormId : 120,
	        serviceType : 'Service Type',
	        shmiraItemId : 134133,
	        siteOnly : 'Site Only',
	        spouseOf : 'Spouse Of',
	        srdp : 'SRDP',
	        srdpSurv : 'SRDP SURV',
	        staffForChapelItemId : 134244,
	        staffForFuneralItemId : 134244,
	        staffForGravesideItemId : 134243,
	        staffForMemorialItemId : 134245,
	        standardPreparationItemId : 134249,
	        svKamenirChapel : 'SV - Kamenir Chapel',
	        tachrichimCottonItemId : 133929,
	        tachrichimLinenItemId : 133931,
	        taharaItemId : 134134,
	        tallitItemId : 133933,
	        tanachChapel : 'TaNaCH Chapel',
	        toBeDecided : 'tbd',
	        toBePurchased : 'To be purchased',
	        traditional : 'Traditional',
	        transferOfRemainsLAItemId : 134250,
	        transferOfRemainsLVItemId : 134251,
	        transferOfRemainsOutsideItemId : 134252,
	        transferOfRemainsRiversideItemId : 134253,
	        transferOfRemainsSanDiegoItemId : 134254,
	        US : 'United States',
	        vaultItemId : 133924,
	        webcastItemId : 137722,
	        webcastItemChapelId : 137722,
	        webcastItemGravesideId : 145551,
	        webcastItemBothId : 145552,
	        widowed : 'Widowed',
	        yes : 'Yes'
	    };
	
	    this.RECORD_TYPE = {
	        client : 'customer',
			cemetery: 'customer',
	        decedent : 'customer',
	        congregation : 'customer',
			outsideCemetery: 'customer',
	        deed : 'customrecord_mts_deed',
	        intermentOrder : 'customrecord_mts_interment_order',
	        item : 'item',
	        linkedClient : 'customer',
	        mortCase : 'customrecord_mts_mort_case',
	        mortPrep : 'customrecord_mts_mort_prep',
	        propertySpace : 'customrecord_mts_property_space',
	        rabbi : 'customer',
	        relationship : 'customrecord_mts_cust_rel',
	        salesOrder : 'salesorder',
	        service : 'calendarevent',
	        spouse : 'customer',
	        timeSlot : 'customrecord_mts_svc_time_slot',
	        trust : 'estimate'
	    };
	
	    this.COLOUR = {
	        error : '#FF1C21',
	        errorPale : '#FFCBCC',
	        inform : '#3BC3FE',
	        informPale : '#CFEEFC',
	        success : '#52FF33',
	        successPale : '#D6FBCF',
	    };
	
	    this.FIELD = {
	        addFamilyMember : {
	            buttonLabel : 'Add Family Member',
	            id : 'addFamilyMember',
	            label : '',
	            type : 'button'
	        },
	        additionalInfo : {
	            id : 'additionalInfo',
	            label : 'Additional Info',
	            name : 'custrecord_mts_cust_rel_addl_info',
	            type : 'textarea'
	        },
	        addNewCemetery : {
	            clickToSearch : true,
	            id : 'addNewCemetery',
	            label : '',
	            text : 'Add New Cemetery',
	            type : 'inline'
	        },
	        addNewClient : {
	            clickToSearch : true,
	            id : 'addNewClient',
	            label : '',
	            text : 'Add New Client',
	            type : 'inline'
	        },
	        address : {
	            id : 'address',
	            label : 'Address',
	            name : 'address',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        address1 : {
	            id : 'address1',
	            name : 'address1'
	        },
	        address2 : {
	            id : 'address2',
	            name : 'address2'
	        },
	        addressLine1 : {
	            id : 'addressLine1',
	            label : 'Address Line 1',
	            name : 'addr1',
	            saveBy : 'value',
	            sublist : 'addressbook',
	            type : 'text'
	        },
	        addressLine2 : {
	            id : 'addressLine2',
	            label : 'Address Line 2',
	            name : 'addr2',
	            saveBy : 'value',
	            sublist : 'addressbook',
	            type : 'text'
	        },
	        alsoKnownAs : {
	            id : 'alsoKnownAs',
	            label : 'Also Known As',
	            saveBy : 'text',
	            type : 'text'
	        },
	        altName : {
	            id : 'altName',
	            label : 'Name',
	            name : 'altname',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        altName2 : {
	            id : 'altName2',
	            label : 'Name',
	            name : 'altname',
	            saveBy : 'text',
	            type : 'inline'
	        },
	        alreadyScheduled : {
	            id : 'alreadyScheduled',
	            label : 'This service is already scheduled as follows:',
	            type : 'inline'
	        },
	        amountPaid : {
	            id : 'amountPaid',
	            label : 'Amount Paid',
	            name : 'amountpaid'
	        },
	        amountRemaining : {
	            display : 'text',
	            id : 'amountRemaining',
	            label : 'Amount Due',
	            name : 'amountremaining',
	            text : 'Loading'
	        },
	        amountRemainingTotalBox : {
	            id : 'amountRemainingTotalBox',
	            label : 'Amount Due',
	            name : 'amountremainingtotalbox'
	        },
	        applyChanges : {
	            buttonLabel : 'Apply Changes',
	            id : 'applyChanges',
	            label : '',
	            type : 'button'
	        },
	        arrangementNo : {
	            id : 'arrangementNo',
	            label : 'Arrangement No.',
	            saveBy : 'value',
	            type : 'text'
	        },
	        arrangementsMode : {
	            id : 'arrangementsMode',
	            label : 'Arrangements Mode',
	            saveBy : 'value',
	            type : 'select'
	        },
	        attendanceExpected : {
	            id : 'attendanceExpected',
	            label : 'Attendance expected',
	            saveBy : 'value',
				type : 'number'
	        },
	        authorizedBy : {
	            id : 'authorizedBy',
	            label : 'Authorized By',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        autoIncludeInTrust : {
	            id : 'autoIncludeInTrust',
	            name : 'custitem_mts_auto_include_in_trust'
	        },
	        basicMortuaryServices : {
	            id : 'basicMortuaryServices',
	            label : 'Basic Mortuary Services',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        cremation : {
	            id : 'cremation',
	            label : 'Cremation',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
			cremationFee: {
				id: 'cremationFee',
				label: 'Cremation Fee',
				type: 'number'
			},
	        cremationReceptacle : {
	            id : 'cremationReceptacle',
	            label : 'Cremation Receptacle',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        registerBook : {
	            id : 'registerBook',
	            label : 'Register Book',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
			funeralFlowers : {
	            id : 'funeralFlowers',
	            label : 'Funeral Flowers - CS 2',
	            saveBy : 'value',
	            type : 'checkbox'
			},

	        birthState : {
	            id : 'birthState',
	            label : 'Birth State',
	            list : 'stateDropDown',
	            saveBy : 'value',
	            type : 'select'
	        },
	        business : {
	            id : 'business',
	            label : 'Business / Industry',
	            saveBy : 'text',
	            type : 'text'
	        },
	        cancelChanges : {
	            buttonLabel : 'Cancel Changes',
	            id : 'cancelChanges',
	            label : '',
	            type : 'button'
	        },
	        cancelSubscreen : {
	            buttonLabel : 'Cancel',
	            id : 'cancelSubscreen',
	            label : '',
	            type : 'button'
	        },
	        casket : {
	//          clickToSearch : true,
	            id : 'casket',
	            label : 'Casket',
	            saveBy : 'value',
	            type : 'select'
	        },
	        casketbearersByFamily : {
	            id : 'casketbearersByFamily',
	            label : 'Casketbearers by family',
	            saveBy : 'value',
	            type : 'number',
	        },
	        casketbearersByMSMP : {
	            id : 'casketbearersByMSMP',
	            label : 'Casketbearers by MSMP',
	            saveBy : 'value',
	            type : 'number'
	        },
	        casketInChapelAfter : {
	            id : 'casketInChapelAfter',
	            label : 'Casket in Chapel (After)',
	            list : 'casketInChapel',
	            saveBy : 'value',
	            type : 'select'
	        },
	        casketInChapelPrior : {
	            id : 'casketInChapelPrior',
	            label : 'Casket in Chapel (Prior)',
	            list : 'casketInChapel',
	            saveBy : 'value',
	            type : 'select'
	        },
	        casketLowered : {
	            id : 'casketLowered',
	            label : 'Casket Lowered',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        casketName : {
	            id : 'casketName',
	            label : 'Casket Name',
	            saveBy : 'value',
	            type : 'text'
	        },
	        casketPlacePrior : {
	            id : 'casketPlacePrior',
	            label : 'Place Casket Prior',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        casketSize : {
				id : 'casketSize',
				label : 'Casket Size',
				// list : 'customlist_mts_svc_cskt_size',
				// name : 'custrecord_mts_intord_cskt_size',
				name : {
	                intermentOrder : 'custrecord_mts_intord_cskt_size',
				},
				saveBy : 'value',
				type : 'select'
	        },
	        category : {
	            id : 'category',
	            name : 'custentity_mts_customer_attributes',
	            type : 'select'
	        },
	        cemetery : {
	            id : 'cemetery',
	            label : 'Cemetery',
	            saveBy : 'value',
	            type : 'select'
	        },
			// cemeteryName: {
	        //     id : 'cemeteryName',
	        //     label : 'Cemetery Name',
	        //     saveBy : 'value',
			// 	list: 'cemeteryNames',
	        //     type : 'select'
			// },
			cemeteryName: {
	            id : 'cemeteryName',
	            label : 'Cemetery Name',
	            clickToSearch : true,
	            name : 'custrecord_mts_cust_rel_linked',
	            saveBy : 'value',
	            textIfEmpty : 'Create/Search',
	            type : 'inline'
	        },
			cemeteryCompanyName: {
				id: 'cemeteryCompanyName',
				label: 'Cemetery Name',
				name: 'companyname',
				type: 'text'
			},
	        certifiedCopiesAmount : {
	            id : 'certifiedCopiesAmount',
	            label : '# of certified copies of death certificate',
	            saveBy : 'value',
	            type : 'number'
	        },
	        certifiedCopiesCost : {
	            id : 'certifiedCopiesCost',
	            label : '',
	            type : 'inline'
	        },
	        certifiedCopiesFreeCopy : {
	            id : 'certifiedCopiesFreeCopy',
	            label : 'Free copy for vet claim',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        // MHI task 35
	        mailToInformant : {
            id : 'mailToInformant',
            label : 'Mail to Informant',
            type : 'checkbox'
	        },
	        // MHI task 35
	        certifiedCopiesMailTo : {
	            id : 'certifiedCopiesMailTo',
	            label : 'Copies to be mailed to',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        certifiedCopiesTotalCost : {
	            id : 'certifiedCopiesTotalCost',
	            label : 'Total cost',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        chapel : {
	            id : 'chapel',
	            label : 'Chapel',
	            saveBy : 'value',
	            type : 'select'
	        },
	        charityAddress : {
	            id : 'charityAddress',
	            label : 'Address',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        checkForDeed : {
	            buttonLabel : 'Check For Deed',
	            id : 'checkForDeed',
	            label : '',
	            type : 'button'
	        },
	        checkForProperty : {
	            buttonLabel : 'Check For Property',
	            id : 'checkForProperty',
	            label : '',
	            type : 'button'
	        },
	        checkForTrust : {
	            buttonLabel : 'Check For Trust',
	            id : 'checkForTrust',
	            label : '',
	            type : 'button'
	        },
	        city : {
	            id : 'city',
	            name : 'city'
	        },
	        cityInBook : {
	            id : 'cityInBook',
	            label : 'City',
	            name : 'city',
	            saveBy : 'text',
	            sublist : 'addressbook',
	            type : 'text'
	        },
	        clothingAndCosmeticNotes : {
	            id : 'clothingAndCosmeticNotes',
	            label : 'Clothing and Cosmetic Notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        clothingForService : {
	            id : 'clothingForService',
	            label : 'Clothing For Service',
	            radioList : 'burialClothing',
	            saveBy : 'value',
	            type : 'radio'
	        },
	        collectCheckFor : {
	            id : 'collectCheckFor',
	            label : 'Collect check for (amount)',
	            saveBy : 'value',
	            type : 'currency'
	        },
	        collectFrom : {
	            id : 'collectFrom',
	            label : 'Collect from',
	            saveBy : 'value',
	            type : 'text'
	        },
	        collectSignedOrderBy : {
	            id : 'collectSignedOrderBy',
	            label : 'Collect signed order by',
	            saveBy : 'value',
	            type : 'text'
	        },
	        confirmDeed : {
	            buttonLabel : 'Confirm Deed',
	            id : 'confirmDeed',
	            label : '',
	//          saveBy : 'value',
	//          table : 'deed',
	//          type : 'radiotable'
	            type : 'button'
	        },
	        confirmedBy : {
	            id : 'confirmedBy',
	            label : 'Confirmed By',
	            list : 'msmpFamily',
	            saveBy : 'value',
	            type : 'select'
	        },
	        confirmProperty : {
	            buttonLabel : 'Confirm Property',
	            id : 'confirmProperty',
	            label : '',
	            type : 'button'
	        },
	        confirmTrust : {
	            buttonLabel : 'Confirm Trust',
	            id : 'confirmTrust',
	            label : '',
	            type : 'button'
	        },
			congregation: {
				id: 'congregation',
				type: 'select',
				label: 'Congregation',
				list : 'congregation',
				saveBy: 'value',
			},
	        contractNumber : {
	            id : 'contractNumber',
	            name : 'tranid',
	            saveBy : 'value',
	            type : 'text'
	        },
	        contractType : {
	            id : 'contractType',
	            label : 'Contract Type',
	            name : 'custbody_mts_contract_type',
	            saveBy : 'value',
	            type : 'select'
	        },
	        counselor : {
	            id : 'counselor',
	            label : 'Counselor',
	            saveBy : 'value',
	            type : 'text'
	        },
	        country : {
	            id : 'country',
	            name : 'country'
	        },
	        countryInBook : {
	            id : 'countryInBook',
	            label : 'Country',
	            name : 'country',
	            saveBy : 'value',
	            sublist : 'addressbook',
	            type : 'select'
	        },
	        county : {
	            id : 'county',
	            label : 'County',
	            saveBy : 'value',
	            type : 'text'
	        },
	        covid19 : {
	            id : 'covid19',
	            label : 'COVID-19',
	        },
	        createCemetery : {
	            buttonLabel : 'Create New Cemetery',
	            id : 'createCemetery',
	            label : '',
	            type : 'button'
	        },
	        createClient : {
	            buttonLabel : 'Create New Client',
	            id : 'createClient',
	            label : '',
	            type : 'button'
	        },
	        createSalesContract : {
	            buttonLabel : 'Create Sales Contract',
	            id : 'createSalesContract',
	            label : '',
	            type : 'button'
	        },
	        customForm : {
	            id : 'customForm',
	            label : 'Custom Form',
	            name : 'customform',
	            type : 'text'
	        },
	        dateCreated : {
	            id : 'dateCreated',
	            name : 'datecreated',
	            sort : 'DESC'
	        },
	        dateOfBirth : {
	            id : 'dateOfBirth',
	            label : 'Date of Birth',
				// name: {
				// 	client : 'custentity_mts_cust_dob',
				// 	linkedClient : 'custentity_mts_cust_dob',
				// },
				name : 'custentity_mts_cust_dob',
	            saveBy : 'value',
	            type : 'date'
	        },
	        dateOfDeath : {
	            id : 'dateOfDeath',
	            label : 'Date of Death',
	            saveBy : 'value',
	            type : 'date'
	        },
	        dateTimeNotes : {
	            id : 'dateTimeNotes',
	            label : 'Date / Time / Notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        days : {
	            id : 'days',
	            label : 'Days',
	            name : 'custrecord_mts_mc_age_days',
	            saveBy : 'value',
	            type : 'number'
	        },
	        decedent : {
	            id : 'decedent',
	            label : 'Decedent',
	            name : {
	                intermentOrder : 'custrecord_mts_intord_cust_ref',
	                salesOrder : 'custbody_mts_so_dcdnt'
	            },
	            saveBy : 'value',
	            type : 'text'
	        },
	        decedentHasNoTrust : {
	            buttonLabel : 'Decedent does not have a trust',
	            id : 'decedentHasNoTrust',
	            label : '',
	            type : 'button'
	        },
	        decedentHasProperty : {
	            id : 'decedentHasProperty',
	            label : 'Does the decedent already have property?',
	            saveBy : 'value',
	            type : 'yesno'
	        },
	        decedentHasTrust : {
	            id : 'decedentHasTrust',
	            label : 'Does the decedent have a funeral trust?',
	            saveBy : 'value',
	            type : 'yesno'
	        },
	        decedentPresent : {
	            id : 'decedentPresent',
	            label : 'Will the decedent be present during the service?',
	            saveBy : 'value',
	            type : 'yesno'
	        },
	        deed : {
	            id : 'deed',
	            label : 'Deed',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        deedContractReference : {
	            display : 'text',
	            id : 'deedContractReference',
	            label : 'Contract Reference',
	            name : 'custrecord_mts_deed_so_ref',
	            saveBy : 'value',
	        },
	        deedDateIssued : {
	            id : 'deedDateIssued',
	            label : 'Date Issued',
	            name : 'custrecord_mts_deed_date_issued',
	            saveBy : 'value',
	        },
	        deedHolders : {
	            id : 'deedHolders',
	            label : 'Deed Holders',
	            name : 'custrecord_mts_deed_holder_custom',
	            saveBy : 'value',
	        },
	        deedNumber : {
	            display : 'text',
	            id : 'deedNumber',
	            label : 'Deed Number',
	            name : 'internalid',
	            saveBy : 'value'
	        },
	        deedPropertyUnit : {
	            display : 'text',
	            id : 'deedPropertyUnit',
	            label : 'Property Unit',
	            name : 'custrecord_mts_deed_proper_ref',
	            saveBy : 'value'
	        },
	        deedTable : {
	            id : 'deedTable',
	            saveBy : 'value',
	            table : 'deed',
	            type : 'radiotable'
	        },
	        deleteFamilyMember : {
	            buttonLabel : 'Delete Family Member',
	//          disabled : true,
	            id : 'deleteFamilyMember',
	            label : '',
	            type : 'button'
	        },
	        denomination : {
	            id : 'denomination',
	            label : 'Denomination',
	            saveBy : 'value',
	            type : 'select',
	        },
			denominationVtl : {
	            id : 'denominationVtl',
	            label : 'Denomination',
	            saveBy : 'value',
	            type : 'select',
	        },
	        descriptionNotes : {
	            id : 'descriptionNotes',
	            label : 'Description / Notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        designatedBeneficiary : {
	            display : 'text',
	            id : 'designatedBeneficiary',
	            label : 'Designated Beneficiary',
	            name : 'custbody_mts_desig_benef',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        directorInquiry : {
	            id : 'directorInquiry',
	            label : 'Director Inquiry',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        displayName : {
	            id : 'displayName',
	            label : 'Name to Appear in Notices',
	            saveBy : 'text',
	            type : 'text'
	        },
	        dispositionOfFirstCallClothing : {
	            id : 'dispositionOfFirstCallClothing',
	            label : 'Disposition of First Call Clothing',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        documentation : {
	            id : 'documentation',
	            label : 'Documentation',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        donationInLieu : {
	            id : 'donationInLieu',
	            label : 'Donation in lieu of flowers',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
					intermentInstruction : {
            id : 'intermentInstruction',
            label :'Special Instructions',
						name : 'custrecord_mts_intord_spcl_instrctns',
            saveBy : 'value',
            type : 'textarea'
          },
	        earthOff1 : {
	            clickToSearch : true,
	            id : 'earthOff1',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff1_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson1 : {
	            clickToSearch : true,
	            id : 'earthOffPerson1',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff_int_dcdnt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff2 : {
	            clickToSearch : true,
	            id : 'earthOff2',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff2_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson2 : {
	            clickToSearch : true,
	            id : 'earthOffPerson2',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff2_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff3 : {
	            clickToSearch : true,
	            id : 'earthOff3',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson3 : {
	            clickToSearch : true,
	            id : 'earthOffPerson3',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff3_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff4 : {
	            clickToSearch : true,
	            id : 'earthOff4',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff4_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson4 : {
	            clickToSearch : true,
	            id : 'earthOffPerson4',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff4_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff5 : {
	            clickToSearch : true,
	            id : 'earthOff5',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff5_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson5 : {
	            clickToSearch : true,
	            id : 'earthOffPerson5',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff5_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff6 : {
	            clickToSearch : true,
	            id : 'earthOff6',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff6_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson6 : {
	            clickToSearch : true,
	            id : 'earthOffPerson6',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff7 : {
	            clickToSearch : true,
	            id : 'earthOff7',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff7_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson7 : {
	            clickToSearch : true,
	            id : 'earthOffPerson7',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff7_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff8 : {
	            clickToSearch : true,
	            id : 'earthOff8',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff8_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson8 : {
	            clickToSearch : true,
	            id : 'earthOffPerson8',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff8_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff9 : {
	            clickToSearch : true,
	            id : 'earthOff9',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff9_int',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson9 : {
	            clickToSearch : true,
	            id : 'earthOffPerson9',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff9_int_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff10 : {
	            clickToSearch : true,
	            id : 'earthOff10',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff10',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson10 : {
	            clickToSearch : true,
	            id : 'earthOffPerson10',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff10_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff11 : {
	            clickToSearch : true,
	            id : 'earthOff11',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff11',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline',
				paddBottom: true
	        },
	        earthOffPerson11 : {
	            clickToSearch : true,
	            id : 'earthOffPerson11',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff11_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOff12 : {
	            clickToSearch : true,
	            id : 'earthOff12',
	            label : 'Earth Off',
	            name : 'custrecord_mts_intord_earthoff12',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        earthOffPerson12 : {
	            clickToSearch : true,
	            id : 'earthOffPerson12',
	            label : 'Person Interred',
	            name : 'custrecord_mts_intord_earthoff12_dcdt',
	            saveBy : 'value',
	            textIfEmpty : 'Click to search:',
	            type : 'inline'
	        },
	        education : {
	            id : 'education',
	            label : 'Education - highest level',
	            saveBy : 'value',
	            type : 'select'
	        },
	        email : {
	            id : 'email',
	            label : 'Email',
	            name : 'email',
	            saveBy : 'text',
	            type : 'email'
	        },
	        embalming : {
	            id : 'embalming',
	            label : 'Embalming',
	            list : 'yesNo',
	            saveBy : 'value',
	            type : 'select'
	        },
	        enterDeedNumber : {
	            id : 'enterDeedNumber',
	            label : 'Enter Deed number',
	            saveBy : 'value',
	            type : 'text'
	        },
	        entity : {
	            id : 'entity',
	            label : 'Purchaser',
	            name : 'entity',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        entityId : {
	            id : 'entityId',
	            label : 'Client Id',
	            name : 'entityid',
	            saveBy : 'value',
	            type : 'text'
	        },
	        eSign : {
	            buttonLabel : 'eSign Forms',
	            id : 'eSign',
	            label : '',
	            type : 'button'
	        },
	        ethnicity : {
	            id : 'ethnicity',
	            label : 'Ethnicity',
	            saveBy : 'value',
	            type : 'select',
	        },
	        expected : {
	            id : 'expected',
	            label : 'Attendance Expected',
	            name : 'custevent_mts_svc_setup_attnd_expctd',
	            saveBy : 'value',
	            type : 'integer'
	        },
	        familialRelation : {
	            id : 'familialRelation',
	            label : 'Familial Relation',
	            name : 'custrecord_mts_crt_is_relation',
	            saveBy : 'value',
	            type : 'text'
	        },
	        fatherFirstName : {
	            id : 'fatherFirstName',
	            label : 'Father First Name',
	            saveBy : 'value',
	            type : 'text'
	        },
	        fatherMiddleName : {
	            id : 'fatherMiddleName',
	            label : 'Father Middle Name',
	            saveBy : 'value',
	            type : 'text'
	        },
	        fatherLastName : {
	            id : 'fatherLastName',
	            label : 'Father Last Name',
	            saveBy : 'value',
	            type : 'text'
	        },
	        fatherBirthPlace : {
	            id : 'fatherBirthPlace',
	            label : 'Father\'s Birthplace',
	            saveBy : 'value',
	            type : 'text'
	        },
	        firstCallDate : {
	            id : 'firstCallDate',
	            label : 'First Call Date',
	            saveBy : 'value',
	            type : 'date'
	        },
	        firstCallTakenBy : {
	            display : 'text',
	            id : 'firstCallTakenBy',
	            label : 'Taken By',
	            saveBy : 'value',
	            type : 'text'
	        },
	        firstCallTime : {
	            id : 'firstCallTime',
	            label : 'Call Time',
	            saveBy : 'value',
	            type : 'time'
	        },
	        firstName : {
	            id : 'firstName',
	            label : 'First Name',
	            name : 'firstname',
	            saveBy : 'text',
	            type : 'text'
	        },
	        flag : {
	            id : 'flag',
	            label : 'Flag',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        flagDescription : {
	            id : 'flagDescription',
	            label : 'Flag Description',
	            saveBy : 'value',
	            type : 'select'
	        },
	        flowerDisplay : {
	            id : 'flowerDisplay',
	            label : 'Flower display',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        flowersAcceptable : {
	            id : 'flowersAcceptable',
	            label : 'Flowers Acceptable?',
	            list : 'yesNo',
	            saveBy : 'value',
	            type : 'select'
	        },
	        flowersArrangementNumber : {
	            id : 'flowersArrangementNumber'
	        },
	//      flowersDescription : {
	//          id : 'flowersDescription'
	//      },
	        flowersEstimate : {
	            id : 'flowersEstimate',
	            label : 'Estimate',
	            saveBy : 'value',
	            type : 'number'
	        },
	        flowersProvidedBy : {
	            id : 'flowersProvidedBy',
	            label : 'Flowers provided by',
	            saveBy : 'value',
	            type : 'select'
	        },
	        forPBXOnly : {
	            id : 'forPBXOnly',
	            label : 'For PBX',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        fullSpaceName : {
	            display : 'value',
	            id : 'fullSpaceName',
	            label : 'Full Space Name',
	            name : 'custrecord_mts_ps_full_space_name'
	        },
	        gender : {
	            id : 'gender',
	            label : 'Gender',
	            saveBy : 'value',
	            type : 'select'
	        },
	        haveService : {
	            id : 'haveService',
	            label : 'Will there be a service?',
	            saveBy : 'value',
	            type : 'yesno'
	        },
	        hearse : {
	            id : 'hearse',
	            label : 'Hearse/Alternative Vehicle',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        hebrewName : {
	            id : 'hebrewName',
	            label : 'Hebrew Name',
	            saveBy : 'text',
	            type : 'text'
	        },
	        hispanic : {
	            id : 'hispanic',
	            label : 'Hispanic?',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        hispanicSpecify : {
	            id : 'hispanicSpecify',
	            label : 'Hispanic - Please specify',
	            saveBy : 'text',
	            type : 'text'
	        },
	        homeOf : {
	            id : 'homeOf',
	            label : 'Home Of',
	            saveBy : 'value',
	            type : 'text'
	        },
	        honorariumAmount : {
	            id : 'honorariumAmount',
	            label : 'Honorarium Amount',
	            saveBy : 'value',
	            type : 'currency'
	        },
	        honorariumToBeConveyedBy : {
	            id : 'honorariumToBeConveyedBy',
	            label : 'Honorarium to be conveyed by',
	            list : 'msmpFamily',
	            saveBy : 'value',
	            type : 'select',
	        },
	        hours : {
	            id : 'hours',
	            label : 'Hours',
	            name : 'custrecord_mts_mc_age_hours',
	            saveBy : 'value',
	            type : 'number'
	        },
	        immediateFamily : {
	            id : 'immediateFamily',
	            label : 'Immediate Family',
	            type : 'customtable'
	        },
	        info1 : {
	            id : 'info1',
	            label : 'Info 1',
	            name : 'info1',
	            type : 'text'
	        },
	        info2 : {
	            id : 'info2',
	            label : 'Info 2',
	            name : 'info2',
	            type : 'text'
	        },
	        info3 : {
	            id : 'info3',
	            label : 'Info 3',
	            name : 'info3',
	            type : 'text'
	        },
	        interspace : {
	          id : 'interspace',
	          label : 'Interment Space',
	          name : 'interspace',
	          type : 'text'
	        },
	        interspace2 : {
	          id : 'interspace2',
	          label : 'Interment Space',
	          name : 'custentity_mts_inter_space',
			  display: 'value',
	          type : 'text'
	        },
	        informant : {
	            id : 'informant',
	            label : 'Informant',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        informantRelationToDecedent : {
	            id : 'informantRelationToDecedent',
	            label : '',
	            saveBy : 'value',
	            type : 'text'
	        },
	        instructionsForRabbi : {
	            id : 'instructionsForRabbi',
	            label : 'Instructions for Rabbi',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        intendedInteree : {
	            id : 'intendedInteree',
	            label : 'Person Intended to be Interred',
	            name : 'custrecord_mts_ps_intended_interred'
	        },
	        intermentDate : {
	            id : 'intermentDate',
	            label : 'Interment Date',
	            name : 'custrecord_mts_intord_date',
	            saveBy : 'value',
	            type : 'date'
	        },
	        intermentOrder : {
	            id : 'intermentOrder',
	            label : '',
	            name : 'custbody_mts_so_intord_ref',
	            type : 'inline'
	        },
	        intermentOrderServiceRef : {
	            id : 'intermentOrderServiceRef',
	            label : '',
	            name : 'custrecord_mts_intord_svc_ref',
	            saveBy : 'value',
	            type : 'text'
	        },
	        intermentOrderType : {
	            id : 'intermentOrderType',
	            label : 'Order Type',
	            name : 'custrecord_mts_intord_type',
	            saveBy : 'value',
	            type : 'select'
	        },
	        intermentSpace : {
	            id : 'intermentSpace',
	            label : 'Interment Space',
	            name : {
	                client : 'custentity_mts_inter_space',
	                intermentOrder : 'custrecord_mts_intord_space_reference',
	                nearService : 'custevent_mts_svc_intrmnt_loc'
	            },
	            saveBy : 'value',
	            type : 'inline'
	        },
	        intermentType : {
	            id : 'intermentType',
	            label : 'Interment Type',
	            name : 'custevent_mts_svc_inter_type',
	            saveBy : 'value',
	            type : 'select'
	        },
	        isperson : {
	            id : 'isperson',
	            name : 'isperson',
				// saveBy: 'value',
	            type : 'text'
	        },
	        isInformant : {
	            id : 'isInformant',
	            label : 'Informant',
	            saveBy : 'value',
	//          type : 'checkbox'
	            type : 'radio'
	        },
	        isNextOfKin : {
	            id : 'isNextOfKin',
	            label : 'Next of Kin',
	            saveBy : 'value',
	//          type : 'checkbox'
	            type : 'radio'
	        },
	        isPresentAtArrangement : {
	            id : 'isPresentAtArrangement',
	//          label : 'Present at Arrangement',
	            label : 'Present',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        jewishJournalCourtesyAd : {
	            id : 'jewishJournalCourtesyAd',
	            label : 'Jewish Journal courtesy ad',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        jewishJournalDatesOfNotices : {
	            id : 'jewishJournalDatesOfNotices',
	            label : 'Jewish Journal dates of notices',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        jewishJournalEstimatedCharges : {
	            id : 'jewishJournalEstimatedCharges',
	            label : 'Jewish Journal estimated charges',
	            saveBy : 'value',
	            type : 'currency'
	        },
	        jewishJournalNotice : {
	            id : 'jewishJournalNotice',
	            label : 'Jewish Journal Notice',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        kriahRibbon : {
	            id : 'kriahRibbon',
	            label : 'Kr\'iah Ribbon',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        kriahRibbonNotes : {
	            id : 'kriahRibbonNotes',
	            label : 'Kr\'iah Ribbon notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        largeService : {
	            id : 'largeService',
	            label : 'Large service',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        // MHI task 35
	        chairs : {
            id : 'chairs',
            label : '# of Chairs',
            name : 'custevent_mts_svc_chairs',
            saveBy : 'value',
            type : 'number'
	        },
	        tent : {
            id : 'tent',
            label : 'Tent',
            name : 'custevent_mts_svc_tent',
            saveBy : 'value',
            type : 'checkbox'
          },
          // MHI task 35
	        lastName : {
	            id : 'lastName',
	            label : 'Last Name',
	            name : 'lastname',
	            saveBy : 'text',
	            type : 'text'
	        },
	        laTimesCourtesyObituary : {
	            id : 'laTimesCourtesyObituary',
	            label : 'LA Times courtesy obituary',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        laTimesDatesOfNotices : {
	            id : 'laTimesDatesOfNotices',
	            label : 'LA Times dates of notices',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        laTimesEstimatedCharges : {
	            id : 'laTimesEstimatedCharges',
	            label : 'LA Times estimated charges',
	            saveBy : 'value',
	            type : 'currency'
	        },
	        laTimesNotice : {
	            id : 'laTimesNotice',
	            label : 'LA Times Notice',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        linkedClient : {
	            clickToSearch : true,
	            id : 'linkedClient',
	            label : 'Linked Client',
	            name : 'custrecord_mts_cust_rel_linked',
	            saveBy : 'value',
	            textIfEmpty : 'Create/Search',
	            type : 'inline'
	        },
	        location : {
	            id : 'location',
	            label : 'Location',
	            saveBy : 'value',
	            type : 'select'
	        },
	        lodgeOrOrganizationParticipation : {
	            id : 'lodgeOrOrganizationParticipation',
	            label : 'Lodge or organization participation',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        maidenName : {
	                id : 'maidenName',
	                label : 'Maiden Name',
	                name : 'custentity_mts_cust_maiden_name',
	                saveBy : 'value',
	                type : 'text'
	            }, 
	        manualEntry : {
	            id : 'manualEntry',
	            saveBy : 'value',
	            type : 'text'
	        },
	        maritalStatus : {
	            id : 'maritalStatus',
	            label : 'Marital Status at time of death',
	            saveBy : 'value',
	            type : 'select'
	        },
	        memorialCandle : {
	            id : 'memorialCandle',
	            label : 'Memorial Candle',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        memorialCandleAmount : {
	            id : 'memorialCandleAmount',
	            label : '# of candles',
	            saveBy : 'value',
	            type : 'number'
	        },
	        memorialCandleNotes : {
	            id : 'memorialCandleNotes',
	            label : 'Memorial Candle notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        middleName : {
	            id : 'middleName',
	            label : 'Middle Name',
	            name : 'middlename',
	            saveBy : 'text',
	            type : 'text'
	        },
	        minutes : {
	            id : 'minutes',
	            label : 'Minutes',
	            name : 'custrecord_mts_mc_age_mins',
	            saveBy : 'value',
	            type : 'number'
	        },
	        minyanKit : {
	            id : 'minyanKit',
	            label : 'Minyan Kit',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        minyanKitAmount : {
	            id : 'minyanKitAmount',
	            label : '# of kits',
	            saveBy : 'value',
	            type : 'number'
	        },
	        minyanKitNotes : {
	            id : 'minyanKitNotes',
	            label : 'Minyan Kit Notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        mobilePhone : {
	            id : 'mobilePhone',
	            name : 'mobilephone'
	        },
	        months : {
	            id : 'months',
	            label : 'Months',
	            name : 'custrecord_mts_mc_age_months',
	            saveBy : 'value',
	            type : 'number'
	        },
	        mortCase : {
	            id : 'mortCase',
	            label : 'Mortuary Case',
	            name : {
	                intermentOrder : 'custrecord_mts_intord_mort_case_ref',
	                salesOrder : 'custbody_mts_mort_case_ref'
	            },
	            saveBy : 'value',
	            type : 'text'
	        },
	        mortPrep : {
	            id : 'mortPrep',
	            label : 'Mortuary Prep',
	        },
	        mortuary : {
	            id : 'mortuary',
	            label : 'Mortuary',
	            saveBy : 'value',
	            type : 'select'
	        },
	        mortuarySalesContract : {
	            id : 'mortuarySalesContract',
	            saveBy : 'value',
	            type : 'text'
	        },
	        motherFirstName : {
	            id : 'motherFirstName',
	            label : 'Mother First Name',
	            saveBy : 'value',
	            type : 'text'
	        },
	        motherMiddleName : {
	            id : 'motherMiddleName',
	            label : 'Mother Middle Name',
	            saveBy : 'value',
	            type : 'text'
	        },
	        motherLastName : {
	            id : 'motherLastName',
	            label : 'Mother Last Name (Birth Name)',
	            saveBy : 'value',
	            type : 'text'
	        },
	        motherBirthPlace : {
	            id : 'motherBirthPlace',
	            label : 'Mother\'s Birthplace',
	            saveBy : 'value',
	            type : 'text'
	        },
	        mountZionEarth : {
	            id : 'mountZionEarth',
	            label : 'Mount Zion Earth',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        mountZionEarthNotes : {
	            id : 'mountZionEarthNotes',
	            label : 'Mount Zion Earth notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        music : {
	            id : 'music',
	            label : 'Music',
	            list : 'yesNo',
	            saveBy : 'value',
	            type : 'select'
	        },
	        name : {
	            id : 'name',
	            label : 'Name',
	            name : 'name',
	            type : 'text'
	        },
	        nameOfRabbi : {
	            clickToSearch : true,
	            id : 'nameOfRabbi',
	            label : 'Name of Rabbi',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        nextOfKin : {
	            id : 'nextOfKin',
	            label : 'Next of Kin',
	            name : 'custentity_mts_cust_nok',
	            saveBy : 'value',
	            type : 'text'
	        },
	        nextOfKinRelation : {
	            id : 'nextOfKinRelation',
	            label : 'Next of Kin Relation',
	            saveBy : 'value',
	            type : 'text'
	        },
	        noDeed : {
	            buttonLabel : 'Confirm no deed',
	            id : 'noDeed',
	            label : '',
	            type : 'button'
	        },
	        notes : {
	            id : 'notes',
	            label : 'Notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        noticeInObit : {
	            id : 'noticeInObit',
	            label : 'Notice in obit',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        numberGrandchildren : {
	            id : 'numberGrandchildren',
	            label : 'Number of Grandchildren',
	            saveBy : 'value',
	            type : 'number'
	        },
	        numberGreatGrandchildren : {
	            id : 'numberGreatGrandchildren',
	            label : 'Number of Great-Grandchildren',
	            saveBy : 'value',
	            type : 'number'
	        },
	        occupation : {
	            id : 'occupation',
	            label : 'Usual Occupation - Type of work',
	            saveBy : 'text',
	            type : 'text'
	        },
	        openingClosing : {
	            id : 'openingClosing',
	            label : 'Opening / Closing',
	            saveBy : 'value',
	            type : 'select'
	        },
	//      openCloseAmount : {
	//          id : 'openCloseAmount'
	//      },
	        otherNotes : {
	            id : 'otherNotes',
	            label : 'Other Notes (Director\'s Record Notes)',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        originationDate : {
	            id : 'originationDate',
	            label : 'Origination Date',
	            name : 'custbody_mts_trust_orig_date',
	            saveBy : 'value',
	            type : 'date'
	        },
	        // task 50
	        secondLineInterest : {
	          id : 'secondLineInterest',
	          label : 'information',
	          name : 'custbody_mts_trust_2nd_line_refundable',
	          type : 'text',
			  hidden: true
	        },
	        secondLineInterestText : {
            id : 'secondLineInterestText',
            label : '',
            type : 'inline'
          },
	        outsideCasket : {
	            id : 'outsideCasket',
	            label : 'Outside Casket',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        otherContact : {
				id : 'otherContact',
				label : 'Other Contact',
				name : 'custrecord_mts_intord_cntct',
				saveBy : 'text',
		        type : 'text'
	        },
	        otherPhone : {
				id : 'otherPhone',
				label : 'Other Phone',
				name : 'custrecord_mts_intord_cntct_phone',
				saveBy : 'text',
		        type : 'text'
	        },
	        pall : {
	            id : 'pall',
	            label : 'Pall',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        park : {
	            id : 'park',
	            label : 'Park',
	            name : 'location',
	            saveBy : 'value',
	            type : 'select'
	        },
	        personInterred : {
	            id : 'personInterred',
	            label : 'Person Interred',
	            name : 'custrecord_mts_ps_person_interred',
	            type : 'inline'
	        },
	        permanentTemporary : {
	            id : 'permanentTemporary',
	            label : 'Permanent/Temporary',
	            name : 'custrecord_mts_intord_perm_temp',
	            saveBy : 'value',
	            type : 'select'
	        },
	        personInterred : {
	            id : 'personInterred',
	            label : 'Person Interred',
	            name : 'custrecord_mts_ps_person_interred',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        personToMakeId : {
	            id : 'personToMakeId',
	            label : 'Person to make ID',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        phone : {
	            id : 'phone',
	            label : 'Phone',
	            name : 'phone',
	            saveBy : 'text',
	            type : 'tel'
	        },
	        placeOfBirth : {
	            id : 'placeOfBirth',
	            label : 'Birth State/Foreign Country',
	            list : 'countryInBook',
	            saveBy : 'text',
	            type : 'select'
	        },
	        placeOfDeath : {
	            id : 'placeOfDeath',
	            label : 'Place of Death',
	            list : 'customlist_mts_mc_place_of_death',
	            name : 'custrecordmts_mc_place_of_death',
	            saveBy : 'value',
	            type : 'select'
	        },
	        postNeed : {
	            id : 'postNeed',
	            label : 'Post-need service?',
	            saveBy : 'value',
	            type : 'yesno'
	        },
	        prefersDonationsTo : {
	            id : 'prefersDonationsTo',
	            label : 'Family prefers donations to',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        priceEstimate : {
	            id : 'priceEstimate',
	            label : 'Price estimate',
	            saveBy : 'value',
	            type : 'currency'
	        },
	        primaryClient : {
	            display : 'text',
	            id : 'primaryClient',
	            label : 'Primary Client',
	            name : 'custrecord_mts_cust_rel_primary',
	            saveBy : 'value',
	            type : 'text'
	        },
	        private : {
	            id : 'private',
	            label : 'Private?',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        propertyContract : {
	            id : 'propertyContract',
	            name : 'custrecord_mts_intord_prop_cntrct_ref',
	            type : 'text'
	        },
	        propertyMap : {
	            id : 'propertyMap',
	            label : 'Map',
	            name : 'custrecord_mts_ps_map',
	        },
	        propertyNotYetPurchased : {
	            buttonLabel : 'Property Not Yet Purchased / Select Later',
	            id : 'propertyNotYetPurchased',
	            label : '',
	            type : 'button'
	        },
	        propertyTable : {
	            id : 'propertyTable',
	            saveBy : 'value',
	            table : 'propertySpace',
	            type : 'radiotable'
	        },
	        propertyType : {
	            id : 'propertyType',
	            label : 'Type',
	            name : 'custrecord_mts_ps_prop_type',
	            type : 'inline'
	        },
	        propertyUnit : {
	            display : 'text',
	            id : 'propertyUnit',
	            label : 'Unit',
	            name : {
	                propertySpace : 'custrecord_mts_ps_unit',
	                transaction : 'custcol_mts_property_unit'
	            },
	            saveBy : 'value',
	        },
	        purchaser : {
	            display : 'text',
	            id : 'purchaser',
	            label : 'Purchaser',
	            name : {
	                intermentOrder : 'custrecord_mts_intord_prop_purchaser',
	                propertySearch : 'custrecord_mts_ps_purchaser',
	                propertySpace : 'custrecord_mts_ps_purchaser',
	                propertyUnit : 'custrecord_mts_pu_purchaser',
	                salesOrder : 'entity'
	            },
	            saveBy : 'value',
	            type : 'inline'
	        },
	        purchaserRelationship : {
	            id : 'purchaserRelationship',
	            label : 'Relationship to Property Owner',
	            name : {
	                intermentOrder : 'custrecord_mts_intord_nok_rltn_to_prpown',
	                salesOrder : 'custbody_mts_so_prchsr_rltn_to_decd'
	            },
	            saveBy : 'value',
	            type : 'select'
	        },
	        rabbiConfirmed : {
	            id : 'rabbiConfirmed',
	            label : 'Rabbi Confirmed?',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        rabbiReservationPhone : {
	            id : 'rabbiReservationPhone',
	            label : 'Rabbi / Reservation Phone',
	            saveBy : 'value',
	            type : 'tel'
	        },
	        rabbiSearchInfo1 : {
	            id : 'info1',
	            name : 'email'
	        },
	        rabbiSearchInfo2 : {
	            id : 'info2',
	            name : 'phone'
	        },
	        rabbiSearchName : {
	            id : 'name',
	            name : 'altname'
	        },
	        rabbiSearchType : {
	            constant : 'Client',
	            id : 'type',
	//          name : 'type'
	        },
	        rabbiToBeArrangedBy : {
	            id : 'rabbiToBeArrangedBy',
	            label : 'Rabbi to be arranged by',
	            list : 'msmpFamily',
	            saveBy : 'value',
	            type : 'select'
	        },
	        reasonForComing : {
	            id : 'reasonForComing',
	            label : 'Reason for coming to Mount Sinai',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        receiveAfter : {
	            id : 'receiveAfter',
	            label : 'Receive after?',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        reciprocalRelationship : {
	            id : 'reciprocalRelationship',
	            label : 'Reciprocal',
	            name : 'custrecord_mts_cust_rel_recip_row',
	            saveBy : 'value',
	            type : 'text'
	        },
	        reciprocalRelationshipType : {
	            id : 'reciprocalRelationshipType',
	            label : 'Reciprocal Relationship',
	            saveBy : 'value',
	            type : 'text'
	        },
	        relationshipType : {
	            display : 'text',
	            id : 'relationshipType',
	            label : 'Relationship Type',
	            name : 'custrecord_mst_cust_rel_type',
	            saveBy : 'value',
	            type : 'select'
	        },
	        relationToDecedent : {
	            id : 'relationToDecedent',
	            label : 'Relation to Deceased',
	            name : 'custrecord_mst_cust_rel_type',
	            saveBy : 'value',
	            type : 'select'
	        },
	        relationToPrimaryClient : {
	            id : 'relationToPrimaryClient',
	            label : 'Relationship',
	            list : 'relationship',
	            name : 'custrecord_mts_rltn_to_prmry_clnt',
	            saveBy : 'value',
	            type : 'select'
	        },
			religion : {
	            id : 'religion',
	            label : 'Religion',
	            saveBy : 'value',
	            type : 'select',
	        },
	        remarks : {
	            id : 'remarks',
	            label : 'Remarks (offices held - Temple, club, civic, etc.)',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        rescheduleService : {
	            buttonLabel : 'Reschedule Service',
	            id : 'rescheduleService',
	            label : '',
	            type : 'button'
	        },
	        resourcePark : {
	            id : 'resourcePark',
	            name : 'custrecord_mts_sr_park'
	        },
	        returnToSearch : {
	            buttonLabel : 'Return to search',
	            id : 'returnToSearch',
	            label : '',
	            type : 'button'
	        },

				role: {
	            id : 'role',
	            label : 'Role',
	            name : 'customlist_mts_cust_role_type',
	            saveBy : 'value',
	            type : 'value'
	        },


	        runCRE : {
	            buttonLabel : 'Print Forms',
	            id : 'runCRE',
	            label : '',
	            type : 'button'
	        },
					runMap : {
						buttonLabel : 'Print Map',
						id : 'runMap',
						label : '',
						type : 'button'
				},
	        salesRep : {
	            display : 'text',
	            id : 'salesRep',
	            label : 'Sales Rep',
	            name : 'salesrep'
	        },
	        sameAsDecedents : {
	            buttonLabel : 'Same as Decedent\'s',
	            id : 'sameAsDecedents',
	            label : '',
	            type : 'button'
	        },
	        saveSubscreen : {
	            buttonLabel : 'Save',
	            id : 'saveSubscreen',
	            label : '',
	            type : 'button'
	        },
	        scheduleDate : {
	            id : 'scheduleDate',
	            label : 'Show availability for date:',
	            type : 'date'
	        },
	//      scheduleLabel : {
	//          id : 'scheduleLabel',
	//          isInline : true,
	//          text : 'Please choose an available time:'
	//      },
	        noService : {
	            id : 'noService',
	            label : 'No Service',
	            type : 'checkbox'
	        },
	        scheduleToBeDetermined : {
	            id : 'scheduleToBeDetermined',
	            label : 'Date TBD',
	            name : 'custevent_mts_service_date_tbd',
	            type : 'checkbox'
	        },
	        scheduleMonths : {
	            id : 'scheduleMonths',
	            label : 'Show availability for the following number of months:',
	            type : 'select'
	        },
	        searchBox : {
	            id : 'searchBox',
	            label : 'Enter keywords:',
	            saveBy : 'value',
	            type : 'searchtext'
	        },
	        searchBoxFamily : {
	            id : 'searchBoxFamily',
	            label : 'Enter keywords:',
	            saveBy : 'value',
	            type : 'searchtext'
	        },
	        searchButton : {
	            buttonLabel : 'Search',
	            id : 'searchButton',
	            label : '',
	            type : 'button'
	        },
	        searchConfirm : {
	            buttonLabel : 'Confirm',
	            id : 'searchConfirm',
	            label : '',
	            type : 'button'
	        },
	        searchResults : {
	            id : 'searchResults',
	            label : '',
	            saveBy : 'value',
	            table : 'search',
	            type : 'customtable'
	        },
	        searchResultsFamily : {
	            id : 'searchResultsFamily',
	            label : '',
	            saveBy : 'value',
	            table : 'searchFamily',
	            type : 'customtable'
	        },
	        service : {
	            id : 'service',
	            label : 'Service',
	//          name : 'custentity_mts_service',
	            name : 'custbody_mts_so_svc_ref',
	            saveBy : 'value',
	            type : 'text'
	        },
	        serviceDate : {
	            id : 'serviceDate',
	            label : 'Service Date',
				name: 'startdate',
	            saveBy : 'value',
	            type : 'date'
	        },
	        serviceEndTime : {
	            id : 'serviceEndTime',
	            label : 'Service End Time',
	            saveBy : 'value',
	            type : 'time'
	        },
	        serviceLocation : {
	            id : 'serviceLocation',
	            label : 'Service Location',
	            saveBy : 'value',
	            type : 'select'
	        },
	        serviceOrder : {
	            id : 'serviceOrder',
	            label : 'Service Order',
	            saveBy : 'value',
	            type : 'select'
	        },
	//      serviceRef : {
	//          id : 'serviceRef',
	//          name : 'custbody_mts_so_svc_ref',
	//          saveBy : 'value'
	//      }
	        serviceSheetInstructions : {
	            id : 'serviceSheetInstructions',
	            name : 'custrecord_mts_intord_svc_sheet_instr',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        serviceStartTime : {
	            id : 'serviceStartTime',
	            label : 'Service Time',
	            saveBy : 'value',
	            type : 'time'
	        },
	        serviceStatus : {
	            id : 'serviceStatus',
	            label : 'Status',
	            saveBy : 'value',
	            type : 'select'
	        },
	        serviceType : {
	            id : 'serviceType',
	            label : 'Service Type',
	            saveBy : 'value',
	        },
			serviceTypeList : {
	            id : 'serviceTypeList',
	            label : 'Service Type',
	            name : 'custevent_mts_svc_type_old',
	            saveBy : 'value',
	            type : 'select'
	        },
	        shippingAddress : {
	            id : 'shippingAddress',
	            label : 'Mailing Address',
	            name : 'shipaddress',
	            saveBy : 'value',
	            textIfEmpty : this.CONSTANT.clickToEnter,
	            type : 'inline'
	        },
	        shmira : {
	            id : 'shmira',
	            label : 'Sh\'mira',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        shmiraHours : {
	            id : 'shmiraHours',
	            label : 'Sh\'mira hours',
	            saveBy : 'value',
	            type : 'number'
	        },
	        shmiraNotes : {
	            id : 'shmiraNotes',
	            label : 'Sh\'mira notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        shmiraPrice : {
	            id : 'shmiraPrice',
	            label : 'Price',
	            type : 'inline'
	        },
	        shmiraTotalPrice : {
	            id : 'shmiraTotalPrice',
	            label : 'Sh\'mira Total Price',
	            type : 'inline'
	        },
	        showMore : {
	            clickToSearch : true,
	            id : 'showMore',
	            label : '',
	            text : 'Show More',
	            type : 'inline'
	        },
	        slumberCasket : {
	            id : 'slumberCasket',
	            label : 'Casket',
	            list : 'casket',
	            saveBy : 'value',
	            type : 'select'
	        },
	        slumberRoomVisitation : {
	            id : 'slumberRoomVisitation',
	            label : 'Slumber room visitation',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        specialInstructions : {
	            id : 'specialInstructions',
	            label : 'Special Instructions (Interment Order Notes)',
	            name : 'custrecord_mts_intord_spcl_instrctns',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        specialRequest : {
	            id : 'specialRequest',
	            label : 'Special Request',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        spouse : {
	            clickToSearch : true,
	            id : 'spouse',
	            label : 'Spouse',
	            name : 'custentity_mts_cust_spouse',
	            saveBy : 'value',
	            textIfEmpty : 'Create/Search',
	            type : 'inline'
	        },
	        ssn : {
	            id : 'ssn',
	            label : 'Social Security Number',
	            saveBy : 'value',
	            showCount : 4,
	            showHide : true,
	//          type : 'inline'
	            type : 'text'
	        },
	        staff : {
	            id : 'staff',
	            label : 'Staff',
	            saveBy : 'value',
	            type : 'select'
	        },
	        standardPreparation : {
	            id : 'standardPreparation',
	            label : 'Standard Preparation',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        startTime : {
	            id : 'startTime',
	            name : 'starttime'
	        },
	        state : {
	            id : 'state',
	            name : 'state'
	        },
	        stateDropDown : {
	            id : 'stateDropDown',
	            label : 'State',
	            name : 'dropdownstate',
	            saveBy : 'value',
	            sublist : 'addressbook',
	            type : 'select'
	        },
	        stateText : {
	            id : 'stateText',
	            label : 'State/Province',
	            name : 'state',
	            saveBy : 'value',
	            sublist : 'addressbook',
	            type : 'text'
	        },
	        tachrichim : {
	            id : 'tachrichim',
	            label : 'Tachrichim',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        tachrichimCotton : {
	            id : 'tachrichimCotton',
	            label : 'Tachrichim (Cotton)',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        tachrichimCottonNotes : {
	            id : 'tachrichimCottonNotes'
	        },
	        tachrichimLinen : {
	            id : 'tachrichimLinen',
	            label : 'Tachrichim (Linen)',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        tachrichimLinenNotes : {
	            id : 'tachrichimLinenNotes'
	        },
	        tachrichimMaterial : {
	            id : 'tachrichimMaterial',
	            label : 'Tachrichim Material',
	            radioList : [
	                {
	                    text : 'Cotton',
	                    value : 'cotton'
	                },
	                {
	                    text : 'Linen',
	                    value : 'linen'
	                }
	            ],
	            saveBy : 'value',
	            type : 'radio'
	        },
	        tachrichimNotes : {
	            id : 'tachrichimNotes',
	            label : 'Tachrichim notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        tachrichimPriceCotton : {
	            id : 'tachrichimPriceCotton',
	            label : 'Price Cotton',
	            type : 'inline'
	        },
	        tachrichimPriceLinen : {
	            id : 'tachrichimPriceLinen',
	            label : 'Price Linen',
	            type : 'inline'
	        },
	        tahara : {
	            id : 'tahara',
	            label : 'Tahara',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        taharaNotes : {
	            id : 'taharaNotes',
	            label : 'Tahara notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        taharaPrice : {
	            id : 'taharaPrice',
	            label : 'Price',
	            type : 'inline'
	        },
	        tallit : {
	            id : 'tallit',
	            label : 'Tallit',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        tallitPrice : {
	            id : 'tallitPrice',
	            label : 'Price',
	            type : 'inline'
	        },
	        tallitNotes : {
	            id : 'tallitNotes',
	            label : 'Tallit notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        templePhone : {
	            id : 'templePhone',
	            label : 'Temple Phone',
	            saveBy : 'value',
	            type : 'tel'
	        },
	        test : {
	            buttonLabel : 'Test',
	            id : 'test',
	            label : '',
	            type : 'button'
	        },
	        title : {
	            id : 'title',
	            label : 'Title',
	            saveBy : 'text',
	            type : 'text'
	        },
	        timeOfDeath : {
	            id : 'timeOfDeath',
	            label : 'Time of Death',
	            name : 'custrecord_mts_mc_tod',
	            saveBy : 'value',
	            type : 'text'
	        },
	        timeSlotDate : {
	            id : 'timeSlotDate',
	            isInline : true,
	            name : 'custrecord_mts_sts_date'
	        },
	        timeSlotEndTime : {
	            id : 'timeSlotEndTime',
	            isInline : true,
	            name : 'custrecord_mts_sts_end_time'
	        },
	        timeSlotServiceReference : {
	            id : 'timeSlotServiceReference',
	            name : 'custrecord_mts_sts_svc_ref'
	        },
	        timeSlotReserved : {
	            id : 'timeSlotReserved',
	            name : 'custrecord_mts_sts_rsvd_for_dcdt'
	        },
	        timeSlotStartTime : {
	            id : 'timeSlotStartTime',
	            isInline : true,
	            name : 'custrecord_mts_sts_start_time'
	        },
	        timeSlotResource : {
	            id : 'timeSlotResource',
	            isInline : true,
	            name : 'custrecord_mts_sts_resource'
	        },
	        total : {
	            id : 'total',
	            label : 'Total',
	            name : 'total'
	        },
	        // task 24
	        itemGroup : {
  	          id : 'itemGroup',
  	          label : 'Item Group',
  	          saveBy : 'value',
  	          type : 'select'
	        },
	        transferOfRemains : {
	            id : 'transferOfRemains',
	            label : 'Transfer of Remains',
	            saveBy : 'value',
	            type : 'select'
	        },
	        trust : {
	            id : 'trust',
	            label : 'Trust',
	            name : 'custevent_mts_svc_trust_ref',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        trustId : {
	            id : 'trustId',
	            label : 'Trust ID',
	            name : 'tranid',
	            type : 'text'
	        },
	        trustor : {
	            display : 'text',
	            id : 'trustor',
	            label : 'Trustor',
	            name : 'entity',
	            saveBy : 'value',
	            type : 'inline'
	        },
	        trustTable : {
	            id : 'trustTable',
	            label : 'Confirm trust',
	            saveBy : 'value',
	            table : 'trust',
	            type : 'radiotable'
	        },
	        type : {
	            id : 'type',
	            label : 'Type',
	            name : 'type',
	            type : 'text'
	        },
	        vault : {
	            id : 'vault',
	            label : 'Vault',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	//      vaultAmount : {
	//          id : 'vaultAmount'
	//      },
	        veteran : {
	            id : 'veteran',
	            label : 'U.S. Veteran?',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        websiteEmail1 : {
	            id : 'websiteEmail1',
	            label : 'Email link to (1)',
	            saveBy : 'value',
	            type : 'email'
	        },
	        websiteEmail2 : {
	            id : 'websiteEmail2',
	            label : 'Email link to (2)',
	            saveBy : 'value',
	            type : 'email'
	        },
	        websiteEmail3 : {
	            id : 'websiteEmail3',
	            label : 'Email link to (3)',
	            saveBy : 'value',
	            type : 'email'
	        },
	        websiteJewishGenealogy : {
	            id : 'websiteJewishGenealogy',
	            label : 'Jewish Genealogy',
	            list : 'yesNo',
	            saveBy : 'value',
	            type : 'select',
	        },
	        websitePassword : {
	            id : 'websitePassword',
	            label : 'Password',
	            saveBy : 'value',
	            type : 'text'
	        },
	        websitePostInfo : {
	            id : 'websitePostInfo',
	            label : 'Post info on website',
	            list : 'yesNo',
	            saveBy : 'value',
	            type : 'select',
	        },
	        websiteVisitorsCanPost : {
	            id : 'websiteVisitorsCanPost',
	            label : 'Visitors can post',
	            list : 'yesNo',
	            saveBy : 'value',
	            type : 'select',
	        },
	        websiteWebcast : {
	            id : 'websiteWebcast',
	            label : 'Webcast service',
	            list : 'websiteWebcastList',
	            saveBy : 'value',
	            type : 'select',
	        },
	        wizardNotes : {
	            id : 'wizardNotes',
	            label : 'Notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        yahrzeitCalendar : {
	            id : 'yahrzeitCalendar',
	            label : 'Yahrzeit Calendar',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        yahrzeitCalendarAmount : {
	            id : 'yahrzeitCalendarAmount',
	            label : '# of Yahrzeit Calendars',
	            saveBy : 'value',
	            type : 'number'
	        },
	        yahrzeitCalendarNotes : {
	            id : 'yahrzeitCalendarNotes',
	            label : 'Yahrzeit Calendar Notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        yahrzeitDate : {
	            id : 'yahrzeitDate',
	            label : 'Yahrzeit Date',
	            saveBy : 'value',
	            type : 'date',
	        },
	        yarmulke : {
	            id : 'yarmulke',
	            label : 'Yarmulke',
	            name : 'custevent_mts_svc_yarmulke',
	            saveBy : 'value',
	            type : 'checkbox'
	        },
	        yarmulkeNotes : {
	            id : 'yarmulkeNotes',
	            label : 'Yarmulke notes',
	            name : 'custevent_mts_svc_yrmlk_notes',
	            saveBy : 'value',
	            type : 'textarea'
	        },
	        yearsInCounty : {
	            id : 'yearsInCounty',
	            label : 'Years In County',
	            saveBy : 'value',
	            type : 'number'
	        },
	        yearsInOffice : {
	            id : 'yearsInOffice',
	            label : 'Years in Occupation',
	            saveBy : 'value',
	            type : 'number'
	        },
	        zip : {
	            id : 'zip',
	            label : 'Zip',
	            name : 'zip',
	            saveBy : 'text',
	            sublist : 'addressbook',
	            type : 'text'
	        },
	        zipcode : {
	            id : 'zipcode',
	            name : 'zipcode'
	        },
	    };
	
	    function resolveName(entityName, fieldId) {
	//      log(entityName, fieldId);
	        return lib.objMap(this.FIELD[fieldId], function(val, id) {
	            if ((id == 'name') && (typeof val == 'object'))
	                return val[entityName];
	            else
	                return val;
	        });
	    }
	
	    this.ENTITY = lib.objMap({
	        decedent : [],
	        intermentOrder : [
	            'decedent',
				'intermentInstruction',
	            'earthOffPerson1',
	            'earthOff1',
	            'earthOffPerson2',
	            'earthOff2',
	            'earthOffPerson3',
	            'earthOff3',
	            'earthOffPerson4',
	            'earthOff4',
	            'earthOffPerson5',
	            'earthOff5',
	            'earthOffPerson6',
	            'earthOff6',
	            'earthOffPerson7',
	            'earthOff7',
	            'earthOffPerson8',
	            'earthOff8',
	            'earthOffPerson9',
	            'earthOff9',
	            'earthOffPerson10',
	            'earthOff10',
	            'earthOffPerson11',
	            'earthOff11',
	            'earthOffPerson12',
	            'earthOff12',
	            'intermentDate',
	            'intermentOrderServiceRef',
	            'intermentOrderType',
	            'intermentSpace',
				'casketSize',
	            'mortCase',
	            'otherContact',
	            'otherPhone',
	            'permanentTemporary',
	            'propertyContract',
	            'purchaser',
	            'purchaserRelationship',
	            'serviceSheetInstructions',
	            'specialInstructions'
	        ],
	        linkedClient : [
	//          'altName',
	            'entityId',
	            'firstName',
	            'lastName',
	            'middleName',
	            'maidenName',
	            // 'shippingAddress',
	//          'address',
	            'addressLine1',
	            'addressLine2',
	            'cityInBook',
	            'countryInBook',
	            'stateDropDown',
	            'stateText',
				'dateOfBirth',
	            'zip',
	            'phone',
	            'email'
	        ],
	        outsideCemetery : [
	            'entityId',
	            'cemeteryCompanyName',
				'isperson',
	            'phone',
	            'category',
				'addressLine1',
	            'addressLine2',
	            'cityInBook',
	            'countryInBook',
	            'stateDropDown',
	            'stateText',
	            'zip',
	        ],
	        mortCase : [],
	        mortPrep : [],
	        rabbi : [
	            'entityId',
	            'firstName',
	            'lastName',
	            'mobilePhone',
	            'phone',
	            'category'
	        ],
	        salesOrder : [
	            'contractNumber',
	            'contractType',
	            'customForm',
	            'decedent',
	            'entity',
	            'intermentOrder',
	            'mortCase',
	            'park',
	            'purchaser',
	            'purchaserRelationship',
	            'service'
	        ],
	        service : [],
	        spouse : [
	            'entityId',
	            'firstName',
	            'middleName',
	            'lastName',
	            'maidenName'
	        ]
	    }, function(columns, entityName) {
	        return columns.map(resolveName.bind(this, entityName));
	    }, this);
	
	    this.SEARCH_COLUMNS = lib.objMap({
			service : [
				'scheduleToBeDetermined'
			],
	        deed : [
				'deedNumber',
	            'deedPropertyUnit',
	            'deedHolders',
	            'deedDateIssued',
	            'deedContractReference',
	        ],
			earthOffClient: [
				'entityId',
				'altName',
				'interspace2'
			],
	        immediateFamily : [
	            'linkedClient',
	            'linkedClient.altName',
	            'relationshipType',
	            'relationToPrimaryClient',
	            'reciprocalRelationship',
	            'additionalInfo',
	            'linkedClient.shippingAddress',
	            'linkedClient.phone',
	            'linkedClient.email',
	            'linkedClient.address1',
	            'linkedClient.address2',
	            'linkedClient.city',
	            'linkedClient.state',
	            'linkedClient.zipcode',
	            'linkedClient.country',
	            'linkedClient.spouse',
				'linkedClient.dateOfBirth'
	        ],
	        invoice : [
	            'amountRemainingTotalBox'
	        ],
	        linkedClient : [
	            'altName',
	            'email',
	            'phone',
				'dateOfBirth',
	            'shippingAddress'
	        ],
	        nearService : [
	            'timeSlotServiceReference',
	            'timeSlotServiceReference.intermentSpace',
	            'timeSlotServiceReference.startTime'
	        ],
	        propertySearch : [
	            'name',
	            'propertyType',
	            'purchaser'
	        ],
	        propertySpace : [
	            'fullSpaceName',
	            'purchaser',
	            'intendedInteree.salesRep',
	            'propertyUnit',
	            'propertyMap'
	        ],
	        rabbiSearch : [
	            'rabbiSearchName',
	            'rabbiSearchType',
	            'rabbiSearchInfo1',
	            'rabbiSearchInfo2'
	        ],
	        outsideCemetery : [
	            'rabbiSearchName',
	            'rabbiSearchType',
	            'rabbiSearchInfo1',
	            'rabbiSearchInfo2'
				
	            // 'entityId',
	            // // 'cemeteryCompanyName',
	            // 'phone',
	            // 'category',
				// 'addressLine1',
	            // 'addressLine2',
	            // 'cityInBook',
	            // 'countryInBook',
	            // 'stateDropDown',
	            // 'stateText',
	            // 'zip',
	        ],
	        reciprocal : [
	            'primaryClient',
	            'relationshipType',
	            'linkedClient',
	            'relationToPrimaryClient',
	            'reciprocalRelationship'
	        ],
	        relationshipTo : [
	            'primaryClient',
	            'relationshipType',
	            'linkedClient',
	            'relationToPrimaryClient',
	            'reciprocalRelationship'
	        ],
	        relationshipType : [],
	        search : [
	            'name',
	            'type',
	            'info1',
	            'info2',
				// 'info3',
	            'interspace'// MHI add
	        ],
			searchFamily: [
	            'altName',
	            'email',
	            'phone',
				'dateOfBirth',
	            'shippingAddress'
			],
	        timeSlot : [
	            'timeSlotDate',
	            'timeSlotStartTime',
	//          'timeSlotEndTime',
	            'timeSlotResource'
	        ],
	        trust : [
	            'trustId',
	            'originationDate',
	            'trustor',
	            'designatedBeneficiary',
	            'total',
	            'secondLineInterest', // task 50

	        ],
	        unitSalesOrder : [
	            'entity',
	            'dateCreated'
	        ]
	    }, function(columns, entityName) {
	        return columns.map(function(fieldId) {
	            if (fieldId.includes('.')) {
	                var arr = fieldId.split('.');
	                var join = arr[0];
	                fieldId = arr[1];
	            }
	
	            var field = resolveName.call(this, entityName, fieldId);
	
	            if (join)
	                field.join = this.FIELD[join].name;
	
	            return field;
	        }, this);
	    }, this);
	
	    this.TABLE_DEF = lib.objMap({
	        deed : [
				'deedNumber',
	            'deedPropertyUnit',
	            'deedHolders',
	            'deedDateIssued',
	            'deedContractReference'
	        ],
			earthOffClient: [
				'name',
				'interspace'
			],
	        immediateFamily : [
	            'altName',
	            'relationToPrimaryClient',
	            'spouse',
	            'shippingAddress',
	            'phone',
	            'email',
				'dateOfBirth',
	            'additionalInfo',
	            'isPresentAtArrangement',
	            'isInformant',
	            'isNextOfKin'
	        ],
	        propertySpace : [
	            'fullSpaceName',
	            'purchaser',
	            'salesRep',
	            'propertyUnit',
	            'amountRemaining'
	        ],
	        search : [
	            'name',
	            'type',
	            'info1',
	            'info2',
				// 'info3',
	            'interspace'// MHI add
	        ],
			searchFamily: [
	            'altName',
	            'email',
	            'phone',
				'dateOfBirth',
	            'shippingAddress'
			],
	        trust : [
	            'trustId',
	            'originationDate',
	            'trustor',
	            'designatedBeneficiary',
	            'total',
	            'secondLineInterest'
	        ]
	    }, function(columns, entityName) {
	        return columns.map(function(fieldId) {
	            return resolveName.call(this, entityName, fieldId);
	        }, this);
	    }, this);
	
	    this.SECTION_DEF = {
	        casket : {
	            firstScreen : 'casket',
	            id : 'casket',
	            label : 'Casket',
	            // nextSection : 'certifiedCopies',
				nextSection: 'documents',
	            screens : {
	                casket : {
	                    fields : [
	                        {
	                            id : 'embalming'
	                        },
	                        {
	                            hidden : true,
	                            id : 'authorizedBy'
	                        },
	                        {
	                            id : 'personToMakeId'
	                        },
	                        {
	                            id : 'openingClosing' //
	                        },
	                        {
	                            id : 'vault' //
	                        },
	                        {
	                            id : 'casket'
	                        },
	                        {
	                            id : 'casketSize'
	                        },
	                        {
	                            id : 'outsideCasket' //
	                        },
	                        {
	                            id : 'casketInChapelPrior'
	                        },
	                        {
	                            id : 'casketInChapelAfter'
	                        },
	//                      {
	//                          double : true,
	//                          left : {
	//                              id : 'casketLowered'
	//                          },
	//                          right : {
	//                              id : 'directorInquiry'
	//                          }
	//                      },
	                        {
								id : 'chairs'
							},
							{
								id : 'tent'
							},
	                        {
	                            id : 'pall'
	                        },
	                        {
	                            id : 'flag' //
	                        },
	                        {
	                            hidden : true,
	                            id : 'flagDescription'
	                        }
	                    ],
	                    id : 'casket',
	                    label : 'Casket',
	                   nextScreen : 'nextSection'
	                }
	            }
	        },
	        decedent : {
	            firstScreen : 'vitals1',
	//          firstScreen : 'vitals2',
	//          firstScreen : 'vitals3',
	//          firstScreen : 'decedentsResidence',
	//          firstScreen : 'workEducation',
	            id : 'decedent',
	            label : 'Decedent',
	            nextSection : 'family',
	            screens : {
	                decedentsResidence : {
	                    fields : [
	                        {
	                            destination : 'decedent',
	                            id : 'countryInBook',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'addressLine1',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'addressLine2',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'cityInBook',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'stateDropDown',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'stateText',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'zip',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'county',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'yearsInCounty',
	                            source : 'decedent'
	                        }
	                    ],
	                    id : 'decedentsResidence',
	                    label : 'Decedent\'s Residence',
						nextScreen: 'spouseAndParents'
	                },
	                // fatherParent : {
	                //     fields : [
	                //         {
	                //             destination : 'decedent',
	                //             id : 'fatherFirstName',
	                //             source : 'decedent'
	                //         },
	                //         {
	                //             destination : 'decedent',
	                //             id : 'fatherMiddleName',
	                //             source : 'decedent'
	                //         },
	                //         {
	                //             destination : 'decedent',
	                //             id : 'fatherLastName',
	                //             source : 'decedent'
	                //         },
	                //         {
	                //             destination : 'decedent',
	                //             id : 'fatherBirthPlace',
	                //             source : 'decedent'
	                //         }
	                //     ],
	                //     id : 'fatherParent',
	                //     label : 'Father / Parent',
	                //     nextScreen : 'motherParent'
	                // },
	                // motherParent : {
	                //     fields : [
	                //         {
	                //             destination : 'decedent',
	                //             id : 'motherFirstName',
	                //             source : 'decedent'
	                //         },
	                //         {
	                //             destination : 'decedent',
	                //             id : 'motherMiddleName',
	                //             source : 'decedent'
	                //         },
	                //         {
	                //             destination : 'decedent',
	                //             id : 'motherLastName',
	                //             source : 'decedent'
	                //         },
	                //         {
	                //             destination : 'decedent',
	                //             id : 'motherBirthPlace',
	                //             source : 'decedent'
	                //         }
	                //     ],
	                //     id : 'motherParent',
	                //     label : 'Mother / Parent',
	                //     nextScreen : 'nextSection'
	                // },
	                placeOfDeath : {
	                    fields : [
	                        {
	                            destination : 'mortCase',
	                            id : 'placeOfDeath',
	                            source : 'mortCase'
	                        }
	                    ],
	                    id : 'placeOfDeath',
	                    label : 'Place Of Death',
	                    nextScreen : 'nextSection'
	                },
	                // survivingSpouse : {
	                //     fields : [
	                //         {
	                //             destination : 'spouse',
	                //             id : 'firstName',
	                //             source : 'spouse'
	                //         },
	                //         {
	                //             destination : 'spouse',
	                //             id : 'middleName',
	                //             source : 'spouse'
	                //         },
	                //         {
	                //             destination : 'spouse',
	                //             id : 'lastName',
	                //             source : 'spouse'
	                //         },
	                //         {
	                //             destination : 'spouse',
	                //             id : 'maidenName',
	                //             source : 'spouse'
	                //         },
	                //     ],
	                //     id : 'survivingSpouse',
	                //     label : 'Surviving Spouse',
	                //     nextScreen : 'fatherParent'
	                // },
					spouseAndParents: {
						fields: [
							{
	                            destination : 'spouse',
	                            id : 'firstName',
	                            source : 'spouse',
								label: 'Spouse First Name'
	                        },
	                        {
	                            destination : 'spouse',
	                            id : 'middleName',
	                            source : 'spouse',
								label: 'Spouse Middle Name'
	                        },
	                        {
	                            destination : 'spouse',
	                            id : 'lastName',
	                            source : 'spouse',
								label: 'Spouse Last Name'
	                        },
	                        {
	                            destination : 'spouse',
	                            id : 'maidenName',
	                            source : 'spouse',
								label: 'Spouse Maiden Name',
								paddBottom: true
	                        },
							{
	                            destination : 'decedent',
	                            id : 'fatherFirstName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'fatherMiddleName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'fatherLastName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'fatherBirthPlace',
	                            source : 'decedent',
								paddBottom: true
	                        },
							{
	                            destination : 'decedent',
	                            id : 'motherFirstName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'motherMiddleName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'motherLastName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'motherBirthPlace',
	                            source : 'decedent'
	                        }
						],
						id: 'spouseAndParents',
						label: 'Spouse and Parents',
						nextScreen: 'nextSection'
					},
	                vitals1 : {
	                    fields : [
	                        {
	                            destination : 'service',
	                            id : 'arrangementsMode',
	                            mandatory : true,
	                            source : 'service'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'firstName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'middleName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'lastName',
	                            mandatory : true,
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'alsoKnownAs',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'displayName',
	                            source : 'service'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'hebrewName',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'dateOfBirth',
	                            mandatory : true,
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'dateOfDeath',
	                            mandatory : true,
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'mortCase',
	                            id : 'timeOfDeath',
	                            source : 'mortCase'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'gender',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'placeOfBirth',
	                            source : 'decedent'
	                        },
	                        {
	//                          destination : 'service',
	                            destination : 'decedent',
	                            id : 'birthState',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'maritalStatus',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            hidden : true,
	                            id : 'spouse',
	                            source : 'decedent',
	                        },
	                        {
	//                          destination : 'service',
	                            destination : 'decedent',
	                            id : 'ethnicity',
	                            source : 'decedent'
	                        },
							{
								destination : 'decedent',
								id : 'religion',
								source : 'decedent'
							},
							{
								id: 'congregation',
								source: 'decedent',
	                            mandatory : true,
								destination: 'decedent'
							},
							{
								destination : 'decedent',
								id : 'denominationVtl',
								source : 'decedent'
							},
	//                      {
	//                          destination : 'service',
	//                          destination : 'decedent',
	//                          id : 'hispanic',
	//                          source : 'decedent'
	//                      },
	                        {
	//                          destination : 'service',
	                            destination : 'decedent',
	                            hidden : true,
	                            id : 'hispanicSpecify',
	                            source : 'decedent'
	                        },
	                    ],
	                    id : 'vitals1',
	                    label : 'Vitals',
	                    nextScreen : 'workEducation',
						subscreens : {
	                        createSearchSpouse : {
	                            fields : [
	                                {
	                                    id : 'searchBox',
	                                    prefix : 'client'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    loadEntity : 'spouse',
	                                    saveTo : 'spouse'
	                                },
	                                {
	                                    id : 'firstName'
	                                },
	                                {
	                                    id : 'middleName'
	                                },
	                                {
	                                    id : 'lastName'
	                                },
	                                // MHI task 35
	                                {
                                    	id : 'maidenName'
	                                },
	                                // {
                                    // 	id : 'dateOfBirth'
	                                // },
	                                // {
                                    // 	id : 'address'
	                                // },
	                                // {
                                    // 	id : 'phone'
	                                // },
	                                // {
                                    // 	id : 'email'
	                                // },
	                                {
	                                    id : 'createClient',
	                                    loadEntity : 'spouse',
	                                    saveTo : 'spouse'
	                                }
	                            ],
	                            id : 'createSearchSpouse'
	                        },
	                        searchSpouse : {
	                            fields : [
	                                {
	                                    id : 'searchBox',
	                                    prefix : 'client'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    saveTo : 'spouse'
	                                },
	                            ],
	                            id : 'searchSpouse'
	                        }
	                    }
	                },
	                vitals2 : {
	                    fields : [
	                        // {
	                        //     destination : 'service',
	                        //     id : 'dateOfBirth',
	                        //     mandatory : true,
	                        //     source : 'decedent'
	                        // },
	                        // {
	                        //     destination : 'service',
	                        //     id : 'dateOfDeath',
	                        //     mandatory : true,
	                        //     source : 'decedent'
	                        // },
	                        // {
	                        //     destination : 'mortCase',
	                        //     id : 'timeOfDeath',
	                        //     source : 'mortCase'
	                        // }
	                    ],
	                    id : 'vitals2',
	                    label : 'Vitals (2)',
	                },

					// JEFFTODO: figure out how to trigger this screen
	                vitals2a : {
	                    fields : [
	                        {
	                            destination : 'mortCase',
	                            id : 'months',
	                            source : 'mortCase'
	                        },
	                        {
	                            destination : 'mortCase',
	                            id : 'days',
	                            source : 'mortCase'
	                        },
	                        {
	                            destination : 'mortCase',
	                            id : 'hours',
	                            source : 'mortCase'
	                        },
	                        {
	                            destination : 'mortCase',
	                            id : 'minutes',
	                            source : 'mortCase'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'yahrzeitDate',
	                            source : 'decedent'
	                        }
	                    ],
	                    id : 'vitals2a',
	                    label : 'Vitals (2a)',
	                    nextScreen : 'vitals3'
	                },
	                vitals3 : {
	                    fields : [
	//                         {
	//                             destination : 'service',
	//                             id : 'gender',
	//                             source : 'decedent'
	//                         },
	//                         {
	//                             destination : 'service',
	//                             id : 'placeOfBirth',
	//                             source : 'decedent'
	//                         },
	//                         {
	// //                          destination : 'service',
	//                             destination : 'decedent',
	//                             id : 'birthState',
	//                             source : 'decedent'
	//                         },
	//                         {
	//                             destination : 'service',
	//                             id : 'maritalStatus',
	//                             source : 'decedent'
	//                         },
	//                         {
	//                             destination : 'decedent',
	//                             hidden : true,
	//                             id : 'spouse',
	//                             source : 'decedent',
	//                         },
	//                         {
	// //                          destination : 'service',
	//                             destination : 'decedent',
	//                             id : 'ethnicity',
	//                             source : 'decedent'
	//                         },
	// 						{
	// 							destination : 'decedent',
	// 							id : 'religion',
	// 							source : 'decedent'
	// 						},
	// 						{
	// 							destination : 'decedent',
	// 							id : 'denominationVtl',
	// 							source : 'decedent'
	// 						},
	// //                      {
	// //                          destination : 'service',
	// //                          destination : 'decedent',
	// //                          id : 'hispanic',
	// //                          source : 'decedent'
	// //                      },
	//                         {
	// //                          destination : 'service',
	//                             destination : 'decedent',
	//                             hidden : true,
	//                             id : 'hispanicSpecify',
	//                             source : 'decedent'
	//                         },
	                    ],
	                    id : 'vitals3',
	                    label : 'Vitals (3)',
	                    nextScreen : 'workEducation',
	                    // subscreens : {
	                    //     createSearchSpouse : {
	                    //         fields : [
	                    //             {
	                    //                 id : 'searchBox',
	                    //                 prefix : 'client'
	                    //             },
	                    //             {
	                    //                 id : 'searchResults',
	                    //                 loadEntity : 'spouse',
	                    //                 saveTo : 'spouse'
	                    //             },
	                    //             {
	                    //                 id : 'firstName'
	                    //             },
	                    //             {
	                    //                 id : 'middleName'
	                    //             },
	                    //             {
	                    //                 id : 'lastName'
	                    //             },
	                    //             // MHI task 35
	                    //             {
                        //             id : 'maidenName'
	                    //             },
	                    //             {
	                    //                 id : 'createClient',
	                    //                 loadEntity : 'spouse',
	                    //                 saveTo : 'spouse'
	                    //             }
	                    //         ],
	                    //         id : 'createSearchSpouse'
	                    //     },
	                    //     searchSpouse : {
	                    //         fields : [
	                    //             {
	                    //                 id : 'searchBox',
	                    //                 prefix : 'client'
	                    //             },
	                    //             {
	                    //                 id : 'searchResults',
	                    //                 saveTo : 'spouse'
	                    //             },
	                    //         ],
	                    //         id : 'searchSpouse'
	                    //     }
	                    // }
	                },
	                workEducation : {
	                    fields : [
	                        {
	//                          destination : 'service',
	                            destination : 'decedent',
	                            id : 'ssn',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'occupation',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'business',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'decedent',
	                            id : 'yearsInOffice',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'education',
	                            source : 'decedent'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'veteran',
	                            source : 'decedent'
	                        },
	                    ],
	                    id : 'workEducation',
	                    label : 'Work and Education',
	                    nextScreen : 'decedentsResidence',
	//                  subscreens : {
	//                      enterSSN : {
	//                          fields : [
	//                              {
	//                                  id : 'enterSSN'
	//                              },
	//                              {
	//                                  id : 'enterSSNButton'
	//                              }
	//                          ],
	//                          id : 'enterSSN'
	//                      }
	//                  }
	                },
	            },
	        },
	        earthOff : {
	            firstScreen : 'earthOff',
	            id : 'earthOff',
	            label : 'Instructions and Earth Off',
	            nextSection : 'serviceScheduling',
	            screens : {
	                earthOff : {
	                    fields : [
							'intermentInstruction',
	                        'earthOffPerson1',
	                        'earthOff1',
	                        'earthOffPerson2',
	                        'earthOff2',
	                        'earthOffPerson3',
	                        'earthOff3',
	                        'earthOffPerson4',
	                        'earthOff4',
	                        'earthOffPerson5',
	                        'earthOff5',
	                        'earthOffPerson6',
	                        'earthOff6',
	                        'earthOffPerson7',
	                        'earthOff7',
	                        'earthOffPerson8',
	                        'earthOff8',
	                        'earthOffPerson9',
	                        'earthOff9',
	                        'earthOffPerson10',
	                        'earthOff10',
	                        'earthOffPerson11',
	                        'earthOff11',
	                        'earthOffPerson12',
	                        'earthOff12',
	                    ].map(function(id, i) {
	                        return {
	                            destination : 'intermentOrder',
	                            id : id,
	                            hidden : (i >= 11),
	                            source : 'intermentOrder'
	                        };
	                    }).concat({
	                        id : 'showMore'
	                    }),
	                    id : 'earthOff',
	                    label : 'Instructions and Earth Off',
	                    nextScreen : 'nextSection',
	                    subscreens : {
	                        // searchClient : {
	                        //     fields : [
	                        //         {
	                        //             id : 'searchBox',
	                        //             prefix : 'client'
	                        //         },
	                        //         {
	                        //             id : 'searchResults',
	                        //         },
	                        //     ],
	                        //     id : 'searchClient'
	                        // },
	                        // searchProperty : {
	                        //     fields : [
	                        //         {
	                        //             id : 'searchBox',
	                        //             filter : 'property',
	                        //             label : 'Property search (ex: LA-GP-1-1030-1)',
	                        //         },
	                        //         {
	                        //             id : 'searchResults',
	                        //             searchColumns : 'propertySearch'
	                        //         }
	                        //     ],
	                        //     id : 'searchProperty'
	                        // },
							searchClient : {
	                            fields : [
	                                {
	                                    id : 'searchBox',
	                                    prefix : 'client',
										filter: 'earthOffPerson'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    searchColumns : 'earthOffClient'
	                                },
	                            ],
	                            id : 'searchClient'
	                        },
	                        searchProperty : {
	                            fields : [
	                                {
	                                    id : 'searchBox',
	                                    filter : 'property',
	                                    label : 'Property search (ex: LA-GP-1-1030-1)',
	                                },
	                                {
	                                    id : 'searchResults',
	                                    searchColumns : 'propertySearch'
	                                }
	                            ],
	                            id : 'searchProperty'
	                        }
	                    }
	                }
	            },
	        },
	        family : {
	            firstScreen : 'immediateFamily',
	            id : 'family',
	            label : 'Family',
	//          nextSection : 'serviceInfo',
	//          nextSection : 'serviceScheduling',
	            nextSection : 'serviceType',
	//          nextSection : 'property',
	            screens : {
	                immediateFamily : {
	                    fields : [
	                        {
	                            id : 'linkedClient'
	                        },
	                        {
	                            id : 'altName'
	                        },
	                        {
	                            id : 'relationToPrimaryClient'
	                        },
	                        {
	                            id : 'shippingAddress'
	                        },
	                        {
	                            id : 'phone'
	                        },
	                        {
	                            id : 'email'
	                        },
	                        {
	                            id : 'dateOfBirth'
	                        },
	                        {
	                            id : 'additionalInfo'
	                        },
	                        {
	                            id : 'applyChanges'
	                        },
	                        {
	                            id : 'cancelChanges'
	                        },
	                        {
	                            id : 'deleteFamilyMember'
	                        }
	                    ],
	                    header : {
	                        fields : [
	                            {
	                                double : true,
	                                left : {
	                                    destination : 'service',
	                                    id : 'numberGrandchildren',
	                                    source : 'service'
	                                },
	                                right : {
	                                    destination : 'service',
	                                    id : 'numberGreatGrandchildren',
	                                    source : 'service'
	                                }
	                            },
	                            {
	                                id : 'immediateFamily'
	                            },
	                            {
	                                id : 'addFamilyMember'
	                            }
	                        ]
	                    },
	                    id : 'immediateFamily',
	                    label : 'Immediate Family',
	                    nextScreen : 'nextSection',
	                    subscreens : {
	                        addMember : {
	                            fields : [
	                                {
	                                    id : 'searchBox',
	                                    label : 'client'
	                                },
	                                {
	                                    id : 'searchResults'
	                                }
	                            ],
	                            id : 'addMember'
	                        },
	                        createSearchMember : {
	                            fields: [
	                                {
	                                    id : 'searchBoxFamily',
	                                    label : 'Search',
										filter: 'family',
	                                    prefix : 'client'
	                                },
									// {
									// 	id : 'searchBox',
									// 	label : 'Search',
									// 	prefix : 'client'
									// },
	                                {
	                                    id : 'addNewClient'
	                                },
	                                {
	                                    id : 'searchResultsFamily',
	                                    saveTo : 'linkedClient',
	                                    loadEntity : 'linkedClient',
	                                },
									// {
	                                //     id : 'searchResults',
	                                //     loadEntity : 'linkedClient',
	                                //     saveTo : 'linkedClient'
	                                // },
	                                {
	                                    id : 'firstName',
	                                    hidden : true
	                                },
	                                {
	                                    id : 'middleName',
	                                    hidden : true
	                                },
	                                {
	                                    id : 'lastName',
	                                    hidden : true
	                                },
	                                // {
	                                //     id : 'dateOfBirth',
	                                //     hidden : true
	                                // },
	                                // {
	                                //     id : 'address',
	                                //     hidden : true
	                                // },
	                                // {
	                                //     id : 'phone',
	                                //     hidden : true
	                                // },
	                                // {
	                                //     id : 'email',
	                                //     hidden : true
	                                // },
	                                {
	                                    id : 'createClient',
	                                    hidden : true,
	                                    loadEntity : 'linkedClient',
	                                    saveTo : 'linkedClient'
	                                },
	                                {
	                                    id : 'cancelSubscreen'
	                                }
	                            ],
	                            id : 'createSearchMember'
	                        },
	                        enterAddress : {
	                            fields : [
	                                {
	                                    id : 'addressLine1'
	                                },
	                                {
	                                    id : 'addressLine2'
	                                },
	                                {
	                                    id : 'cityInBook'
	                                },
	                                {
	                                    id : 'countryInBook'
	                                },
	                                {
	                                    id : 'stateDropDown'
	                                },
	                                {
	                                    id : 'stateText'
	                                },
	                                {
	                                    id : 'zip'
	                                },
	                                {
	                                    id : 'saveSubscreen'
	                                },
	                                {
	                                    id : 'sameAsDecedents'
	                                },
	                                {
	                                    id : 'cancelSubscreen'
	                                }
	                            ],
	                            id : 'enterAddress'
	                        },
	                        enterName : {
	                            fields : [
	                                {
	                                    id : 'firstName'
	                                },
	                                {
	                                    id : 'middleName'
	                                },
	                                {
	                                    id : 'lastName'
	                                },
	                                {
	                                    id : 'saveSubscreen',
	                                },
	                                {
	                                    id : 'cancelSubscreen'
	                                }
	                            ],
	                            id : 'enterName'
	                        }
	                    }
	                }
	            }
	        },
	        goodsAndServices : {
	            firstScreen : 'goodsAndServices',
	            id : 'goodsAndServices',
	            label : 'Goods and Services',
	            nextSection : 'casket',
	            screens : {
	                goodsAndServices : {
	                    doubleColumn : true,
	                    fields : [
							{
								id : 'itemGroup' // task 24
							},
	                        {
	                            id : 'basicMortuaryServices',
								itemIds: ['134239']
	                        },
	                        {
	                            id : 'cremation',
								itemIds: ['134127']
	                        },
	                        {
	                            id: 'cremationFee',
								hidden: true
	                        },
	                        {
	                            id : 'cremationReceptacle',
								itemIds: ['137293']
	                        },
	                        {
	                            id : 'transferOfRemains', // if post need = yes make this null
								itemIds: [
									'134236',
									'134250',
									'134251',
									'134252',
									'134253',
									'134254',
								]
	                        },
	                        {
	                            id : 'standardPreparation',
								itemIds: ['134249']
	                        },
	                        {
	                            id : 'staff', //
								itemIds: []
	                        },
	                        {
	                            id : 'hearse',
								itemIds: ['134224']
	                        },
	                        {
	                            id : 'casketLowered'
	                        },
	                        {
	                            id : 'tahara',
								itemIds: ['134134']
	                        },
	                        {
	                            id : 'shmira',
								itemIds: ['134133']
	                        },
	                        {
	                            hidden : true,
	                            id : 'shmiraHours'
	                        },
	                        {
	                            hidden : true,
	                            id : 'shmiraTotalPrice'
	                        },
	                        {
	                            id : 'registerBook',
								itemIds: ['142586']
	                        },
	                        {
	                            id : 'tachrichimCotton',
								itemIds: ['133929', '133930']
	                        },
	                        {
	                            id : 'tachrichimLinen',
								itemIds: ['133931', '133932']
	                        },
	                        {
	                            id : 'funeralFlowers',
								itemIds: ['142592', '134124']
	                        },
	                        {
	                            id : 'tallit',
								itemIds: ['133933', '133934']
	                        },
	                        {
	                            id : 'yarmulke'
	                        },
	                        {
	                            id : 'kriahRibbon', //
	                        },
	                        {
	                            id : 'mountZionEarth', //
	                        },
	                        {
	                            id : 'memorialCandle', //
	                        },
	                        {
	                            hidden : true,
	                            id : 'memorialCandleAmount',
	                        },
	                        {
	                            id : 'minyanKit', //
	                        },
	                        {
	                            hidden : true,
	                            id : 'minyanKitAmount',
	                        },
	                        {
	                            id : 'yahrzeitCalendar', //
	                            omit : true,
	                        },
	                        {
	                            hidden : true,
	                            id : 'yahrzeitCalendarAmount'
	                        },
	                        {
	                            hidden : true,
	                            id : 'websiteWebcast',
								itemIds: ['137722']
	                        },
	                        {
	                            hidden : true,
	                            id : 'casket',
								itemIds: [
									'133605',
									'133606',
									'133607',
									'133608',
									'133609',
									'133610',
									'133611',
									'137404',
									'133612',
									'133615',
									'133616',
									'133617',
									'133618',
									'133619',
									'133620',
									'134256',
									'134257',
									'137320',
									'133622',
									'133623',
									'133624',
									'137403',
									'133625',
									'133626',
									'133627',
									'133628',
									'133629',
									'133630',
									'133631',
									'141575',
									'133632',
									'133633',
									'133706',
									'133634',
									'133635',
									'133636',
									'133637',
									'137402',
									'133638',
									'133639',
									'133640',
									'133641',
									'133707',
									'133642',
									'133643',
									'139904',
									'133644',
								]
	                        },
	                    ],
	                    id : 'goodsAndServices',
	                    label : 'Goods and Services',
	                   nextScreen : 'nextSection'
	                }
	            }
	        },
	        intro : {
	            firstScreen : 'reasonForComing',
	            id : 'intro',
	            label : 'Intro',
	//          nextSection : 'serviceType',
	            nextSection : 'decedent',
	            screens : {
	                reasonForComing : {
	                    fields : [
	                        {
	                            destination : 'service',
	                            id : 'reasonForComing',
	                            mandatory : true,
	                            source : 'service'
	                        }
	                    ],
	                    id : 'reasonForComing',
	                    label : 'Reason for Coming',
	                    nextScreen : 'nextSection',
	                    subscreens : {}
	                }
	            }
	        },

			documents: {
				firstScreen : 'certifiedCopies',
				id: 'documents',
				label: 'Documents',
				nextSection: 'website',
				screens: {
	                certifiedCopies : {
	                    fields : [
	                        {
	                            id : 'certifiedCopiesAmount'
	                        },
	                        // {
	                        //     id : 'certifiedCopiesFreeCopy'
	                        // },
	                        {
	                            id : 'certifiedCopiesTotalCost'
	                        },
	                        {
	                            id: 'mailToInformant'
	                        },
	                        {
	                            id : 'certifiedCopiesMailTo'
	                        }
	                    ],
	                    id : 'certifiedCopies',
	                    label : 'Certified Copies',
	                    nextScreen : 'notices'
	                },
	                notices : {
	                    fields : [
	                        
	                        {
	                            id : 'laTimesCourtesyObituary'
	                        },
	                        {
	                            id : 'laTimesDatesOfNotices'
	                        },
	                        // {	
	                        //     id : 'jewishJournalNotice'
	                        // },
	                        // {
	                        //     id : 'jewishJournalCourtesyAd'
	                        // },
	                        {
	                            id : 'laTimesNotice'
	                        },
	                    ],
	                    id : 'notices',
	                    label : 'Notices',
	                    nextScreen : 'nextSection'
	                }
				}
			},

			
	//         certifiedCopies : {
	//             firstScreen : 'certifiedCopies',
	//             id : 'certifiedCopies',
	//             label : 'Certified Copies',
	//             nextSection : 'notices',
	//             screens : {
	//                 certifiedCopies : {
	//                     fields : [
	//                         {
	//                             id : 'certifiedCopiesAmount'
	//                         },
	//                         {
	//                             id : 'certifiedCopiesFreeCopy'
	//                         },
	// //                      {
	// //                          id : 'certifiedCopiesCost'
	// //                      },
	//                         {
	//                             id : 'certifiedCopiesTotalCost'
	//                         },
	//                         // MHI task 35
	//                         {
	//                             id: 'mailToInformant'
	//                         },
	//                         // MHI task 35
	//                         {
	//                             id : 'certifiedCopiesMailTo'
	//                         }
	//                     ],
	//                     id : 'certifiedCopies',
	//                     label : 'Certified Copies',
	//                     nextScreen : 'nextSection'
	//                 }
	//             }
	//         },

			
	//         notices : {
	//             firstScreen : 'notices',
	//             id : 'notices',
	//             label : 'Notices',
	//             nextSection : 'website',
	//             screens : {
	//                 notices : {
	//                     fields : [
	                        
	//                         {
	//                             id : 'laTimesCourtesyObituary'
	//                         },
	//                         {
	//                             id : 'laTimesDatesOfNotices'
	//                         },
	// //                      {
	// //                          id : 'laTimesEstimatedCharges'
	// //                      },
	//                         {	
	//                             id : 'jewishJournalNotice'
	//                         },
	//                         {
	//                             id : 'jewishJournalCourtesyAd'
	//                         },
	//                         {
	//                             id : 'laTimesNotice'
	//                         },
	// //                      {
	// //                          id : 'jewishJournalDatesOfNotices'
	// //                      },
	// //                      {
	// //                          id : 'jewishJournalEstimatedCharges'
	// //                      }
	//                     ],
	//                     id : 'notices',
	//                     label : 'Notices',
	//                     nextScreen : 'nextSection'
	//                 }
	//             }
	//         },


	        property : {
	            firstScreen : 'property',
	            id : 'property',
	            label : 'Property',
	//          nextSection : 'trust',
	//          nextSection : 'serviceType',
	            nextSection : 'serviceScheduling',
	            screens : {
	                property : {
	                    fields : [
	                        {
	                            destination : 'service',
	                            id : 'cemetery',
	                            mandatory : true,
	                            source : 'service'
	                        },
	                        {
	                            id : 'decedentHasProperty',
	                            mandatory : true
	                        },
	                        {
	                            destination : [
									'service', 
									'intermentOrder'
								],
	                            hidden : true,
	                            id : 'intermentSpace',
	                            mandatory : true,
	                            source : 'service'
	                        },
	                        {
	                            hidden : true,
	                            id : 'purchaser'
	                        },
	                        {
	                            destination : 'intermentOrder',
	                            hidden : true,
	                            id : 'purchaserRelationship',
	                            source : 'intermentOrder'
	                        },
	                        {
	                            destination : 'service',
	                            hidden : true,
	                            id : 'cemeteryName',
								source: 'service'
	                        },
	                        // {
	                        //     hidden : true,
	                        //     id : 'checkForProperty'
	                        // }
	//                      {
	//                          hidden : true,
	//                          id : 'propertyNotYetPurchased'
	//                      }
	                    ],
	                    id : 'property',
	                    label : 'Property',
	                    subscreens : {
							createSearchCemetery: {
	                            fields: [
									{
										id : 'searchBox',
										label : 'Search',
										prefix : 'client',
										filter: 'outsideCemetery'
									},
	                                {
	                                    id : 'addNewCemetery'
	                                },
									{
	                                    id : 'searchResults',
	                                    loadEntity : 'outsideCemetery',
										sendToSubscreen: 'confirmOutsideCemetery'
	                                    // saveTo : 'cemeteryName'
	                                },
	                                {
	                                    id : 'cemeteryCompanyName',
	                                    hidden : true
	                                },
									{
										id: 'phone',
										hidden: true,
									},
									{
										id: 'addressLine1',
										hidden: true,
									},
									{
										id: 'addressLine2',
										hidden: true,
									},
									{
										id: 'cityInBook',
										hidden: true,
									},
									{
										id: 'stateDropDown',
										hidden: true,
									},
									{
										id: 'stateText',
										hidden: true,
									},
									{
										id: 'zip',
										hidden: true,
									},
									{
										id: 'countryInBook',
										hidden: true,
									},
	                                {
	                                    id : 'createCemetery',
	                                    hidden : true,
	                                    loadEntity : 'outsideCemetery',
	                                    saveTo : 'cemeteryName'
	                                },
	                                // {
	                                //     id : 'cancelSubscreen'
	                                // }
	                            ],
	                            id : 'createSearchCemetery'
							},
							confirmOutsideCemetery: {
								id: 'confirmOutsideCemetery',
								fields: [
									{ id: 'cemeteryCompanyName' },
									{ id: 'phone' },
									{ id: 'addressLine1' },
									{ id: 'addressLine2' },
									{ id: 'cityInBook' },
									{ id: 'stateDropDown' },
									{ id: 'zip' },
									{ id: 'countryInBook' },
									{ id: 'saveSubscreen' }
								]
							},
	                        confirmProperty1 : {
	                            fields : [
	                                {
	                                    id : 'propertyTable',
	                                    label : 'Properties where person to be '
	                                            + 'interred is decedent:'
	                                },
	                                {
	                                    id : 'confirmProperty'
	                                }
	                            ],
	                            id : 'confirmProperty'
	                        },
	                        confirmProperty2 : {
	                            fields : [
	                                {
	                                    id : 'propertyTable',
	                                    label : 'Properties where unit is '
	                                            + 'purchased by the decedent, or '
	                                            + 'a relative:'
	                                },
	                                {
	                                    id : 'confirmProperty'
	                                }
	                            ],
	                            id : 'confirmProperty'
	                        },
	                        confirmProperty3 : {
	                            fields : [
	                                {
	                                    id : 'propertyTable',
	                                    label : 'Confirm selection:'
	                                },
	                                {
	                                    id : 'confirmProperty'
	                                },
	                                {
	                                    id : 'returnToSearch',
	                                    returnTo : 'noPropertyFound'
	                                }
	                            ],
	                            id : 'confirmProperty'
	                        },
	                        loadingProperty1 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Searching properties...'
	                                }
	                            ],
	                            id : 'loadingProperty1'
	                        },
	                        loadingProperty2 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Searching relatives\' properties...'
	                                }
	                            ],
	                            id : 'loadingProperty2'
	                        },
	                        loadingProperty3 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Loading selected property...'
	                                }
	                            ],
	                            id : 'loadingProperty3'
	                        },
	                        noPropertyFound : {
	                            fields : [
	                                {
	                                    id : 'noPropertyFoundLabel',
	                                    isInline : true,
	                                },
	                                {
	                                    filter : 'property',
	                                    label :
	                                        'Property search (ex: LA-GP-1-1030-1)',
	                                    id : 'searchBox',
	//                                  prefix : '"property space"'
	                                },
	                                {
	                                    id : 'searchResults',
	//                                  removeColumns : ['info1', 'info2'],
	                                    searchColumns : 'propertySearch',
	                                    sendToSubscreen : 'confirmProperty3'
	                                },
	                                {
	                                    id : 'propertyNotYetPurchased'
	                                }
	                            ],
	                            id : 'noPropertyFound'
	                        }
	                    }
	                },
	                deed : {
	                    fields : [
	                        {
	                            destination : 'service',
	                            id : 'deed',
	                            source : 'service'
	                        },
	                        // {
	                        //     id : 'checkForDeed'
	                        // }
	                    ],
	                    id : 'deed',
	                    label : 'Deed',
	                    nextScreen : 'nextSection',
	                    subscreens : {
	                        confirmDeed1 : {
	                            fields : [
	                                {
	                                    id : 'deedTable',
	                                    label : ''
	                                },
	                                {
	                                    id : 'confirmDeed'
	                                }
	                            ],
	                            id : 'confirmDeed'
	                        },
	                        confirmDeed2 : {
	                            fields : [
	                                {
	                                    id : 'deedTable',
	                                    label : ''
	                                },
	                                {
	                                    id : 'confirmDeed'
	                                }
	                            ],
	                            id : 'confirmDeed'
	                        },
	                        loadingDeed1 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Searching deeds...'
	                                }
	                            ],
	                            id : 'loadingDeed1'
	                        },
	                        noDeedFound : {
	                            fields : [
	                                {
	                                    id : 'searchBox',
	                                    prefix : 'deed'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    sendToSubScreen : 'confirmDeed2'
	                                },
	                                {
	                                    id : 'noDeed'
	                                }
	                            ],
	                            id : 'noDeedFound'
	                        }
	                    }
	                },
	            }
	        },
	        property2 : {
	            firstScreen : 'property2',
	            id : 'property2',
	            label : 'Property 2',
	            nextSection : 'wrapUp',
	            screens : {
	                deed2 : {
	                    fields : [
	                        {
	                            destination : 'service',
	                            id : 'deed',
	                            source : 'service'
	                        },
	                        // {
	                        //     id : 'checkForDeed'
	                        // }
	                    ],
	                    id : 'deed2',
	                    label : 'Deed',
	                    nextScreen : 'nextSection',
	                    subscreens : {
	                        confirmDeed1 : {
	                            fields : [
	                                {
	                                    id : 'deedTable',
	                                    label : ''
	                                },
	                                {
	                                    id : 'confirmDeed'
	                                }
	                            ],
	                            id : 'confirmDeed'
	                        },
	                        confirmDeed2 : {
	                            fields : [
	                                {
	                                    id : 'deedTable',
	                                    label : ''
	                                },
	                                {
	                                    id : 'confirmDeed'
	                                }
	                            ],
	                            id : 'confirmDeed'
	                        },
	                        loadingDeed1 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Searching deeds...'
	                                }
	                            ],
	                            id : 'loadingDeed1'
	                        },
	                        noDeedFound : {
	                            fields : [
	                                {
	                                    id : 'searchBox',
	                                    prefix : 'deed'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    sendToSubScreen : 'confirmDeed2'
	                                },
	                                {
	                                    id : 'noDeed'
	                                }
	                            ],
	                            id : 'noDeedFound'
	                        }
	                    }
	                },
	                property2 : {
	                    fields : [
	//                      {
	//                          destination : 'service',
	//                          id : 'cemetery',
	//                          mandatory : true,
	//                          source : 'service'
	//                      },
	//                      {
	//                          id : 'decedentHasProperty',
	//                          mandatory : true
	//                      },
	                        {
	                            destination : ['service', 'intermentOrder'],
	                            id : 'intermentSpace',
	                            mandatory : true,
	                            source : 'service'
	                        },
	                        {
	                            id : 'checkForProperty'
	                        }
	//                      {
	//                          hidden : true,
	//                          id : 'propertyNotYetPurchased'
	//                      }
	                    ],
	                    id : 'property2',
	                    label : 'Property',
	                    nextScreen : 'deed2',
	                    subscreens : {
	                        confirmProperty1 : {
	                            fields : [
	                                {
	                                    id : 'propertyTable',
	                                    label : 'Properties where person to be '
	                                            + 'interred is decedent:'
	                                },
	                                {
	                                    id : 'confirmProperty'
	                                }
	                            ],
	                            id : 'confirmProperty'
	                        },
	                        confirmProperty2 : {
	                            fields : [
	                                {
	                                    id : 'propertyTable',
	                                    label : 'Properties where unit is '
	                                            + 'purchased by a relative:'
	                                },
	                                {
	                                    id : 'confirmProperty'
	                                }
	                            ],
	                            id : 'confirmProperty'
	                        },
	                        confirmProperty3 : {
	                            fields : [
	                                {
	                                    id : 'propertyTable',
	                                    label : 'Confirm selection:'
	                                },
	                                {
	                                    id : 'confirmProperty'
	                                },
	                                {
	                                    id : 'returnToSearch',
	                                    returnTo : 'noPropertyFound'
	                                }
	                            ],
	                            id : 'confirmProperty'
	                        },
	                        loadingProperty1 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Searching properties...'
	                                }
	                            ],
	                            id : 'loadingProperty1'
	                        },
	                        loadingProperty2 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Searching relatives\' properties...'
	                                }
	                            ],
	                            id : 'loadingProperty2'
	                        },
	                        loadingProperty3 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Loading selected property...'
	                                }
	                            ],
	                            id : 'loadingProperty3'
	                        },
	                        noPropertyFound : {
	                            fields : [
	                                {
	                                    id : 'noPropertyFoundLabel',
	                                    isInline : true,
	                                },
	                                {
	                                    filter : 'property',
	                                    label :
	                                        'Property search (ex: LA-GP-1-1030-1)',
	                                    id : 'searchBox',
	//                                  prefix : '"property space"'
	                                },
	                                {
	                                    id : 'searchResults',
	//                                  removeColumns : ['info1', 'info2'],
	                                    searchColumns : 'propertySearch',
	                                    sendToSubscreen : 'confirmProperty3'
	                                },
	//                              {
	//                                  id : 'propertyNotYetPurchased'
	//                              }
	                            ],
	                            id : 'noPropertyFound'
	                        }
	                    }
	                }
	            }
	        },
	        serviceInfo : {
	            firstScreen : 'clergy',
	//          firstScreen : 'collectPaperwork',
	//          firstScreen : 'flowersDonations',
	//          firstScreen : 'flowerDisplay',
	//          firstScreen : 'attendance',
	//          firstScreen : 'casketbearers',
	//          firstScreen : 'clothingForService',
	            id : 'serviceInfo',
	            label : 'Service Info',
	            nextSection : 'goodsAndServices',
	            screens : {
	                clergy : {
	                    fields : [
	                        {
	                            id : 'rabbiToBeArrangedBy'
	                        },
	                        {
	                            id : 'denomination'
	                        },
	                        {
	                            id : 'honorariumToBeConveyedBy'
	                        },
	                        {
	                            id : 'honorariumAmount'
	                        },
	//                      {
	//                          id : 'rabbiConfirmed'
	//                      },
	//                      {
	//                          id : 'confirmedBy'
	//                      },
	                        {
	                            id : 'nameOfRabbi'
	                        },
	                        // {
	                        //     id : 'rabbiReservationPhone'
	                        // },
	                        // {
	                        //     id : 'templePhone'
	                        // }
	//                      {
	//                          id : 'instructionsForRabbi'
	//                      }
	                    ],
	                    id : 'clergy',
	                    label : 'Clergy',
	//                  nextScreen : 'remarks',
	                    // nextScreen : 'music',
	                    nextScreen : 'serviceInfo1',
	                    subscreens : {
	                        createSearchRabbi : {
	                            fields : [
	                                {
	                                    filter : 'rabbi',
	                                    id : 'searchBox',
	                                    prefix : 'client'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    loadEntity : 'rabbi',
	                                    saveTo : 'nameOfRabbi'
	                                },
	                                {
	                                    id : 'firstName'
	                                },
	                                {
	                                    id : 'middleName'
	                                },
	                                {
	                                    id : 'lastName'
	                                },
	                                {
	                                    buttonLabel : 'Create New Rabbi',
	                                    id : 'createClient',
	                                    loadEntity : 'rabbi',
	                                    saveTo : 'nameOfRabbi'
	                                }
	                            ],
	                            id : 'createSearchRabbi'
	                        },
	                        searchRabbi : {
	                            fields : [
	                                {
	                                    filter : 'rabbi',
	                                    id : 'searchBox',
	                                    prefix : 'client'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    loadEntity : 'rabbi',
	                                    saveTo : 'nameOfRabbi'
	                                }
	                            ],
	                            id : 'searchRabbi'
	                        }
	                    }
	                },
					serviceInfo1: {
						fields: [
	                        {
	                            id : 'attendanceExpected'
	                        },
	                        {
	                            id : 'largeService'
	                        },
	                        {
	                            id : 'otherNotes'
	                        },
	                        {
	                            id : 'music'
	                        },
	                        {
	                            id : 'specialRequest'
	                        },
	                        {
	                            id : 'casketbearersByFamily'
	                        },
	                        {
	                            id : 'casketbearersByMSMP'
	                        },
	                        {
	                            id : 'casketPlacePrior'
	                        },
	                        {
	                            id : 'receiveAfter'
	                        },
	                        {
	                            hidden : true,
	                            id : 'location'
	                        },
	                        {
	                            hidden : true,
	                            id : 'homeOf'
	                        },
	                        {
	                            hidden : true,
	                            id : 'address'
	                        }
						],
						id: 'serviceInfo1',
						label: 'Service Info (1)',
						nextScreen: 'serviceInfo2'
					},
					serviceInfo2: {
						fields: [
							{
	                            id : 'flowerDisplay'
	                        },
	                        {
	                            hidden : true,
	                            id : 'flowersProvidedBy'
	                        },
	                        {
	                            hidden : true,
	                            id : 'arrangementNo'
	                        },
	                        {
	                            hidden : true,
	                            id : 'priceEstimate'
	                        },
	                        {
	                            hidden : true,
	                            id : 'descriptionNotes'
	                        },
	                        {
	                            id : 'flowersAcceptable'
	                        },
							{
	                            id : 'donationInLieu'
	                        },
	                        {
	                            hidden : true,
	                            id : 'prefersDonationsTo'
	                        },
	                        {
	                            hidden : true,
	                            id : 'charityAddress'
	                        },
	                        {
	                            hidden : true,
	                            id : 'noticeInObit'
	                        },
	                        {
	                            hidden : true,
	                            id : 'forPBXOnly'
	                        },
	                        {
	                            hidden : true,
	                            id : 'notes'
	                        },
							{
	                            id : 'clothingForService'
	                        },
	                        {
	                            id : 'clothingAndCosmeticNotes'
	                        },
	                        {
	                            id : 'dispositionOfFirstCallClothing'
	                        }
						],
						id: 'serviceInfo2',
						label: 'Service Info (2)',
						nextScreen: 'nextSection'
					},
	                // attendance : {
	                //     fields : [
	                //         {
	                //             id : 'attendanceExpected'
	                //         },
	                //         {
	                //             id : 'largeService'
	                //         },
	                //         // MHI task 35
	                //         {
                    //           id : 'chairs'
                    //       },
                    //       {
                    //           id : 'tent'
                    //       },
                    //       // MHI task 35
	                //         {
	                //             id : 'otherNotes'
	                //         }
	                //     ],
	                //     id : 'attendance',
	                //     label : 'Attendance',
	                //     nextScreen : 'casketbearers'
	                // },
	//                 casketbearers : {
	//                     fields : [
	//                         {
	//                             id : 'casketbearersByFamily'
	//                         },
	//                         {
	//                             id : 'casketbearersByMSMP'
	//                         },
	//                         {
	//                             id : 'casketPlacePrior'
	//                         }
	//                     ],
	//                     id : 'casketbearers',
	//                     label : 'Casketbearers',
	// //                  nextScreen : 'slumberRoomVisitation'
	//                     nextScreen : 'flowerDisplay'
	//                 },
	                // clothingForService : {
	                //     fields : [
	                //         {
	                //             id : 'clothingForService'
	                //         },
	                //         {
	                //             id : 'clothingAndCosmeticNotes'
	                //         },
	                //         {
	                //             id : 'dispositionOfFirstCallClothing'
	                //         }
	                //     ],
	                //     id : 'clothingForService',
	                //     label : 'Clothing for Service',
	                //     nextScreen : 'nextSection'
	                // },
//                  collectPaperwork : {
	//                     fields : [
	//                     	 {
	//                             id : 'collectSignedOrderBy'
	//                         },
	//                         {
	//                             id : 'collectCheckFor'
	//                         },
	//                         {
	//                             id : 'collectFrom'
	//                         },
	//                         {
	//                             destination : 'intermentOrder',
	//                             hidden : true,
	//                             id : 'specialInstructions',
	//                             omit : true,
	//                             source : 'intermentOrder'
	//                         },
	                        
	//                     ],
	//                     id : 'collectPaperwork',
	//                     label : 'Collect Paperwork',
	//                     nextScreen : 'attendance'
	// //                  nextScreen : 'nextSection'
	//                 },
	                // flowerDisplay : {
	                //     fields : [
	                //         {
	                //             id : 'flowerDisplay'
	                //         },
	                //         {
	                //             hidden : true,
	                //             id : 'flowersProvidedBy'
	                //         },
	                //         {
	                //             hidden : true,
	                //             id : 'arrangementNo'
	                //         },
	                //         {
	                //             hidden : true,
	                //             id : 'priceEstimate'
	                //         },
	                //         {
	                //             hidden : true,
	                //             id : 'descriptionNotes'
	                //         },
	                //         {
	                //             id : 'flowersAcceptable'
	                //         }
	                //     ],
	                //     id : 'flowerDisplay',
	                //     label : 'Flower Display',
	                //     nextScreen : 'flowersDonations'
	                // },
	//                 flowersDonations : {
	//                     fields : [
	//                         {
	//                             id : 'donationInLieu'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'prefersDonationsTo'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'charityAddress'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'noticeInObit'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'forPBXOnly'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'notes'
	// //                      },
	// //                      {
	// //                          hidden : true,
	// //                          id : 'flowersAcceptable'
	//                         }
	//                     ],
	//                     id : 'flowersDonations',
	//                     label : 'Flowers / Donations',
	// //                  nextScreen : 'nextSection'
	//                     nextScreen : 'clothingForService'
	//                 },
	                // music : {
	                //     fields : [
	                //         {
	                //             id : 'music'
	                //         },
	                //         {
	                //             id : 'specialRequest'
	                //         }
	                //     ],
	                //     id : 'music',
	                //     label : 'Music',
	                //     nextScreen : 'receiveAfter'
	                // },
	                organizationParticipation : {
	                    fields : [
	                        {
	                            id : 'lodgeOrOrganizationParticipation'
	                        }
	                    ],
	                    id : 'organizationParticipation',
	                    label : 'Organization Participation',
	                    nextScreen : 'music'
	                },
	//                 receiveAfter : {
	//                     fields : [
	//                         {
	//                             id : 'receiveAfter'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'location'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'homeOf'
	//                         },
	//                         {
	//                             hidden : true,
	//                             id : 'address'
	//                         }
	//                     ],
	//                     id : 'receiveAfter',
	//                     label : 'Receive After',
	//                    // nextScreen : 'collectPaperwork'
	//                     	nextScreen : 'attendance'
	// //                          nextScreen : 'nextSection'
	//                 },
	                remarks : {
	                    fields : [
	                        {
	                            id : 'remarks'
	                        }
	                    ],
	                    id : 'remarks',
	                    label : 'Remarks',
	//                  nextScreen : 'organizationParticipation'
	                    nextScreen : 'music'
	                },
	                slumberRoomVisitation : {
	                    fields : [
	                        {
	                            id : 'slumberRoomVisitation'
	                        },
	                        {
	                            hidden : true,
	                            id : 'private'
	                        },
	                        {
	                            hidden : true,
	                            id : 'slumberCasket'
	                        },
	                        {
	                            id : 'dateTimeNotes'
	                        }
	                    ],
	                    id : 'slumberRoomVisitation',
	                    label : 'Slumber Room Visitation',
	                    nextScreen : 'flowerDisplay'
	                }
	            }
	        },
	        serviceScheduling : {
	            firstScreen : 'serviceScheduling',
	            id : 'serviceScheduling',
	            label : 'Service Scheduling',
	//          nextSection : 'serviceInfo',
	//          nextSection : 'property',
	            nextSection : 'trust',
	            screens : {
	                serviceScheduling : {
	                    fields : [
	//                      {
	//                          id : 'scheduleLabel',
	//                      },
	                        {
	                            id : 'noService'
	                        },
	                        {
	                            id : 'scheduleToBeDetermined'
	                        },
	                        // {
	                        //     id : 'scheduleMonths',
	                        // },
	                        {
	                            id : 'scheduleDate'
	                        }
	                    ],
	                    id : 'serviceScheduling',
	                    label : 'Service Scheduling',
	                    nextScreen : 'nextSection',
	                    subscreens : {
	
	                    }
	                }
	            }
	        },
	        serviceType : {
	            firstScreen : 'serviceType',
	            id : 'serviceType',
	            label : 'Service Type',
	//          nextSection : 'serviceScheduling',
	            nextSection : 'property',
	            screens : {
	                serviceType : {
	                    fields : [
							{
	                            destination : 'service',
	                            id : 'serviceTypeList',
	                            mandatory : true,
	                            source : 'service'
	                        },
	                        {
	                            destination : 'service',
	                            id : 'park',
	                            mandatory : true,
	                            source : 'service'
	                        },
	                        // {
	                        //     destination : 'service',
	                        //     id : 'postNeed',
	                        //     mandatory : true,
	                        //     source : 'service'
	                        // },
	                        // {
	                        //     destination : 'service',
	                        //     id : 'intermentType',
	                        //     mandatory : true,
	                        //     source : 'service'
	                        // },
	                        // {
	                        //     hidden : true,
	                        //     id : 'haveService',
	                        // },
	//                      {
	//                          destination : 'service',
	//                          hidden : true,
	//                          id : 'serviceStartTime',
	//                          source : 'service'
	//                      },
	                        {
	                            destination : 'service',
	                            hidden : true,
	                            id : 'serviceLocation',
	                            source : 'service'
	                        },
	                        {
	                            destination : 'service',
	                            hidden : true,
	                            id : 'chapel',
	                            source : 'service'
	                        },
	                        {
	                            destination : 'service',
	                            hidden : true,
	                            id : 'serviceOrder',
	                            source : 'service'
	                        },
	                        // {
	                        //     hidden : true,
	                        //     id : 'decedentPresent',
	                        // },
	                        {
	                        	
	                        	
	                        	id : 'otherContact',
	                        },
	                        {
	                        	
	                        	
	                        	id : 'otherPhone',
	                        },
	                    ],
	                    id : 'serviceType',
	                    label : 'Service Type',
	                    nextScreen : 'nextSection'
	                },
	            }
	        },
	        trust : {
	            firstScreen : 'trust',
	            id : 'trust',
	            label : 'Trust',
	//          nextSection : 'decedent',
	            nextSection : 'serviceInfo',
	            screens : {
	                trust : {
	                    fields : [
	                        {
	                            id : 'decedentHasTrust',
	                            mandatory : true,
	                        },
	                        {
	                            destination : 'service',
	                            hidden : true,
	                            id : 'trust',
	                            mandatory : true
	                        },
                          //  task 50
                          {
                            hidden : true,
                            id : 'secondLineInterestText'
                          },
	                        // {
	                        //     hidden : true,
	                        //     id : 'checkForTrust'
	                        // }
	//                      {
	//                          hidden : true,
	//                          id : 'decedentHasNoTrust'
	//                      }
	                    ],
	                    id : 'trust',
	                    label : 'Trust',
	                    nextScreen : 'nextSection',
	                    subscreens : {
	                        confirmTrust : {
	                            fields : [
	                                {
	                                    id : 'trustTable'
	                                },
	                                {
	                                    id : 'confirmTrust'
	                                }
	                            ],
	                            id : 'confirmTrust'
	                        },
	                        loadingTrust : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Searching trusts...'
	                                }
	                            ],
	                            id : 'loadingTrust'
	                        },
	                        loadingTrust2 : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Loading selected trust...'
	                                }
	                            ],
	                            id : 'loadingTrust2'
	                        },
	                        noTrustFound : {
	                            fields : [
	                                {
	                                    isInline : true,
	                                    text : 'Please search '+
	                                            'manually, or confirm that no '+
	                                            'trust exists.'
	                                },
	                                {
	                                    filter : 'trust',
	                                    id : 'searchBox',
	//                                  prefix : 'trust'
	                                },
	                                {
	                                    id : 'searchResults',
	                                    searchColumns : 'trust',
	                                    sendToSubscreen : 'confirmTrust'
	                                },
	                                {
	                                    id : 'decedentHasNoTrust'
	                                }
	                            ],
	                            id : 'noTrustFound'
	                        }
	                    }
	                }
	            }
	        },
	        website : {
	            firstScreen : 'website',
	            id : 'website',
	            label : 'Website',
	            nextSection : 'wrapUp',
	            screens : {
	                website : {
	                    fields : [
	                        {
	                            id : 'websitePostInfo'
	                        },
	                        {
	                            id : 'websiteVisitorsCanPost'
	                        },
	                        // {
	                        //     id : 'websiteJewishGenealogy'
	                        // },
	                        {
	                            id : 'websiteWebcast'
	                        },
	                        {
	                            id : 'websiteEmail1'
	                        },
	                        {
	                            id : 'websiteEmail2',
	                        },
	                        {
	                            id : 'websiteEmail3'
	                        },
	                        {
	                            id : 'websitePassword'
	                        }
	                    ],
	                    id : 'website',
	                    label : 'Website',
	                    nextScreen : 'nextSection'
	                }
	            }
	        },
	        wrapUp : {
	            firstScreen : 'wrapUp',
	            id : 'wrapUp',
	            label : 'Wrap-up',
	            nextSection : 'end',
	            screens : {
	                wrapUp : {
	                    fields : [
	                        {
	                            id : 'createSalesContract'
	                        },
	                        {
	                            id : 'runCRE'
	                        },
													{
														id : 'runMap'
												  },
	                        {
	                            id : 'eSign'
	                        }
	                    ],
	                    id : 'wrapUp',
	                    label : 'Wrap-up',
	                    nextScreen : 'nextSection',
	                    subscreens : {
	//                      fileList : {
	//                          fields : [
	//                          ],
	//                          id : 'fileList'
	//                      },
	                    }
	                }
	            }
	        }
	    };
	
	    function setProperty(entity, fieldDef, property) {
	        if (fieldDef.double) {
	            setProperty.call(this, entity, fieldDef.left, property);
	            setProperty.call(this, entity, fieldDef.right, property);
	        } else if (!fieldDef.omit
	                    && (this.FIELD[fieldDef.id].type != 'inline'
	                    || this.FIELD[fieldDef.id].clickToSearch
	                    || fieldDef.id == 'certifiedCopiesTotalCost')) {
	            fieldDef[property] = entity;
	        }
	    }
	
	    function setDestination(entity, fieldDef) {
	        setProperty.call(this, entity, fieldDef, 'destination');
	    }
	
	    function setSource(entity, fieldDef) {
	        setProperty.call(this, entity, fieldDef, 'source');
	    }
	
	    ['casket',
	    //  'certifiedCopies',
	     'goodsAndServices',
	    //  'notices',
		'documents',
	     'serviceInfo',
	//   'serviceScheduling',
	     'website',
	     'wrapUp'].forEach(function(id) {
	        lib.objForEach(this.SECTION_DEF[id].screens, function(screenDef) {
	            screenDef.fields.forEach(function(fieldDef) {
	                if (fieldDef.id == 'flag')
	                    var destination = 'decedent';
	                else if (screenDef.id == 'clothingForService')
	                    var destination = 'mortPrep';
	                else if (['authorizedBy', 'embalming'].includes(fieldDef.id))
	                    var destination = ['mortCase', 'service'];
	                else
	                    var destination = 'service';
	
	                if (['authorizedBy', 'embalming'].includes(fieldDef.id))
	                    var source = 'service';
	                else
	                    var source = destination
	
	                setDestination.call(this, destination, fieldDef);
	                setSource.call(this, source, fieldDef);
	            }, this);
	        }, this);
	    }, this);
	}
	
	const DEF = new Definitions();
	log(DEF);
	
	const name = function(id) {
	    return DEF.FIELD[id].name;
	};
	
	const CNST = DEF.CONSTANT;
