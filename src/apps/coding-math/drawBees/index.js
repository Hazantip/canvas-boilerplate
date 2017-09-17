import CanvasComponent from '../CanvasComponent';

class DrawBees extends CanvasComponent {
	constructor(type) {
		super();

		this.bees = [];
		this.numBees = 50;

		this.create();
	}
	create() {
		const Bee = (function() {
			this.init = function(index = -1) {
				this.angleX = Math.random() * Math.PI * 2;
				this.angleY = Math.random() * Math.PI * 2;
				this.speedX = Math.random() * .1 - .05;
				this.speedY = Math.random() * .1 - .05;
				this.radius = 100 + Math.random() * 100;
				this.index = index;
			};

			this.update = function (ctx, w, h) {
				const x = Math.cos(this.angleX) * this.radius;
				const y = Math.sin(this.angleY) * this.radius;
				this.angleX += this.speedX;
				this.angleY += this.speedY;

				ctx.beginPath();
				ctx.arc(w / 2 + x, h / 2 + y, 2, 0, Math.PI * 2, false);
				ctx.fill();
			};

			this.init();
		});

		for(let i = 0; i < this.numBees; i += 1) {
			this.bees.push(new Bee(i));
		}

		this.draw();
	}
	draw() {
		this.context.clearRect(0, 0, this.width, this.height);
		for(let i = 0; i < this.numBees; i += 1) {
			this.bees[i].update(this.context, this.width, this.height);
		}
		requestAnimationFrame(this.draw.bind(this));
	}
}

export default DrawBees;