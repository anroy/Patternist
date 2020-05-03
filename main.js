function drawCanvas(width, height) {

	// Get user parameters
	var userShape = document.getElementById("UserShape").value;

	var userWidth = document.getElementById("UserWidth").value;
	var drawWidth = parseInt(userWidth);
	var userHeight = document.getElementById("UserHeight").value;
	var drawHeight = parseInt(userHeight);

	var userColor = document.getElementById("UserColor").value;

	// Initialize canvas variables
	var canvas = document.getElementById("MainCanvas");
	var ctx = canvas.getContext("2d");

	// Draw to context
	ctx.fillStyle = userColor;

	var horizCnt = 600 / (drawWidth+10) - 1;
	var vertCnt = 600 / (drawHeight+10) - 1;
	var i, j;
	var xPos, yPos;

	if( userShape == "circle") {
		var radius = drawWidth;
		var diameter = radius * 2;

		//ctx.beginPath();
		//ctx.arc(50, 50, 80, 0, 2 * Math.PI);
		//ctx.fill();
		//ctx.stroke();

		for (j = 0; j < vertCnt; j++) {
			for (i = 0; i < horizCnt; i++) {
				xPos = 10 + ((diameter+10) * i);
				yPos = 10 + ((diameter+10) * j);
				ctx.beginPath();
				ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
				ctx.fill();
			}
		}

	}
	else if( userShape == "rectangle") {

		for (j = 0; j < vertCnt; j++) {
			for (i = 0; i < horizCnt; i++) {
				xPos = 10 + ((drawWidth+10) * i);
				yPos = 10 + ((drawHeight+10) * j);
				ctx.fillRect(xPos, yPos, drawWidth, drawHeight);
			}
		}
	}

}
