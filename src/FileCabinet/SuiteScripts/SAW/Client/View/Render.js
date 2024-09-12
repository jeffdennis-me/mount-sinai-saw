//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.


//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Client/View/Render.js
//              The view module for the client side of SAW
//Developer: Sylvain Muise
//Date: August 21, 2019

function Render() {
    this.form = {
        back : $("#back"),
        inputs : {},
        next : $("#next"),
        screen : $("#screen"),
        screenLabel : $("#screen_label"),
        sectionList : $("#section_list"),
        summary : $("#summary"),
        wizardNotes : $("#notes_screen"),
        wizardNotesLabel : $("#notes_label")
    };
    this.enable('next');
}

Render.prototype.attachHandlers = function(elem, field) {
    switch(field.type) {
    case 'button':
        elem.click(this.saveForm.bind(this))
            .click(this.handler.clickField[field.id]);
        break;
    case 'customtable':
//      elem.find('input')
//          .change(this.saveForm.bind(this))
//          .change(this.handler.changeField[field.id]);
//      elem.find('tr').not(':first')
        elem.find('td')
            .click(this.saveForm.bind(this))
            .click(this.handler.clickField[field.id]);
        break;
    case 'inline':
        elem.click(this.handler.clickField[field.id])
            .hover(this.handler.mouseIn[field.id],
                    this.handler.mouseOut[field.id]);
        break;
    case 'radio':
        elem.find('input')
            .change(this.saveForm.bind(this))
            .change(this.resetLabel.bind(this, field.id))
            .change(this.handler.changeField[field.id]);
        break;
    case 'radiotable':
        elem.find('tr').not(':first')
            .click(this.handler.clickField.radioRow);
        elem.find('input')
            .change(this.saveForm.bind(this))
            .change(this.handler.changeField[field.id]);
        break;
    case 'searchtext':
        var changeField = this.handler.changeField[field.id];
        var save = this.saveForm.bind(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste",
        function() {
            if (elem.data('oldVal') != elem.val()) {
                elem.data('oldVal', elem.val());
                save();
                changeField.call(this);
            }
        });
        break;
    default:
        elem.change(this.saveForm.bind(this))
            .change(this.resetLabel.bind(this, field.id))
            .change(this.handler.changeField[field.id]);
        break;
    }
};

Render.prototype.checkCheckbox = function(fieldId, condition) {
    $("#"+ fieldId).prop("checked", condition);
};

Render.prototype.checkMandatoryFields = function() {
    var currentScreen = this.wizard.getCurrentScreen();
    if (currentScreen.id == 'serviceScheduling') {
        return this.checkTimeSlotList();
    } else if (currentScreen.id == 'immediateFamily') {
        if ($('input:radio[name=immediateFamily_isInformant]').is(':checked')) {
            return true;
        } else {
            $("#informantHeader").css('color', DEF.COLOUR.error);
            return false;
        }
    } else {
        var pass = true;
        var fieldsToCheck = [];
        var fieldGroups = [currentScreen.fields];
    //  var header = currentScreen.header;
        if (currentScreen.header)
            fieldGroups.push(currentScreen.header.fields);
    //  [currentScreen.fields, header.fields].forEach(function(fields) {
        fieldGroups.forEach(function(fields) {
            fields.forEach(function(field) {
                if (field.double) {
                    fieldsToCheck.push(field.left);
                    fieldsToCheck.push(field.right);
                } else {
                    fieldsToCheck.push(field);
                }
            })
        });

    //  this.wizard.getCurrentScreen().fields.forEach(function(field) {
        fieldsToCheck.forEach(function(field) {
            var label = this.getInputLabel(field.id);
            if (this.handler.validateField[field.id]) {
                if (!this.handler.validateField[field.id]()) {
                    pass = false;
                    label.css('color', DEF.COLOUR.error);
                } else {
                    label.css('color', '');
                }
            } else if ((field.mandatory)
                        && (!field.hidden)
                        && (lib.isEmpty(field.value))) {
                pass = false;
                label.css('color', DEF.COLOUR.error);
            } else {
                label.css('color', '');
            }
        }, this);
        return pass;
    }
};

Render.prototype.checkTimeSlotList = function() {
    var radios = Array.from(document.querySelectorAll('input[name=timeslot]'));
    var label = document.querySelector('#timeslotlabel');
    var noServiceField = document.getElementById('noService').checked;
    var tbdField = document.getElementById('scheduleToBeDetermined').checked;
    if (noServiceField === true) {
        return true;
    } else if (tbdField === true) {
        return true;
    } else if (!!this.wizard.getSubscreen() && this.wizard.getSubscreen().id == 'alreadyScheduled') {
        return true;
    } else {
        var pass = true;
        if (radios.every(function(radio) { return !radio.checked; })) {
            pass = false;
            if (!!label && !!label.style)
                label.style.color = DEF.COLOUR.error;
        } else {
            if (!!label && !!label.style)
                label.style.color = '';
        }
        return pass;
    }
};

