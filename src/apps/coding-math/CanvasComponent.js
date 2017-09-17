class CanvasComponent {
	constructor(canvas) {
		this.canvas = canvas || document.getElementById("canvas");
		this.context = this.canvas.getContext("2d");
		this.width = this.canvas.width = window.innerWidth;
		this.height = this.canvas.height = window.innerHeight;
		this.canvasCX = this.width / 2;
		this.canvasCY = this.height / 2;
	}
}

export default CanvasComponent;


