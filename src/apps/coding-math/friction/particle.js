import Vector from './vector';

class Particle {
	constructor(x, y, speed, direction, grav) {
		this.position = null;
		this.velocity = null;
		this.mass = 1;
		this.radius = 0;
		this.bounce = -1;
		this.friction = 1;
		this.gravity = 0;

		this.create(x, y, speed, direction, grav);
	}
	create(x, y, speed, direction, grav) {
		this.position = new Vector(x, y);
		this.velocity = new Vector(0, 0);
		this.velocity.setLength(speed);
		this.velocity.setAngle(direction);
		this.gravity = new Vector(0, grav || 0);
	}
	accelerate(accel) {
		this.velocity.addTo(accel);
	}
	update() {
		this.velocity.multiplyBy(this.friction);
		this.velocity.addTo(this.gravity);
		this.position.addTo(this.velocity);
	}
	angleTo(p2) {
		return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
	}
	distanceTo(p2) {
		const dx = p2.position.getX() - this.position.getX();
		const dy = p2.position.getY() - this.position.getY();

		return Math.sqrt(dx * dx + dy * dy);
	}
	gravitateTo(p2) {
		const grav = new Vector(0, 0);
		const dist = this.distanceTo(p2);

		grav.setLength(p2.mass / (dist * dist));
		grav.setAngle(this.angleTo(p2));
		this.velocity.addTo(grav);
	}
}

export default Particle;