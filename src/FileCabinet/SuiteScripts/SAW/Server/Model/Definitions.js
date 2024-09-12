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

/**
 *@NApiVersion 2.x
 *@NModuleScope Public
 */

define(['N/file', 'N/search', 'N/url', '../Library'],
function(file, search, url, lib) {

    const APP_NAME = 'Service Arrangements Wizard';

    const CONSTANT = {
        mortuary : 'Mortuary',
        mortuaryValue : '2'
    };

    const DEFAULT_COUNSELOR_ID = '294692';

    const DEPARTMENT = {
        atNeed : '16',
        family : '18',
        it : '5',
        mortuary : '20'
    };

    const RECORD_TYPE = {
        client : 'customer',
        contactRelationship : 'customrecord_mts_contact_relationships',
        outsideCemetery: 'customer',
        mortCase : 'customrecord_mts_mort_case',
        mortPrep : 'customrecord_mts_mort_prep',
        relationship : 'customrecord_mts_cust_rel',
        relationshipType : 'customrecord_mts_cust_rel_type',
        service : 'calendarevent',
        timeSlot : 'customrecord_mts_svc_time_slot'
    };

    const LISTS = [
        'arrangementsMode',
        'burialClothing',
        'casket',
        'casketInChapel',
        'casketSize',
        'clientAttributes',
        'cemetery',
        'chapel',
        'contractType',
        'countryInBook',
        'covid19',
        'denomination',
        'denominationVtl',
        'education',
        'ethnicity',
        'flagDescription',
        'flowersProvidedBy',
        'gender',
        'intermentOrderType',
        'intermentType',
        'location',
        'maritalStatus',
        'msmpFamily',
        'mortuary',
        'park',
        'permanentTemporary',
        'placeOfDeath',
//      'relationship',
        'religion',
        'serviceLocation',
        'serviceOrder',
        'serviceType',
        'serviceTypeList',
        'stateDropDown',
        'yesNo',
        'websiteWebcastList'
    ];

    const LISTOPTIONS = {
        cemetery : [
            {
                text : "Inside",
                value : "1"
            },
            {
                text : "Outside",
                value : "2"
            },
            {
                text : "N/A",
                value : "3"
            }
        ],
        covid19 : [
            {
                text : "Possible COVID-19",
                value : "1"
            },
            {
                text : "Confirmed COVID-19",
                value : "2"
            },
            {
                text : "No Information",
                value : "3"
            },
            {
                text : "No",
                value : "4"
            }
        ]
    };

    const FIELD = {
        additionalInfo : {
            id : 'additionalInfo',
            name : 'custrecord_mts_cust_rel_addl_info'
        },
        address : {
            id : 'address',
            name : 'custevent_mts_svc_setup_recv_aftr_addr'
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
            name : 'addr1',
            sublist : 'addressbook'
        },
        addressLine2 : {
            id : 'addressLine2',
            name : 'addr2',
            sublist : 'addressbook'
        },
        alsoKnownAs : {
            id : 'alsoKnownAs',
            name : {
                decedent : 'custentity_mts_cust_aka',
                service : 'custevent_mts_vtl_decd_aka'
            }
        },
        altName : {
            id : 'altName',
            name : 'altname'
        },
        arrangementNo : {
            id : 'arrangementNo',
            name : 'custevent_mts_svc_flwr_arrngmt_no'
        },
        arrangementsMode : {
            id : 'arrangementsMode',
            list : 'customlist_mts_arrangements_mode',
            name : 'custevent_mts_arrangements_mode'
        },
        attendanceExpected : {
            id : 'attendanceExpected',
            name : 'custevent_mts_svc_setup_attnd_expctd_i'
        },
        authorizedBy : {
            id : 'authorizedBy',
            name : {
                mortCase : 'custrecord_mts_fc_embalm_auth_by',
                service : 'custevent_mts_svc_embalming_auth_by'
            }
        },
        basicMortuaryServices : {
            id : 'basicMortuaryServices',
            name : 'custevent_mts_svc_basic_svcs'
        },
        birthState : {
            id : 'birthState',
            name : {
                decedent : 'custentity_mts_cust_birth_state',
                service : 'custevent_mts_vtl_birth_state'
            }
        },
        burialClothing : {
            id : 'burialClothing',
            list : 'customlist_mts_mortprep_burial_cloth'
        },
        business : {
            id : 'business',
            name : {
                decedent : 'custentity_mts_cust_business',
                service : 'custevent_mts_vtl_business'
            }
        },
        casket : {
            id : 'casket',
            list : 'customlist_mts_svc_cskt_open_closed',
            name : 'custevent_mts_svc_cskt'
        },
        casketbearersByFamily : {
            id : 'casketbearersByFamily',
            name : 'custevent_mts_svc_setup_cskt_bear_fam'
        },
        casketbearersByMSMP : {
            id : 'casketbearersByMSMP',
            name : 'custevent_mts_svc_setup_cskt_bear_msmp'
        },
        casketInChapel : {
            id : 'casketInChapel',
            list : 'customlist_mts_svc_cskt_in_chpl'
        },
        casketInChapelAfter : {
            id : 'casketInChapelAfter',
            name : 'custevent_mts_svc_setup_cskt_after'
        },
        casketInChapelPrior : {
            id : 'casketInChapelPrior',
            name : 'custevent_mts_svc_setup_cskt_prior'
        },
        casketLowered : {
            id : 'casketLowered',
            name : 'custevent_mts_svc_cskt_lowrd'
        },
        casketName : {
            id : 'casketName',
            name : 'custrecord_mts_mortprep_casket_name'
        },
        casketPlacePrior : {
            id : 'casketPlacePrior',
            name : 'custevent_svc_place_casket_prior'
        },
        casketSize : {
            id : 'casketSize',
            name : 'custrecord_mts_intord_cskt_size',
            list : 'customlist_mts_svc_cskt_size',
            type: 'select'
        },
        category : {
            id : 'category',
            name : 'custentity_mts_customer_attributes',
            type : 'select'
        },
        cemetery : {
            id : 'cemetery',
            list : 'customlist_mts_inside_outside',
            name : 'custevent_mts_svc_cem'
        },
        cemeteryCompanyName: {
            id : 'cemeteryCompanyName',
            name : 'companyname'
        },
        isperson: {
            id : 'isperson',
            name : 'isperson'
        },
        certifiedCopiesAmount : {
            id : 'certifiedCopiesAmount',
            name : 'custevent_mts_svc_dc_copies_requested'
        },
        certifiedCopiesCost : {
            id : 'certifiedCopiesCost',
            name : 'custevent_mts_svc_dc_copy_cost'
        },
        certifiedCopiesFreeCopy : {
            id : 'certifiedCopiesFreeCopy',
            name : 'custevent_mts_svc_dc_free_copy_for_vet'
        },
        certifiedCopiesMailTo : {
            id : 'certifiedCopiesMailTo',
            name : 'custevent_mts_svc_dc_copies_mail_to'
        },
        certifiedCopiesTotalCost : {
            id : 'certifiedCopiesTotalCost',
            name : 'custevent_mts_svc_dc_copies_total_cost'
        },
        chapel : {
            id : 'chapel',
            list : 'customlist_mts_chapels',
            name : 'custevent_mts_svc_chapel'
        },
        charityAddress : {
            id : 'charityAddress',
            name : 'custevent_mts_svc_dntn_chrty_addr'
        },
        city : {
            id : 'city',
            name : 'city'
        },
        cityInBook : {
            id : 'cityInBook',
            name : 'city',
            sublist : 'addressbook'
        },
        clientAttributes : {
            id : 'clientAttributes',
            list : 'customlist_mts_cust_attributes'
        },
        clientRelationshipType : {
            id : 'clientRelationshipType',
            name : 'custrecord_mts_crel_relationship_type'
        },
        clothingAndCosmeticNotes : {
            id : 'clothingAndCosmeticNotes',
            name : 'custrecord_mts_mortprep_clth_notes_mort'
        },
        clothingForService : {
            id : 'clothingForService',
            name : 'custrecord_mc_prep_clth_brl_clth_slct'
        },
        collectCheckFor : {
            id : 'collectCheckFor',
            name : 'custevent_mts_svc_collect_check_for'
        },
        collectFrom : {
            id : 'collectFrom',
            name : 'custevent_mts_svc_collect_check_from'
        },
        collectSignedOrderBy : {
            id : 'collectSignedOrderBy',
            name : 'custevent_mts_svc_collect_order_by'
        },
        confirmedBy : {
            id : 'confirmedBy',
            name : 'custevent_mts_svc_rabbi_cnfrmd_by'
        },
        congregation: {
            id: 'congregation',
            name: 'custentity_mts_cust_congregation'
        },
        contractType : {
            id : 'contractType',
            list : 'customlist_mts_contract_type',
            name : 'custbody_mts_contract_type'
        },
        counselor : {
            id : 'counselor',
            name : 'custevent_mts_svc_counselor'
        },
        cremation : {
            id : 'cremation',
            name : 'custevent_mts_svc_cremation',
        },
        cremationFee : {
            id : 'cremationFee',
            name : 'custevent_mts_svc_cremationfee',
        },
        cremationReceptacle : {
            id : 'cremationReceptacle',
            name : 'custevent_mts_svc_cremationreceptacle',
        },
        country : {
            id : 'country',
            name : 'country'
        },
        countryInBook : {
            id : 'countryInBook',
            list : 'customlist_mts_country',
            name : 'country',
            sublist : 'addressbook'
        },
        county : {
            id : 'county',
            name : 'custentity_mts_county'
        },
        covid19 : {
            id : 'covid19',
            list : 'customlist_mts_covid19',
            name : 'custrecord_mts_mc_covid19'
        },
        customForm : {
            id : 'customForm',
            name : 'customform'
        },
        dateOfBirth : {
            id : 'dateOfBirth',
            name : {
                decedent : 'custentity_mts_cust_dob',
                spouse : 'custentity_mts_cust_dob',
                linkedClient : 'custentity_mts_cust_dob',
                service : 'custevent_mts_vtl_dob'
            }
        },
        dateOfDeath : {
            id : 'dateOfDeath',
            name : {
                decedent : 'custentity_mts_cust_dod',
                service : 'custevent_mts_vtl_dod'
            }
        },
        dateTimeNotes : {
            id : 'dateTimeNotes',
            name : 'custevent_mts_svc_setup_slmbr_date_note'
        },
        days : {
            id : 'days',
            name : 'custrecord_mts_mc_age_days'
        },
        decedent : {
            id : 'decedent',
            name : {
                mortCase : 'custrecord_mts_mc_decedent',
                mortPrep : 'custrecord_mort_prep_dcdnt',
                service : 'custevent_mts_svc_decdnt'
            }
        },
        deed : {
            id : 'deed',
            name : 'custevent_mts_svc_prop_deed'
        },
        denomination : {
            id : 'denomination',
            list : 'customlist_mts_judsm_branch',
            name : 'custevent_mts_svc_rabbi_branch'
        },
        denominationVtl : {
            id : 'denominationVtl',
            list : 'customlist_mts_judsm_branch',
            name : 'custentity_mts_cust_jdsm_branch'
        },
        descriptionNotes : {
            id : 'descriptionNotes',
            name : 'custevent_mts_svc_flwrs_desc'
        },
        directorInquiry : {
            id : 'directorInquiry',
            name : 'custevent_mts_svc_cskt_lowrd_dir_inq'
        },
        displayName : {
            id : 'displayName',
            name : 'custevent_mts_svc_name_to_be_used'
        },
        dispositionOfFirstCallClothing : {
            id : 'dispositionOfFirstCallClothing',
            name : 'custrecord_mc_prep_dspstn_fc_clth'
        },
        documentation : {
            id : 'documentation',
            name : 'custevent_mts_svc_dcmntn'
        },
        donationInLieu : {
            id : 'donationInLieu',
            name : 'custevent_mts_svc_dntn_in_lieu_of_flwrs'
        },
        education : {
            id : 'education',
            list : 'customlist_mts_education',
            name : {
                decedent : 'custentity_mts_cust_edu',
                service : 'custevent_mts_vtl_education'
            }
        },
        email : {
            id : 'email',
            name : 'email'
        },
        embalming : {
            id : 'embalming',
//          name : 'custevent_mts_svc_embalming'
            name : {
                mortCase : 'custrecord_mts_fc_embalm',
                service : 'custevent_mts_svc_embalming'
            }
        },
        entityId : {
            id : 'entityId',
            name : 'entityid'
        },
        ethnicity : {
            id : 'ethnicity',
            list : 'customlist_mts_ethncty',
            name : {
                decedent : 'custentity_mts_cust_ethncty',
                service : 'custevent_mts_vtl_ethnicity'
            }
        },
        familialRelation : {
            id : 'familialRelation',
            name : 'custrecord_mts_crt_is_relation'
        },
        fatherFirstName : {
            id : 'fatherFirstName',
            name : 'custentity_mts_cust_fthr_first'
        },
        fatherMiddleName : {
            id : 'fatherMiddleName',
            name : 'custentity_mts_cust_fthr_mid'
        },
        fatherLastName : {
            id : 'fatherLastName',
            name : 'custentity_mts_cust_fthr_last'
        },
        fatherBirthPlace : {
            id : 'fatherBirthPlace',
            name : 'custentity_mts_cust_fthr_birth_plc'
        },
        firstCallDate : {
            id : 'firstCallDate',
            name : 'custrecord_mts_mc_fc_call_date'
        },
        firstCallTakenBy : {
            id : 'firstCallTakenBy',
            name : 'custrecord_mts_mc_call_taken_by'
        },
        firstCallTime : {
            id : 'firstCallTime',
            name : 'custrecord_mts_mc_fc_call_time'
        },
        firstName : {
            id : 'firstName',
            name : 'firstname'
        },
        flag : {
            id : 'flag',
            name : {
                decedent : 'custentity_mts_cust_flag',
                service : 'custevent_mts_vtl_flag'
            }
        },
        flagDescription : {
            id : 'flagDescription',
            list : 'customlist_mts_flag_desc',
            name : 'custevent_mts_vtl_flag_desc'
        },
        flowerDisplay : {
            id : 'flowerDisplay',
            name : 'custevent_mts_svc_flwrs_dsply'
        },
        flowersAcceptable : {
            id : 'flowersAcceptable',
            name : 'custevent_mts_svc_flwrs_accptble'
        },
        flowersArrangementNumber : {
            id : 'flowersArrangementNumber',
            name : 'custevent_mts_svc_flwr_arrngmt_no'
        },
//      flowersDescription : {
//          id : 'flowersDescription',
//          name : 'custevent_mts_svc_flwrs_desc'
//      },
        flowersEstimate : {
            id : 'flowersEstimate',
            name : 'custevent_mts_svc_flwrs_est'
        },
        flowersProvidedBy : {
            id : 'flowersProvidedBy',
            list : 'customlist_mts_svc_flwrs_provd_by',
            name : 'custevent_mts_svc_flwrs_provd_by'
        },
        forPBXOnly : {
            id : 'forPBXOnly',
            name : 'custevent_mts_svc_dntn_ntc_for_pbx_only'
        },
        funeralFlowers : {
            id : 'funeralFlowers',
            name: 'custevent_mts_svc_funeral_flowers'
        },
        gender : {
            id : 'gender',
            list : 'customlist_mts_cust_gender',
            name : {
                decedent : 'custentity_mts_cust_gender',
                service : 'custevent_mts_vtl_gender'
            }
        },
        hearse : {
            id : 'hearse',
            name : 'custevent_mts_svc_hearse_alt_vehicle'
        },
        hebrewName : {
            id : 'hebrewName',
            name : {
                decedent : 'custentity_mts_cust_hbrw_name',
                service : 'custevent_mts_vtl_hbrw_name'
            }
        },
        hispanic : {
            id : 'hispanic',
            name : {
                decedent : 'custentity_mts_cust_hispanic',
                service : 'custevent_mts_vtl_hispanic'
            }
        },
        hispanicSpecify : {
            id : 'hispanicSpecify',
            name : {
                decedent : 'custentity_mts_cust_hispanic_spcfy',
                service : 'custevent_mts_vtl_hispanic_specify'
            }
        },
        homeOf : {
            id : 'homeOf',
            name : 'custevent_mts_svc_setup_recv_aftr_hmof'
        },
        honorariumAmount : {
            id : 'honorariumAmount',
            name : 'custevent_mts_svc_honorarium_amt'
        },
        honorariumToBeConveyedBy : {
            id : 'honorariumToBeConveyedBy',
            name : 'custevent_mts_svc_honorarium_by'
        },
        hours : {
            id : 'hours',
            name : 'custrecord_mts_mc_age_hours'
        },
        informant : {
            id : 'informant',
            name : 'custevent_mts_svc_informant'
        },
        informantRelationToDecedent : {
            id : 'informantRelationToDecedent',
            name : 'custevent_mts_svc_informant_rltn'
        },
        instructionsForRabbi : {
            id : 'instructionsForRabbi',
            name : 'custevent_mts_svc_rabbi_instr'
        },
        intermentOrder : {
            id : 'intermentOrder',
            name : 'custevent_mts_svc_intrmnt_ord_ref'
        },
        intermentOrderType : {
            id : 'intermentOrderType',
            list : 'customlist_mts_interment_order_type'
        },
        intermentSpace : {
            id : 'intermentSpace',
            name : {
                service : 'custevent_mts_svc_intrmnt_loc',
            }
        },
        intermentType : {
            id : 'intermentType',
            list : 'customlist_mts_svc_inter_type',
            name : 'custevent_mts_svc_inter_type'
        },
        itemCategory : {
            id : 'itemCategory',
            name : 'custitem_mts_item_category'
        },
        itemCategoryList : {
            id : 'itemCategoryList',
            name : 'customlist_mts_item_category'
        },
        jewishJournalCourtesyAd : {
            id : 'jewishJournalCourtesyAd',
            name : 'custevent_mts_svc_ntc_jwsh_jrnl_crtsy'
        },
        jewishJournalDatesOfNotices : {
            id : 'jewishJournalDatesOfNotices',
            name : 'custevent_mts_svc_ntc_jwsh_jrnl_dates'
        },
        jewishJournalEstimatedCharges : {
            id : 'jewishJournalEstimatedCharges',
            name : 'custevent_mts_svc_ntc_jwsh_jrnl_charges'
        },
        jewishJournalNotice : {
            id : 'jewishJournalNotice',
            name : 'custevent_mts_svc_ntc_jwsh_jrnl'
        },
        kriahRibbon : {
            id : 'kriahRibbon',
            name : 'custevent_mts_svc_kriah_ribbon'
        },
        kriahRibbonNotes : {
            id : 'kriahRibbonNotes',
            name : 'custevent_mts_svc_kriah_notes'
        },
        largeService : {
            id : 'largeService',
            name : 'custevent_mts_svc_large'
        },
        // mhi task 35
        chairs : {
          id : 'chairs',
          name : 'custevent_mts_svc_chairs'
        },
        intermentChairs : {
            id : 'intermentChairs',
            name : 'custrecord_mts_intord_chairs'
        },
        tent : {
          id : 'tent',
          name : 'custevent_mts_svc_tent'
        },
        intermentTent : {
          id : 'intermentTent',
          name : 'custrecord_mts_intord_tent'
        },
        // mhi task 35
        lastName : {
            id : 'lastName',
            name : 'lastname'
        },
        laTimesCourtesyObituary : {
            id : 'laTimesCourtesyObituary',
            name : 'custevent_mts_svc_ntc_latimes_crtsy'
        },
        laTimesDatesOfNotices : {
            id : 'laTimesDatesOfNotices',
            name : 'custevent_mts_svc_ntc_latimes_dates'
        },
        laTimesEstimatedCharges : {
            id : 'laTimesEstimatedCharges',
            name : 'custevent_mts_svc_ntc_latimes_est_chrgs'
        },
        laTimesNotice : {
            id : 'laTimesNotice',
            name : 'custevent_mts_svc_ntc_latimes'
        },
        linkedClient : {
            id : 'linkedClient',
            name : 'custrecord_mts_cust_rel_linked'
        },
        location : {
            id : 'location',
            list : 'customlist_mts_svc_recv_aftr_loc',
            name : 'custevent_mts_svc_setup_recv_aftr_loc'
        },
        lodgeOrOrganizationParticipation : {
            id : 'lodgeOrOrganizationParticipation',
            name : 'custevent_mts_svc_setup_lodge'
        },
        maidenName : {
            id : 'maidenName',
            name : 'custentity_mts_cust_maiden_name'
        },
        maritalStatus : {
            id : 'maritalStatus',
            list : 'customlist_mts_mc_cust_marital',
            name : {
                decedent : 'custentity_mts_cust_mrtl_status',
                service : 'custevent_mts_svc_marital_status'
            }
        },
        memorialCandle : {
            id : 'memorialCandle',
            name : 'custevent_mts_svc_memrl_candle'
        },
        memorialCandleAmount : {
            id : 'memorialCandleAmount',
            name : 'custevent_mts_svc_memrl_candle_amt'
        },
        memorialCandleNotes : {
            id : 'memorialCandleNotes',
            name : 'custevent_mts_svc_candle_notes'
        },
        middleName : {
            id : 'middleName',
            name : 'middlename'
        },
        minutes : {
            id : 'minutes',
            name : 'custrecord_mts_mc_age_mins'
        },
        minyanKit : {
            id : 'minyanKit',
            name : 'custevent_mts_svc_minyan_kit'
        },
        minyanKitAmount : {
            id : 'minyanKitAmount',
            name : 'custevent_mts_svc_minyan_kit_amt'
        },
        minyanKitNotes : {
            id : 'minyanKitNotes',
            name : 'custevent_mts_svc_mnyn_kit_notes'
        },
        mobilePhone : {
            id : 'mobilePhone',
            name : 'mobilephone'
        },
        months : {
            id : 'months',
            name : 'custrecord_mts_mc_age_months'
        },
        mortCase : {
            id : 'mortCase',
            name : {
                decedent : 'custentity_mts_mortuary_case',
                service : 'custevent_mts_case_ref'
            }
        },
        mortPrep : {
            id : 'mortPrep',
            name : 'custentity_mts_mortuary_prep'
        },
        mortuary : {
            id : 'mortuary',
            list : 'customlist_mts_inside_outside',
            name : 'custevent_mts_svc_mort'
        },
        mortuarySalesContract : {
            id : 'mortuarySalesContract',
            name : 'custevent_mts_mort_sales_contract'
        },
        motherFirstName : {
            id : 'motherFirstName',
            name : 'custentity_mts_cust_mthr_first'
        },
        motherMiddleName : {
            id : 'motherMiddleName',
            name : 'custentity_mts_cust_mthr_mid'
        },
        motherLastName : {
            id : 'motherLastName',
            name : 'custentity_mts_cust_mthr_last'
        },
        motherBirthPlace : {
            id : 'motherBirthPlace',
            name : 'custentity_mts_cust_mthr_birth_plc'
        },
        mountZionEarth : {
            id : 'mountZionEarth',
            name : 'custevent_mts_svc_mt_zion_earth'
        },
        mountZionEarthNotes : {
            id : 'mountZionEarthNotes',
            name : 'custevent_mts_svc_mtzion_notes'
        },
        msmpFamily : {
            id : 'msmpFamily',
            list : 'customlist_mts_msmp_family'
        },
        music : {
            id : 'music',
            name : 'custevent_mts_svc_setup_music'
        },
        name : {
            id : 'name',
            name : 'name'
        },
        nameOfRabbi : {
            id : 'nameOfRabbi',
            name : 'custevent_mts_svc_rabbi'
        },
        nextOfKin : {
            id : 'nextOfKin',
            name : 'custentity_mts_cust_nok'
        },
        nextOfKinRelation : {
            id : 'nextOfKinRelation',
            name : 'custentity_mts_cust_nok_rltn'
        },
        notes : {
            id : 'notes',
            name : 'custevent_mts_svc_dntn_ntc_notes'
        },
        noticeInObit : {
            id : 'noticeInObit',
            name : 'custevent_mts_svc_dntn_ntc_in_obit'
        },
        numberGrandchildren : {
            convertToInt : true,
            id : 'numberGrandchildren',
            name : 'custevent_mts_svc_num_grndchldrn'
        },
        numberGreatGrandchildren : {
            convertToInt : true,
            id : 'numberGreatGrandchildren',
            name : 'custevent_mts_svc_num_grt_grndchldrn'
        },
        occupation : {
            id : 'occupation',
            name : {
                decedent : 'custentity_mts_cust_occupation',
                service : 'custevent_mts_vtl_occuptn'
            }
        },
        openingClosing : {
            id : 'openingClosing',
            name : 'custevent_mts_svc_open_close'
        },
//      openCloseAmount : {
//          id : 'openCloseAmount',
//          name : 'custevent_mts_svc_open_close_amt'
//      },
        otherNotes : {
            id : 'otherNotes',
            name : 'custevent_mts_svc_notes'
        },
        outsideCasket : {
            id : 'outsideCasket',
            name : 'custevent_mts_svc_outside_cskt'
        },
        cemeteryName : {
            id : 'cemeteryName',
            name : 'custevent_mts_svc_outsd_cem_name'
        },
        otherContact : {
				id : 'otherContact',
				name : 'custrecord_mts_intord_cntct',
	        },
        pall : {
            id : 'pall',
            name : 'custevent_mts_svc_pall'
        },
        park : {
            id : 'park',
            list : 'customlist_mts_park',
            name : 'custevent_mts_event_park',
        },
        permanentTemporary : {
            id : 'permanentTemporary',
            list : 'customlist_mts_intrmt_perm_temp',
        },
        personToMakeId : {
            id : 'personToMakeId',
            name : 'custevent_mts_svc_prsn_to_make_id'
        },
        phone : {
            id : 'phone',
            name : 'phone'
        },
        placeOfBirth : {
            id : 'placeOfBirth',
            name : {
                decedent : 'custentity_mts_cust_place_of_birth',
                service : 'custevent_mts_vtl_birth_place'
            }
        },
        placeOfDeath : {
            id : 'placeOfDeath',
            list : 'customlist_mts_mc_place_of_death',
            name : {
                mortCase : 'custrecordmts_mc_place_of_death',
            }
        },
        postNeed : {
            id : 'postNeed',
            name : 'custevent_mts_svc_postneed'
        },
        prefersDonationsTo : {
            id : 'prefersDonationsTo',
            name : 'custevent_mts_svc_prefer_donations_to'
        },
        priceEstimate : {
            id : 'priceEstimate',
            name : 'custevent_mts_svc_flwrs_est'
        },
        primaryClient : {
            id : 'primaryClient',
            name : 'custrecord_mts_cust_rel_primary'
        },
        private : {
            id : 'private',
            name : 'custevent_mts_svc_setup_slmbr_prvt'
        },
        rabbiConfirmed : {
            id : 'rabbiConfirmed',
            name : 'custevent_mts_svc_rabbi_cnfrmd'
        },
        rabbiReservationPhone : {
            id : 'rabbiReservationPhone',
            name : 'custevent_mts_svc_rabbi_phone'
        },
        rabbiToBeArrangedBy : {
            id : 'rabbiToBeArrangedBy',
            name : 'custevent_mts_svc_rabbi_arrng_by'
        },
        reasonForComing : {
            id : 'reasonForComing',
            name : 'custevent_mts_svc_rsn_for_cmng_to_msmp'
        },
        receiveAfter : {
            id : 'receiveAfter',
            name : 'custevent_mts_svc_setup_recv_aftr'
        },
        reciprocalRelationship : {
            id : 'reciprocalRelationship',
            name : 'custrecord_mts_cust_rel_recip_row'
        },
        reciprocalRelationshipType : {
            id : 'reciprocalRelationshipType',
            name : 'custrecord_mts_crt_recip_rel'
        },
//      relationship : {
//          id : 'relationship',
//          list : 'customlist_mts_contact_relationships'
//      },
        registerBook : {
            id : 'registerBook',
            name : 'custevent_mts_svc_registerbook'
        },
        relationshipType : {
            id : 'relationshipType',
            name : 'custrecord_mst_cust_rel_type'
        },
        relationToPrimaryClient : {
            id : 'relationToPrimaryClient',
            name : 'custrecord_mts_rltn_to_prmry_clnt'
        },
        religion : {
            id : 'religion',
            list : 'customlist_mts_cust_religion',
            name : {
                decedent : 'custentity_mts_cust_religion',
                service : 'custevent_mts_vtl_religion'
            }
        },
        remarks : {
            id : 'remarks',
            name : 'custevent_mts_svc_remarks'
        },
        salesContractService : {
            id : 'salesContractService',
            name : 'custbody_mts_so_svc_ref'
        },
        service : {
            id : 'service',
            name : 'custentity_mts_service'
        },
        serviceDate : {
            id : 'serviceDate',
            name : 'startdate'
        },
        serviceEndTime : {
            id : 'serviceEndTime',
            name : 'endtime'
        },
        serviceLocation : {
            id : 'serviceLocation',
            list : 'customlist_mts_svc_site',
            name : 'custevent_mts_svc_location'
        },
        serviceOrder : {
            id : 'serviceOrder',
            list : 'customlist_mts_svc_order',
            name : 'custevent_mts_svc_setup_order'
        },
        serviceStartTime : {
            id : 'serviceStartTime',
            name : 'starttime'
        },
        serviceStatus : {
            id : 'serviceStatus',
            name : 'status'
        },
        serviceType : {
            id : 'serviceType',
            list : 'customlist_mts_svc_type',
            name : 'custevent_mts_svc_type'
        },
        serviceTypeList : {
            id : 'serviceTypeList',
            list : 'customlist_mts_svc_type_old',
            name : 'custevent_mts_svc_type_old'
        },
        scheduleToBeDetermined : {
            id : 'scheduleToBeDetermined',
            name : 'custevent_mts_service_date_tbd'
        },
        shippingAddress : {
            id : 'shippingAddress',
            name : 'shipaddress'
        },
        shmira : {
            id : 'shmira',
            name : 'custevent_mts_svc_shmira'
        },
        shmiraHours : {
            id : 'shmiraHours',
            name : 'custevent_mts_svc_shmira_hrs'
        },
        shmiraNotes : {
            id : 'shmiraNotes',
            name : 'custevent_mts_svc_shmira_notes'
        },
        slumberCasket : {
            id : 'slumberCasket',
            name : 'custevent_mts_svc_setup_slmbr_cskt'
        },
        slumberRoomVisitation : {
            id : 'slumberRoomVisitation',
            name : 'custevent_mts_svc_setup_slmbr_visit'
        },
        specialRequest : {
            id : 'specialRequest',
            name : 'custevent_mts_svc_music_spcl_req'
        },
        spouse : {
            id : 'spouse',
            name : {
                decedent : 'custentity_mts_cust_spouse',
                linkedClient : 'custentity_mts_cust_spouse',
                service : 'custevent_mts_svc_spouse'
            }
        },
        ssn : {
            id : 'ssn',
            name : {
                decedent : 'custentity_mts_cust_ssn',
                service : 'custevent_mts_svc_decd_ssn'
            }
        },
        staff : {
            id : 'staff',
            name : 'custevent_mts_svc_staff'
        },
        standardPreparation : {
            id : 'standardPreparation',
            name : 'custevent_mts_svc_standard_preparation'
        },
        state : {
            id : 'state',
            name : 'state'
        },
        stateDropDown : {
            id : 'stateDropDown',
            list : 'customlist_mts_states',
            name : 'dropdownstate',
            sublist : 'addressbook'
        },
        stateText : {
            id : 'stateText',
            name : 'state',
            sublist : 'addressbook'
        },
        tachrichimCotton : {
            id : 'tachrichimCotton',
            name : 'custevent_mts_svc_tachrichim'
        },
        tachrichimCottonNotes : {
            id : 'tachrichimCottonNotes',
            name : 'custevent_mts_svc_tchrch_ctn_notes'
        },
        tachrichimLinen : {
            id : 'tachrichimLinen',
            name : 'custevent_mts_svc_tchrchm_lin'
        },
        tachrichimLinenNotes : {
            id : 'tachrichimLinenNotes',
            name : 'custevent_mts_svc_tchrchm_lin_notes'
        },
        tahara : {
            id : 'tahara',
            name : 'custevent_mts_svc_tahara'
        },
        taharaNotes : {
            id : 'taharaNotes',
            name : 'custevent_mts_svc_tahara_notes'
        },
        tallit : {
            id : 'tallit',
            name : 'custevent_mts_svc_tallis'
        },
        tallitNotes : {
            id : 'tallitNotes',
            name : 'custevent_mts_svc_tchrchm_tallis_notes'
        },
        templePhone : {
            id : 'templePhone',
            name : 'custevent_mts_svc_rabbi_temple_phone'
        },
        timeOfDeath : {
            id : 'timeOfDeath',
            name : 'custrecord_mts_mc_tod'
        },
        title : {
            id : 'title',
            name : 'title'
        },
        transferOfRemains : {
            id : 'transferOfRemains',
            name : 'custevent_mts_svc_xfer_remains'
        },
        trust : {
            id : 'trust',
            name : 'custevent_mts_svc_trust_ref'
        },
        vault : {
            id : 'vault',
            name : 'custevent_mts_svc_vault'
        },
        intermentVault: {
            id : 'intermentVault',
            name : 'custrecord_mts_intord_vault'
        },
//      vaultAmount : {
//          id : 'vaultAmount',
//          name : 'custevent_mts_svc_vault_amt'
//      },
        veteran : {
            id : 'veteran',
            name : {
                decedent : 'custentity_mts_cust_veteran',
                service : 'custevent_mts_vtl_veteran'
            }
        },
        websiteEmail1 : {
            id : 'websiteEmail1',
            name : 'custevent_mts_svc_webcast_email1'
        },
        websiteEmail2 : {
            id : 'websiteEmail2',
            name : 'custevent_mts_svc_webcast_email2'
        },
        websiteEmail3 : {
            id : 'websiteEmail3',
            name : 'custevent_mts_svc_webcast_email3'
        },
        websiteJewishGenealogy : {
            id : 'websiteJewishGenealogy',
            name : 'custevent_mts_svc_jewish_gen'
        },
        websitePassword : {
            id : 'websitePassword',
            name : 'custevent_mts_svc_webcast_pw'
        },
        websitePostInfo : {
            id : 'websitePostInfo',
            name : 'custevent_mts_svc_info_on_website'
        },
        websiteVisitorsCanPost : {
            id : 'websiteVisitorsCanPost',
            name : 'custevent_mts_svc_visitors_on_website'
        },
        websiteWebcast : {
            id : 'websiteWebcast',
            name : 'custevent_mts_svc_webcast2'
        },
        websiteWebcastList : {
            id : 'websiteWebcastList',
            list : 'customlist_mts_website_webcast'
        },
        wizardNotes : {
            id : 'wizardNotes',
            name : 'custevent_mts_svc_wizard_notes'
        },
        yahrzeitCalendarAmount : {
            id : 'yahrzeitCalendarAmount',
            name : 'custevent_mts_svc_yahrzeit_cal'
        },
        yahrzeitCalendarNotes : {
            id : 'yahrzeitCalendarNotes',
            name : 'custevent_mts_svc_yhrzt_cal_notes'
        },
        yahrzeitDate : {
            id : 'yahrzeitDate',
            name : 'custentity_mts_cust_yahrzeit_date'
        },
        yarmulke : {
            id : 'yarmulke',
            name : 'custevent_mts_svc_yarmulke'
        },
        yarmulkeNotes : {
            id : 'yarmulkeNotes',
            name : 'custevent_mts_svc_yrmlk_notes'
        },
        yearsInCounty : {
            id : 'yearsInCounty',
            name : 'custentity_mts_cust_years_in_county'
        },
        yearsInOffice : {
            id : 'yearsInOffice',
            name : {
                decedent : 'custentity_mts_cust_years_in_occupation',
                service : 'custevent_mts_vtl_yrs_in_occuptn'
            }
        },
        yesNo : {
            id : 'yesNo',
            list : 'customlist_mts_yes_no'
        },
        zip : {
            id : 'zip',
            name : 'zip',
            sublist : 'addressbook'
        },
        zipcode : {
            id : 'zipcode',
            name : 'zipcode'
        },
    };

    const ENTITY = lib.objMap({
        decedent : [
            'addressLine1',
            'addressLine2',
            'alsoKnownAs',
            'birthState',
            'business',
            'cityInBook',
            'countryInBook',
            'county',
            'congregation',
            'dateOfBirth',
            'dateOfDeath',
            'denominationVtl',
            'education',
            'entityId',
            'ethnicity',
            'fatherFirstName',
            'fatherMiddleName',
            'fatherLastName',
            'fatherBirthPlace',
            'firstName',
            'flag',
            'gender',
            'hebrewName',
            'hispanic',
            'hispanicSpecify',
            'lastName',
            'maidenName',
            'maritalStatus',
            'motherFirstName',
            'motherMiddleName',
            'motherLastName',
            'motherBirthPlace',
            'middleName',
            'mortCase',
            'mortPrep',
            'nextOfKin',
            'nextOfKinRelation',
            'occupation',
            'placeOfBirth',
            'religion',
            'service',
            'spouse',
            'ssn',
            'stateDropDown',
            'stateText',
            'veteran',
            'yahrzeitDate',
            'yearsInCounty',
            'yearsInOffice',
            'zip'
        ],
        mortCase : [
            'authorizedBy',
            'covid19',
            'decedent',
            'embalming',
            'name',
            'firstCallDate',
            'firstCallTime',
            'firstCallTakenBy',
            'days',
            'hours',
            'minutes',
            'months',
            'placeOfDeath',
            'timeOfDeath'
        ],
        mortPrep : [
            'casketName',
            'clothingAndCosmeticNotes',
            'clothingForService',
            'dispositionOfFirstCallClothing'
        ],
        rabbi : [
            'entityId',
            'firstName',
            'lastName',
            'mobilePhone',
            'phone',
            'category'
        ],
        service : [
            'address',
            'alsoKnownAs',
            'arrangementNo',
            'arrangementsMode',
            'attendanceExpected',
            'authorizedBy',
            'basicMortuaryServices',
            'birthState',
            'business',
            'casket',
            'casketbearersByFamily',
            'casketbearersByMSMP',
            'casketInChapelAfter',
            'casketInChapelPrior',
            'casketLowered',
            'casketPlacePrior',
            'casketSize',
            'cemetery',
            'cemeteryName',
            'certifiedCopiesAmount',
            'certifiedCopiesCost',
            'certifiedCopiesFreeCopy',
            'certifiedCopiesMailTo',
            'certifiedCopiesTotalCost',
            'chapel',
            'charityAddress',
            'clothingAndCosmeticNotes',
            'clothingForService',
            'collectCheckFor',
            'collectFrom',
            'collectSignedOrderBy',
            'confirmedBy',
            'counselor',
            'cremation',
            'cremationFee',
            'cremationReceptacle',
            'customForm',
            'dateOfBirth',
            'dateOfDeath',
            'dateTimeNotes',
            'decedent',
            'deed',
            'denomination',
            'denominationVtl',
            'descriptionNotes',
            'directorInquiry',
            'displayName',
            'dispositionOfFirstCallClothing',
            'documentation',
            'donationInLieu',
            'education',
            'embalming',
            'ethnicity',
            'flag',
            'flagDescription',
            'flowerDisplay',
            'flowersAcceptable',
            'flowersArrangementNumber',
//          'flowersDescription',
            'flowersEstimate',
            'flowersProvidedBy',
            'funeralFlowers',
            'forPBXOnly',
            'gender',
            'hebrewName',
            'hearse',
            'hispanic',
            'hispanicSpecify',
            'homeOf',
            'honorariumAmount',
            'honorariumToBeConveyedBy',
            'informant',
            'informantRelationToDecedent',
            'instructionsForRabbi',
            'intermentOrder',
            'intermentSpace',
            'intermentType',
            'jewishJournalCourtesyAd',
            'jewishJournalDatesOfNotices',
            'jewishJournalEstimatedCharges',
            'jewishJournalNotice',
            'kriahRibbon',
            'kriahRibbonNotes',
            'largeService',
            'chairs', // mhi task 35
            'tent', // mhi task 35
            'laTimesCourtesyObituary',
            'laTimesDatesOfNotices',
            'laTimesEstimatedCharges',
            'laTimesNotice',
            'location',
            'lodgeOrOrganizationParticipation',
            'maritalStatus',
            'memorialCandle',
            'memorialCandleAmount',
            'memorialCandleNotes',
            'minyanKit',
            'minyanKitAmount',
            'minyanKitNotes',
            'mortCase',
            'mortuary',
            'mortuarySalesContract',
            'mountZionEarth',
            'mountZionEarthNotes',
            'music',
            'nameOfRabbi',
            'notes',
            'noticeInObit',
            'numberGrandchildren',
            'numberGreatGrandchildren',
            'occupation',
            'openingClosing',
//          'openCloseAmount',
            'otherContact',
            'otherNotes',
            'outsideCasket',
            'pall',
            'park',
            'personToMakeId',
            'placeOfBirth',
            'postNeed',
            'prefersDonationsTo',
            'priceEstimate',
            'private',
            'rabbiConfirmed',
            'rabbiReservationPhone',
            'rabbiToBeArrangedBy',
            'reasonForComing',
            'receiveAfter',
            'registerBook',
            'religion',
            'remarks',
            'serviceDate',
            'serviceEndTime',
            'serviceLocation',
            'serviceOrder',
            'serviceStartTime',
            'serviceStatus',
            'serviceType',
            'serviceTypeList',
            'scheduleToBeDetermined',
            'shmira',
            'shmiraHours',
            'shmiraNotes',
            'slumberCasket',
            'slumberRoomVisitation',
            'specialRequest',
            'spouse',
            'ssn',
            'staff',
            'standardPreparation',
            'tachrichimCotton',
            'tachrichimCottonNotes',
            'tachrichimLinen',
            'tachrichimLinenNotes',
            'tahara',
            'taharaNotes',
            'tallit',
            'tallitNotes',
            'templePhone',
            'title',
            'transferOfRemains',
            'trust',
            'vault',
//          'vaultAmount',
            'veteran',
            'websiteEmail1',
            'websiteEmail2',
            'websiteEmail3',
            'websiteJewishGenealogy',
            'websitePassword',
            'websitePostInfo',
            'websiteVisitorsCanPost',
            'websiteWebcast',
            'wizardNotes',
            'yahrzeitCalendarAmount',
            'yahrzeitCalendarNotes',
            'yarmulke',
            'yarmulkeNotes',
            'yearsInOffice'
        ],
        spouse : [
            'entityId',
            'firstName',
            'middleName',
            'lastName',
            'maidenName',
            'dateOfBirth',
            // 'address',
            'phone',
            'email'
        ],
        outsideCemetery: [
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
        ]
    }, function(fieldIds, entityName) {
        return fieldIds.map(resolveName.bind(this, entityName));
    });

    const SEARCH_COLUMNS = lib.objMap({
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
        relationshipType : [
            'name',
            'reciprocalRelationshipType',
            'familialRelation'
        ],
    }, lib.callMap(function(id) {
        if (lib.arrayIncludes(id, '.')) {
            var arr = id.split('.');
            var join = arr[0];
            id = arr[1];
        }

//      var field = lib.objCopy(FIELD[id]);


        if (join) {
            var field = resolveName(join, id);
            field.join = FIELD[join].name;
        } else {
            var field = lib.objCopy(FIELD[id]);
        }

        return field;
    }));

    const root = 'SuiteScripts/SAW/';
    const URL = {
        customScript : [
            'Includes/custom.js',
            'Client/Library.js',
            'Client/Model/Definitions.js',
            'Client/Model/ListDefinitions.js',
            'Client/Model/ServerLink.js',
            'Client/Model/Database.js',
            'Client/Model/User.js',
            'Client/Model/Wizard.js',
            'Client/View/Render.js',
            'Client/Controller.js',
            'Includes/ns_admin.js'
        ].map(resolvePath),
        eSign : url.resolveScript({
            scriptId : 'customscript_echosign_agreement_creater',
            deploymentId : 'customdeploy_echosign_agreement_creater'
        }),
        image : lib.objMap({
            background : 'Images/background.jpg',
            logo1 : 'Images/logo.png',
            logo2 : 'Images/logo2.png'
        }, resolvePath),
        include : [
            'Includes/jquery.autocomplete.js',
            'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.3/chosen.jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.1/masonry.pkgd.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/sticky-kit/1.1.3/sticky-kit.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/rangeslider.js/2.3.2/rangeslider.min.js',
            'Includes/panzoom.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js',
            'Includes/jquery.jpanelmenu.js',
            'Includes/slick.min.js',
            'Includes/tooltips.min.js',
            'Includes/image-map-pro.min.js',
            'Includes/Matrix.js',
            'Includes/jquery.freetrans.js'
//            'https://unpkg.com/pdf-lib'
        ].map(resolvePath),
        jQuery : 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
        mapLink : url.resolveScript({
            scriptId : 'customscript_cemetery_app',
            deploymentId : 'customdeploy_cemetery_app'
        }),
        serverClientLink : url.resolveScript({
            scriptId : 'customscript_pri_saw_server_client_link',
            deploymentId : 'customdeploy_pri_saw_server_client_link'
        }),
        serverController : url.resolveScript({
            scriptId : 'customscript_pri_saw_controller',
            deploymentId : 'customdeploy_pri_saw_controller'
        }),
//        serverCRELink : url.resolveScript({
//            scriptId : 'customscript_pri_saw_crelink',
//            deploymentId : 'customdeploy_pri_saw_crelink'
//        }),
        serverCRESuitelet : url.resolveScript({
            scriptId : 'customscript_cre_profile_suitelet_exampl',
            deploymentId : 'customdeploy_test_cre'
        }),
        stylesheet : [
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css',
            'https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.3/chosen.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css',
            'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
            'Styles/jquery.freetrans.css',
            'Styles/colors.css',
            'Styles/style.css',
            'Styles/custom.css'
        ].map(resolvePath),
    };

    const ITEM = {
        basicMortuaryServices : '134239',
        certifiedCopiesAmount : '134128',
        cremation : '134127',
        cremationReceptacle : '137293',
        directCremationProgram : '139922',
        documentation : '134241',
        funeralFlowers : '142592',
        hearse : '134224',
        honorarium : '134132',
        premiumPlusPackage : '142588',
        registerBook : '142586',
        shmira : '134133',
        staffForFuneral : '134244',
        staffForGraveside : '134243',
        staffForMemorial : '134245',
        standardPreparation : '134249',
        tachrichimCotton : '133929',
        tachrichimLinen : '133931',
        tahara : '134134',
        tallit : '133933',
        traditionsPlusProgram : '142587',
        traditionsProgram : '139914',
        transferOfRemainsLA : '134250',
        transferOfRemainsLV : '134251',
        transferOfRemainsCremated : '134236',
        transferOfRemainsOutside : '134252',
        transferOfRemainsRiverside : '134253',
        transferOfRemainsSanDiego : '134254',
        vault : '133924',
        websiteWebcast : '137722',
        websiteWebcastChapel : '137722',
        websiteWebcastGraveside : '145551',
        websiteWebcastBoth : '145552',
    };

    const ITEM_GROUP = {
        directCremationProgramGroup : '140870',
        premiumPlusPackageGroup : '142589',
        traditionsPlusProgramGroup : '142585',
        traditionsProgramGroup : '140871',
    };

    const ITEM_GROUP_RATE_FIELDS = {
        directCremationProgramGroup : 'custitem_mts_direct_cremation_price',
        premiumPlusPackageGroup : 'custitem_mts_premium_plus_price',
        traditionsPlusProgramGroup : 'custitem_mts_traditions_plus_price',
        traditionsProgramGroup : 'custitem_mts_traditions_price',
    };

//  const TRANSFER_OF_REMAINS_LIST = [
//      {
//          text : '',
//          value : 'null'
//      },
//      {
//          text : 'LA, Orange, Ventura',
//          value : ITEM.transferOfRemainsLA
//      },
//      {
//          text : 'LV, No. Calif.',
//          value : ITEM.transferOfRemainsLV
//      },
//      {
//          text : 'Outside Calif.',
//          value : ITEM.transferOfRemainsOutside
//      },
//      {
//          text : 'Riverside, S Bernardino, Sta Barbara',
//          value : ITEM.transferOfRemainsRiverside
//      },
//      {
//          text : 'San Diego, Imperial, Kern, SLO',
//          value : ITEM.transferOfRemainsSanDiego
//      }
//  ];
//
//  const STAFF_LIST = [
//      {
//          text : '',
//          value : 'null'
//      },
//      {
//          text : 'Facilities/Staff for Funeral Ceremony',
//          value : ITEM.staffForFuneral
//      },
//      {
//          text : 'Facilities/Staff for Memorial Ceremony',
//          value : ITEM.staffForMemorial
//      },
//      {
//          text : 'Equipment/Staff for Graveside Service',
//          value : ITEM.staffForGraveside
//      }
//  ];

    function resolveName(entityName, fieldId) {
        var field = lib.objCopy(FIELD[fieldId]);
        if (typeof field.name == 'object')
            field.name = field.name[entityName];
        return field;
    }

    function resolvePath(path) {
        if (path.substring(0, 4) == 'http')
            return path;
        else
            return file.load(root + path).url;
    }

    return {
        APP_NAME : APP_NAME,
        CONSTANT : CONSTANT,
        DEFAULT_COUNSELOR_ID : DEFAULT_COUNSELOR_ID,
        DEPARTMENT : DEPARTMENT,
        ENTITY : ENTITY,
        FIELD : FIELD,
        ITEM : ITEM,
        ITEM_GROUP: ITEM_GROUP,
        ITEM_GROUP_RATE_FIELDS: ITEM_GROUP_RATE_FIELDS,
        LISTOPTIONS : LISTOPTIONS,
        LISTS : LISTS,
        RECORD_TYPE : RECORD_TYPE,
        SEARCH_COLUMNS : SEARCH_COLUMNS,
        URL : URL
    };

});