Render.prototype.clearNearServicesBox = function() {
    $("#nearservicesbox").remove();
};

Render.prototype.clearSubscreen = function() {
    this.form.subscreen.find('div').remove();
    this.form.inputs.subscreen = {};
};

Render.prototype.detachHandlers = function(elem) {
    elem.off();
};

Render.prototype.disable = function(id) {
//  this.form[id].attr('disabled', 'true');
    $("#"+ id).attr('disabled', 'true');
};

Render.prototype.drawField = function(field) {
    // console.log('drawField', field)
    switch(field.type) {
    case 'button':
        var input = lib.newTag('button')
            .attr({
                class : 'button',
                id : field.id
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            })
            .append(field.buttonLabel);
        if (field.disabled)
            input.prop('disabled', true);
        break;
    case 'checkbox':
        if (typeof field.value != 'boolean')
            field.value = false;
        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                type : 'checkbox',
                'data-items': !!field.itemIds && field.itemIds.join(',') || ''
            })
            .prop('checked', field.value)
//          .css('width', 'auto');
            .css({
//              '-webkit-appearance' : 'none',
                'width' : '30px',
                'height' : '30px',
                'background' : 'white',
                'border-radius' : '5px',
                'border' : '2px solid #555'
            });
        break;
    case 'currency':
        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                min : '0',
                step : '0.01',
                type : 'number',
                value : field.value
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });
        break;
    case 'customtable':
        var input = lib.newTag('table').attr('id', field.id);
        if (!field.table)
            field.table = field.id;
        var data = this.wizard.table[field.table];
        if (field.searchColumns) {
            var columns =
                Object.values(DEF.SEARCH_COLUMNS[field.searchColumns]);
        } else {
            var columns = Object.values(DEF.TABLE_DEF[field.table]);
        }
        console.log('customtable', field, columns);
        console.log('tabledata', this.wizard.table, data)
        if (field.removeColumns) {
            field.removeColumns.forEach(function(columnId) {
                columns = columns.filter(function(column) {
                    return column.id != columnId;
                });
            });
        }
        if (data.length > 0) {
            var headRow = lib.newTag('tr').attr('class', 'header');
            input.append(lib.newTag('thead').append(headRow));
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j];
                var hiddenStyle = column.hidden && 'display:none;' || ''
                headRow.append(lib.newTag('th')
                    .attr('scope', 'column')
                    .attr('style', hiddenStyle)
                    .append(column.label));
                if (column.label == CNST.informant)
                    headRow.find("th:last").attr('id', 'informantHeader');
            }
        }
        var tbody = lib.newTag('tbody');
        input.append(tbody);
        if (field.table == 'search') {
            var n = Math.min(data.length, 50);
        } else {
            var n = data.length;
        }
        for (var i = 0; i < n; i++) {
            var result = data[i];
            var row = lib.newTag('tr')
                .attr({
                    class : (i % 2 == 0) ? 'even' : 'odd',
                    id : field.id +'_'+ result.id
                });
            tbody.append(row);
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j];
                var hiddenCell = column.hidden && 'hidden' || 'visible'
                var cell = lib.newTag('td').css({
                    'text-align' : 'center',
                    'vertical-align' : 'bottom',
                    'visibility': hiddenCell
                });
                row.append(cell);
                switch(column.type) {
                case 'checkbox':
                    cell.attr('class', 'clickcheckbox');
                    var value = result.getValue(column.id);
                    cell.append(lib.newTag('input')
                        .attr({
                            id : field.id +'_'+ result.id +'_'+ column.id,
                            type : 'checkbox'
                        })
                        .css({
                            'margin-top' : '4px',
                            'margin-bottom' : '0px'
                        })
                        .prop('checked', (value == 'true'))
                    );
                    break;
                case 'inline':
                case 'select':
                    var text = result.getText(column.id);
                    if (text)
                        cell.append(text);
                    else
                        cell.append(result.getValue(column.id));
                    break;
                case 'date':
                case 'email':
                case 'tel':
                case 'text':
                case 'textarea':
                    var val = result.getValue(column.id);
                    if (column.display == 'value') {
                        val = result.getText(column.id);
                    }
                    cell.append(val);
                    break;
                case 'radio':
                    cell.attr('class', 'clickradiobutton');
                    cell.append(lib.newTag('input')
                        .attr({
                            id : field.id +'_'+ result.id +'_'+ column.id,
                            name : field.id +'_'+ column.id,
                            type : 'radio',
                            value : result.id
                        })
                        .css({
                            'margin-top' : '4px',
                            'margin-bottom' : '0px'
                        })
                    );
                    break;
                default:
                    cell.append(result.getValue(column.id));
                }
            }
        }
        break;
    case 'date':
        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                type : 'date',
                value : field.value
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });
        break;
    case 'email':
        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                type : 'email',
                value : field.value
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });
        break;
    case 'inline':
        var fldClass = 'filter_section';
        if (field.paddBottom) {
            fldClass += ' margin-bottom';
        }
        if (field.text == '' && field.value == '' && field.textIfEmpty)
            var text = field.textIfEmpty;
        else if (field.text == '')
            var text = field.value;
        else
            var text = field.text;

        var input = lib.newTag('label')
            .attr({
                class : fldClass,
                id : field.id
            })
            .append(text);

        if (field.clickToSearch)
            input.css('color', DEF.COLOUR.inform);

        break;
    case 'number':
        if (field.id == 'shmiraHours')
            var min = '12';
        else
            var min = '0';
        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                min : min,
                type : 'number',
                value : field.value
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });
        break;
    case 'yesno':
        field.radioList = [
            {
                text : 'Yes',
                value : true
            },
            {
                text : 'No',
                value : false
            }
        ];
    case 'radio':
        var input = lib.newTag('div')
            .attr({
                class : 'radio',
                id : field.id
            });
        if (typeof field.radioList == 'string')
                field.radioList = this.wizard.listOptions[field.radioList];
        for (var i = 0; i < field.radioList.length; i++) {
            var option = field.radioList[i];
            var span = lib.newTag('span').attr({ class : 'input_item' });
            if (!option.inline) {
                span.append(lib.newTag('input')
                    .attr({
                        id : field.id +'_'+ i,
                        name : field.id,
                        type : 'radio',
                        value : option.value
                    })
                    .prop('checked', field.value === option.value)
                );
            }
            span.append(lib.newTag('label')
                .attr({ 'for' : field.id +'_'+ i })
                .append(option.text)
            );
            input.append(span);
        }
        break;
    case 'radiotable':
        var input = lib.newTag('table').attr('id', field.id);
        var columns = Object.values(DEF.TABLE_DEF[field.table]);
        columns.unshift({
            label : '',
            radio : true
        });
        var headRow = lib.newTag('tr').attr('class', 'header');
        input.append(lib.newTag('thead').append(headRow));
        for (var j = 0; j < columns.length; j++) {
            var column = columns[j];
            headRow.append(lib.newTag('th')
                .attr('scope', 'column')
                .append(column.label));
        }
        var tbody = lib.newTag('tbody');
        input.append(tbody);
        for (var i = 0; i < this.wizard.table[field.table].length; i++) {
            var result = this.wizard.table[field.table][i];
            var row = lib.newTag('tr')
                .attr({
                    class : (i % 2 == 0) ? 'even' : 'odd',
                    id : 'row_'+ field.id +'_'+ i
                });
            tbody.append(row);
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j];
                if (column.radio) {
                    row.append(lib.newTag('td')
                        .css({
                            'text-align' : 'center',
                            'vertical-align' : 'bottom'
                        })
                        .append(lib.newTag('input')
                            .attr({
                                id : field.id +'_'+ i,
                                name : field.id,
                                type : 'radio',
                                value : result.id
                            })
                            .css({
                                'margin-top' : '4px',
                                'margin-bottom' : '0px'
                            })
                            .prop('checked', field.value == result.id)
                        )
                    );
                } else {
                    if (column.display == 'text')
                        var text = result.getText(column.id);
                    else
                        var text = result.getValue(column.id);
                    row.append(lib.newTag('td').append(text));
                }
            }
        }
        break;
    case 'searchtext':
        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                type : 'text',
                value : field.value
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });
        break;
    case 'select':
        var input = lib.newTag('select')
            .attr({
                class : 'chosen-single chosen-default',
                id : field.id,
                'data-items': !!field.itemIds && field.itemIds.join(',') || ''
            })
            .css('max-width', '25rem');

        var listId = field.list
            || field.id;

        var self = this;
        this.wizard.listOptions[listId].forEach(function(option) {
            // goodsAndServices - add pricing
            var optionLabel = option.text
            if (field.id === 'itemGroup') {
                if (!!self.wizard.groups && !!self.wizard.groups[option.value]) {
                    var groupData = self.wizard.groups[option.value];
                    optionLabel += groupData.groupPriceFormatted;
                }
            }
            input.append(lib.newTag('option')
                .val(option.value)
                .append(optionLabel)
            );
        });
        if (listId == 'cemeteryName' || listId == 'cemeteryNames') {
            input.append(lib.newTag('option')
                .val('~~ADD_NEW~~')
                .append('Add a New Cemetery')
            );
        }
        input.val(field.value);
        break;
    case 'tel':
        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                pattern : '[0-9]{3}-[0-9]{3}-[0-9]{4}',
                type : 'tel',
                value : field.value
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });
        break;
    case 'text':
        var fldClass = 'form-control'
        if (field.paddBottom) {
            fldClass += ' margin-bottom';
        }
        var input = lib.newTag('input')
            .attr({
                class : fldClass,
                id : field.id,
                type : 'text',
                value : field.value,
                'data-items': !!field.itemIds && field.itemIds.join(',') || ''
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });
        break;
    case 'textarea':
        var input = lib.newTag('textarea')
            .attr({
                class : 'form-control',
                id : field.id,
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            })
            .append(field.value);
        break;
    case 'time':
