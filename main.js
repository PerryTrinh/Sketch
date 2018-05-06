var sketch, ctx, eraser, pencil, clear, selectedType, menuBarBackground; //To be initialized when creating canvas
var tempSketch, tempCtx; //Copies of sketch to save during window resizes
var prevX, prevY; //To make continuous line when mousekey is held down
var mouseDown = false; //Keeping track of when mousekey is pressed/held down
var drawSize = 1; //Size of pencil
var color = "#000000"; //Default state = draw
var selectedColor = "#F0F0F0";

//Set up canvas dimensions and event listeners
function createCanvas() {
	window.addEventListener("resize", resizeCanvas);
	sketch = document.getElementById("sketch");
	ctx = sketch.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	sketch.addEventListener("mousedown", onDown, false);
	sketch.addEventListener("mousemove", onMove, false);
	sketch.addEventListener("mouseup", onUp, false);

	tempSketch = document.createElement("canvas");
	tempCtx = tempSketch.getContext("2d");
	tempCtx.canvas.width = ctx.canvas.width;
	tempCtx.canvas.height = ctx.canvas.height;

	pencil = document.getElementById("Pencil");
	pencil.style.background = selectedColor; 
	pencil.addEventListener("click", toPencil);

	selectedType = pencil;

	eraser = document.getElementById("Eraser");
	eraser.addEventListener("click", toErase);

	clear = document.getElementById("Clear");
	clear.addEventListener("click", clearCanvas);

	menuBarBackground = document.getElementById("menuBar").style.background;
}

//For when user resizes browser, need to preserve prior sketchings
function resizeCanvas() {
	//Create a copy of current sketch onto tempCtx
	tempCtx.drawImage(sketch, 0, 0);

	//If resize is stretching in a given direction, resize sketch
	if (window.innerWidth > ctx.canvas.width) {
		ctx.canvas.width = window.innerWidth;
	}

	if (window.innerHeight > ctx.canvas.height) {
		ctx.canvas.height = window.innerHeight;
	}
	ctx.drawImage(tempSketch, 0, 0);
}

function onDown(event) {
	mouseDown = true;
	draw(event);
}

function onMove(event) {
	if (mouseDown) {
		draw(event);
	}
}

function onUp() {
	mouseDown = false;
	//Reset prevX and prevY so that end point of this mousedown will not connect with start point of next mousedown
	prevX = 0;
	prevY = 0;
}

function draw(event) {
	var position = getMousePosition(sketch, event);
	var x = position.x, y = position.y;

	/* Meant to connect the draw dots as dots only refresh at a certain rate
	 * Just draws a line between draw dots to appear as if it is continuous
	 */
	if (prevX != 0 && prevY != 0) {
		if (x != prevX || y != prevY) {
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = drawSize * 2; //Line width too small w/ just drawSize, 2x is magic #?
			ctx.moveTo(prevX, prevY);
			ctx.lineTo(x, y);
			ctx.stroke(); //Use .stroke() not .fill() to connect
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

function changeSelected(selected) {
	selectedType.style.background = menuBarBackground;
	selectedType = selected;
	selectedType.style.background = selectedColor;
}

function toErase(event) {
	color = "#FFFFFF";
	drawSize = 30;
	changeSelected(event.srcElement);
}

function toPencil(event, usePencil=0) {
	color = "#000000";
	drawSize = 1;
	//If usePencil, event is clicking clear so need to handle case
	if (usePencil == 1) {
		changeSelected(pencil);
	} else {
		changeSelected(event.srcElement);
	}
}

function clearCanvas(event) {
	ctx.clearRect(0, 0, sketch.width, sketch.height);
	tempCtx.clearRect(0, 0, tempSketch.width, tempSketch.height);
	toPencil(event, 1); //After a canvas clear, default to pencil
}

