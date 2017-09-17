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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasComponent = function CanvasComponent(canvas) {
	_classCallCheck(this, CanvasComponent);

	this.canvas = canvas || document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");
	this.width = this.canvas.width = window.innerWidth;
	this.height = this.canvas.height = window.innerHeight;
	this.canvasCX = this.width / 2;
	this.canvasCY = this.height / 2;
};

exports.default = CanvasComponent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(2);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
	function Particle(x, y, speed, direction, grav) {
		_classCallCheck(this, Particle);

		this.position = null;
		this.velocity = null;
		this.mass = 1;
		this.radius = 0;
		this.bounce = -1;
		this.friction = 1;
		this.gravity = 0;

		this.create(x, y, speed, direction, grav);
	}

	_createClass(Particle, [{
		key: 'create',
		value: function create(x, y, speed, direction, grav) {
			this.position = new _vector2.default(x, y);
			this.velocity = new _vector2.default(0, 0);
			this.velocity.setLength(speed);
			this.velocity.setAngle(direction);
			this.gravity = new _vector2.default(0, grav || 0);
		}
	}, {
		key: 'accelerate',
		value: function accelerate(accel) {
			this.velocity.addTo(accel);
		}
	}, {
		key: 'update',
		value: function update() {
			this.velocity.multiplyBy(this.friction);
			this.velocity.addTo(this.gravity);
			this.position.addTo(this.velocity);
		}
	}, {
		key: 'angleTo',
		value: function angleTo(p2) {
			return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
		}
	}, {
		key: 'distanceTo',
		value: function distanceTo(p2) {
			var dx = p2.position.getX() - this.position.getX();
			var dy = p2.position.getY() - this.position.getY();

			return Math.sqrt(dx * dx + dy * dy);
		}
	}, {
		key: 'gravitateTo',
		value: function gravitateTo(p2) {
			var grav = new _vector2.default(0, 0);
			var dist = this.distanceTo(p2);

			grav.setLength(p2.mass / (dist * dist));
			grav.setAngle(this.angleTo(p2));
			this.velocity.addTo(grav);
		}
	}]);

	return Particle;
}();

exports.default = Particle;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
	function Vector(x, y) {
		_classCallCheck(this, Vector);

		this._x = 1;
		this._y = 0;

		this.create(x, y);
	}

	_createClass(Vector, [{
		key: "create",
		value: function create(x, y) {
			this.setX(x);
			this.setY(y);
		}
	}, {
		key: "setX",
		value: function setX(value) {
			this._x = value;
		}
	}, {
		key: "getX",
		value: function getX() {
			return this._x;
		}
	}, {
		key: "setY",
		value: function setY(value) {
			this._y = value;
		}
	}, {
		key: "getY",
		value: function getY() {
			return this._y;
		}
	}, {
		key: "setAngle",
		value: function setAngle(angle) {
			var length = this.getLength();
			this._x = Math.cos(angle) * length;
			this._y = Math.sin(angle) * length;
		}
	}, {
		key: "getAngle",
		value: function getAngle() {
			return Math.atan2(this._y, this._x);
		}
	}, {
		key: "setLength",
		value: function setLength(length) {
			var angle = this.getAngle();
			this._x = Math.cos(angle) * length;
			this._y = Math.sin(angle) * length;
		}
	}, {
		key: "getLength",
		value: function getLength() {
			return Math.sqrt(this._x * this._x + this._y * this._y);
		}
	}, {
		key: "add",
		value: function add(v2) {
			return this.create(this._x + v2.getX(), this._y + v2.getY());
		}
	}, {
		key: "subtract",
		value: function subtract(v2) {
			return this.create(this._x - v2.getX(), this._y - v2.getY());
		}
	}, {
		key: "multiply",
		value: function multiply(val) {
			return this.create(this._x * val, this._y * val);
		}
	}, {
		key: "divide",
		value: function divide(val) {
			return this.create(this._x / val, this._y / val);
		}
	}, {
		key: "addTo",
		value: function addTo(v2) {
			this._x += v2.getX();
			this._y += v2.getY();
		}
	}, {
		key: "subtractFrom",
		value: function subtractFrom(v2) {
			this._x -= v2.getX();
			this._y -= v2.getY();
		}
	}, {
		key: "multiplyBy",
		value: function multiplyBy(val) {
			this._x *= val;
			this._y *= val;
		}
	}, {
		key: "divideBy",
		value: function divideBy(val) {
			this._x /= val;
			this._y /= val;
		}
	}]);

	return Vector;
}();

exports.default = Vector;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasComponent2 = __webpack_require__(0);

