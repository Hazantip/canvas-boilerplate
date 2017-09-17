export function inRad(num) { // will conver deg to rad
	return num * Math.PI / 180;
}

export function inDeg(num) { // will conver rad to deg
	return num * 180 / Math.PI;
}

/*
* Animation function
* {@usage - animate(drawCircle, { duration: 1000, to: 270 }); }
**/
export function animate(draw, paramsNew) {

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

/*
* Debounce
* */
export function debounce(f, ms) {

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