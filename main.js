function drawCanvas() {
	//alert("Enter drawCanvas");

	// Initialize canvas variables
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	var userShape;
	var userSize;

	// Get user parameters
	userShape = el("UserShape").value;
	userSize = parseInt(el("UserSize").value);
	ctx.fillStyle = el("UserColor").value;
	ctx.strokeStyle = el("UserColor").value;

	switch(userShape)
	{
		case "square":
			drawSquare(canvas, ctx, userSize);
			break;

		case "circle":
			drawCircle(canvas, ctx, userSize);
			break;

		case "triangle":
			drawTriangle(canvas, ctx, userSize);
			break;
	
		default:
			break;
	}
}

function drawSquare(canvas, ctx, size) {
	//alert("Enter drawSquare");

	var horizCnt = canvas.width / (size+10);
	var vertCnt = canvas.height / (size+10);
	var i, j;
	var xPos, yPos;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = (size+10) * i;
			yPos = (size+10) * j;
			ctx.fillRect(xPos, yPos, size, size);
		}
	}
}

function drawTriangle(canvas, ctx, size) {
	//alert("Enter drawTriangle");

	var horizCnt = canvas.width / size;
	var vertCnt = canvas.height / size;
	var i, j;
	var xPos, yPos;
	var coordText;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = size * i;
			yPos = size * j;
			ctx.beginPath();
			ctx.moveTo(xPos + (size * 0.5), yPos);	// Start at middle top
			ctx.lineTo(xPos, yPos + size);			// Draw to left bottom
			ctx.lineTo(xPos + size, yPos + size);	// Draw to right bottom
			ctx.lineTo(xPos + (size * 0.5), yPos);	// Draw back to middle top
			ctx.closePath();
			ctx.stroke();
			coordText = j.toString() + "," + i.toString();
			ctx.fillText(coordText, xPos + (size * 0.4), yPos + (size * 0.7));
		}
	}
}

function drawCircle(canvas, ctx, radius) {
	//alert("Enter drawCircle");
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
	//alert("Entered drawImage");
	angle11 = parseInt(el("angle11").value);
	angle12 = parseInt(el("angle12").value);
	angle21 = parseInt(el("angle21").value);
	angle22 = parseInt(el("angle22").value);

	var horizCnt = canvas.width / img.width;
	var vertCnt = canvas.height / img.height;
	var i, j;
	var xPos, yPos;
	var rotationAngle;
	var iMod, jMod;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = img.width * i;
			yPos = img.width * j;

			iMod = i % 2;
			jMod = j % 2;

			if( jMod == 0 ) {
				if( iMod == 0 ) {
					rotationAngle = angle11;
				}
				else{
					rotationAngle = angle12;
				}
			}
			else{
				if( iMod == 0 ) {
					rotationAngle = angle21;
				}
				else{
					rotationAngle = angle22;
				}
			}

			if(rotationAngle == 0) {
				ctx.drawImage(img, xPos, yPos);
				//debugAnnotate(ctx, i, j, xPos + (img.width * 0.4), yPos + (img.height * 0.2));
			}
			else{
				ctx.save();
	
				switch(rotationAngle)
				{
					case 90:
						ctx.translate(img.width * (i+1), img.width * (j));
						break;
			
					case 180:
						ctx.translate(img.width * (i+1), img.width * (j+1));
						break;
			
					case 270:
						ctx.translate(img.width * (i), img.width * (j+1));
						break;
				
					default:
						break;
				}
			
				ctx.rotate(Math.PI * (rotationAngle/180.0));
				ctx.drawImage(img, 0, 0);
				//debugAnnotate(ctx, i, j, (img.width * 0.4), (img.height * 0.2));

				ctx.restore();

			}

		}
	}
}

function debugAnnotate(ctx, i, j, xPos, yPos) {
	ctx.font = "bold 16px Verdana";
	ctx.fillStyle = "red";
	coordText = j.toString() + "," + i.toString();
	ctx.fillText(coordText, xPos, yPos);
}

function drawImage_Loop(canvas, ctx, img) {

	angle11 = parseInt(el("angle11").value);

	var horizCnt = canvas.width / img.width;
	var vertCnt = canvas.height / img.height;
	var i, j;
	var xPos, yPos;
	var coordText;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = img.width * i;
			yPos = img.height * j;

			if(angle11 > 0) {
				ctx.save();

				//ctx.setTransform(1,0,0,1,0,0);
				ctx.translate( xPos + (0.5 * img.width), yPos + (0.5 * img.height));
				ctx.rotate(Math.PI/2);
				ctx.drawImage(img, xPos, yPos);

				ctx.font = "bold 16px Verdana";
				ctx.fillStyle = "red";
				coordText = j.toString() + "," + i.toString();
				ctx.fillText(coordText, xPos + (img.width * 0.4), yPos + (img.height * 0.2));

				ctx.restore();
			}
			else {
				ctx.drawImage(img, xPos, yPos);
				ctx.font = "bold 16px Verdana";
				ctx.fillStyle = "red";
				coordText = j.toString() + "," + i.toString();
				ctx.fillText(coordText, xPos + (img.width * 0.4), yPos + (img.height * 0.2));
			}
		}
	}
}

function clearCanvas() {
	// Initialize canvas variables
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	// clear
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// clear UserFile so that next selection fires a change event
	el("UserFile").value = "";
}

function el(id) {return document.getElementById(id);}
