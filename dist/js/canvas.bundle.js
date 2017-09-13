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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collisionFinal = exports.collisionStart = undefined;

var _collisionStart = __webpack_require__(3);

var _collisionStart2 = _interopRequireDefault(_collisionStart);

var _collisionFinal = __webpack_require__(2);

var _collisionFinal2 = _interopRequireDefault(_collisionFinal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Learn to code this at:
// https://www.youtube.com/watch?v=3b7FyIxWW94
// https://codepen.io/christopher4lis/pen/jmQXvm

/**
 * Created by hazantip on 12/09/17.
 */

exports.collisionStart = _collisionStart2.default;
exports.collisionFinal = _collisionFinal2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gravityFinal = exports.gravityStart = undefined;

var _gravityStart = __webpack_require__(5);

var _gravityStart2 = _interopRequireDefault(_gravityStart);

var _gravityFinal = __webpack_require__(4);

var _gravityFinal2 = _interopRequireDefault(_gravityFinal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Learn to code this at:
// https://www.youtube.com/watch?v=3b7FyIxWW94
// https://codepen.io/christopher4lis/pen/jmQXvm

/**
 * Created by hazantip on 7/20/17.
 */

exports.gravityStart = _gravityStart2.default;
exports.gravityFinal = _gravityFinal2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Created by hazantip on 12/09/17.
 *
 * TODO: triangle collision detection
 */

var collisionFinal = function collisionFinal() {

	// Initial Setup
	var canvas = document.querySelector('canvas');
	var c = canvas.getContext('2d');

	canvas.width = innerWidth;
	canvas.height = innerHeight;

	// Variables
	var mouse = {
		x: 0,
		y: 0
	};

	var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

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

	// Utility Functions
	function randomIntFromRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function getDistance(_ref) {
		var x1 = _ref.x1,
		    y1 = _ref.y1,
		    x2 = _ref.x2,
		    y2 = _ref.y2;

		var xDistance = x2 - x1;
		var yDistance = y2 - y1;

		// NOTE: pythagorean theorem
		return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	}

	// Objects
	function Circle(_ref2) {
		var x = _ref2.x,
		    y = _ref2.y,
		    radius = _ref2.radius,
		    color = _ref2.color;

		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;

		this.update = function () {

			this.draw();
		};

		this.draw = function () {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
			c.closePath();
		};
	}

	var circle1 = void 0;
	var circle2 = void 0;
	// Implementation
	function init() {
		circle1 = new Circle({ x: innerWidth / 2, y: innerHeight / 2, radius: 100, color: 'deepskyblue' });
		circle2 = new Circle({ x: 30, y: 30, radius: 30, color: 'greenyellow' });
	}

	// Animation Loop
	function animate() {
		requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height);

		circle1.update();
		circle2.x = mouse.x;
		circle2.y = mouse.y;
		circle2.update();

		var distance = getDistance({ x1: circle1.x, y1: circle1.y, x2: circle2.x, y2: circle2.y });
		if (distance < circle1.radius + circle2.radius) {
			circle1.color = 'tomato';
		} else {
			circle1.color = 'deepskyblue';
		}

		//c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	}

	init();
	animate();
};

exports.default = collisionFinal;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hazantip on 12/09/17.
 */

var collisionStart = function collisionStart() {};

exports.default = collisionStart;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Created by hazantip on 7/20/17.
 */

var gravityFinal = function gravityFinal() {

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
				//this.dx = -this.dx * friction;
				this.dx = -this.dx;
				this.dx = this.dx * friction;
				this.dy = this.dy * friction;
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

		for (var i = 0; i < 200; i++) {
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

exports.default = gravityFinal;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Created by hazantip on 7/20/17.
 */

var gravityStart = function gravityStart() {

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

	// Utility Functions
	function randomIntFromRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	// Objects
	function Object(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;

		this.update = function () {

			this.draw();
		};

		this.draw = function () {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
			c.closePath();
		};
	}

	// Implementation
	function init() {}

	// Animation Loop
	function animate() {
		requestAnimationFrame(animate);

		c.clearRect(0, 0, canvas.width, canvas.height);
		c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	}

	init();
	animate();
};

exports.default = gravityStart;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gravity = __webpack_require__(1);

var _collision = __webpack_require__(0);

// Learn to code this at:
// https://http://chriscourses.com/
// https://github.com/christopher4lis

// - 1
//gravityFinal();

// -2
(0, _collision.collisionFinal)();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map