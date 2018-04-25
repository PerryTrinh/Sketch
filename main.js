var sketch, ctx, eraser, pencil, clear, selectedType, menuBarBackground; //To be initialized when creating canvas
var prevX, prevY; //To make continuous line when mousekey is held down
var mouseDown = 0; //Keeping track of when mousekey is pressed/held down
var drawSize = 1; //Size of pencil
var color = "#000000"; //Default state = draw
var selectedColor = "#F0F0F0";

//Set up canvas dimensions and event listeners
function createCanvas() {
	sketch = document.getElementById("sketch");
	ctx = sketch.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	sketch.addEventListener("mousedown", onDown, false);
	sketch.addEventListener("mousemove", onMove, false);
	sketch.addEventListener("mouseup", onUp, false);

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

function changeSelected(selected) {
	selectedType.style.background = menuBarBackground;
	selectedType = selected;
	selectedType.style.background = selectedColor;
}

function toErase(event) {
	color = "#FFFFFF";
	drawSize = 30;
	changeSelected(event.srcElement);
	/*selectedType.style.background = menuBarBackground;
	selectedType = eraser;
	selectedType.style.background = selectedColor;*/
}

function toPencil(event) {
	color = "#000000";
	drawSize = 1;
	changeSelected(event.srcElement);
	/*selectedType.style.background = menuBarBackground;
	selectedType = pencil;
	selectedType.style.background = selectedColor;*/
}

function clearCanvas(event) {
	ctx.clearRect(0, 0, sketch.width, sketch.height);
	changeSelected(pencil); //After a canvas clear, default to pencil
	/*selectedType.style.background = menuBarBackground;
	selectedType = pencil;
	selectedType.style.background = selectedColor;*/
}

