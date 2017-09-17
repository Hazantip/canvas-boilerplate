//import * as styles from './App.scss';
//import './App.scss';
//import { TweenMax, TweenLite, Power3 } from 'gsap';
import vector from './Vector';

/*eslint require-jsdoc:0*/
/******* //eslint-disable-line require-jsdoc
 * INFO:
 ********/
// In most computer systems using radians instead degrees;
// 1rad = ~57.3deg --> 360deg = 6.28rad
// Math.PI * 2 = 6.283185307179586rad = 360deg

// conver radians to deg:
//   *  degrees = (radians * 180) / Math.PI
//   *  (6.283185307179586 * 180) / Math.PI; // 360deg
// conver degrees to radians:
//   *  radians = (degrees * Math.PI) / 180

// Math.sin - 0 ->> 1 ->> 0 ->> -1 ->> 0
// Math.cos - 1 ->> 0 ->> -1 ->> 0 ->> 1
// sin and cos is opposite; clockwise (x cos, y sin); anticlockwise (x sin, y cos)
// asin is inverset sin; sin30* = 0.5 & asin0.5 = 30*

// Math.tan is a ratio between opposite(y) and ajascent(x)
// Math.atan is inverset Math.tan!
// const atan = Math.atan((mouseY - cy) / (mouseX - cx))
// const atanDeg = atan * (180/Math.PI);
// const atan2 = Math.atan2(mouseY - cy, mouseX - cx);
// const atan2deg = atan2 * (180/Math.PI);

// -- To Read:
// Canvas API - https://developer.mozilla.org/ru/docs/Web/API/Canvas_API

// -- Interesting Pens:
// codepen.io/thebabydino/pen/VjZpJJ  - svg line to line draw
// codepen.io/kulturfunker/pen/qNRjdd - example with ata &/atan2

// -- Exaples for task: circle wave animation
// codepen.io/DonKarlssonSan/pen/MbQwam - image particles wave
// codepen.io/pshkvsky/pen/ojxGBL       - three.js
// codepen.io/magnificode/pen/JKbedG    - css circles wave
// codepen.io/pixelass/pen/QjGMLX       - svg polygon wave
// codepen.io/enxaneta/pen/OyBWxe       - !!!

/************************
 *    HELPERS
 ************************/

function inRad(num) { // will conver deg to rad
	return num * Math.PI / 180;
}

function inDeg(num) { // will conver rad to deg
	return num * 180 / Math.PI;
}

