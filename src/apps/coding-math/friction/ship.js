import CanvasComponent from '../CanvasComponent';
import Particle from './particle';
import Vector from './vector';

class Ship extends CanvasComponent {
	constructor() {
		super();

		this.turningLeft = false;
		this.turningRight = false;
		this.thrusting = false;

		document.body.addEventListener('keydown', this._onKeyDown.bind(this));
		document.body.addEventListener('keyup', this._onKeyUp.bind(this));

		this.createShip();
		this.update();
	}
	createShip() {
		this.ship = new Particle(this.width / 2, this.height / 2, 0, 0);
		this.thrust = new Vector(0, 0);
		this.angle = 0;

		this.ship.friction = 0.99;
	}
	_onKeyDown(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				this.thrusting = true;
				break;
			case 37: // left
				this.turningLeft = true;
				break;
			case 39: // right
				this.turningRight = true;
			default:
				break;
		}
	}
	_onKeyUp(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				this.thrusting = false;
				break;
			case 37: // left
				this.turningLeft = false;
				break;
			case 39: // right
				this.turningRight = false;
			default:
				break
		}
	}
	update() {
		this.context.clearRect(0, 0, this.width, this.height);

		if(this.turningRight) {
			this.angle += .05;
		}
		if(this.turningLeft) {
			this.angle -= .05;
		}

		if(this.thrusting) {
			this.thrust.setLength(.1);
		}
		else {
			this.thrust.setLength(0);
		}
		this.thrust.setAngle(this.angle);

		this.ship.accelerate(this.thrust);
		this.ship.update();

		if(this.ship.position.getX() > this.width) {
			this.ship.position.setX(0);
		}
		if(this.ship.position.getX() < 0) {
			this.ship.position.setX(this.width);
		}
		if(this.ship.position.getY() > this.height) {
			this.ship.position.setY(0);
		}
		if(this.ship.position.getY() < 0) {
			this.ship.position.setY(this.height);
		}

		this.context.save();

		this.context.translate(this.ship.position.getX(), this.ship.position.getY());
		this.context.rotate(this.angle);
		this.context.beginPath();
		this.context.moveTo(10, 0);
		this.context.lineTo(-10, -7);
		this.context.lineTo(-10, 7	);
		this.context.lineTo(10, 0);
		if(this.thrusting) {
			this.context.moveTo(-10, 0);
			this.context.lineTo(-18, 0);
		}
		this.context.stroke();

		this.context.restore();

		requestAnimationFrame(this.update.bind(this));
	}
}

export default Ship;