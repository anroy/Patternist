function drawCanvas() {
	// Initialize canvas variables
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	var userShape;
	var userWidth, width;
	var userHeight, height;

	// Get user parameters
	userShape = el("UserShape").value;
	userWidth = el("UserWidth").value;
	width = parseInt(userWidth);
	ctx.fillStyle = el("UserColor").value;

	switch(userShape)
	{
		case "rectangle":
			userHeight = el("UserHeight").value;
			height = parseInt(userHeight);
			drawRectangle(canvas, ctx, width, height);
			break;

		case "circle":
			drawCircle(canvas, ctx, width);
			break;
	
		default:
			break;
	}
}

function drawRectangle(canvas, ctx, width, height) {
	var horizCnt = canvas.width / (width+10);
	var vertCnt = canvas.height / (height+10);
	var i, j;
	var xPos, yPos;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = (width+10) * i;
			yPos = (height+10) * j;
			ctx.fillRect(xPos, yPos, width, height);
		}
	}
}

function drawCircle(canvas, ctx, radius) {
	var diameter = radius * 2;
	var horizCnt = canvas.width / (diameter+10);
	var vertCnt = canvas.height / (diameter+10);
	var i, j;
	var xPos, yPos;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = radius + (diameter+10) * i;
			yPos = radius + (diameter+10) * j;
			ctx.beginPath();
			ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
}

function readImage() {
	//alert("Entered readImage");
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	if ( this.files && this.files[0] ) {
		var FR= new FileReader();
		FR.onload = function(e) {
		var img = new Image();
		img.addEventListener("load", function() {
			drawImage(canvas, ctx, img);
		});
		img.src = e.target.result;
		};
		FR.readAsDataURL( this.files[0] );
	}
}

function drawImage(canvas, ctx, img) {
	var horizCnt = canvas.width / img.width;
	var vertCnt = canvas.height / img.height;
	var i, j;
	var xPos, yPos;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = img.width * i;
			yPos = img.height * j;
			ctx.drawImage(img, xPos, yPos);
		}
	}
}

function clearCanvas() {
	// Initialize canvas variables
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	// clear
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function el(id) {return document.getElementById(id);}
