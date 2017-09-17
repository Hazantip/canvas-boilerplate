import CanvasComponent from '../CanvasComponent';

class DrawSinWave extends CanvasComponent {
	constructor() {
		super();

		this.isAllowToDraw = true;
		this.increment = 30;
		this.position = 0;

		this.draw();
	}
	draw() {

		const sin = Math.sin(this.position);
		const x = this.position * this.increment;

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
}

export default DrawSinWave;