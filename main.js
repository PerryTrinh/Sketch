var sketch, ctx;
var mouseDown = 0;

function createCanvas() {
	sketch = document.getElementById("sketch");
	ctx = sketch.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	sketch.addEventListener("mousedown", onDown, false);
	sketch.addEventListener("mousemove", onMove, false);
	sketch.addEventListener("mouseup", onUp, false);
}

function onDown(event) {
	mouseDown = 1;
	draw(event);
}

function onMove(event) {
	if (mouseDown == 1) {
		draw(event);
	}
}

function onUp() {
	mouseDown = 0;
}

function draw(event) {
	var position = getMousePosition(sketch, event);
	
	ctx.beginPath();
	ctx.arc(position.x, position.y, 3, 0, Math.PI * 2, 0);
	ctx.fill();
}

function getMousePosition(sketch, event) {
	var prePosition = sketch.getBoundingClientRect();
	var scaleX = sketch.width / prePosition.width;
	var scaleY = sketch.height / prePosition.height;

	return {
		x: (event.clientX - prePosition.left) * scaleX,
		y: (event.clientY - prePosition.top) * scaleY
	};
}

