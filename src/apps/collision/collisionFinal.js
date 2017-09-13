/**
 * Created by hazantip on 12/09/17.
 *
 * TODO: triangle collision detection
 */


const collisionFinal = function() {

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

	var colors = [
		'#2185C5',
		'#7ECEFD',
		'#FFF6E5',
		'#FF7F66'
	];


// Event Listeners
	addEventListener("mousemove", function(event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	});

	addEventListener("resize", function() {
		canvas.width = innerWidth;
		canvas.height = innerHeight;

		init();
	});


// Utility Functions
	function randomIntFromRange(min,max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function getDistance({ x1, y1, x2, y2 }) {
		const xDistance = x2 - x1;
		const yDistance = y2 - y1;

		// NOTE: pythagorean theorem
		return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	}

// Objects
	function Circle({ x, y, radius, color }) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;

		this.update = function() {

			this.draw();
		};

		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
			c.closePath();
		};
	}


	let circle1;
	let circle2;
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

		let distance = getDistance({ x1: circle1.x, y1: circle1.y, x2: circle2.x, y2: circle2.y });
		if (distance < (circle1.radius + circle2.radius)) {
			circle1.color = 'tomato'
		} else {
			circle1.color = 'deepskyblue';
		}

		//c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	}

	init();
	animate();

};

export default collisionFinal;