var _CanvasComponent3 = _interopRequireDefault(_CanvasComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawBall = function (_CanvasComponent) {
	_inherits(DrawBall, _CanvasComponent);

	function DrawBall(type) {
		_classCallCheck(this, DrawBall);

		var _this = _possibleConstructorReturn(this, (DrawBall.__proto__ || Object.getPrototypeOf(DrawBall)).call(this));

		_this.type = type || 'round';

		_this.offset = _this.height * 0.3;
		_this.angle = 0;
		_this.baseRadius = 50;
		_this.baseAlpha = 0.5;
		_this.speed = 0.035;

		_this.draw();
		return _this;
	}

	_createClass(DrawBall, [{
		key: 'draw',
		value: function draw() {
			var x = void 0,
			    y = void 0;

			if (this.type === 'round') {
				// by round (clockwise); (anti-clockwise: cos - Y, sin - X)
				y = this.canvasCY + Math.sin(this.angle) * this.offset;
				x = this.canvasCX + Math.cos(this.angle) * this.offset;
			}

			if (this.type === 'diagonal') {
				// by diagonal
				y = this.canvasCY + Math.cos(this.angle) * this.offset;
				x = this.canvasCX + Math.cos(this.angle) * this.offset;
			}

			if (this.type === 'vertical') {
				// by vertical
				y = this.canvasCY + Math.sin(this.angle) * this.offset;
				x = this.canvasCX;
			}

			if (this.type === 'experimental') {
				// Tangents experiments
				y = this.canvasCY + Math.sin(this.angle) * this.offset;
				x = this.canvasCX + Math.tan(this.angle) * this.offset;
			}

			var radius = this.baseRadius + Math.sin(this.angle) * 25;
			var alpha = this.baseAlpha + Math.sin(this.angle) * 0.25;

			this.context.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
			this.context.clearRect(0, 0, this.width, this.height);
			this.context.beginPath();
			this.context.arc(x, y, radius, 0, Math.PI * 2 * radius, false); // x, y, radius, startingAngle, endingAngle, antiClockwise
			this.context.fill();

			this.angle += this.speed;

			requestAnimationFrame(this.draw.bind(this));
		}
	}]);

	return DrawBall;
}(_CanvasComponent3.default);

exports.default = DrawBall;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasComponent2 = __webpack_require__(0);

var _CanvasComponent3 = _interopRequireDefault(_CanvasComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawBees = function (_CanvasComponent) {
	_inherits(DrawBees, _CanvasComponent);

	function DrawBees(type) {
		_classCallCheck(this, DrawBees);

		var _this = _possibleConstructorReturn(this, (DrawBees.__proto__ || Object.getPrototypeOf(DrawBees)).call(this));

		_this.bees = [];
		_this.numBees = 50;

		_this.create();
		return _this;
	}

	_createClass(DrawBees, [{
		key: 'create',
		value: function create() {
			var Bee = function Bee() {
				this.init = function () {
					var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

					this.angleX = Math.random() * Math.PI * 2;
					this.angleY = Math.random() * Math.PI * 2;
					this.speedX = Math.random() * .1 - .05;
					this.speedY = Math.random() * .1 - .05;
					this.radius = 100 + Math.random() * 100;
					this.index = index;
				};

				this.update = function (ctx, w, h) {
					var x = Math.cos(this.angleX) * this.radius;
					var y = Math.sin(this.angleY) * this.radius;
					this.angleX += this.speedX;
					this.angleY += this.speedY;

					ctx.beginPath();
					ctx.arc(w / 2 + x, h / 2 + y, 2, 0, Math.PI * 2, false);
					ctx.fill();
				};

				this.init();
			};

			for (var i = 0; i < this.numBees; i += 1) {
				this.bees.push(new Bee(i));
			}

			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			this.context.clearRect(0, 0, this.width, this.height);
			for (var i = 0; i < this.numBees; i += 1) {
				this.bees[i].update(this.context, this.width, this.height);
			}
			requestAnimationFrame(this.draw.bind(this));
		}
	}]);

	return DrawBees;
}(_CanvasComponent3.default);

exports.default = DrawBees;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Ship = exports.Friction = undefined;

var _friction = __webpack_require__(9);

var _friction2 = _interopRequireDefault(_friction);

var _ship = __webpack_require__(10);

var _ship2 = _interopRequireDefault(_ship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Coding Math: Episode 13
* {@link - https://youtu.be/ueqi8boYS5k}
* */
exports.Friction = _friction2.default;
exports.Ship = _ship2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasComponent2 = __webpack_require__(0);

var _CanvasComponent3 = _interopRequireDefault(_CanvasComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawRandomLines = function (_CanvasComponent) {
	_inherits(DrawRandomLines, _CanvasComponent);

	function DrawRandomLines() {
		_classCallCheck(this, DrawRandomLines);

		var _this = _possibleConstructorReturn(this, (DrawRandomLines.__proto__ || Object.getPrototypeOf(DrawRandomLines)).call(this));

		_this.draw();
		return _this;
	}

	_createClass(DrawRandomLines, [{
		key: 'draw',
		value: function draw() {
			for (var i = 0; i <= 360; i += 0.5) {
				this.context.beginPath();
				this.context.moveTo(Math.random() * this.width, Math.random() * this.height);
				this.context.lineTo(Math.random() * this.width, Math.random() * this.height);
				this.context.stroke();
				this.context.strokeStyle = 'rgb(150,  ' + (Math.random() * 255).toFixed(0) + ', 150)';
			}
		}
	}]);

	return DrawRandomLines;
}(_CanvasComponent3.default);

exports.default = DrawRandomLines;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collisionFinal = exports.collisionStart = undefined;

var _collisionStart = __webpack_require__(12);

var _collisionStart2 = _interopRequireDefault(_collisionStart);

var _collisionFinal = __webpack_require__(11);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gravityFinal = exports.gravityStart = undefined;

var _gravityStart = __webpack_require__(14);

var _gravityStart2 = _interopRequireDefault(_gravityStart);

var _gravityFinal = __webpack_require__(13);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasComponent2 = __webpack_require__(0);

var _CanvasComponent3 = _interopRequireDefault(_CanvasComponent2);

var _particle = __webpack_require__(1);

var _particle2 = _interopRequireDefault(_particle);

var _utils = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Friction = function (_CanvasComponent) {
	_inherits(Friction, _CanvasComponent);

	function Friction() {
		_classCallCheck(this, Friction);

		var _this = _possibleConstructorReturn(this, (Friction.__proto__ || Object.getPrototypeOf(Friction)).call(this));

		_this.createParticle();
		_this.update();
		return _this;
	}

	_createClass(Friction, [{
		key: 'createParticle',
		value: function createParticle() {
			this.p = new _particle2.default(this.width / 2, this.height / 2, 10, Math.random() * Math.PI * 2);
			this.p.friction = 0.97;
			this.p.radius = 10;
		}
	}, {
		key: 'update',
		value: function update() {
			this.context.clearRect(0, 0, this.width, this.height);

			this.p.update();
			//console.log( inDeg(this.p.velocity.getAngle()) );

			this.context.beginPath();
			this.context.arc(this.p.position.getX(), this.p.position.getY(), this.p.radius, 0, Math.PI * 2, false);
			this.context.fill();

			requestAnimationFrame(this.update.bind(this));
		}
	}]);

	return Friction;
}(_CanvasComponent3.default);

exports.default = Friction;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasComponent2 = __webpack_require__(0);

var _CanvasComponent3 = _interopRequireDefault(_CanvasComponent2);

var _particle = __webpack_require__(1);

var _particle2 = _interopRequireDefault(_particle);

var _vector = __webpack_require__(2);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ship = function (_CanvasComponent) {
	_inherits(Ship, _CanvasComponent);

	function Ship() {
		_classCallCheck(this, Ship);

		var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this));

		_this.turningLeft = false;
		_this.turningRight = false;
		_this.thrusting = false;

		document.body.addEventListener('keydown', _this._onKeyDown.bind(_this));
		document.body.addEventListener('keyup', _this._onKeyUp.bind(_this));

		_this.createShip();
		_this.update();
		return _this;
	}

	_createClass(Ship, [{
		key: 'createShip',
		value: function createShip() {
			this.ship = new _particle2.default(this.width / 2, this.height / 2, 0, 0);
			this.thrust = new _vector2.default(0, 0);
			this.angle = 0;

			this.ship.friction = 0.99;
		}
	}, {
		key: '_onKeyDown',
		value: function _onKeyDown(event) {
			// console.log(event.keyCode);
			switch (event.keyCode) {
				case 38:
					// up
					this.thrusting = true;
					break;
				case 37:
					// left
					this.turningLeft = true;
					break;
				case 39:
					// right
					this.turningRight = true;
				default:
					break;
			}
		}
	}, {
		key: '_onKeyUp',
		value: function _onKeyUp(event) {
			// console.log(event.keyCode);
			switch (event.keyCode) {
				case 38:
					// up
					this.thrusting = false;
					break;
				case 37:
					// left
					this.turningLeft = false;
					break;
				case 39:
					// right
					this.turningRight = false;
				default:
					break;
			}
		}
	}, {
		key: 'update',
		value: function update() {
			this.context.clearRect(0, 0, this.width, this.height);

			if (this.turningRight) {
				this.angle += .05;
			}
			if (this.turningLeft) {
				this.angle -= .05;
			}

			if (this.thrusting) {
				this.thrust.setLength(.1);
			} else {
				this.thrust.setLength(0);
			}
			this.thrust.setAngle(this.angle);

			this.ship.accelerate(this.thrust);
			this.ship.update();

			if (this.ship.position.getX() > this.width) {
				this.ship.position.setX(0);
			}
			if (this.ship.position.getX() < 0) {
				this.ship.position.setX(this.width);
			}
			if (this.ship.position.getY() > this.height) {
				this.ship.position.setY(0);
			}
			if (this.ship.position.getY() < 0) {
				this.ship.position.setY(this.height);
			}

			this.context.save();

			this.context.translate(this.ship.position.getX(), this.ship.position.getY());
			this.context.rotate(this.angle);
			this.context.beginPath();
			this.context.moveTo(10, 0);
			this.context.lineTo(-10, -7);
			this.context.lineTo(-10, 7);
			this.context.lineTo(10, 0);
			if (this.thrusting) {
				this.context.moveTo(-10, 0);
				this.context.lineTo(-18, 0);
			}
			this.context.stroke();

			this.context.restore();

			requestAnimationFrame(this.update.bind(this));
		}
	}]);

	return Ship;
}(_CanvasComponent3.default);

exports.default = Ship;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Created by hazantip on 12/09/17.
 *
 * TODO: triangle collision detection
 * @{link} - https://youtu.be/XYzA_kPWyJ8
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.inRad = inRad;
exports.inDeg = inDeg;
exports.animate = animate;
exports.debounce = debounce;
function inRad(num) {
	// will conver deg to rad
	return num * Math.PI / 180;
}

function inDeg(num) {
	// will conver rad to deg
	return num * 180 / Math.PI;
}

/*
* Animation function
* {@usage - animate(drawCircle, { duration: 1000, to: 270 }); }
**/
function animate(draw, paramsNew) {

	var defaultParams = {
		'duration': 1000, // number ms
		'to': null, // number; newVal = to * ( timePassed / duration );
		'steps': 1 // number
	};
	var params = Object.assign({}, defaultParams, paramsNew);

	var start = performance.now();

	requestAnimationFrame(function updateFrame(time) {
		var timePassed = time - start;

		if (timePassed > params.duration) {
			timePassed = params.duration;
		}

		params.timePassed = timePassed; // store timePassed

		draw(params); // call your function and upply params to it

		if (timePassed < params.duration) {
			requestAnimationFrame(updateFrame); // update
		}
	});
}

/*
* Debounce
* */
function debounce(f, ms) {

	var state = null;

	var COOLDOWN = 1;

	return function () {
		if (state) {
			return;
		}

		/*eslint prefer-rest-params:0*/
		f.apply(this, arguments);

		state = COOLDOWN;

		setTimeout(function () {
			state = null;
		}, ms);
	};
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gravity = __webpack_require__(8);

var _collision = __webpack_require__(7);

var _index = __webpack_require__(5);

var _randomLines = __webpack_require__(6);

var _randomLines2 = _interopRequireDefault(_randomLines);

var _drawSinWave = __webpack_require__(17);

var _drawSinWave2 = _interopRequireDefault(_drawSinWave);

var _drawBall = __webpack_require__(3);

var _drawBall2 = _interopRequireDefault(_drawBall);

var _drawBees = __webpack_require__(4);

var _drawBees2 = _interopRequireDefault(_drawBees);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasComponent2 = __webpack_require__(0);

var _CanvasComponent3 = _interopRequireDefault(_CanvasComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawSinWave = function (_CanvasComponent) {
	_inherits(DrawSinWave, _CanvasComponent);

	function DrawSinWave() {
		_classCallCheck(this, DrawSinWave);

		var _this = _possibleConstructorReturn(this, (DrawSinWave.__proto__ || Object.getPrototypeOf(DrawSinWave)).call(this));

		_this.isAllowToDraw = true;
		_this.increment = 30;
		_this.position = 0;

		_this.draw();
		return _this;
	}

	_createClass(DrawSinWave, [{
		key: 'draw',
		value: function draw() {

			var sin = Math.sin(this.position);
			var x = this.position * this.increment;

			this.context.beginPath();
			this.context.fillRect(x, this.canvasCY + sin * 100, 2, 2);
			this.position += 0.05;

			if (x >= this.width) {
				// reset or stop
				this.increment += 5;
				this.position = 0;
				//isAllowToDraw = false;
				//this.ctx.clearRect(0, 0, this.width, this.height);
			}

			if (this.isAllowToDraw) {
				requestAnimationFrame(this.draw.bind(this));
			}
		}
	}]);

	return DrawSinWave;
}(_CanvasComponent3.default);

exports.default = DrawSinWave;

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map