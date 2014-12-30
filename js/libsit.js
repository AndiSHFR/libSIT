/**
 * libSIT.js
 *
 * A javascript library with usefull functions:
 *
 * Example usage:
 *
 *   // Hide the hint after five seconds
 *   SIT.fn.delay( function() { SIT('.hint').hide(); }, 5000 );
 *
 * Revision:
 *
 * 20141230 1.0.1 Initial release
 *
 * Copyright 2014 (C) Andreas Schaefer <andreas.schaefer@schaefer-it.net>
 */

/**
 * @desc Anonymous function to wrap the library code
 * @param
 * @return
 * @author Andreas Schaefer
 * @require IE8+
 */
;(function(window,undefinied) {

  /**
   * @desc SIT returns a new libSIT object that holds our selector.
   *       Example: SIT('.container').hide();
   */
  var SIT = function (params) {
    return new libSIT(params);
  };

  /**
   * As we use querySelectorAll() we do not support IE8 or below
   */
  var libSIT = function(selector) {
    return SIT.fn.init(selector);
    };


  /**
   * Library functions
   */
  SIT.fn = libSIT.prototype = {

    /**
     * @desc Init the object instance and
     *       get all selector elements
     * @param selector - an elements selector
     * @return this
     */
    init: function(selector){

    // Add library version and init length
    this.__version__ = '1.0.1';
    this.__author__ = 'Andreas Schaefer <andreas.schaefer@schaefer-it.net>';
    this.length  = 0;

    // Handle: $(""), $(null), $(undefined), $(false)
		  if (!selector) {
     return this;
		  }

    // Get the elements specified by the selector.
    // Note! We do not support IE8 or below!
    var elements = document.querySelectorAll(selector);

    // Add the elements to this object for method chaining.
    for (var i=0; i<elements.length; i++) {
      this[i] = elements[i];
    }

    // Reflect the selector length
    this.length  = elements.length;

    // Return this object;
    return this;

    },

    /**
     * @desc Method to hide elements in the selector
     *       Example: SIT('#alert').hide();
     * @param
     * @return this
     */
    hide: function() {
      var len = this.length;
      while(len--){
        this[len].style.display = 'none';
      }
      return this; // Return <this> for method chaining.
    },

    /**
     * @desc Method to show elements in the selector
     *       Example: SIT('#alert').show();
     * @param
     * @return this
     */
    show: function() {
      var len = this.length;
      while(len--){
        this[len].style.display = '';
      }
      return this;
    },

    /**
     * @desc Method to save a cookie in the browser
     *       Example: SIT.fn.setCookie('favColor', '#204080', 365 );
     * @param name - the name of the cookie
     *        value - the value of the cookie
     *        days - optional number of days the cookie will be valid
     * @return
     */
    setCookie: function( name, value, days ) {
      var expires = '';
      if (days) {
  	     var expiresAt = new Date();
	       expiresAt.setTime( expiresAt.getTime() + (days * 60 * 60 * 24 * 1000) );
        expires = expiresAt.toGMTString();
      }
      document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expires;
    },

    /**
     * @desc Method to read a cookie from the browser.
     *       If the cookie does not exists we return the default value
     *       Example: SIT.fn.getCookie('favColor', 'red' );
     * @param name - the name of the cookie
     *        defvalue - the default value in case the cookie is not
     *                   present in the browser
     * @return cookie value
     */
    getCookie: function( name, defvalue ) {
// This is a two liner using RegExp support
// BUT due to a reliable compatibility table i'm not sure
// what browser willl support this and what do not.
//	   var regExp = new RegExp( name + "=([^;]+)");
//	   var value = regExp.exec(document.cookie);
// So we end up using a more conservative approach.
    var value = null
      , nameEQ = name + '='
      , cookieParts = document.cookie.split(';'); // .split(/[\;\s]+/) <-- might be a problem with spaces in cookie values.

    for(var i=0; i<cookieParts.length; i++){
      var c = cookieParts[i];
      while(' '==c.charAt(0)) c = c.substring(1, c.length);
      if (0==c.indexOf(nameEQ)) {
        value = c.substring(nameEQ.length, c.length);
      }
    }
	   return (value != null) ? unescape(value) : defvalue;
  },

    /**
     * @desc Method to delete a cookie from the browser
     *       Example: SIT.fn.delCookie('favColor');
     * @param name - the name of the cookie
     * @return
     */
    delCookie: function(name) {
      this.setCookie(name,'', -1);
    },


    /**
     * @desc Method to delay the execution of code by a certain amount of time.
     *       Example:
     *         function doneLater { console.log('done later...'); }
     *         SIT.fn.delay(doneLater, 5000 );
     *
     *         SIT.fn.delay(function() { console.log('This is 5 seconds delayed'); }, 5000 );
     * @param func - code to be delayed. Can be an anonymous function.
     *        wait - number of milliseconds to delay the execution
     * @return
     */
    delay: function(func, wait) {
      var args = Array.prototype.slice.call(arguments, 2);
      return setTimeout(function(){ return func.apply(null, args); }, wait);
    },

    /**
     * @desc Method to debounce callback execution.
     *       This can be used to get only ONE event from a series of multiple events
     *
     *       Example using jQuery:
     *
     *         function ajax_lookup( event ) {
     *           // Perform an AJAX lookup on $(this).val();
     *         };
     *
     *         // Console logging happens on keyup, for every single key
     *         // pressed, which is WAAAY more often than you want it to.
     *         $('input:text').keyup( ajax_lookup );
     *
     *         // Console logging happens on window keyup, but only after
     *         // the user has stopped typing for 250ms.
     *         $('input:text').keyup( SIT.fn.debounce( ajax_lookup, 250, false ) );
     *
     *
     * @param name - function to be executed
     *        wait - time in milliseconds after that the function will be called
     *        immediate - execute at the beginning of the series of events
     *                    otherwise it gets executed at the end of the series
     * @return returns a function that will be executed only once for every
     *         <wait> period of multiple sequencial executions...
     */
    debounce: function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        if (immediate && !timeout) func.apply(context, args);
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * @desc Method to throttle callback execution.
     *       This can be used to protect against click spamming in applications.
     *
     *       Example using jQuery:
     *
     *         function log( event ) {
     *           console.log( $(window).scrollTop(), event.timeStamp );
     *         };
     *
     *         // Console logging happens on window scroll, WAAAY more often
     *         // than you want it to.
     *         $(window).scroll( log );
     *
     *         // Console logging happens on window scroll, but no more than
     *         // once every 250ms.
     *         $(window).scroll( SIT.fn.throttle( 250, log ) );
     *
     * @param name - function to be executed
     *        wait - time in milliseconds before function will be called again
     *               when called rapidly multiple times..
     * @return return a new function that will be executed no more than once per <wait>
     */
    throttle: function(func, wait) {
      var context, args, timeout, throttling, more, result;
      var whenDone = debounce(
        function(){ more = throttling = false; }, wait);
        return function() {
          context = this; args = arguments;
          var later = function() {
            timeout = null;
            if (more) func.apply(context, args);
            whenDone();
          };
          if (!timeout) timeout = setTimeout(later, wait);
          if (throttling) {
            more = true;
          } else {
          result = func.apply(context, args);
        }
        whenDone();
        throttling = true;
        return result;
      };
    },


    /**
     * @desc Method to normalize a byte count into Kilo, Mega, Giga, Tera, ...
     *
     *       Example:
     *         console.log( SIT.fn.humanReadableBytes( 471108151967, 2 ) );
     *
     * @param value - a byte count value to be normalized
     *        decimals - number of decimal place to be shown on the result
     * @return string with normalized byte count
     */
    humanReadableBytes: function(value, decimals) {
      // Contant value for Math.log(1024)
      var LN1024 = 6.931471805599453; // = Math.log(1024);

      // Size suffixes
      var sizeSuffixes = [ "Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ];

      // Get the size suffix and fix it if it exceeds
      // the array length for the known suffixes
      var mag = Math.min(
                  sizeSuffixes.length - 1
                , (value > 0 ? Math.floor(Math.log(value) / LN1024): 0)
                );

      // Get the real number of digits.
      // For byte values between 0 amd 999 (mag==0)
      // we do _not_ want any digits at all
      var digits = (0==mag
                   ? 0
                   : ( decimals ? decimals : 1) // no decimals supplied then default to 1 digit
                   );

      // Adjust the value according to the suffix
      // and cut it down to the number of digits.
      var adjustedSize = (value / (1 << (mag * 10))).toFixed(digits);

      // Create a string array with the parts...
      var result = [
          adjustedSize
        , ' '
        , sizeSuffixes[mag]
        , (0==mag && 1<value?'s':'')
        ];

        // Return a string from the array parts...
        return result.join('');
    },

    /**
     * @desc Method to get the current list separator character in the web browser
     *       Example: alert(SIT.fn.getListSeparator() );
     * @param name
     * @return current list seperator character (i.e. ';' or ',')
     */
    getListSeparator: function() {
      var list = ['a', 'b'], str;
      if (list.toLocaleString) {
        var str = list.toLocaleString();
        if (str.indexOf(';') > 0 && str.indexOf(',') == -1) {
          return ';';
        }
      }
      return ',';
    }

  }; // SIT.fn = libSIT.prototype = {

  /**
   * Assign the SIT object to the (global) window object.
   */
  if(!window.SIT) {
    window.SIT = SIT;
  }

})(window);