//      var hours = field.value.getUTCHours() - CNST.laTimeOffset;
//      hours = lib.zeroPad(hours < 0 ? hours + 24 : hours);
//      var minutes = lib.zeroPad(field.value.getMinutes());

        var input = lib.newTag('input')
            .attr({
                class : 'form-control',
                id : field.id,
                type : 'time',
//              value : hours +':'+ minutes
                value : field.value
            })
            .css({
                'max-width' : '25rem',
                'width' : '100%'
            });

        if (field.id == 'serviceStartTime')
            input.attr('step', CNST.halfHourInSeconds);
        break;
    default:
    }

    this.attachHandlers(input, field);

    if (field.type != 'inline') {
        input = lib.newTag('div')
            .attr({
                class : 'select-input'
            })
            .append(input);
    }

    return input;
};

Render.prototype.drawFields = function(screenName, fields, double) {
    var pushInput = function(field, input) {
        this.form.inputs[screenName][field.id] =
            field.type == 'inline' ? input : input.children().first();
    }.bind(this);

//  for (var i = 0; i < fields.length; i++) {
//      var field = fields[i];
    var drawFieldToScreen = function(field, screen) {
        if (field.isInline) {
//          this.form[screenName]
            screen.append(lib.newTag('div')
                .attr({
                    class : 'col-md-12 filter_section'
                })
                .append(lib.newTag('label')
                    .append(field.text)
                )
            );
        } else if (field.double) {
            var leftInput = this.drawField(field.left);
            var rightInput = this.drawField(field.right);

            pushInput(field.left, leftInput);
            pushInput(field.right, rightInput);

//          this.form[screenName]
            screen.append(lib.newTag('div')
                .attr({
                    class : 'col-md-6 filter_section text-left '+
                            field.left.id,
                    id : field.left.id +'_label'
                })
                .append(lib.newTag('label')
                    .append(field.left.label)
                )
            )
            .append(lib.newTag('div')
                .attr({
                    class : 'col-md-6 filter_section text-left '+
                                field.right.id,
                    id : field.right.id +'_label'
                })
                .append(lib.newTag('label')
                    .append(field.right.label)
                )
            )
            .append(lib.newTag('div')
                .attr({
                    class : 'w-100 '+ field.id
                })
            )
            .append(lib.newTag('div')
                .attr({
                    class : 'col-md-5'
                            +' offset-md-1'
                            +' filter_section'
                            +' text-left'
                            +' '+ field.left.id
                })
                .append(leftInput)
            )
            .append(lib.newTag('div')
                .attr({
                    class : 'col-md-5'
                            +' offset-md-1'
                            +' filter_section'
                            +' text-left'
                            +' '+ field.right.id
                })
                .append(rightInput)
            );
        } else {
            var input = this.drawField(field);

            pushInput(field, input);

//          this.form[screenName]
            screen.append(lib.newTag('div')
                .attr({
                    class : 'col-md-12 filter_section text-left '+ field.id,
                    id : field.id +'_label'
                })
                .append(lib.newTag('label')
                    .append(field.label)
                )
            )
            .append(lib.newTag('div')
                .attr({
                    class : 'w-100 '+ field.id
                })
            )
            .append(lib.newTag('div')
                .attr({
                    class : 'col-md-11'
                            +' offset-md-1'
                            +' filter_section'
                            +' text-left'
                            +' '+ field.id
                })
                .append(input)
            );
        }

//      this.form[screenName]
        screen.append(lib.newTag('div')
            .attr({
                class : 'w-100 '+ field.id
            })
        );

        if (field.hidden)
//          this.form[screenName].find("."+ field.id).hide();
            screen.find("."+ field.id).hide();
    }.bind(this);

    for (var i = 0; i < fields.length; i++) {
        if (double) {
            if (i <= fields.length / 2 - 1)
                var screen = this.form[screenName].find("#leftcolumn");
            else
                var screen = this.form[screenName].find("#rightcolumn");
        } else {
            var screen = this.form[screenName];
        }
        drawFieldToScreen(fields[i], screen);
    }
};

