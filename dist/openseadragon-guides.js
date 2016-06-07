/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Not importing Openseadragon into the bundle, use global var instead
	var $ = OpenSeadragon;
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return $; }});
	
	var DIRECTION_HORIZONTAL = Symbol('horizontal');
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return DIRECTION_HORIZONTAL; }});
	var DIRECTION_VERTICAL = Symbol('vertical');
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return DIRECTION_VERTICAL; }});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__globals__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	
	
	var Guide = function () {
	  function Guide(viewer, id) {
	    var direction = arguments.length <= 2 || arguments[2] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0__globals__["a"] : arguments[2];
	
	    _classCallCheck(this, Guide);
	
	    this.viewer = viewer;
	    this.direction = direction;
	    this.id = id;
	
	    // Center guide by default
	    this.point = this.viewer.viewport.getCenter();
	
	    this.elem = createElem(this.direction, this.id);
	    this.overlay = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__globals__["b"].Overlay(this.elem, this.point);
	    this.draw();
	
	    this.addHandlers();
	  }
	
	  _createClass(Guide, [{
	    key: 'addHandlers',
	    value: function addHandlers() {
	      // Listen for mouse events on the guide
	      this.tracker = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__globals__["b"].MouseTracker({
	        element: this.elem,
	        clickTimeThreshold: this.viewer.clickTimeThreshold,
	        clickDistThreshold: this.viewer.clickDistThreshold,
	        dragHandler: this.dragHandler.bind(this),
	        dragEndHandler: this.dragEndHandler.bind(this),
	        dblClickHandler: this.remove.bind(this)
	      });
	
	      // Redraw guide when viewer changes
	      this.viewer.addHandler('open', this.draw.bind(this));
	      this.viewer.addHandler('animation', this.draw.bind(this));
	      this.viewer.addHandler('resize', this.draw.bind(this));
	      this.viewer.addHandler('rotate', this.draw.bind(this));
	    }
	  }, {
	    key: 'dragHandler',
	    value: function dragHandler(event) {
	      var delta = this.viewer.viewport.deltaPointsFromPixels(event.delta, true);
	
	      switch (this.direction) {
	        case /* harmony import */__WEBPACK_IMPORTED_MODULE_0__globals__["a"]:
	          this.point.y += delta.y;
	          break;
	        case /* harmony import */__WEBPACK_IMPORTED_MODULE_0__globals__["c"]:
	          this.point.x += delta.x;
	          break;
	      }
	
	      this.elem.classList.add('od-guide-drag');
	      this.draw();
	    }
	  }, {
	    key: 'dragEndHandler',
	    value: function dragEndHandler() {
	      this.elem.classList.remove('od-guide-drag');
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      if (this.point) {
	        this.overlay.update(this.point);
	        this.overlay.drawHTML(this.viewer.drawer.container, this.viewer.viewport);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.overlay.destroy();
	      this.point = null;
	
	      return this;
	    }
	  }]);
	
	  return Guide;
	}();
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return Guide; }});
	
	function createElem(direction, id) {
	  var elem = document.createElement('div');
	
	  elem.id = 'od-guide-' + id;
	  elem.classList.add('od-guide');
	
	  switch (direction) {
	    case /* harmony import */__WEBPACK_IMPORTED_MODULE_0__globals__["a"]:
	      elem.classList.add('od-guide-horizontal');
	      break;
	    case /* harmony import */__WEBPACK_IMPORTED_MODULE_0__globals__["c"]:
	      elem.classList.add('od-guide-vertical');
	      break;
	    default:
	      throw new Error('Invalid guide direction');
	  }
	
	  return elem;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__guide__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__(0);
	
	
	
	if (!/* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].version || /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].version.major < 2) {
	  throw new Error('This version of OpenSeadragon Guides requires OpenSeadragon version 2.0.0+');
	}
	
	/* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].Viewer.prototype.guides = function (options) {
	  if (!this.guidesInstance || options) {
	    options = options || {};
	    options.viewer = this;
	    this.guidesInstance = new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].Guides(options);
	  }
	
	  return this.guidesInstance;
	};
	
	/* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].Guides = function (options) {
	  var _this = this;
	
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].extend(true, this, {
	    // internal state properties
	    viewer: null,
	    guides: [],
	    guideIndex: 0,
	
	    // options
	    horizontalGuideButton: null,
	    verticalGuideButton: null,
	    prefixUrl: null,
	    removeOnClose: false,
	    navImages: {
	      guideHorizontal: {
	        REST: 'button_rest.png',
	        GROUP: 'button_grouphover.png',
	        HOVER: 'button_hover.png',
	        DOWN: 'button_pressed.png'
	      },
	      guideVertical: {
	        REST: 'button_rest.png',
	        GROUP: 'button_grouphover.png',
	        HOVER: 'button_hover.png',
	        DOWN: 'button_pressed.png'
	      }
	    }
	  }, options);
	
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].extend(true, this.navImages, this.viewer.navImages);
	
	  var prefix = this.prefixUrl || this.viewer.prefixUrl || '';
	  var useGroup = this.viewer.buttons && this.viewer.buttons.buttons;
	  var anyButton = useGroup ? this.viewer.buttons.buttons[0] : null;
	  var onFocus = anyButton ? anyButton.onFocus : null;
	  var onBlur = anyButton ? anyButton.onBlur : null;
	
	  this.horizontalGuideButton = new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].Button({
	    element: this.horizontalGuideButton ? /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].getElement(this.horizontalGuideButton) : null,
	    clickTimeThreshold: this.viewer.clickTimeThreshold,
	    clickDistThreshold: this.viewer.clickDistThreshold,
	    tooltip: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].getString('Tooltips.HorizontalGuide') || 'Horizontal guide',
	    srcRest: prefix + this.navImages.guideHorizontal.REST,
	    srcGroup: prefix + this.navImages.guideHorizontal.GROUP,
	    srcHover: prefix + this.navImages.guideHorizontal.HOVER,
	    srcDown: prefix + this.navImages.guideHorizontal.DOWN,
	    onRelease: this.createHorizontalGuide.bind(this),
	    onFocus: onFocus,
	    onBlur: onBlur
	  });
	
	  this.verticalGuideButton = new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].Button({
	    element: this.verticalGuideButton ? /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].getElement(this.verticalGuideButton) : null,
	    clickTimeThreshold: this.viewer.clickTimeThreshold,
	    clickDistThreshold: this.viewer.clickDistThreshold,
	    tooltip: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].getString('Tooltips.VerticalGuide') || 'vertical guide',
	    srcRest: prefix + this.navImages.guideVertical.REST,
	    srcGroup: prefix + this.navImages.guideVertical.GROUP,
	    srcHover: prefix + this.navImages.guideVertical.HOVER,
	    srcDown: prefix + this.navImages.guideVertical.DOWN,
	    onRelease: this.createVerticalGuide.bind(this),
	    onFocus: onFocus,
	    onBlur: onBlur
	  });
	
	  if (useGroup) {
	    this.viewer.buttons.buttons.push(this.horizontalGuideButton);
	    this.viewer.buttons.element.appendChild(this.horizontalGuideButton.element);
	    this.viewer.buttons.buttons.push(this.verticalGuideButton);
	    this.viewer.buttons.element.appendChild(this.verticalGuideButton.element);
	  }
	
	  // Remove guides when viewer closes
	  if (this.removeOnClose) {
	    this.viewer.addHandler('close', function () {
	      _this.guides.forEach(function (guide) {
	        return guide.remove();
	      });
	      _this.guides = [];
	    });
	  }
	};
	
	/* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].extend(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["b"].Guides.prototype, {
	  createHorizontalGuide: function createHorizontalGuide() {
	    var id = this.guideIndex++;
	    this.guides.push(new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__guide__["a"](this.viewer, id, /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["a"]));
	  },
	  createVerticalGuide: function createVerticalGuide() {
	    var id = this.guideIndex++;
	    this.guides.push(new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__guide__["a"](this.viewer, id, /* harmony import */__WEBPACK_IMPORTED_MODULE_1__globals__["c"]));
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=openseadragon-guides.js.map