(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vcEasyclearinput"] = factory();
	else
		root["vcEasyclearinput"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 4 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(22)
  , hide      = __webpack_require__(26)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(28)
  , defined = __webpack_require__(6);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(12)
module.exports = __webpack_require__(46)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(15)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Easyclearinput.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Easyclearinput.vue","-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Easyclearinput.vue"], function () {
var newOptions = require("-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Easyclearinput.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Easyclearinput.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 11 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(11)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-0d270100&file=Easyclearinput.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Easyclearinput.vue", function() {
			var newContent = require("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-0d270100&file=Easyclearinput.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Easyclearinput.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".vc-easyclearinput-component .label-item {\n  font-weight: normal;\n  margin-right: 5px;\n  display: table;\n  vertical-align: bottom;\n  float: left;\n  height: 34px;\n  line-height: 34px;\n}\n.vc-easyclearinput-component textarea.form-control {\n  resize: vertical;\n}\n.vc-easyclearinput-component .glyphicon {\n  z-index: 9;\n}\n.vc-easyclearinput-component .input-box {\n  display: table;\n  position: relative;\n}\n.vc-easyclearinput-component .input-box .form-control {\n  width: 100%;\n}\n.vc-easyclearinput-component .input-box:hover .clear-it {\n  visibility: visible;\n}\n.vc-easyclearinput-component .input-box .clear-it {\n  visibility: hidden;\n  position: absolute;\n  top: 50%;\n  right: 6px;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  opacity: .3;\n}\n.vc-easyclearinput-component .input-box .clear-it.has-icon {\n  right: 28px;\n}\n.vc-easyclearinput-component .info-text {\n  position: absolute;\n  top: -22px;\n}\n.vc-easyclearinput-component .info-text.with-success {\n  color: #87d068;\n}\n.vc-easyclearinput-component .info-text.with-warning {\n  color: #fa0;\n}\n.vc-easyclearinput-component .info-text.with-error {\n  color: #f50;\n}\n", ""]);

// exports


/***/ },
/* 14 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = "<div class=\"vc-easyclearinput-component form-group\" :class=\"[statusClass, { 'has-feedback': icon }]\" :style=\"{ 'width': optionalWidth }\">\n        <label class=\"label-item\">{{ label }}&nbsp;:</label>\n        <div :class=\"{ 'input-box': true, 'input-group': hasSlot }\">\n            <slot name=\"input-before\"></slot>\n            <span v-if=\"!hasSlot\" style=\"width: 1%;display: table-cell\">&nbsp;</span><!-- 占位元素，用于撑开宽度，原因未知 -->\n            <span v-if=\"icon\" class=\"glyphicon form-control-feedback\" :class=\"iconClass\" aria-hidden=\"true\"></span>\n            <span @click=\"handleClear\" class=\"clear-it glyphicon glyphicon-remove-circle\" :class=\"{ 'has-icon': icon, 'hide': hideClearIcon }\" aria-hidden=\"true\"></span>\n            <div class=\"info-text\" :class=\"infoTextClass\">{{ infoText }}</div>\n            <input class=\"form-control\"\n                v-if=\"type !== 'textarea'\"\n                v-el:input\n                :type=\"type\"\n                :disabled=\"disabled\"\n                :readonly=\"readonly\"\n                v-model=\"value\"\n                :placeholder=\"placeholder\"\n                @focus=\"handleFocus\"\n                @blur=\"handleBlur\"\n            />\n            <textarea \n                v-if=\"type === 'textarea'\"\n                class=\"form-control\"\n                v-el:input\n                :type=\"type\"\n                :disabled=\"disabled\"\n                :readonly=\"readonly\"\n                v-model=\"value\"\n                :placeholder=\"placeholder\"\n                @focus=\"handleFocus\"\n                @blur=\"handleBlur\"\n            >\n            </textarea\n        </div>\n    </div>\n</template>";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(42);
module.exports = __webpack_require__(0).Number.isInteger;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(43);
module.exports = __webpack_require__(0).Object.keys;

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(9)
  , toLength  = __webpack_require__(38)
  , toIndex   = __webpack_require__(37);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 21 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 24 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 25 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(30)
  , createDesc = __webpack_require__(34);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(23)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(1)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(19)
  , IE8_DOM_DEFINE = __webpack_require__(27)
  , toPrimitive    = __webpack_require__(40)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(25)
  , toIObject    = __webpack_require__(9)
  , arrayIndexOf = __webpack_require__(20)(false)
  , IE_PROTO     = __webpack_require__(35)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(31)
  , enumBugKeys = __webpack_require__(24);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ },
/* 34 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(36)('keys')
  , uid    = __webpack_require__(41);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(8)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(8)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 41 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(7);

$export($export.S, 'Number', {isInteger: __webpack_require__(29)});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(39)
  , $keys    = __webpack_require__(32);

__webpack_require__(33)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(16), __esModule: true };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(17), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(45);

var _keys2 = _interopRequireDefault(_keys);

var _isInteger = __webpack_require__(44);

var _isInteger2 = _interopRequireDefault(_isInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <template>
//     <div class="vc-easyclearinput-component form-group" :class="[statusClass, { 'has-feedback': icon }]" :style="{ 'width': optionalWidth }">
//         <label class="label-item">{{ label }}&nbsp;:</label>
//         <div :class="{ 'input-box': true, 'input-group': hasSlot }">
//             <slot name="input-before"></slot>
//             <span v-if="!hasSlot" style="width: 1%;display: table-cell">&nbsp;</span><!-- 占位元素，用于撑开宽度，原因未知 -->
//             <span v-if="icon" class="glyphicon form-control-feedback" :class="iconClass" aria-hidden="true"></span>
//             <span @click="handleClear" class="clear-it glyphicon glyphicon-remove-circle" :class="{ 'has-icon': icon, 'hide': hideClearIcon }" aria-hidden="true"></span>
//             <div class="info-text" :class="infoTextClass">{{ infoText }}</div>
//             <input class="form-control"
//                 v-if="type !== 'textarea'"
//                 v-el:input
//                 :type="type"
//                 :disabled="disabled"
//                 :readonly="readonly"
//                 v-model="value"
//                 :placeholder="placeholder"
//                 @focus="handleFocus"
//                 @blur="handleBlur"
//             />
//             <textarea 
//                 v-if="type === 'textarea'"
//                 class="form-control"
//                 v-el:input
//                 :type="type"
//                 :disabled="disabled"
//                 :readonly="readonly"
//                 v-model="value"
//                 :placeholder="placeholder"
//                 @focus="handleFocus"
//                 @blur="handleBlur"
//             >
//             </textarea
//         </div>
//     </div>
// </template>

// <style lang="less">
// // container
// .vc-easyclearinput-component {

//     .label-item {
//         font-weight: normal;
//         margin-right: 5px;
//         display: table;
//         vertical-align: bottom;
//         float: left;
//         height: 34px;
//         line-height: 34px;
//     }

//     textarea.form-control {
//         resize: vertical;
//     }

//     .glyphicon {
//         z-index: 9;
//     }

//     .input-box {
//         display: table;
//         position: relative;

//         .form-control {
//             width: 100%;
//         }
//         &:hover {
//             .clear-it {
//                 visibility: visible;
//             }
//         }

//         .clear-it {
//             visibility: hidden;
//             position: absolute;
//             top: 50%;
//             right: 6px;
//             // css3 it more flexible
//             -webkit-transform: translateY(-50%);
//             transform: translateY(-50%);
//             opacity: .3;

//             &.has-icon {
//                 right: 28px;
//             }
//         }
//     }

//     @success: #87d068;
//     @warning: #fa0;
//     @error: #f50;
//     .info-text {
//         position: absolute;
//         top: -22px;

//         &.with-success {
//             color: @success;
//         }
//         &.with-warning {
//             color: @warning;
//         }
//         &.with-error {
//             color: @error;
//         }
//     }

// } // end of container
// </style>

// <script>
var EVENT_DELAY = 128;

exports.default = {
    name: 'vc-easyclearinput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            twoWay: true
        },
        label: String,
        placeholder: String,
        infoText: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: '250'
        },
        icon: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: ''
        },
        onFocus: { // focus回调
            type: Function,
            default: function _default() {}
        },
        onBlur: { // blur回调
            type: Function,
            default: function _default() {}
        },
        onClear: { // onClear回调
            type: Function,
            default: function _default() {}
        }
    },
    data: function data() {
        return {
            isClear: false,
            hasSlot: true
        };
    },
    created: function created() {},
    ready: function ready() {
        if (this.autofocus) {
            this.focusInput();
        }
        // 检查是否有用户自定义slot传入(input-before)
        this.checkSlot();
        // 检查用户是否内联了不该内联的事件(focus & blur)
        this.checkEvents();
    },

    computed: {
        hideClearIcon: function hideClearIcon() {
            return this.value == null || this.value === '' || this.disabled || this.readonly;
        },
        optionalWidth: function optionalWidth() {
            if (this.width == null || this.width === '') {
                return null;
            }
            if ((0, _isInteger2.default)(+this.width)) {
                return this.width + 'px';
            }
            return this.width;
        },
        statusClass: function statusClass() {
            return 'has-' + this.status;
        },
        infoTextClass: function infoTextClass() {
            return 'with-' + this.status;
        },
        iconClass: function iconClass() {
            if (this.status === 'success') {
                return 'glyphicon-ok';
            }
            if (this.status === 'warning') {
                return 'glyphicon-warning-sign';
            }
            if (this.status === 'error') {
                return 'glyphicon-remove';
            }
        }
    },
    watch: {
        autofocus: function autofocus(val) {
            if (val) {
                this.focusInput();
            }
        }
    },
    methods: {
        checkSlot: function checkSlot() {
            var keys = (0, _keys2.default)(this._slotContents);
            this.hasSlot = keys.some(function (item, index) {
                return item === 'input-before';
            });
        },
        checkEvents: function checkEvents() {
            var focus = this._events.focus;
            if (focus && focus.length > 0) {
                console.warn('if you want to listen on focus event, please use `:on-focus` callback!');
            }
            var blur = this._events.blur;
            if (blur && blur.length > 0) {
                console.warn('if you want to listen on blur event, please use `:on-blur` callback!');
            }
        },

        /**
         * 点击清除按钮
         * 1. blur 2. clear 3.focus again
         * 事件修正，使得小叉号成为类似系统原生的和input一体的控件，
         * 点击小叉号不应该带来input的失焦还有相应事件的响应
         */
        focusInput: function focusInput() {
            // 工具方法
            this.$els.input && this.$els.input.focus();
        },
        handleBlur: function handleBlur(e) {
            var _this = this;

            // console.log(1)
            setTimeout(function () {
                if (!_this.isClear) {
                    _this.onBlur(e);
                } else {
                    setTimeout(function () {
                        _this.focusInput();
                    }, 0);
                }
                // this.isClear = false
            }, EVENT_DELAY);
        },
        handleClear: function handleClear() {
            // console.log(2)
            // 可编辑状态下
            if (!this.disabled && !this.readonly) {
                this.isClear = true;
                this.value = '';
                this.onClear();
                this.focusInput();
            }
        },
        handleFocus: function handleFocus(e) {
            var _this2 = this;

            // console.log(3)
            setTimeout(function () {
                if (!_this2.isClear) {
                    _this2.onFocus(e);
                }
                _this2.isClear = false;
            }, EVENT_DELAY + 10);
        }
    }
};
// </script>

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Easyclearinput = __webpack_require__(10);

var _Easyclearinput2 = _interopRequireDefault(_Easyclearinput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Easyclearinput2.default;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=build.js.map