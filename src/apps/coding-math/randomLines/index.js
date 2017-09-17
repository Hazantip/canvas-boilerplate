import CanvasComponent from '../CanvasComponent';

class DrawRandomLines extends CanvasComponent {
	constructor() {
		super();

		this.draw();
	}
	draw() {
		for (let i = 0; i <= 360; i += 0.5) {
			this.context.beginPath();
			this.context.moveTo(Math.random() * this.width, Math.random() * this.height);
			this.context.lineTo(Math.random() * this.width, Math.random() * this.height);
			this.context.stroke();
			this.context.strokeStyle = `rgb(150,  ${(Math.random() * 255).toFixed(0)}, 150)`;
		}
	}
}

export default DrawRandomLines;