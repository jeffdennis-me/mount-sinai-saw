//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Client/Model/User.js
//              Models the steplist and current sections.
//Developer: Sylvain Muise
//Date: October 28, 2019

function User(db) {
    this.db = db;
    lib.objForEach(JSON.parse(lib.getParam('user')), function(value, key) {
        this[key] = value;
    }, this);
}
