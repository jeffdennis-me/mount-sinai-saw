//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Library
//              A collection of various utility functions.
//Developer: Sylvain Muise
//Date: October 2019

var debug = (new URLSearchParams(window.location.search)).get('debug');
if (debug)
    debug = ['true', 't'].includes(debug.toLowerCase());
//const log = debug
const log = true
            ? (...args) => { args.forEach( x => console.log(x) ) }
            : x => undefined;

function Library() {}

Library.prototype.arrayCCW = function(arr) {
    arr.push(arr.shift());
    return arr;
};

Library.prototype.arrayCW = function(arr) {
    arr.unshift(arr.pop());
    return arr;
};

Library.prototype.arrToObj = function(ids, values) {
    var obj = {};
    ids.forEach(id => obj[id] = values(id));
    return obj;
};

//  callMap : (f) -> Function
//  Returns x -> x.map(f)
Library.prototype.callMap = f => x => x.map(f);
//Library.prototype.callMap = function(f) {
//  return function(x) {
//      return x.map(f);
//  };
//};

//  compose : ([f, g, ...]) -> Function
//  Returns x -> f(g(...(x)))
//  Optional : each element of the array may be either passed in as a single
//      function, in which case the behaviour is as described above, or as
//      a two element array [f, context]. In this case, the keyword 'this'
//      in f will refer to context.
Library.prototype.compose = function(functions) {
    if ((arguments.length != 1) || (!Array.isArray(functions))) {
        functions = Array.prototype.slice.call(arguments);
    }
    return x => functions.reduceRight((acc, f) =>
                    Array.isArray(f) ? f[0].call(f[1], acc) : f(acc), x);
//  return function(x) {
//      return functions.reduceRight(function(acc, f) {
//          return Array.isArray(f) ? f[0].call(f[1], acc) : f(acc);
//      }, x);
//  };
};

//  dataToResult (data) -> data with .getText and .getValue defined on it
//  data is assumed to be either a string representing an object built by
//  RSToArray below, or an object of that structure itself.
//  Returns data with .getText(name) and .getValue(name) defined on it.
Library.prototype.dataToResult = function(data) {
    function attachGetAndSet(result) {
        if (result == null || result == undefined) {
            return
        }
        function get(prop, id) {
            return this.columns.reduce((acc, column) =>
                column.id == id ? column[prop] : acc, '');
        }
        function set(prop, id, value) {
            this.columns.forEach(column =>
                column.id == id ? column[prop] = String(value) : null);
        }

        result.getText = get.bind(result, 'text');
        result.setText = set.bind(result, 'text');

        result.getValue = get.bind(result, 'value');
        result.setValue = set.bind(result, 'value');

        result.column = id => result.columns.reduce((acc, column) =>
            column.id == id ? column : acc, null);

        return result;
    }

    if (typeof data == 'string')
        data = JSON.parse(data);

    if (data.results) {
        return data.results.map(attachGetAndSet);
    } else if (Array.isArray(data)) {
        return data.map(attachGetAndSet);
    } else {
        if (data.result)
            data = data.result;

        return attachGetAndSet(data);
    }
};

//  function extractDate(str) {
Library.prototype.extractDate = function(str) {
    var arr = str.split('/');
    return new Date(+arr[2], +arr[0] - 1, +arr[1]);
};

Library.prototype.extractDollars = function(str) {
    return +str.slice(str.indexOf('$') + 1);
};

//  function extractTime(str) {
Library.prototype.extractTime = function(str) {
    var arr = str.split(' ');
    var hm = arr[0].split(':');
    var hour = +hm[0];
    var minute = +hm[1];
    var ampm = arr[1];
    if (hour == 12)
        hour -= 12;
    if (ampm == 'pm')
        hour += 12;
    return {
        hour : hour,
        minute : minute
    };
};

//  function formatDate(date) {
Library.prototype.formatDate = function(date) {
    return (date.getMonth() + 1)
            +'/'+ date.getDate()
            +'/'+ date.getFullYear();
};