Render.prototype.drawScreen = function() {
    var screen = this.wizard.getCurrentScreen();
    // log('drawScreen', screen);
    this.form.screen = $("#screen");
    this.form.screen.css({
        'padding-bottom' : '',
        'padding-top' : ''
    });
    this.form.screen.find('div').remove();
    this.form.screenLabel.html(screen.label);

    this.form.inputs.screen = {};

    if (screen.header) {
        this.form.screen.css({
            'padding-bottom' : '0px',
            'padding-top' : '0px'
        })
        .append(lib.newTag('div')
            .attr({
                class : 'col-md-12'
            })
            .append(lib.newTag('div')
                .attr({
                    class : 'search-container filter'
                })
                .css({
                    'padding-bottom' : '15px'
                })
                .append(lib.newTag('div')
                    .attr({
                        class : 'row',
                        id : 'headerscreen'
                    })
                )
            )
        )
        .append(lib.newTag('div')
            .attr({
                class : 'w-100'
            })
        )
        .append(lib.newTag('div')
            .attr({
                class : 'col-md-12'
            })
            .append(lib.newTag('div')
                .attr({
                    class : 'search-container filter'
                })
                .css({
                    'padding-top' : '15px'
                })
                .append(lib.newTag('div')
                    .attr({
                        class : 'row',
                        id : 'bodyscreen'
                    })
                )
            )
        );
        this.form.screen = $("#bodyscreen");
        this.form.header = $("#headerscreen");
    }

    if (screen.doubleColumn) {
        this.form.screen.css({
            'padding-bottom' : '0px',
            'padding-top' : '0px'
        })
        .append(lib.newTag('div')
            .attr({
                class : 'col-md-6'
            })
            .append(lib.newTag('div')
                .attr({
                    class : 'search-container filter'
                })
                .append(lib.newTag('div')
                    .attr({
                        class : 'row',
                        id : 'leftcolumn'
                    })
                )
            )
        )
        .append(lib.newTag('div')
            .attr({
                class : 'col-md-6'
            })
            .append(lib.newTag('div')
                .attr({
                    class : 'search-container filter'
                })
                .append(lib.newTag('div')
                    .attr({
                        class : 'row',
                        id : 'rightcolumn'
                    })
                )
            )
        );
    } else if (screen.subscreens) {
        this.form.screen.css({
            'padding-bottom' : '0px',
            'padding-top' : '0px'
        })
        .append(lib.newTag('div')
            .attr({
                class : 'col-md-4'
            })
            .append(lib.newTag('div')
                .attr({
                    class : 'search-container filter'
                })
                .append(lib.newTag('div')
                    .attr({
                        class : 'row',
                        id : 'mainscreen'
                    })
                )
            )
        )
        .append(lib.newTag('div')
            .attr({
                class : 'col-md-8'
            })
            .append(lib.newTag('div')
                .attr({
                    class : 'search-container filter'
                })
                .append(lib.newTag('div')
                    .attr({
                        class : 'row',
                        id : 'subscreen'
                    })
                )
            )
        );
        this.form.screen = $("#mainscreen");
        this.form.subscreen = $("#subscreen");
    }

    if (screen.header) {
        this.form.inputs.header = {};
        this.drawFields('header', screen.header.fields);
    }

    this.drawFields('screen', screen.fields, screen.doubleColumn);
};

