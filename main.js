function drawCanvas(width, height) {

	// Get user parameters
	var userColor = document.getElementById("UserColor").value;

	// Initialize canvas variables
	var canvas = document.getElementById("MainCanvas");
	var ctx = canvas.getContext("2d");

	// Draw to context
	ctx.fillStyle = userColor;
	ctx.fillRect(10, 10, 200, 200);
}
