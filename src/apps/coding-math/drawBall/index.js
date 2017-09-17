import CanvasComponent from '../CanvasComponent';

class DrawBall extends CanvasComponent {
	constructor(type) {
		super();

		this.type = type || 'round';

		this.offset = this.height * 0.3;
		this.angle = 0;
		this.baseRadius = 50;
		this.baseAlpha = 0.5;
		this.speed = 0.035;

		this.draw();
	}
	draw() {
		let x, y;
		
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

		let radius = this.baseRadius + Math.sin(this.angle) * 25;
		let alpha = this.baseAlpha + Math.sin(this.angle) * 0.25;

		this.context.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, Math.PI * 2 * radius, false); // x, y, radius, startingAngle, endingAngle, antiClockwise
		this.context.fill();

		this.angle += this.speed;

		requestAnimationFrame(this.draw.bind(this));
	}
}

export default DrawBall;