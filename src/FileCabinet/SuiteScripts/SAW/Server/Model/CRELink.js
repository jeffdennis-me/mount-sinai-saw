// Copyright 2019, All rights reserved, Prolecto Resources, Inc.
//
// No part of this file may be copied or used without express, written
// permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
// Description: Execute CRE by HTTP request
// Developer: Sylvain Muise
// Date: July 11, 2019
// Notes:
//------------------------------------------------------------------
function CRELink(request, response)
{
    var body = JSON.parse(request.getBody());
    var creProfile = new CREProfile(body.profileId);
    creProfile.Translate(body.recordId);
    creProfile.Execute(true);

    var fileName = creProfile.fields.DocumentName.translatedValue;

    response.write(JSON.stringify({
        fileName : fileName,
        url : nlapiLoadFile('CRE Output/'+ fileName).getURL()
    }));

//  var urls = [];
//  var urls = body.profiles.map(function(profileId) {
//      var creProfile = new CREProfile(profileId);
//
//      if (profileId == 85 || profileId == 93)
//          creProfile.Translate(body.salesOrderId);
//      else if (profileId == 91)
//          creProfile.Translate(body.intermentOrderId);
//      else
//          creProfile.Translate(body.serviceId);
//
//      creProfile.Execute(true);
//
//      var fileName = creProfile.fields.DocumentName.translatedValue;
////        urls.push({
//      return {
//          fileName : fileName,
//          url : nlapiLoadFile('CRE Output/'+ fileName).getURL()
//      };
//  });
//  response.write(JSON.stringify(urls));
}