/*
* Animation function
* {@usage animate(drawCircle, { duration: 1000, to: 270 }); }
**/
/*eslint no-unused-vars:0*/
function animate(draw, paramsNew) {

	const defaultParams = {
		'duration': 1000, // number ms
		'to': null, // number; newVal = to * ( timePassed / duration );
		'steps': 1 // number
	};
	const params = Object.assign({}, defaultParams, paramsNew);

	const start = performance.now();

	requestAnimationFrame(function updateFrame(time) {
		let timePassed = time - start;

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
// Debounce
function debounce(f, ms) {

	let state = null;

	const COOLDOWN = 1;

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

export class CodeMath {
	constructor(props) {
		this.canvas = props.canvas;
		this.run = props.run;
		const init = this.init.bind(this);
		if (this.canvas) {
			init();
			window.addEventListener('resize', debounce(init, 250), false);
		}
	}

	init() {
		this.ctx = this.canvas.getContext('2d');
		this.width = this.canvas.width = document.documentElement.offsetWidth;
		this.height = this.canvas.height = document.documentElement.offsetHeight;
		this.centerX = this.width * 0.5;
		this.centerY = this.height * 0.5;

		const run = this[this.run].bind(this);
		if (run) {
			run();
		} else {
			console.error(`Your props.run is: ${run}`);
		}
	}

	/* Draw lines */
	drawRandomLines() {
		for (let i = 0; i <= 360; i += 0.5) {
			this.ctx.beginPath();
			this.ctx.moveTo(Math.random() * this.width, Math.random() * this.height);
			this.ctx.lineTo(Math.random() * this.width, Math.random() * this.height);
			this.ctx.stroke();
			this.ctx.strokeStyle = `rgb(150,  ${(Math.random() * 255).toFixed(0)}, 150)`;
		}
	}

	/* Draw sin wave */
	drawSinWave() {
		const isAllowToDraw = true;
		let mult = 30;
		let i = 0;

		const anim = () => {
			//console.info(`Math.sin(${i.toFixed(4)}) = ${Math.sin(i).toFixed(4)}, `, mult);
			const sin = Math.sin(i);
			const x = i * mult;

			this.ctx.beginPath();
			this.ctx.fillRect(x, (this.height / 2) + sin * 100, 2, 2);
			i += 0.05;

			if (x >= this.width) {
				mult += 5;
				i = 0;
				//isAllowToDraw = false;
				//this.ctx.clearRect(0, 0, this.width, this.height);
			}

			if (isAllowToDraw) {
				requestAnimationFrame(anim);
			}
		};

		anim();
	}

	/* Friction */
	drawFriction() {
		const { ctx, width, height, centerX, centerY } = this;
		const particle = {
			position: null,
			velocity: null,
			mass: 1,
			radius: 0,
			bounce: -1,
			gravity: 0,
			friction: 1,

			create(x, y, speed, direction, grav) {
				const obj = Object.create(this);
				obj.position = vector.create(x, y);
				obj.velocity = vector.create(0, 0);
				obj.velocity.setLength(speed);
				obj.velocity.setAngle(direction);
				obj.gravity = vector.create(0, grav || 0);
				return obj;
			},

			accelerate(accel) {
				this.velocity.addTo(accel);
			},

			update() {
				this.velocity.multiplyBy(this.friction);
				this.velocity.addTo(this.gravity);
				this.position.addTo(this.velocity);
			},

			angleTo(p2) {
				return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
			},

			distanceTo(p2) {
				const dx = p2.position.getX() - this.position.getX();
				const dy = p2.position.getY() - this.position.getY();

				return Math.sqrt(dx * dx + dy * dy);
			},

			gravitateTo(p2) {
				const grav = vector.create(0, 0);
				const dist = this.distanceTo(p2);

				grav.setLength(p2.mass / (dist * dist));
				grav.setAngle(this.angleTo(p2));
				this.velocity.addTo(grav);
			}
		};

		const p = particle.create(centerX, centerY, 10, Math.random() * Math.PI * 2, 0);
		p.friction = 0.97;
		p.radius = 10;

		const update = () => {
			ctx.clearRect(0, 0, width, height);

			p.update();

			ctx.beginPath();
			ctx.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
			ctx.fill();

			requestAnimationFrame(update);
		};

		update();
	}
}


/*

/!* Draw cirlce
 Example with animate function *!/
function drawCircle() {
	let
			baseAngle	 = 0, // --> 1.5 * Math.PI --> set start point at 12 o'clock
			angle			 = baseAngle,
			speed			 = 1,
			angleInRad;

	function anim(params) {
		const isRunWithParams = (params && params.duration);

		if (isRunWithParams && params.to) {
			angle = params.to * (params.timePassed / params.duration);
		} else {
			angle += speed;
		}

		angleInRad = angle * Math.PI / 180;

		ctx.clearRect(0, 0, width, height);
		ctx.beginPath();
		ctx.arc(centerX, centerY, 100, 0, angleInRad, false); // round from 0PI to 2PI
		ctx.stroke();
		ctx.lineWidth = 10;
		ctx.fillText(angle - baseAngle, centerX - 7, centerY);

		if (!isRunWithParams && angle < 360) {
			requestAnimationFrame(anim);
		}
	}
	return {
		render: anim,
		start: () => { animate(anim, { duration: 1000, to: 270 }) }
	}
}
// drawCircle().render();

/!* Move by circle *!/
function moveByCircle() {
	let
			angle			 = 30, // degree
			angleInRad 	 = angle * Math.PI / 180,
			radius		 = 100,
			speed			 = 0.01; // ~6.28rad full round

	function anim() {
		let x = centerX + Math.cos(angleInRad) * radius;
		let y = centerY + Math.sin(angleInRad) * radius;

		ctx.clearRect(0, 0, width, height);

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false); // circle
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius / 30, 0, Math.PI * 2, false); // center
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(x, y, radius / 10, 0, Math.PI * 2, false); // animated point
		ctx.fill();

		console.info(angleInRad - (1.5 * Math.PI), Math.cos(angleInRad), Math.sin(angleInRad));
		angleInRad += speed;
		requestAnimationFrame(anim);
	}
	return {
		render: anim
	}
}
// moveByCircle().render();

/!* Move by ellipse *!/
function moveEllipse() {
	let
			angle 		= 30,
			angleInRad 	= angle * Math.PI / 180,
			radius 		= 100,
			radiusY 		= 50, // Here is all diff with prev example
			speed 		= 0.05;

	function anim() {
		let x = centerX + Math.cos(angleInRad) * radius;
		let y = centerY + Math.sin(angleInRad) * radiusY;

		ctx.clearRect(0, 0, width, height);

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false); // circle
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(x, y, radius / 10, 0, Math.PI * 2, false); // animated point
		ctx.fill();

		angleInRad += speed;
		requestAnimationFrame(anim);
	}

	return {
		render: anim
	}
}
// moveEllipse().render();

/!* Move like bee - Lissajous Curves *!/
function lissajousCurves() {
	let
			angleX 	= 0, // degree
			angleY 	= 0, // degree
			radiusX 	= width / 4,
			radiusY	= height / 4,
			speedX 	= 0.05,
			speedY 	= 0.007;

	function anim() {
		ctx.clearRect(0, 0, width, height);

		for (var i = 1; i <= 50; i++) {
			// let x = centerX + Math.cos(angleX + (i * 50)) * radiusX;
			let x = centerX + Math.cos(angleX + (i * 50)) * (radiusX * (i / 50));
			let y = centerY + Math.sin(angleY + (i / 25)) * radiusY;
			// let y = centerY + Math.sin(angleY + (i * 25)) * radiusY;

			ctx.beginPath();
			ctx.arc(x, y, 5, 0, Math.PI * 2, false); // animated point
			ctx.fill();

			// console.info('i: ' + i + ' ; x: ' + x);
		}

		angleX = angleX + speedX;
		angleY = angleY + speedY;

		requestAnimationFrame(anim);
	}

	return {
		render: anim
	}
}
// lissajousCurves().render();

/!* Place dots on circle by loop (like clock) *!/
function placeDotsOnCircle() {
	let
			angle 		= 0, // degree
			radius 		= 100,
			numObjects 	= 12,
			slice 		= 2 * Math.PI / numObjects; // like 360deg / numObjects

	return {
		render: function() {
			ctx.clearRect(0, 0, width, height);

			for (var i = 1; i <= numObjects; i++) {
				let curAngle = i * slice;
				let x = centerX + Math.cos(curAngle) * radius;
				let y = centerX + Math.sin(curAngle) * radius;

				ctx.beginPath();
				ctx.arc(x, y, 5, 0, Math.PI * 2, false); // animated point
				ctx.stroke();
			}
		}
	}
};
// placeDotsOnCircle().render();

/!* Draw line by circle like clock *!/
function drawLineByCircle() {
	let
			x,
			y,
			degAngle 	= 0,
			radAngle,
			radius	 	= 200;
	// render();
	// animate(render, { duration: 5000 });

	return {
		render: function (params) {

			// ctx.clearRect(0, 0, width, height);
			degAngle++
			// degAngle = params.to * (params.timePassed / params.duration);

			radAngle = degAngle * Math.PI / 180;
			x = centerX + Math.cos(radAngle) * radius;
			y = centerY + Math.sin(radAngle) * radius;

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(x, y);
			ctx.stroke();
		},
		animate: function(duration) {
			animate(this.render, { duration: duration || 5000 });
		}
	}
}
// drawLineByCircle().animate();

/!* tangents; rotate arrow to mouse position! episode 6; *!/
function rotateArrowToMousePosition() {
	let x,
			y,
			angle	 = 0,
			arrowX	 = centerX,
			arrowY	 = centerY,
			dx		 = 0,
			dy		 = 0, // distance between mouse and arrow
			a			 = 0;

	function onMouseMove(e) {
		dx = e.clientX - arrowX;
		dy = e.clientY - arrowY;
		angle = Math.atan2(dy, dx);
		//console.log(inDeg(angle).toFixed(0), e.clientX, e.clientY, dx, dy);
	}
	function drawArrow() {
		ctx.save();
		ctx.clearRect(0, 0, width, height);

		// -- simple moving arrow by circle
		// arrowX = centerX + Math.cos(a) * width * .4;
		// arrowY = centerY + Math.sin(a) * height * .4;
		// a += .01;

		ctx.translate(arrowX - dx, arrowY - dy); // inver pos to mouse pos;(disable moving)
		// ctx.translate(arrowX, arrowY); // just rotate
		ctx.rotate(angle);

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(40, 0);
		ctx.lineTo(20, -10);
		ctx.moveTo(40, 0);
		ctx.lineTo(20, 10);
		ctx.stroke();
		ctx.restore();

		requestAnimationFrame(drawArrow);
	}
	return {
		render: function() {
			canvas.addEventListener('mousemove', onMouseMove, false);
			drawArrow();
		}
	};
}
// rotateArrowToMousePosition().render();

/!**************
 --- VECTOR ----
 ***************!/
let vector = {
	_x: 1,
	_y: 0,

	create: function(x, y) {
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	},

	setX: function(value) {
		this._x = value;
	},

	getX: function() {
		return this._x;
	},

	setY: function(value) {
		this._y = value;
	},

	getY: function() {
		return this._y;
	},

	setAngle: function(angle) {
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	setLength: function(length) {
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	add: function(v2) {
		return vector.create(this._x + v2.getX(), this._y + v2.getY());
	},

	subtract: function(v2) {
		return vector.create(this._x - v2.getX(), this._y - v2.getY());
	},

	multiply: function(val) {
		return vector.create(this._x * val, this._y * val);
	},

	divide: function(val) {
		return vector.create(this._x / val, this._y / val);
	},

	addTo: function(v2) {
		this._x += v2.getX();
		this._y += v2.getY();
	},

	subtractFrom: function(v2) {
		this._x -= v2.getX();
		this._y -= v2.getY();
	},

	multiplyBy: function(val) {
		this._x *= val;
		this._y *= val;
	},

	divideBy: function(val) {
		this._x /= val;
		this._y /= val;
	}
};

const v1 = vector.create(5, 10);
const v2 = vector.create(25, 10);

console.info(v1.getLength(), (v2.getAngle() * 180) / Math.PI);


// EXPERIMENTAL
(function() {
	let
			x,
			y,
			degAngle	 = 0,
			radAngle,
			radius	 = 200,
			speed		 = 2;
	// render();
	// animate(render, { duration: 5000 });
	function render(params) {

		ctx.clearRect(0, 0, width, height);

		degAngle += speed;
		radAngle = degAngle * Math.PI / 180;

		for (var i = 0; i < 10; i++) {
			x = Math.tan(radAngle) * (radius * i / 10);
			y = Math.tan(radAngle) * (radius * i / 10);

			ctx.beginPath();
			ctx.arc(x, y, 10, 0, Math.PI * 2, false);
			ctx.stroke();
		}
	}
})();*/

// requestAnimationFrame
//	window.requestAnimationFrame =
//		window.requestAnimationFrame ||
//		window.mozRequestAnimationFrame ||
//		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
