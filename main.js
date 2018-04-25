var sketch;
var ctx;

function createCanvas() {
	sketch = document.getElementById("sketch");
	ctx = sketch.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	window.addEventListener("mousemove", draw, false);
}

function draw(event) {
	var position = getMousePosition(sketch, event);
	//var x = event.x - sketch.offsetLeft;
	//var y = event.y - sketch.offsetTop;
	
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