Render.prototype.drawSectionList = function() {
    var list = this.form.sectionList;
    list.empty();

    for (var i = 0; i < this.wizard.nav.sections.length; i++) {
        var section = this.wizard.nav.sections[i];
        // log('drawSectionList: section', section);
        if (!section.hideInList) {
            var label = lib.newTag('label')
                            .attr('id', section.id)
                            .append(section.label)
                            .click(this.saveForm.bind(this))
                            .click(this.handler.clickField.section);

            if (section.pendingSaves.length > 0)
                label.css('color', DEF.COLOUR.inform);
            else if (section.failedSaves.length > 0) {
                label.css('color', DEF.COLOUR.error);
                // log('drawSectionList: failed Save', section.failedSaves);
            } 
            if (i == this.wizard.nav.sectionIndex)
                label.css('font-weight', 'bold');

            this.form.sectionList
            .append(lib.newTag('div')
                .attr({
                    class : 'w-100'
                })
            )
            .append(lib.newTag('div')
                .attr({
                    class : 'col-md-12 filter_section'
                })
                .append(label)
            );
        }
    }
};

Render.prototype.drawSubscreen = function() {
    this.form.subscreen.find('div').remove();
    this.form.inputs.subscreen = {};
    var fields = this.wizard.getSubscreen().fields;
    this.drawFields('subscreen', fields);
};

