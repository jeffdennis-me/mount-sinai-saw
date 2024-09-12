//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Server/View/Tag.js
//              Provides methods that return HTML to render the elements on the
//              page.
//Developer: Sylvain Muise
//Date: September 1, 2019

/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(['../Library'],

function(lib) {

    function newTag(name) {
        return new Tag(name);
    }

    function Tag(name) {
        this.name = name.toLowerCase();
        this.attributes = {};
        this.children = [];
    }

    Tag.prototype.append =
    function(inner) {
        this.children.push(inner);
        return this;
    }

    Tag.prototype.attr =
    function(attributes) {
        this.attributes = attributes;
        return this;
    }

    Tag.prototype.css =
    function(styles) {
        this.attributes.style = lib.objReduce(styles,
        function(acc, value, key) {
            return acc + key +': '+ value +'; ';
        }, '');
        return this;
    }

    Tag.prototype.firstChild =
    function() {
        return this.children[0];
    }

    Tag.prototype.lastChild =
    function() {
        return this.children[this.children.length - 1];
    }

    Tag.prototype.prepend =
    function(inner) {
        this.children.unshift(inner);
        return this;
    }

    Tag.prototype.toString =
    function() {
        var docType = (this.name == 'html' ? '!DOCTYPE ' : '');
        var html = "<"+ docType + this.name;
        html += lib.objReduce(this.attributes, function(acc, attribute, key) {
            return acc +" "+ key +"='"+ attribute +"'";
        }, "");
        html += ">\n";
        for (var i = 0; i < this.children.length; i++) {
            html += this.children[i].toString();
        }
        var close = (this.name == 'br' ? '' : '</'+ this.name +'>');
        return html + close +'\n';
    }

    return { newTag : newTag };

});