Library.prototype.formatTime = function(str) {
    var arr = str.split(':');
    var hour = +arr[0];
    var minute = arr[1];
    if (hour < 12)
        var ampm = 'am';
    else
        var ampm = 'pm';
    if (hour == 0)
        hour = 12;
    else if (hour > 12)
        hour -= 12;
    return hour +':'+ minute +' '+ ampm;
};

Library.prototype.getDayOfWeek = function(date) {
    var weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    return weekdays[date.getDay()];
};

Library.prototype.getParam = function(id) {
    var element = document.querySelector('#param_'+ id);
    if (element)
        return element.value;
};

Library.prototype.isEmpty = function(str) {
    return (!(typeof str == 'boolean')
            && ((str === '') || (!(str))));
};

Library.prototype.newTag = function(name) {
    return $(document.createElement(name));
};

//  objCopy : (obj) -> Object
//  Builds and returns a new object with the same own properties and values
//  as the given object.
Library.prototype.objCopy = function(obj) {
    return this.objMap(obj, v => v);
//  return this.objMap(obj, function(v) {
//      return v;
//  });
};

//  objEvery : (obj, f, ctx) => Boolean
//      obj : The object over which to iterate.
//      f : The test function to apply to each property of obj.
//          (value, key, obj) => Boolean
//          value : The value of the current property being processed.
//          key : The key of the current property being processed.
//          obj : The object being processed.
//      ctx (optional) : Will be used as this in the call to f.
//  Returns true if and only if every property of obj passes the given f.
Library.prototype.objEvery = function(obj, f, ctx = this) {
    return Object.entries(obj).every(kvPair =>
        f.call(ctx, kvPair[1], kvPair[0], obj));
};
//Library.prototype.objEvery = function(obj, f, ctx) {
//  ctx = ctx || this;
//  return Object.entries(obj).every(function(kvPair) {
//      return f.call(ctx, kvPair[1], kvPair[0], obj);
//  });
//};

//  objForEach : (obj, f, ctx) -> undefined
//  Mimics Array.forEach, but for an Object.
//  Executes the given callback function for each key of the
//  given object.
//  Takes three parameters:
//      obj - The object we are processing.
//      f - The callback function, which takes 3 parameters:
//          v - The value of the current property being processed.
//          k - The key of the current property being processed.
//          o - The object we are processing.
//      ctx - (optional) The value to use as this when executing
//          the callback function.
//  Returns undefined. Does not create a new object.
//  Note that since we are dealing with an object, the order in which we
//  process the object's properties is not known.
Library.prototype.objForEach = function(obj, f, ctx = this) {
    Object.keys(obj).forEach(k => f.call(ctx, obj[k], k, obj));
};
//Library.prototype.objForEach = function(obj, f, ctx) {
//  ctx = ctx || this;
//  Object.keys(obj).forEach(function(k) {
//      f.call(ctx, obj[k], k, obj);
//  });
//};

//  objHasEqualValues : (obj1, obj2) -> boolean
//  Returns true if and only if for each key/value pair in obj1, the same
//  pair also exists in obj2.
//  Note that objHasEqualValue(obj1, obj2) does not necessarily equal
//  objHasEqualValue(obj2, obj1).
Library.prototype.objHasEqualValues = function(obj1, obj2) {
    var equal = true;
    this.objForEach(obj1, (value, key) =>
        equal = equal && (value == obj2[key]));
//  this.objForEach(obj1, function(value, key) {
//      equal = equal && (value == obj2[key]);
//  });
    return equal;
};