Render.prototype.drawSummary = function() {
    this.form.summary.empty();

    var printSummary = function(summary) {
        if (!Array.isArray(summary))
            summary = [summary];
        summary.forEach(function(summary) {
            this.form.summary
                .append(lib.newTag('div')
                    .attr('class', 'col-md-12 filter_section')
                    .css('font-weight', 'bold')
                    .append(lib.newTag('label')
                        .css('font-size', '12px')
                        .append(summary.label)
                    )
                )
                .append(lib.newTag('div')
                    .attr('class', 'w-100')
                )
                .append(lib.newTag('div')
                    .attr('class', 'col-md-11 offset-md-1 filter_section')
                    .append(lib.newTag('label')
                        .css('font-size', '12px')
                        .append(summary.text)
                    )
                )
                .append(lib.newTag('div')
                    .attr('class', 'w-100')
                );
        }, this);
    }.bind(this);

    printSummary({
        label : 'Decedent',
        text : this.wizard.getValue('service', 'displayName')
    });

    for (var i = 0; i < this.wizard.nav.sections.length; i++) {
        var section = this.wizard.nav.sections[i];
        for (var j = 0; j < section.screens.length; j++) {
            var screen = section.screens[j];
            if (screen.summary)
                printSummary(screen.summary);
        }
        if (section.summary)
            printSummary(section.summary);
    }

    var total = 0;
    lib.objForEach(this.wizard.costs, function(cost) {
        total += cost;
    });
    if (total > 0) {
        printSummary({
            label : 'Estimated total:',
            text : '$'+ total
        });
    }
};

Render.prototype.drawTimeSlotList = function() {
    this.form.subscreen.find('div').remove();
    this.form.inputs.subscreen = {};

    var table = this.wizard.table.timeSlot;
    var lastDate, lastResource;
    var screen = this.form.subscreen;
    if (table.length == 0) {
        screen.append(lib.newTag('div')
            .attr({
                class : 'col-md-12 filter_section'
            })
            .append(lib.newTag('label')
                .append('There are no availabilities for these dates.')
            )
        );
    } else {
        screen.append(lib.newTag('div')
            .attr({
                class : 'col-md-12 filter_section'
            })
            .append(lib.newTag('label')
                .attr({
                    id : 'timeslotlabel'
                })
                .append('Please choose an available time:')
            )
        );
        table.forEach(function(timeSlot) {
            var currentDate = timeSlot.getValue('timeSlotDate');
            var currentResource = timeSlot.getValue('timeSlotResource');
            if (lastDate != currentDate) {
                var dayOfWeek = lib.getDayOfWeek(lib.extractDate(currentDate));
                screen.append(lib.newTag('div')
                    .attr({
                        class : 'w-100'
                    })
                    .append(lib.newTag('hr')
                        .css({
                            border : '1px solid white'
                        })
                    )
                );
                screen.append(lib.newTag('div')
                    .attr({
                        class : 'col-md-12 filter_section'
                    })
                    .append(lib.newTag('label')
                        .append(dayOfWeek +' '+ currentDate)
                    )
                );
            }
            if (lastResource != currentResource) {
                screen.append(lib.newTag('div')
                    .attr({
                        class : 'col-md-11 offset-md-1 filter_section'
                    })
                    .append(lib.newTag('label')
                        .append(timeSlot.getText('timeSlotResource'))
                    )
                );
            }
            var input = lib.newTag('input')
                .attr({
                    id : 'timeslot_'+ timeSlot.id,
                    name : 'timeslot',
                    type : 'radio',
                    value : timeSlot.id
                })
                .change(this.handler.changeField.timeSlot);
            screen.append(lib.newTag('div')
                .attr({
                    class : 'col-md-10 offset-md-2 filter_section'
                })
                .append(lib.newTag('label')
                    .append(input)
                    .append(timeSlot.getValue('timeSlotStartTime'))
                )
//          )
//          .append(lib.newTag('div')
//              .attr({
//                  class : 'col-md-9 offset-md-3 filter_section'
//              })
//              .css({
//                  height : '0'
//              })
//              .append(lib.newTag('label')
//                  .attr({
//                      id : 'nearservices_' + timeSlot.id
//                  })
//              )
            );
            lastDate = currentDate;
            lastResource = currentResource;
        }, this);
    }
};

