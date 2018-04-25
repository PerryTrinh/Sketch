//TODO: add eraser and pencil functionality

var sketch, ctx, eraser, pencil; //To be initialized when creating canvas
var prevX, prevY; //To make continuous line when mousekey is held down
var mouseDown = 0; //Keeping track of when mousekey is pressed/held down
var drawSize = 1; //Size of pencil
var color = "#000000";

//Set up canvas dimensions and event listeners
function createCanvas() {
	sketch = document.getElementById("sketch");
	ctx = sketch.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	sketch.addEventListener("mousedown", onDown, false);
	sketch.addEventListener("mousemove", onMove, false);
	sketch.addEventListener("mouseup", onUp, false);

	eraser = document.getElementById("Eraser");
	eraser.addEventListener("click", toErase);

	pencil = document.getElementById("Pencil");
	pencil.addEventListener("click", toPencil);
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
	//Reset prevX and prevY so that end point of this mousedown will not connect with start point of next mousedown
	prevX = 0;
	prevY = 0;
}

function draw(event) {
	var position = getMousePosition(sketch, event);
	var x = position.x, y = position.y;

	/* Meant to connect the draw dots if user moves cursor faster than draw can "refresh"
	 * Just draw a line between the previous point to the current cursor point 
	 */
	if (prevX != 0 && prevY != 0) {
		if (x != prevX || y != prevY) {
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = drawSize * 2; //Line width too small, 2x is magic #?
			ctx.moveTo(prevX, prevY);
			ctx.lineTo(x, y);
			ctx.stroke(); //stroke vs fill to connect
		}
	}

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, drawSize, 0, Math.PI * 2, 0);
	ctx.closePath();
	ctx.fill();
	prevX = x;
	prevY = y;
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

function toErase() {
	color = "#FFFFFF";
	drawSize = 10;
}

function toPencil() {
	color = "#000000";
	drawSize = 1;
}
