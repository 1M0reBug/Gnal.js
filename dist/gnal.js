(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Gnal", [], factory);
	else if(typeof exports === 'object')
		exports["Gnal"] = factory();
	else
		root["Gnal"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This library is a low-impact, no dependency i18n helper.
	 * It provides tools to easily translate sites, with a simple JSON
	 * object.
	 * It also provides elements to display a hash indicating the translation
	 * and helping people to share a translation-aware URL.
	 */
	var Gnal = function () {
	    /**
	     * Example
	     *
	     * ```js
	     * const gnal = new Gnal({ useHash: true });
	     * gnal
	     *  .translations('en', { GREETINGS: 'hello' })
	     *  .translations('fr', { GREETINGS: 'bonjour' })
	     *  .translations('es', { GREETINGS: 'holà' })
	     *  .translations('it', { GREETINGS: 'ciao' })
	     *  .translations('hu', { GREETINGS: 'szia' })
	     *  .choose('en')
	     *  .translate();
	     *
	     * document.querySelector('#btn-es').onclick =
	     *      e => gnal.changeTo('es');
	     * ```
	     * @param {string} [mainContainer] optional container element where
	     * the translation takes place
	     * @param {Object} options some configuration options
	     * @param {boolean} options.useHash if it must use the hash or not.
	     */
	    function Gnal(_mainContainer, _options) {
	        _classCallCheck(this, Gnal);

	        var mainContainer = _mainContainer;
	        var options = _options;
	        if ((typeof mainContainer === 'undefined' ? 'undefined' : _typeof(mainContainer)) === 'object') {
	            options = mainContainer;
	            mainContainer = undefined;
	        }
	        options = options || {};
	        this.container = mainContainer ? document.querySelector('#' + mainContainer) : document.querySelector('body');
	        this.useHash = options.useHash || false;

	        if (this.useHash) {
	            this.preferredLanguage = window.location.hash.replace('#', '').replace('/', '');
	        }
	    }
	    /**
	     * Register new key values for `idx` language.
	     * Each key in the `object` must exist in all
	     * the registered objects (which is not checked)
	     * if you want to include HTML in your text start
	     * it with `#!>`
	     * @param {string} idx the index/language ISO code used as language selector
	     * @param {Object} object The unique key by phrase
	     * @return this to chain methods
	     */


	    _createClass(Gnal, [{
	        key: 'translations',
	        value: function translations(idx, object) {
	            this.translations[idx] = object;
	            return this;
	        }
	        /**
	         * specify a key from the registered objects as displayed language
	         * is used as fallback language is useHash and hash is not valid
	         * @throws {Error} if the key does not exists
	         * @param {string} idx the key to choose as language
	         * @return this to chain methods
	         */

	    }, {
	        key: 'choose',
	        value: function choose(idx) {
	            var hasCurrentProperty = Object.prototype.hasOwnProperty.call(this.translations, idx);
	            var hasCurrentLangage = Object.prototype.hasOwnProperty.call(this.translations, this.preferredLanguage);

	            if (!hasCurrentProperty) {
	                // eslint-disable-next-line
	                console.error('You must choose one of ' + Object.keys(this.translations));
	            }
	            if (this.useHash && hasCurrentLangage) {
	                return this;
	            }

	            this.preferredLanguage = idx;
	            return this;
	        }
	        /**
	         * starts the translation process -> looking for every `[i18n]`
	         * elements inside the container Element
	         * @throws {Error} if translations or choose haven't been called
	         */

	    }, {
	        key: 'translate',
	        value: function translate() {
	            if (!this.preferredLanguage) {
	                throw Error('please choose a language to display, see #choose()');
	            }
	            if (!this.translations) {
	                throw Error('please register translations, see #translations()');
	            }

	            var translation = this.translations[this.preferredLanguage];
	            var elements = this.container.querySelectorAll('[i18n]');
	            for (var i = 0; i < elements.length; i++) {
	                var el = elements[i];
	                var content = translation[el.getAttribute('i18n')].trim();
	                if (content.slice(0, 3) === '#!>') {
	                    el.innerHTML = content.slice(3).trim();
	                } else {
	                    el.textContent = content;
	                }
	            }

	            if (this.useHash) this.updateHash();
	        }
	        /**
	         * change the displayed language for a new one. the behaviour is to change
	         * the language and call translate
	         * @param {string} idx the new language to display
	         */

	    }, {
	        key: 'changeTo',
	        value: function changeTo(idx) {
	            var hasCurrentProperty = Object.prototype.hasOwnProperty.call(this.translations, idx);
	            if (!hasCurrentProperty) {
	                // eslint-disable-next-line
	                throw new Error('You can\'t change to a non existant language, use one of ' + Object.keys(this.translations));
	            }

	            if (this.preferredLanguage === idx) return;

	            this.preferredLanguage = idx;
	            this.translate();
	        }
	        /**
	         * Change the hash by appending the current lang code to the URL
	         */

	    }, {
	        key: 'updateHash',
	        value: function updateHash() {
	            window.location.hash = '#/' + this.preferredLanguage;
	        }
	    }]);

	    return Gnal;
	}();

	exports.default = Gnal;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;