Render.prototype.drawWizard = function() {
    this.drawSectionList();
    this.drawScreen();
    this.drawSummary();

    if (this.wizard.atFirstStep())
        this.form.back.hide();
    else
        this.form.back.show();

    if (this.wizard.atLastStep())
        this.form.next.hide();
    else
        this.form.next.show();

    window.scrollTo(0, 0);

//  log(this.wizard);
};

Render.prototype.enable = function(id) {
//  this.form[id].removeAttr('disabled');
    $("#"+ id).removeAttr('disabled');
};

Render.prototype.getChosenTimeSlotId = function() {
    var radios = Array.from(document.querySelectorAll('input[name=timeslot]'));
    return radios.reduce(function(acc, radio) {
        return radio.checked ? radio.value : acc;
    }, null);
};

Render.prototype.getInput = function(id) {
    return $("#"+ id);
};

Render.prototype.getInputLabel = function(id) {
    return $("#"+ id +"_label").find("label");
};

Render.prototype.getWizardNotes = function() {
    return $("#wizardNotes").val();
};

Render.prototype.hideAllMainFields = function() {
    this.hideField(Object.keys(this.form.inputs.screen));
};

Render.prototype.hideField = function(ids) {
//  screenName = screenName || 'screen';
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('render hideField', id);
        this.resetLabel(id);
        this.form.screen.find("."+ id).hide();
    }, this);
};

Render.prototype.hideHeaderField = function(ids) {
//  screenName = screenName || 'screen';
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('render hideField', id);
        this.resetLabel(id);
        this.form.header.find("."+ id).hide();
    }, this);
};

Render.prototype.hideSubField = function(ids) {
//  this.hideField(ids, 'subscreen');
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('render hideField', id);
        this.resetLabel(id);
        this.form.subscreen.find("."+ id).hide();
    }, this);
};

Render.prototype.initPage = function() {
    this.form.back.click(this.saveForm.bind(this));
    this.form.back.click(this.handler.clickField.back);

    this.form.next.click(this.saveForm.bind(this));
    this.form.next.click(this.handler.clickField.next);

    var notesField = this.wizard.entity.service.column('wizardNotes');
    var notesInput = this.drawField(notesField);
    this.form.wizardNotes.find('div').remove();
    this.form.wizardNotesLabel.html(notesField.label);
    this.form.wizardNotes.append(lib.newTag('div')
        .attr({
            class : 'col-md-12 filter_section text-left '+ notesField.id,
            id : notesField.id +'_label'
        })
        .append(notesInput)
    );
};

Render.prototype.makeSelection = function(list, value) {
    $("#"+ list).find("option[value='"+ value +"']").prop('selected', true);
};

Render.prototype.redrawField = function(field, screenName) {
    screenName = screenName || 'screen';
    var oldInput = this.form.inputs[screenName][field.id];
    if (!oldInput)
        return;
    var newInput = this.drawField(field);
    if (oldInput.prop('tagName').toLowerCase() == 'label')
        oldInput.parent().empty().append(newInput);
    else
        oldInput.parent().parent().empty().append(newInput);
    if (field.type == 'inline')
        var inputToPush = newInput;
    else
        var inputToPush = newInput.children().first();
    this.form.inputs[screenName][field.id] = inputToPush;
};

Render.prototype.redrawHeaderField = function(field) {
    if (typeof field == 'string')
        field = this.wizard.getHeaderField(field);
    this.redrawField(field, 'header');
};

Render.prototype.redrawSubField = function(field) {
    if (typeof field == 'string')
        field = this.wizard.getSubField(field);
//  log(field);
    this.redrawField(field, 'subscreen');
};

Render.prototype.resetLabel = function(id) {
    this.getInputLabel(id).css('color', '');
};

