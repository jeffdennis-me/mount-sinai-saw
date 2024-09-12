//------------------------------------------------------------------
// Copyright 2020, All rights reserved, Prolecto Resources, Inc.
 
// No part of this file may be copied or used without express, written
// permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
// Description: SAW List Definitions
// Developer: Sylvain Muise
// Date: April 17, 2020
// Deployment URL:
// Notes:	A large set of hardcoded list to speed up launching of SAW.
//------------------------------------------------------------------
/**
 *@NApiVersion 2.x
 *@NModuleScope Public
 */

define([],
function() {


//	NOTE: Any instances of the character "'" (the single quote) must be replaced
//	with the code "&#39;"
const options = {
	//	List customlist_mts_mortprep_burial_cloth
	burialClothing : [
		{
			text : "Here",
			value : "1"
		},
		{
			text : "Will Bring",
			value : "2"
		},
		{
			text : "Cotton Tachrichim",
			value : "3"
		},
		{
			text : "Linen Tachrichim",
			value : "4"
		},
		{
			text : "Linen Sheet",
			value : "5"
		}
	],
	//	Search on 'item' where 'itemCategory' is 'Caskets and Urns'
	casket : [
		{
			text : "",
			value : ""
		},
		{
			text : "1&#39; 8\" Infant Casket - $500.00",
			value : "133605"
		},
		{
			text : "2&#39; 0\" Infant Casket - $500.00",
			value : "133606"
		},
		{
			text : "2&#39; 6\" Infant Casket - $500.00",
			value : "133607"
		},
		{
			text : "3&#39; 6\" Child Casket - $500.00",
			value : "133608"
		},
		{
			text : "4&#39; 6\" Child Casket - $500.00",
			value : "133609"
		},
		{
			text : "5&#39; 6\" Child Casket - $600.00",
			value : "133610"
		},
		{
			text : "Aaron Casket - $5550.00",
			value : "133611"
		},
		{
			text : "Abraham Casket - $6300.00",
			value : "137404"
		},
		{
			text : "Adom Casket - $2300.00",
			value : "133612"
		},
		{
			text : "Air Tray - $325.00",
			value : "137720"
		},
		{
			text : "Air Tray - $325.00",
			value : "133613"
		},
		{
			text : "Air Tray (Ship out of state) - $325.00",
			value : "137721"
		},
		{
			text : "Air Tray (Ship out of state) - $325.00",
			value : "133614"
		},
		{
			text : "Alon Casket - $1300.00",
			value : "133615"
		},
		{
			text : "Alon Dx Casket - $1300.00",
			value : "133616"
		},
		{
			text : "Alon DXX - $1300.00",
			value : "138376"
		},
		{
			text : "Asher Casket - $3450.00",
			value : "133617"
		},
		{
			text : "Bedford Casket - $3400.00",
			value : "133618"
		},
		{
			text : "Burlington Casket - $2100.00",
			value : "133619"
		},
		{
			text : "Carmel Casket - $1800.00",
			value : "133620"
		},
		{
			text : "Casket - Stand-by Box - $325.00",
			value : "137323"
		},
		{
			text : "Cremation Receptacle - $95.00",
			value : "137293"
		},
		{
			text : "Devonshire Casket - $3700.00",
			value : "137320"
		},
		{
			text : "Devora Casket - $2450.00",
			value : "133622"
		},
		{
			text : "Dov Casket - $2100.00",
			value : "133623"
		},
		{
			text : "Gabriel Casket - $3695.00",
			value : "133624"
		},
		{
			text : "Galilee Casket - $3100.00",
			value : "137403"
		},
		{
			text : "Goldcrest Casket - $2200.00",
			value : "133625"
		},
		{
			text : "Harrison Casket - $1195.00",
			value : "133626"
		},
		{
			text : "Hillel Casket - $4175.00",
			value : "133627"
		},
		{
			text : "Huntington Casket - $3975.00",
			value : "133628"
		},
		{
			text : "Jordan Casket - $7250.00",
			value : "133629"
		},
		{
			text : "Kent Casket - $725.00",
			value : "133630"
		},
		{
			text : "Knesset Casket - $2600.00",
			value : "133631"
		},
		{
			text : "Masada Casket - $1600.00",
			value : "133632"
		},
		{
			text : "Moses Casket - $16000.00",
			value : "133633"
		},
		{
			text : "Negev Casket - $2350.00",
			value : "133706"
		},
		{
			text : "Outside Casket - $",
			value : "138363"
		},
		{
			text : "Portland Casket - $2250.00",
			value : "133634"
		},
		{
			text : "Ramot Casket - $2800.00",
			value : "133635"
		},
		{
			text : "Regency Casket - $16000.00",
			value : "133636"
		},
		{
			text : "Sara Casket - $4495.00",
			value : "133637"
		},
		{
			text : "Seagrass Casket - $2000.00",
			value : "137402"
		},
		{
			text : "Shalom Casket - $4095.00",
			value : "133638"
		},
		{
			text : "Shalva Casket - $3000.00",
			value : "133639"
		},
		{
			text : "Sinai Casket - $10000.00",
			value : "133640"
		},
		{
			text : "Somerset Casket - $3500.00",
			value : "133641"
		},
		{
			text : "Tefila Casket - $995.00",
			value : "133707"
		},
		{
			text : "Urn - Standard Metal - $145.00",
			value : "133925"
		},
		{
			text : "Urn - Standard Metal (Ship out of state) - $145.00",
			value : "133935"
		},
		{
			text : "Whitney Casket - $3495.00",
			value : "133642"
		},
		{
			text : "Yehuda Casket - $3850.00",
			value : "133643"
		},
		{
			text : "Yonah Casket - $3300.00",
			value : "133644"
		},
		{
			text : "Ziegler Container - $575.00",
			value : "137783"
		},
		{
			text : "Ziegler Container (Ship out of state) - $575.00",
			value : "137782"
		}
	],
	//	List customlist_mts_svc_cskt_in_chpl
	casketInChapel : [
		{
			text : "Open",
			value : "1"
		},
		{
			text : "Closed",
			value : "2"
		},
		{
			text : "Dir. Inquiry",
			value : "3"
		}
	],
	//	List customlist_mts_cust_attributes
	clientAttributes : [
		{
			text : "Rabbi / Clergy",
			value : "1"
		},
		{
			text : "Doctor",
			value : "2"
		},
		{
			text : "Hospital / Care Facility",
			value : "3"
		},
		{
			text : "Congregation",
			value : "4"
		},
		{
			text : "Cemetery",
			value : "5"
		},
		{
			text : "Mortuary",
			value : "6"
		},
		{
			text : "Default",
			value : "7"
		},
		{
			text : "Other Organization",
			value : "8"
		}
	],
	//	List customlist_mts_inside_outside
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
	//	List customlist_mts_chapels
	chapel : [
		{
			text : "Kamenir Chapel",
			value : "1"
		},
		{
			text : "MS Chapel",
			value : "2"
		},
		{
			text : "TaNaCH Chapel",
			value : "3"
		},
		{
			text : "N/A",
			value : "4"
		}
	],
	//	List customlist_mts_contract_type
	contractType : [
		{
			text : "Cemetery",
			value : "1"
		},
		{
			text : "Mortuary",
			value : "2"
		},
		{
			text : "Accessory",
			value : "3"
		}
	],
	//	List customlist_mts_country
	countryInBook : [
		{
			text : "Afghanistan",
			value : "AF"
		},
		{
			text : "Aland Islands",
			value : "AX"
		},
		{
			text : "Albania",
			value : "AL"
		},
		{
			text : "Algeria",
			value : "DZ"
		},
		{
			text : "American Samoa",
			value : "AS"
		},
		{
			text : "Andorra",
			value : "AD"
		},
		{
			text : "Angola",
			value : "AO"
		},
		{
			text : "Anguilla",
			value : "AI"
		},
		{
			text : "Antarctica",
			value : "AQ"
		},
		{
			text : "Antigua and Barbuda",
			value : "AG"
		},
		{
			text : "Argentina",
			value : "AR"
		},
		{
			text : "Armenia",
			value : "AM"
		},
		{
			text : "Aruba",
			value : "AW"
		},
		{
			text : "Australia",
			value : "AU"
		},
		{
			text : "Austria",
			value : "AT"
		},
		{
			text : "Azerbaijan",
			value : "AZ"
		},
		{
			text : "Bahamas",
			value : "BS"
		},
		{
			text : "Bahrain",
			value : "BH"
		},
		{
			text : "Bangladesh",
			value : "BD"
		},
		{
			text : "Barbados",
			value : "BB"
		},
		{
			text : "Belarus",
			value : "BY"
		},
		{
			text : "Belgium",
			value : "BE"
		},
		{
			text : "Belize",
			value : "BZ"
		},
		{
			text : "Benin",
			value : "BJ"
		},
		{
			text : "Bermuda",
			value : "BM"
		},
		{
			text : "Bhutan",
			value : "BT"
		},
		{
			text : "Bolivia",
			value : "BO"
		},
		{
			text : "Bonaire, Saint Eustatius and Saba",
			value : "BQ"
		},
		{
			text : "Bosnia and Herzegovina",
			value : "BA"
		},
		{
			text : "Botswana",
			value : "BW"
		},
		{
			text : "Bouvet Island",
			value : "BV"
		},
		{
			text : "Brazil",
			value : "BR"
		},
		{
			text : "British Indian Ocean Territory",
			value : "IO"
		},
		{
			text : "Brunei Darussalam",
			value : "BN"
		},
		{
			text : "Bulgaria",
			value : "BG"
		},
		{
			text : "Burkina Faso",
			value : "BF"
		},
		{
			text : "Burundi",
			value : "BI"
		},
		{
			text : "Cambodia",
			value : "KH"
		},
		{
			text : "Cameroon",
			value : "CM"
		},
		{
			text : "Canada",
			value : "CA"
		},
		{
			text : "Canary Islands",
			value : "IC"
		},
		{
			text : "Cape Verde",
			value : "CV"
		},
		{
			text : "Cayman Islands",
			value : "KY"
		},
		{
			text : "Central African Republic",
			value : "CF"
		},
		{
			text : "Ceuta and Melilla",
			value : "EA"
		},
		{
			text : "Chad",
			value : "TD"
		},
		{
			text : "Chile",
			value : "CL"
		},
		{
			text : "China",
			value : "CN"
		},
		{
			text : "Christmas Island",
			value : "CX"
		},
		{
			text : "Cocos (Keeling) Islands",
			value : "CC"
		},
		{
			text : "Colombia",
			value : "CO"
		},
		{
			text : "Comoros",
			value : "KM"
		},
		{
			text : "Congo, Democratic Republic of",
			value : "CD"
		},
		{
			text : "Congo, Republic of",
			value : "CG"
		},
		{
			text : "Cook Islands",
			value : "CK"
		},
		{
			text : "Costa Rica",
			value : "CR"
		},
		{
			text : "Cote d&#39;Ivoire",
			value : "CI"
		},
		{
			text : "Croatia/Hrvatska",
			value : "HR"
		},
		{
			text : "Cuba",
			value : "CU"
		},
		{
			text : "Curaçao",
			value : "CW"
		},
		{
			text : "Cyprus",
			value : "CY"
		},
		{
			text : "Czech Republic",
			value : "CZ"
		},
		{
			text : "Denmark",
			value : "DK"
		},
		{
			text : "Djibouti",
			value : "DJ"
		},
		{
			text : "Dominica",
			value : "DM"
		},
		{
			text : "Dominican Republic",
			value : "DO"
		},
		{
			text : "East Timor",
			value : "TL"
		},
		{
			text : "Ecuador",
			value : "EC"
		},
		{
			text : "Egypt",
			value : "EG"
		},
		{
			text : "El Salvador",
			value : "SV"
		},
		{
			text : "Equatorial Guinea",
			value : "GQ"
		},
		{
			text : "Eritrea",
			value : "ER"
		},
		{
			text : "Estonia",
			value : "EE"
		},
		{
			text : "Ethiopia",
			value : "ET"
		},
		{
			text : "Falkland Islands",
			value : "FK"
		},
		{
			text : "Faroe Islands",
			value : "FO"
		},
		{
			text : "Fiji",
			value : "FJ"
		},
		{
			text : "Finland",
			value : "FI"
		},
		{
			text : "France",
			value : "FR"
		},
		{
			text : "French Guiana",
			value : "GF"
		},
		{
			text : "French Polynesia",
			value : "PF"
		},
		{
			text : "French Southern Territories",
			value : "TF"
		},
		{
			text : "Gabon",
			value : "GA"
		},
		{
			text : "Gambia",
			value : "GM"
		},
		{
			text : "Georgia",
			value : "GE"
		},
		{
			text : "Germany",
			value : "DE"
		},
		{
			text : "Ghana",
			value : "GH"
		},
		{
			text : "Gibraltar",
			value : "GI"
		},
		{
			text : "Greece",
			value : "GR"
		},
		{
			text : "Greenland",
			value : "GL"
		},
		{
			text : "Grenada",
			value : "GD"
		},
		{
			text : "Guadeloupe",
			value : "GP"
		},
		{
			text : "Guam",
			value : "GU"
		},
		{
			text : "Guatemala",
			value : "GT"
		},
		{
			text : "Guernsey",
			value : "GG"
		},
		{
			text : "Guinea",
			value : "GN"
		},
		{
			text : "Guinea-Bissau",
			value : "GW"
		},
		{
			text : "Guyana",
			value : "GY"
		},
		{
			text : "Haiti",
			value : "HT"
		},
		{
			text : "Heard and McDonald Islands",
			value : "HM"
		},
		{
			text : "Holy See (City Vatican State)",
			value : "VA"
		},
		{
			text : "Honduras",
			value : "HN"
		},
		{
			text : "Hong Kong",
			value : "HK"
		},
		{
			text : "Hungary",
			value : "HU"
		},
		{
			text : "Iceland",
			value : "IS"
		},
		{
			text : "India",
			value : "IN"
		},
		{
			text : "Indonesia",
			value : "ID"
		},
		{
			text : "Iran (Islamic Republic of)",
			value : "IR"
		},
		{
			text : "Iraq",
			value : "IQ"
		},
		{
			text : "Ireland",
			value : "IE"
		},
		{
			text : "Isle of Man",
			value : "IM"
		},
		{
			text : "Israel",
			value : "IL"
		},
		{
			text : "Italy",
			value : "IT"
		},
		{
			text : "Jamaica",
			value : "JM"
		},
		{
			text : "Japan",
			value : "JP"
		},
		{
			text : "Jersey",
			value : "JE"
		},
		{
			text : "Jordan",
			value : "JO"
		},
		{
			text : "Kazakhstan",
			value : "KZ"
		},
		{
			text : "Kenya",
			value : "KE"
		},
		{
			text : "Kiribati",
			value : "KI"
		},
		{
			text : "Korea, Democratic People&#39;s Republic",
			value : "KP"
		},
		{
			text : "Korea, Republic of",
			value : "KR"
		},
		{
			text : "Kosovo",
			value : "XK"
		},
		{
			text : "Kuwait",
			value : "KW"
		},
		{
			text : "Kyrgyzstan",
			value : "KG"
		},
		{
			text : "Lao People&#39;s Democratic Republic",
			value : "LA"
		},
		{
			text : "Latvia",
			value : "LV"
		},
		{
			text : "Lebanon",
			value : "LB"
		},
		{
			text : "Lesotho",
			value : "LS"
		},
		{
			text : "Liberia",
			value : "LR"
		},
		{
			text : "Libya",
			value : "LY"
		},
		{
			text : "Liechtenstein",
			value : "LI"
		},
		{
			text : "Lithuania",
			value : "LT"
		},
		{
			text : "Luxembourg",
			value : "LU"
		},
		{
			text : "Macau",
			value : "MO"
		},
		{
			text : "Macedonia",
			value : "MK"
		},
		{
			text : "Madagascar",
			value : "MG"
		},
		{
			text : "Malawi",
			value : "MW"
		},
		{
			text : "Malaysia",
			value : "MY"
		},
		{
			text : "Maldives",
			value : "MV"
		},
		{
			text : "Mali",
			value : "ML"
		},
		{
			text : "Malta",
			value : "MT"
		},
		{
			text : "Marshall Islands",
			value : "MH"
		},
		{
			text : "Martinique",
			value : "MQ"
		},
		{
			text : "Mauritania",
			value : "MR"
		},
		{
			text : "Mauritius",
			value : "MU"
		},
		{
			text : "Mayotte",
			value : "YT"
		},
		{
			text : "Mexico",
			value : "MX"
		},
		{
			text : "Micronesia, Federal State of",
			value : "FM"
		},
		{
			text : "Moldova, Republic of",
			value : "MD"
		},
		{
			text : "Monaco",
			value : "MC"
		},
		{
			text : "Mongolia",
			value : "MN"
		},
		{
			text : "Montenegro",
			value : "ME"
		},
		{
			text : "Montserrat",
			value : "MS"
		},
		{
			text : "Morocco",
			value : "MA"
		},
		{
			text : "Mozambique",
			value : "MZ"
		},
		{
			text : "Myanmar (Burma)",
			value : "MM"
		},
		{
			text : "Namibia",
			value : "NA"
		},
		{
			text : "Nauru",
			value : "NR"
		},
		{
			text : "Nepal",
			value : "NP"
		},
		{
			text : "Netherlands",
			value : "NL"
		},
		{
			text : "Netherlands Antilles (Deprecated)",
			value : "AN"
		},
		{
			text : "New Caledonia",
			value : "NC"
		},
		{
			text : "New Zealand",
			value : "NZ"
		},
		{
			text : "Nicaragua",
			value : "NI"
		},
		{
			text : "Niger",
			value : "NE"
		},
		{
			text : "Nigeria",
			value : "NG"
		},
		{
			text : "Niue",
			value : "NU"
		},
		{
			text : "Norfolk Island",
			value : "NF"
		},
		{
			text : "Northern Mariana Islands",
			value : "MP"
		},
		{
			text : "Norway",
			value : "NO"
		},
		{
			text : "Oman",
			value : "OM"
		},
		{
			text : "Pakistan",
			value : "PK"
		},
		{
			text : "Palau",
			value : "PW"
		},
		{
			text : "Panama",
			value : "PA"
		},
		{
			text : "Papua New Guinea",
			value : "PG"
		},
		{
			text : "Paraguay",
			value : "PY"
		},
		{
			text : "Peru",
			value : "PE"
		},
		{
			text : "Philippines",
			value : "PH"
		},
		{
			text : "Pitcairn Island",
			value : "PN"
		},
		{
			text : "Poland",
			value : "PL"
		},
		{
			text : "Portugal",
			value : "PT"
		},
		{
			text : "Puerto Rico",
			value : "PR"
		},
		{
			text : "Qatar",
			value : "QA"
		},
		{
			text : "Reunion Island",
			value : "RE"
		},
		{
			text : "Romania",
			value : "RO"
		},
		{
			text : "Russian Federation",
			value : "RU"
		},
		{
			text : "Rwanda",
			value : "RW"
		},
		{
			text : "Saint Barthélemy",
			value : "BL"
		},
		{
			text : "Saint Helena",
			value : "SH"
		},
		{
			text : "Saint Kitts and Nevis",
			value : "KN"
		},
		{
			text : "Saint Lucia",
			value : "LC"
		},
		{
			text : "Saint Martin",
			value : "MF"
		},
		{
			text : "Saint Vincent and the Grenadines",
			value : "VC"
		},
		{
			text : "Samoa",
			value : "WS"
		},
		{
			text : "San Marino",
			value : "SM"
		},
		{
			text : "Sao Tome and Principe",
			value : "ST"
		},
		{
			text : "Saudi Arabia",
			value : "SA"
		},
		{
			text : "Senegal",
			value : "SN"
		},
		{
			text : "Serbia",
			value : "RS"
		},
		{
			text : "Serbia and Montenegro (Deprecated)",
			value : "CS"
		},
		{
			text : "Seychelles",
			value : "SC"
		},
		{
			text : "Sierra Leone",
			value : "SL"
		},
		{
			text : "Singapore",
			value : "SG"
		},
		{
			text : "Sint Maarten",
			value : "SX"
		},
		{
			text : "Slovak Republic",
			value : "SK"
		},
		{
			text : "Slovenia",
			value : "SI"
		},
		{
			text : "Solomon Islands",
			value : "SB"
		},
		{
			text : "Somalia",
			value : "SO"
		},
		{
			text : "South Africa",
			value : "ZA"
		},
		{
			text : "South Georgia",
			value : "GS"
		},
		{
			text : "South Sudan",
			value : "SS"
		},
		{
			text : "Spain",
			value : "ES"
		},
		{
			text : "Sri Lanka",
			value : "LK"
		},
		{
			text : "St. Pierre and Miquelon",
			value : "PM"
		},
		{
			text : "State of Palestine",
			value : "PS"
		},
		{
			text : "Sudan",
			value : "SD"
		},
		{
			text : "Suriname",
			value : "SR"
		},
		{
			text : "Svalbard and Jan Mayen Islands",
			value : "SJ"
		},
		{
			text : "Swaziland",
			value : "SZ"
		},
		{
			text : "Sweden",
			value : "SE"
		},
		{
			text : "Switzerland",
			value : "CH"
		},
		{
			text : "Syrian Arab Republic",
			value : "SY"
		},
		{
			text : "Taiwan",
			value : "TW"
		},
		{
			text : "Tajikistan",
			value : "TJ"
		},
		{
			text : "Tanzania",
			value : "TZ"
		},
		{
			text : "Thailand",
			value : "TH"
		},
		{
			text : "Togo",
			value : "TG"
		},
		{
			text : "Tokelau",
			value : "TK"
		},
		{
			text : "Tonga",
			value : "TO"
		},
		{
			text : "Trinidad and Tobago",
			value : "TT"
		},
		{
			text : "Tunisia",
			value : "TN"
		},
		{
			text : "Turkey",
			value : "TR"
		},
		{
			text : "Turkmenistan",
			value : "TM"
		},
		{
			text : "Turks and Caicos Islands",
			value : "TC"
		},
		{
			text : "Tuvalu",
			value : "TV"
		},
		{
			text : "Uganda",
			value : "UG"
		},
		{
			text : "Ukraine",
			value : "UA"
		},
		{
			text : "United Arab Emirates",
			value : "AE"
		},
		{
			text : "United Kingdom",
			value : "GB"
		},
		{
			text : "United States",
			value : "US"
		},
		{
			text : "Uruguay",
			value : "UY"
		},
		{
			text : "US Minor Outlying Islands",
			value : "UM"
		},
		{
			text : "Uzbekistan",
			value : "UZ"
		},
		{
			text : "Vanuatu",
			value : "VU"
		},
		{
			text : "Venezuela",
			value : "VE"
		},
		{
			text : "Vietnam",
			value : "VN"
		},
		{
			text : "Virgin Islands (British)",
			value : "VG"
		},
		{
			text : "Virgin Islands (USA)",
			value : "VI"
		},
		{
			text : "Wallis and Futuna",
			value : "WF"
		},
		{
			text : "Western Sahara",
			value : "EH"
		},
		{
			text : "Yemen",
			value : "YE"
		},
		{
			text : "Zambia",
			value : "ZM"
		},
		{
			text : "Zimbabwe",
			value : "ZW"
		}
	],
	//	List customlist_mts_covid19
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
	],
	//	List customlist_mts_judsm_branch
	denomination : [
		{
			text : "Conservative",
			value : "1"
		},
		{
			text : "Orthodox",
			value : "2"
		},
		{
			text : "Reform",
			value : "3"
		},
		{
			text : "Reconstructionist",
			value : "4"
		},
		{
			text : "Chabad",
			value : "5"
		},
		{
			text : "Modern Orthodox",
			value : "6"
		},
		{
			text : "Modern Reform",
			value : "7"
		},
		{
			text : "Non-Denominational",
			value : "8"
		},
		{
			text : "Progressive Conservative",
			value : "9"
		},
		{
			text : "Progressive Reform",
			value : "10"
		},
		{
			text : "Spiritual",
			value : "11"
		},
		{
			text : "Transdenominational",
			value : "12"
		}
	],
	//	List customlist_mts_judsm_branch
	denominationVtl : [
		{
			text : "Conservative",
			value : "1"
		},
		{
			text : "Orthodox",
			value : "2"
		},
		{
			text : "Reform",
			value : "3"
		},
		{
			text : "Reconstructionist",
			value : "4"
		},
		{
			text : "Chabad",
			value : "5"
		},
		{
			text : "Modern Orthodox",
			value : "6"
		},
		{
			text : "Modern Reform",
			value : "7"
		},
		{
			text : "Non-Denominational",
			value : "8"
		},
		{
			text : "Progressive Conservative",
			value : "9"
		},
		{
			text : "Progressive Reform",
			value : "10"
		},
		{
			text : "Spiritual",
			value : "11"
		},
		{
			text : "Transdenominational",
			value : "12"
		}
	],
	//	List customlist_mts_education
	education : [
		{
			text : "HS Graduate",
			value : "1"
		},
		{
			text : "Some College",
			value : "2"
		},
		{
			text : "Associate",
			value : "3"
		},
		{
			text : "Bachelor&#39;s",
			value : "4"
		},
		{
			text : "Professional",
			value : "5"
		},
		{
			text : "Master&#39;s",
			value : "6"
		},
		{
			text : "Doctorate",
			value : "7"
		},
		{
			text : "Unknown",
			value : "8"
		},
		{
			text : "1st Grade",
			value : "9"
		},
		{
			text : "2nd Grade",
			value : "10"
		},
		{
			text : "3rd Grade",
			value : "11"
		},
		{
			text : "4th Grade",
			value : "12"
		},
		{
			text : "5th Grade",
			value : "13"
		},
		{
			text : "6th Grade",
			value : "14"
		},
		{
			text : "7th Grade",
			value : "15"
		},
		{
			text : "8th Grade",
			value : "16"
		},
		{
			text : "9th Grade",
			value : "17"
		},
		{
			text : "10th Grade",
			value : "18"
		},
		{
			text : "11th Grade",
			value : "19"
		},
		{
			text : "12th Grade",
			value : "20"
		}
	],
	//	List customlist_mts_ethncty
	ethnicity : [
		{
			text : "White",
			value : "1"
		},
		{
			text : "Black",
			value : "2"
		},
		{
			text : "African American",
			value : "3"
		},
		{
			text : "American Indian",
			value : "4"
		},
		{
			text : "Alaska Native",
			value : "5"
		},
		{
			text : "Native Hawaiian",
			value : "6"
		},
		{
			text : "Guamanian",
			value : "7"
		},
		{
			text : "Samoan",
			value : "8"
		},
		{
			text : "Other Pacific Islander",
			value : "9"
		},
		{
			text : "Asian Indian",
			value : "10"
		},
		{
			text : "Cambodian",
			value : "11"
		},
		{
			text : "Chinese",
			value : "12"
		},
		{
			text : "Filipino",
			value : "13"
		},
		{
			text : "Hmong",
			value : "14"
		},
		{
			text : "Japanese",
			value : "15"
		},
		{
			text : "Korean",
			value : "16"
		},
		{
			text : "Laotian",
			value : "17"
		},
		{
			text : "Thai",
			value : "18"
		},
		{
			text : "Vietnamese",
			value : "19"
		},
		{
			text : "Other Asian",
			value : "20"
		},
		{
			text : "Other",
			value : "21"
		},
		{
			text : "Unknown",
			value : "22"
		},
		{
			text : "Aleut",
			value : "23"
		},
		{
			text : "Eskimo",
			value : "24"
		},
		{
			text : "Hawaiian",
			value : "25"
		},
		{
			text : "Pacific Islander",
			value : "26"
		},
		{
			text : "Hispanic",
			value : "27"
		}
	],
	//	List customlist_mts_flag_desc
	flagDescription : [
		{
			text : "Draped",
			value : "1"
		},
		{
			text : "Folded",
			value : "2"
		},
		{
			text : "Presented Only",
			value : "3"
		}
	],
	//	List customlist_mts_svc_flwrs_provd_by
	flowersProvidedBy : [
		{
			text : "MSMP",
			value : "1"
		},
		{
			text : "Family",
			value : "2"
		}
	],
	//	List customlist_mts_cust_gender
	gender : [
		{
			text : "Female",
			value : "1"
		},
		{
			text : "Male",
			value : "2"
		}
	],
	//	List customlist_mts_interment_order_type
	intermentOrderType : [
		{
			text : "Interment",
			value : "1"
		},
		{
			text : "Disinterment",
			value : "2"
		}
	],
	//	List customlist_mts_svc_inter_type
	intermentType : [
		{
			text : "Traditional",
			value : "1"
		},
		{
			text : "Cremation",
			value : "2"
		},
		{
			text : "No Interment",
			value : "3"
		},
		{
			text : "Already Interred",
			value : "4"
		}
	],
	//	List customlist_mts_svc_recv_aftr_loc
	location : [
		{
			text : "Home",
			value : "1"
		},
		{
			text : "Restaurant",
			value : "2"
		},
		{
			text : "Other",
			value : "3"
		},
		{
			text : "Director Inq.",
			value : "4"
		}
	],
	//	List customlist_mts_mc_cust_marital
	maritalStatus : [
		{
			text : "Married",
			value : "1"
		},
		{
			text : "Unknown",
			value : "2"
		},
		{
			text : "Divorced",
			value : "3"
		},
		{
			text : "Never Married",
			value : "4"
		},
		{
			text : "Widowed",
			value : "5"
		},
		{
			text : "SRDP",
			value : "6"
		},
		{
			text : "SRDP SURV",
			value : "7"
		},
		{
			text : "Mar./Wid.",
			value : "8"
		}
	],
	//	List customlist_mts_msmp_family
	msmpFamily : [
		{
			text : "MSMP",
			value : "1"
		},
		{
			text : "Family",
			value : "2"
		}
	],
	//	List customlist_mts_inside_outside
	mortuary : [
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
	//	Search on 'item' where 'name' contains 'Opening/Closing'
	//	Contains baseprices in label text.
	openingClosing : [
		{
			text : "",
			value : ""
		},
		{
			text : "Niche Wall - $375.00",
			value : "134131"
		},
		{
			text : "Cremains Ground - $375.00",
			value : "134524"
		},
		{
			text : "Ground - $950.00",
			value : "134525"
		},
		{
			text : "Lawn Crypt - $950.00",
			value : "134526"
		},
		{
			text : "Wall Crypt - $950.00",
			value : "134528"
		}
	],
	//	List customlist_mts_park
	park : [
		{
			text : "Los Angeles",
			value : "1"
		},
		{
			text : "Simi Valley",
			value : "2"
		}
	],
	//	List customlist_mts_intrmt_perm_temp
	permanentTemporary : [
		{
			text : "Permanent",
			value : "1"
		},
		{
			text : "Temporary",
			value : "2"
		}
	],
	//	List customlist_mts_mc_place_of_death
	placeOfDeath : [
		{
			text : "Residence",
			value : "1"
		},
		{
			text : "Care Facility/Convalescent",
			value : "2"
		},
		{
			text : "Inpatient",
			value : "3"
		},
		{
			text : "Emergency Room",
			value : "4"
		},
		{
			text : "Other",
			value : "5"
		},
		{
			text : "Assisted Living",
			value : "6"
		},
		{
			text : "Unknown",
			value : "7"
		}
	],
	//	Search on 'customrecord_mts_contact_relationships' where 
	//	'custrecord_mts_crel_relationship_type' is noneof @NONE@.
	//	Contains reference to 'custrecord_mts_crel_relationship_type'
	relationship : [
		{
			text : "Aunt",
			type : "16",
			value : "1"
		},
		{
			text : "Brother",
			type : "13",
			value : "2"
		},
		{
			text : "Brother-in-law",
			type : "16",
			value : "3"
		},
		{
			text : "Cousin",
			type : "16",
			value : "9"
		},
		{
			text : "Daughter",
			type : "4",
			value : "10"
		},
		{
			text : "Daughter (Minor)",
			type : "4",
			value : "11"
		},
		{
			text : "Daughter-in-law",
			type : "16",
			value : "12"
		},
		{
			text : "Domestic Partner",
			type : "16",
			value : "13"
		},
		{
			text : "Ex-husband",
			type : "3",
			value : "15"
		},
		{
			text : "Father",
			type : "5",
			value : "18"
		},
		{
			text : "Father-in-law",
			type : "16",
			value : "19"
		},
		{
			text : "Granddaughter",
			type : "16",
			value : "21"
		},
		{
			text : "Grandfather",
			type : "16",
			value : "22"
		},
		{
			text : "Grandmother",
			type : "16",
			value : "23"
		},
		{
			text : "Grandson",
			type : "16",
			value : "24"
		},
		{
			text : "Great Aunt",
			type : "16",
			value : "25"
		},
		{
			text : "Great Granddaughter",
			type : "16",
			value : "26"
		},
		{
			text : "Great Great Granddaughter",
			type : "16",
			value : "27"
		},
		{
			text : "Great Grandson",
			type : "16",
			value : "28"
		},
		{
			text : "Great Great Grandson",
			type : "16",
			value : "29"
		},
		{
			text : "Great Nephew",
			type : "16",
			value : "30"
		},
		{
			text : "Great Niece",
			type : "16",
			value : "31"
		},
		{
			text : "Husband",
			type : "3",
			value : "33"
		},
		{
			text : "Mother",
			type : "5",
			value : "36"
		},
		{
			text : "Mother-in-law",
			type : "16",
			value : "37"
		},
		{
			text : "Nephew",
			type : "16",
			value : "38"
		},
		{
			text : "Niece",
			type : "16",
			value : "39"
		},
		{
			text : "Partner",
			type : "16",
			value : "42"
		},
		{
			text : "Rabbi",
			type : "2",
			value : "45"
		},
		{
			text : "Sister",
			type : "13",
			value : "47"
		},
		{
			text : "Sister-in-law",
			type : "16",
			value : "48"
		},
		{
			text : "Son",
			type : "4",
			value : "49"
		},
		{
			text : "Son (Minor)",
			type : "4",
			value : "50"
		},
		{
			text : "Son-in-law",
			type : "16",
			value : "51"
		},
		{
			text : "Spouse",
			type : "3",
			value : "52"
		},
		{
			text : "Step-Brother",
			type : "13",
			value : "53"
		},
		{
			text : "Step-Daughter",
			type : "4",
			value : "54"
		},
		{
			text : "Step-Daughter (Minor)",
			type : "4",
			value : "55"
		},
		{
			text : "Step-Father",
			type : "5",
			value : "56"
		},
		{
			text : "Step-Mother",
			type : "5",
			value : "57"
		},
		{
			text : "Step-Sister",
			type : "13",
			value : "58"
		},
		{
			text : "Step-Son",
			type : "4",
			value : "59"
		},
		{
			text : "Step-Son (Minor)",
			type : "4",
			value : "60"
		},
		{
			text : "Uncle",
			type : "16",
			value : "62"
		},
		{
			text : "Wife",
			type : "3",
			value : "63"
		}
	],
	//	List customlist_mts_cust_religion
	religion : [
		{
			"text": "Atheist",
			"value": 1
		  },
		  {
			"text": "Buddhist",
			"value": 2
		  },
		  {
			"text": "Catholic",
			"value": 3
		  },
		  {
			"text": "Christian",
			"value": 4
		  },
		  {
			"text": "Eastern Orthodox",
			"value": 5
		  },
		  {
			"text": "Greek Orthodox",
			"value": 6
		  },
		  {
			"text": "Hindu",
			"value": 7
		  },
		  {
			"text": "Islamic",
			"value": 8
		  },
		  {
			"text": "Jehovah's Witness",
			"value": 9
		  },
		  {
			"text": "Jewish",
			"value": 10
		  },
		  {
			"text": "Mormon",
			"value": 11
		  },
		  {
			"text": "N/A",
			"value": 12
		  },
		  {
			"text": "Protestant",
			"value": 13
		  },
		  {
			"text": "Taoist",
			"value": 14
		  }
	],
	//	A simple list from 1 to 12.
	scheduleMonths : [
		{
			text : 1,
			value : 1
		},
		{
			text : 2,
			value : 2
		},
		{
			text : 3,
			value : 3
		},
		{
			text : 4,
			value : 4
		},
		{
			text : 5,
			value : 5
		},
		{
			text : 6,
			value : 6
		},
		{
			text : 7,
			value : 7
		},
		{
			text : 8,
			value : 8
		},
		{
			text : 9,
			value : 9
		},
		{
			text : 10,
			value : 10
		},
		{
			text : 11,
			value : 11
		},
		{
			text : 12,
			value : 12
		}
	],
	//	List customlist_mts_svc_type
	serviceType : [
		{
			text : "Funeral",
			value : "1"
		},
		{
			text : "Memorial",
			value : "2"
		},
		{
			text : "M/S Convenience",
			value : "3"
		}
	],
	//	List customlist_mts_svc_type_old
	serviceTypeList : [
		{
			"text": "Burial",
			"value": 21
		},
		{
			"text": "Ship-In",
			"value": 22
		},
		{
			"text": "Ship-Out",
			"value": 23
		},
		{
			"text": "Cremation",
			"value": 24
		},
		{
			"text": "Cremation - with commital Svc",
			"value": 15
		},
		{
			"text": "Cremation by other company",
			"value": 16
		},
		{
			"text": "Cremation with Memorial Svc.",
			"value": 17
		},
		{
			"text": "Direct Burial",
			"value": 1
		},
		{
			"text": "Direct Cremation",
			"value": 2
		},
		{
			"text": "Disinter/Reinter",
			"value": 3
		},
		{
			"text": "Disinter/Shipout",
			"value": 4
		},
		{
			"text": "Funeral with Casket",
			"value": 5
		},
		{
			"text": "Funeral with Urn",
			"value": 6
		},
		{
			"text": "Post-Need",
			"value": 25
		},
		{
			"text": "M/S Convenience",
			"value": 19
		},
		{
			"text": "M/S Convenience C-19",
			"value": 20
		},
		{
			"text": "Memorial Service with Casket",
			"value": 7
		},
		{
			"text": "Memorial Service without Casket",
			"value": 8
		},
		{
			"text": "Other",
			"value": 10
		},
		{
			"text": "Lost Case",
			"value": 26
		},
		{
			"text": "Ship-In - With Service",
			"value": 11
		},
		{
			"text": "Ship-In - Without Service",
			"value": 12
		},
		{
			"text": "Ship-Out - With Service",
			"value": 13
		},
		{
			"text": "Ship-Out - Without Service",
			"value": 14
		}
	],
	//	A search on 'item' where 'name' contains 'Staff For'
	//	Label text contains 'baseprice'
	staff : [
		{
			text : "",
			value : ""
		},
		{
			text : "Equipment/Staff for Graveside Service - $650.00",
			value : "134243"
		},
		{
			text : "Facilities/Staff for Funeral Ceremony - $650.00",
			value : "134244"
		},
		{
			text : "Facilities/Staff for Memorial Ceremony - $650.00",
			value : "134245"
		}
	],
	//	List customlist_mts_states
	stateDropDown : [
		{
			text : "Alabama",
			value : "AL"
		},
		{
			text : "Alaska",
			value : "AK"
		},
		{
			text : "Arizona",
			value : "AZ"
		},
		{
			text : "Arkansas",
			value : "AR"
		},
		{
			text : "Armed Forces Americas",
			value : "AA"
		},
		{
			text : "Armed Forces Europe",
			value : "AE"
		},
		{
			text : "Armed Forces Pacific",
			value : "AP"
		},
		{
			text : "California",
			value : "CA"
		},
		{
			text : "Colorado",
			value : "CO"
		},
		{
			text : "Connecticut",
			value : "CT"
		},
		{
			text : "Delaware",
			value : "DE"
		},
		{
			text : "District of Columbia",
			value : "DC"
		},
		{
			text : "Florida",
			value : "FL"
		},
		{
			text : "Georgia",
			value : "GA"
		},
		{
			text : "Hawaii",
			value : "HI"
		},
		{
			text : "Idaho",
			value : "ID"
		},
		{
			text : "Illinois",
			value : "IL"
		},
		{
			text : "Indiana",
			value : "IN"
		},
		{
			text : "Iowa",
			value : "IA"
		},
		{
			text : "Kansas",
			value : "KS"
		},
		{
			text : "Kentucky",
			value : "KY"
		},
		{
			text : "Louisiana",
			value : "LA"
		},
		{
			text : "Maine",
			value : "ME"
		},
		{
			text : "Maryland",
			value : "MD"
		},
		{
			text : "Massachusetts",
			value : "MA"
		},
		{
			text : "Michigan",
			value : "MI"
		},
		{
			text : "Minnesota",
			value : "MN"
		},
		{
			text : "Mississippi",
			value : "MS"
		},
		{
			text : "Missouri",
			value : "MO"
		},
		{
			text : "Montana",
			value : "MT"
		},
		{
			text : "Nebraska",
			value : "NE"
		},
		{
			text : "Nevada",
			value : "NV"
		},
		{
			text : "New Hampshire",
			value : "NH"
		},
		{
			text : "New Jersey",
			value : "NJ"
		},
		{
			text : "New Mexico",
			value : "NM"
		},
		{
			text : "New York",
			value : "NY"
		},
		{
			text : "North Carolina",
			value : "NC"
		},
		{
			text : "North Dakota",
			value : "ND"
		},
		{
			text : "Ohio",
			value : "OH"
		},
		{
			text : "Oklahoma",
			value : "OK"
		},
		{
			text : "Oregon",
			value : "OR"
		},
		{
			text : "Pennsylvania",
			value : "PA"
		},
		{
			text : "Puerto Rico",
			value : "PR"
		},
		{
			text : "Rhode Island",
			value : "RI"
		},
		{
			text : "South Carolina",
			value : "SC"
		},
		{
			text : "South Dakota",
			value : "SD"
		},
		{
			text : "Tennessee",
			value : "TN"
		},
		{
			text : "Texas",
			value : "TX"
		},
		{
			text : "Utah",
			value : "UT"
		},
		{
			text : "Vermont",
			value : "VT"
		},
		{
			text : "Virginia",
			value : "VA"
		},
		{
			text : "Washington",
			value : "WA"
		},
		{
			text : "West Virginia",
			value : "WV"
		},
		{
			text : "Wisconsin",
			value : "WI"
		},
		{
			text : "Wyoming",
			value : "WY"
		}
	],
	//	A search on 'item' where 'name' contains 'Transfer of Remains'
	//	Label text contains 'baseprice'
	transferOfRemains : [
		{
			text : "",
			value : ""
		},
		{
			text : "LA, Orange, Ventura - $475.00",
			value : "134250"
		},
		{
			text : "LV, No. Calif. - $1500.00",
			value : "134251"
		},
		{
			text : "Outside Calif. - $1995.00",
			value : "134252"
		},
		{
			text : "Riverside, S Bernardino, Sta Barbara - $600.00",
			value : "134253"
		},
		{
			text : "San Diego, Imperial, Kern, SLO - $800.00",
			value : "134254"
		}
	],
	//	List customlist_mts_yes_no
	yesNo : [
		{
			text : "Yes",
			value : "1"
		},
		{
			text : "No",
			value : "2"
		}
	],
	websiteWebcastList:[
		{
			text : "Chapel",
			value : "1"
		},
		{
			text : "No",
			value : "2"
		},{
			text : "Graveside",
			value : "3"
		},
		{
			text : "Both",
			value : "4"
		}
	]
};

return { options : options };
});