//  objMap : (obj, f, ctx) -> Object
//  Mimics Array.map, but for an Object.
//  Builds a new object with the same keys as the given object,
//  but whose values are the result of applying the given
//  callback function.
//  Takes three parameters:
//      obj - The object we are mapping over.
//      f - The callback function, which takes 3 parameters:
//          v - The value of the current property being processed.
//          k - The key of the current property being processed.
//          o - The object we are processing.
//      ctx - (optional) The value to use as this when executing
//          the callback function.
//  Returns a new object whose values are the results of the callback.
//  Note that since we are dealing with an object, the order in which we
//  process the object's properties is not known.
Library.prototype.objMap = function(obj, f, ctx = this) {
//Library.prototype.objMap = function(obj, f, ctx) {
//  ctx = ctx || this;
    var result = {};
    this.objForEach(obj, (v, k) => result[k] = f.call(ctx, v, k, obj));
//  this.objForEach(obj, function(v, k) {
//      result[k] = f.call(ctx, v, k, obj);
//  });
    return result;
};

//  objReduce : (obj, f, initialValue) -> Anything
//  Mimics Array.reduce, but for an object.
//  The function f will be called on each property of obj, that is its own,
//  and a final single value will be returned.
//  Parameters:
//      obj - The object to reduce over.
//      f - The reducing function, with the following parameters:
//          acc - The accumulator, which was returned from the previous call
//                  to f, or, in the first case, some initial value.
//          value - The value of the current property being processed.
//          key - The key of the current property being processed.
//          obj - The object we are reducing over.
//      initialValue - The initial value to assign to the accumulator,
//                      which gets used in the first call to f. Defaults to
//                      the empty string.
//  Note that since we are dealing with an object, the order in which we
//  process the object's properties is not known.
Library.prototype.objReduce = function(obj, f, initialValue = '') {
    var acc = initialValue;
    this.objForEach(obj, (value, key) => acc = f(acc, value, key, obj));
    return acc;
};
//Library.prototype.objReduce = function(obj, f, initialValue) {
//  var acc = initialValue || '';
//  this.objForEach(obj, function(value, key) {
//      acc = f(acc, value, key, obj);
//  });
//  return acc;
//};

Library.prototype.removeDollars = function(str) {
    return str.slice(0, str.indexOf('$') - 3);
};

//  removeHTMLTags : (str) -> string
//  Takes out all HTML <...> tags from str and returns the result.
Library.prototype.removeHTMLTags = function(str) {
    //return str.replace(/<[/]?\w+>/g, "");
    return str.replace(/<.*?>/g, "");
};

Library.prototype.searchDataToResult = function(data) {
    function attachGetAndSet(result) {
        result.getValue = function(id) {
            return this.values[id];
        };
        result.getText = result.getValue;

        result.setValue = function(id, value) {
            if (this.values[id])
                this.values[id] = String(value);
        };
        result.setText = result.setValue;

        Object.defineProperty(result, 'type', {
            get : function() {
                return this.recordType;
            },
            set : function(type) {
                this.recordType = type;
            }
        });

        return result;
    }

    if (typeof data == 'string')
        data = JSON.parse(data);

    if (data.results) {
        return data.results.map(attachGetAndSet);
    } else {
        if (data.result)
            data = data.result;

        return attachGetAndSet(data);
    }
};

//  uniq : (arr, compareBy) -> Array
//  Returns a new array with each element of arr appearing once.
//  compareBy returns what property of item to compare by.
Library.prototype.uniq = function(arr, compareBy) {
    compareBy = compareBy || (x => x);
//  compareBy = compareBy || function(x) { return x };
    var seen = {};
    return arr.filter(item => seen.hasOwnProperty(compareBy(item)) ?
        false :
        (seen[compareBy(item)] = true));
//  return arr.filter(function(item) {
//      if (seen.hasOwnProperty(compareBy(item)))
//          return false;
//      else
//          return (seen[compareBy(item)] = true);
//  });
};

//  utility to get quick format of dates
Library.prototype.yyyymmdd = function() {
    var twoDigit = n => (n < 10 ? '0' : '') + n;
//  function twoDigit(n) {
//      return (n < 10 ? '0' : '') + n;
//  }

    var now = new Date();
    return ''+
            now.getFullYear() +
            twoDigit(now.getMonth() + 1) +
            twoDigit(now.getDate());
};

Library.prototype.zeroPad = function(n) {
    return (n < 10 ? '0' : '') + n;
};

const lib = new Library();
log(lib);
