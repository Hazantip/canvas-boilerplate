import CanvasComponent from '../CanvasComponent';
import Particle from './particle';
import { inDeg, inRad } from '../../utils';

class Friction extends CanvasComponent {
	constructor() {
		super();

		this.createParticle();
		this.update();
	}
	createParticle() {
		this.p = new Particle(this.width / 2, this.height / 2, 10, Math.random() * Math.PI * 2);
		this.p.friction = 0.97;
		this.p.radius = 10;
	}
	update() {
		this.context.clearRect(0, 0, this.width, this.height);

		this.p.update();
		//console.log( inDeg(this.p.velocity.getAngle()) );

		this.context.beginPath();
		this.context.arc(this.p.position.getX(), this.p.position.getY(), this.p.radius, 0, Math.PI * 2, false);
		this.context.fill();

		requestAnimationFrame(this.update.bind(this));
	}
}

export default Friction;