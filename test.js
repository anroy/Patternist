function fillCanvas(width, height) {
	var canvas = document.getElementById("MainCanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "red";
	ctx.fillRect(10, 10, width, height);

	ctx.moveTo(300, 200);
	ctx.lineTo(400, 400);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(95, 400, 40, 0, 2 * Math.PI);
	ctx.stroke();

	// Create gradient
	var grd = ctx.createLinearGradient(0, 0, 200, 0);
	grd.addColorStop(0, "blue");
	grd.addColorStop(1, "white");

	// Fill with gradient
	ctx.fillStyle = grd;
	ctx.fillRect(10, 200, 150, 80);
}