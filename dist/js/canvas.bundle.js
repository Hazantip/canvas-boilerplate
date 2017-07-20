/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _canvasFinal = __webpack_require__(2);

var _canvasFinal2 = _interopRequireDefault(_canvasFinal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Learn to code this at:
// https://www.youtube.com/watch?v=3b7FyIxWW94
// https://codepen.io/christopher4lis/pen/jmQXvm
// https://github.com/christopher4lis

// - 0
//canvasStart();

// - 1
(0, _canvasFinal2.default)(); //import canvasStart from '../src/canvasStart';

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Created by hazantip on 7/20/17.
 */

var canvasFinal = function canvasFinal() {

	// Initial Setup
	var canvas = document.querySelector('canvas');
	var c = canvas.getContext('2d');

	canvas.width = innerWidth;
	canvas.height = innerHeight;

	// Variables
	var mouse = {
		x: innerWidth / 2,
		y: innerHeight / 2
	};

	var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

	var gravity = 0.2;
	var friction = 0.98;

	// Event Listeners
	addEventListener("mousemove", function (event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	});

	addEventListener("resize", function () {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	});

	addEventListener("click", function (event) {
		init();
	});

	// Utility Functions
	function randomIntFromRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	// Objects
	function Ball(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = color;

		this.update = function () {
			if (this.y + this.radius + this.dy > canvas.height) {
				this.dy = -this.dy;
				this.dy = this.dy * friction;
				this.dx = this.dx * friction;
			} else {
				this.dy += gravity;
			}

			if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
				this.dx = -this.dx * friction;
			}

			this.x += this.dx;
			this.y += this.dy;
			this.draw();
		};

		this.draw = function () {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
			c.stroke();
			c.closePath();
		};
	}

	// Implementation
	var ballArray = [];

	function init() {
		ballArray = [];

		for (var i = 0; i < 600; i++) {
			var radius = randomIntFromRange(8, 20);
			var x = randomIntFromRange(radius, canvas.width - radius);
			var y = randomIntFromRange(0, canvas.height - radius);
			var dx = randomIntFromRange(-3, 3);
			var dy = randomIntFromRange(-2, 2);
			ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
		}
	}

	// Animation Loop
	function animate() {
		requestAnimationFrame(animate);

		c.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < ballArray.length; i++) {
			ballArray[i].update();
		}
	}

	init();
	animate();
};

exports.default = canvasFinal;

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map