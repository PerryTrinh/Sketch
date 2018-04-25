var sketch;
var ctx;

function createCanvas() {
	sketch = document.getElementById("sketch");
	ctx = sketch.getContext("2d");
	sketch.addEventListener("mousemove", draw, false);
}

function draw(event) {
	var x = event.x - sketch.offsetLeft;
	var y = event.y - sketch.offsetTop;
	
	ctx.beginPath();
	ctx.arc(x, y, 3, 0, Math.PI * 2, 0);
	ctx.fill();

}