Render.prototype.saveField = function(screenName, field) {
//  log('saveField', field);
    if (field.double) {
        this.saveField(screenName, field.left);
        this.saveField(screenName, field.right);
    } else if (field.id != 'searchResults') {
        var input = this.form.inputs[screenName][field.id];
        if ((!field.isInline)
            && (field.type != 'inline')
            && (!field.hidden)) {
            switch(field.type) {
            case 'checkbox':
                field.value = input.prop('checked');
                break;
            case 'customtable':
                var table = this.wizard.table[field.table];
//              log('saving form', field, field.table, table);
                table.forEach(function(result) {
                    result.columns.forEach(function(column) {
                        if (column.type == 'checkbox') {
                            var id = field.id +'_'+ result.id +'_'+ column.id;
                            var elem = input.find("#"+ id);
//                          log('elem', elem.prop('checked'));
                            result.setValue(column.id, elem.prop('checked'));
                        }
                    });
                });
                break;
            case 'date':
//              field.text = input.val();
                field.text = lib.arrayCCW(input.val().split('-')).join('/');
                field.value = input.val();
//              if (input.val()) {
//                  var ymd = input.val().split('-');
//                  var year = +ymd[0];
//                  var month = +ymd[1]-1;
//                  var day = +ymd[2];
//                  var utc = Date.UTC(year, month, day, CNST.laTimeOffset);
//                  field.value = new Date(utc);
//              } else {
//                  field.value = '';
//              }
                break;
            case 'radio':
            case 'radiotable':
                field.value = input.find("input:checked").val();
                if (field.radioList) {
                    field.text =
                        field.radioList.reduce(function(acc, option) {
                            return (option.value == field.value)
                                    ? option.text
                                    : acc;
                        }, '');
                }
                break;
            case 'select':
                field.text = input.find("option:selected").text();
                field.value = input.find("option:selected").val();
                break;
            case 'time':
//              field.text = input.val();
//              var hm = input.val().split(':');
//              var hour = (+hm[0] + CNST.laTimeOffset) % 24;
//              var minute = +hm[1];
//              field.value = new Date();
//              field.value.setUTCHours(hour);
//              field.value.setMinutes(minute);
//              field.value.setSeconds(0);
                field.text = lib.formatTime(input.val());
                field.value = input.val();
//              log('saving field', field.id, field.text, field.value);
                break;
            case 'yesno':
                var checkedInput = input.find("input:checked");
                if (checkedInput.length > 0)
                    field.value = (checkedInput.val() == 'true');
                break;
            default:
                field.text = input.val();
                field.value = input.val();
            }
//          log('input '+ field.id +' = '+ field.value);
        }
    }
}

Render.prototype.saveForm = function() {
    var screen = this.wizard.getCurrentScreen();

    screen.fields.forEach(this.saveField.bind(this, 'screen'));

    if (screen.subscreen) {
        screen.subscreen.fields.forEach(this.saveField.bind(this, 'subscreen'));
    }

    if (screen.header) {
        screen.header.fields.forEach(this.saveField.bind(this, 'header'));
    }
};

Render.prototype.setColour = function(elemId, colourId) {
    $("#"+ elemId).css('color', DEF.COLOUR[colourId]);
};

Render.prototype.setTitle = function(elemId, title) {
    $("#"+ elemId).attr('title', title);
};

Render.prototype.showAllMainFields = function() {
    this.showField(Object.keys(this.form.inputs.screen));
};

Render.prototype.showField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('render showing', id);
        this.form.screen.find("."+ id).show();
    }, this);
};

Render.prototype.showHeaderField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('render showing', id);
        this.form.header.find("."+ id).show();
    }, this);
};

Render.prototype.showLoading = function(screenName, field) {
    var input = this.form.inputs[screenName][field.id];
//  log(field, input);
    input.parent().after(lib.newTag('label')
        .attr('class', 'filter_section')
        .append('Loading...'));
    input.hide();
};

Render.prototype.showLoadingNearServices = function(timeSlotId) {
    this.clearNearServicesBox();
    var input = $("#timeslot_"+ timeSlotId);
    var div = input.parent().parent();
    div.after(lib.newTag('div')
        .attr({
            class : 'col-md-9 offset-md-3 filter_section',
            id : 'nearservicesbox'
        })
        .append(lib.newTag('label')
            .attr({
                id : 'nearservices_'+ timeSlotId
            })
            .append('Loading near services...')
        )
    );
};

Render.prototype.showNearServices = function(timeSlotId, nearServices) {
    var box = $("#nearservices_"+ timeSlotId);
    if (nearServices.length == 0) {
        box.html('There are no other services scheduled nearby.');
    } else {
        var html = 'These other services are scheduled nearby:<br><ul>';
        nearServices.forEach(function(service) {
            var space = service.getText('intermentSpace');
            var time = service.getValue('startTime');
            html += '<li>'+ space +' at '+ time +'</li>';
        });
        html += '</ul>';
        box.html(html);
    }
};

Render.prototype.showSelection = function(field) {
    var input = this.getInput(field.id);
    this.wizard.table[field.table].forEach(function(result) {
        var row = input.find("#"+ field.id +'_'+ result.id);
        if (field.selection == result.id)
            row.css('background', DEF.COLOUR.informPale);
        else
            row.css('background', '');
    });
};

Render.prototype.showSubField = function(ids) {
    if ((arguments.length != 1) || (!Array.isArray(ids)))
        ids = Array.prototype.slice.call(arguments);
    ids.forEach(function(id) {
//      log('render showing', id);
        this.form.subscreen.find("."+ id).show();
    }, this);
};
