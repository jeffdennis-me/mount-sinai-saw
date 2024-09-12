//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Client/Messages.js
//				The messages routines for the client side of SAW
//Developer: Sylvain Muise
//Date: August 22, 2019

///**
// * @NApiVersion 2.x
// * @NModuleScope Public
// */
//define(['./HTML'],
//
//function(HTML) {
function Messages(div, active) {
	this.table = div.html(HTML.table()).find("table");
	this.active = active;
}
	
Messages.prototype.append = 
function(messageStr, style, duration) {
	console.log(messageStr);
	if (this.active) {
		this.table.append(HTML.message(messageStr, style));
		var message = this.table.find("tr:last");
		this.setDuration(message, duration);
		return message;
	}
};

Messages.prototype.clearMessage = 
function(message) {
	message.fadeOut("slow");
};

Messages.prototype.prepend = 
function(messageStr, style, duration) {
	console.log(messageStr);
	if (this.active) {
		this.table.prepend(HTML.message(messageStr,style));
		var message = this.table.find("tr:first");
		this.setDuration(message, duration);
		return message;
	}
};

Messages.prototype.setDuration = 
function(message, duration) {
	if (this.active) {
		if (duration) {
			window.setTimeout(this.clearMessage, duration, message);
		}
	}
};

Messages.prototype.updateMessage = 
function(message, messageStr, css, duration)
{
	console.log(messageStr);
	if (this.active) {
		var td = message.find("td");
		td.html(messageStr);
		td.css(css)
		this.setDuration(message, duration);
	}
};