var shapeChoice = new Shape();
var colorChoice = new Color();
var fontChoice = new Font();
var aspectChoice = new Aspect();

function onFontLoaded(font) {
	window.font = font;
	renderText();
}

function renderText() {
	if (fontChoice.isBrux()) {
		fontFileName = 'fonts/bruxFont.otf';
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = true;
		document.getElementById('fireAspect').disabled = true;
		document.getElementById('letterAspect').disabled = true;
	}else if (fontChoice.isGaramond()) {
		fontFileName = 'fonts/garamondFont.ttf';
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = false;
		document.getElementById('fireAspect').disabled = true;
		document.getElementById('letterAspect').disabled = false;
	}else if (fontChoice.isKust()) {
		fontFileName = 'fonts/kustFont.otf';
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = true;
		document.getElementById('fireAspect').disabled = false;
		document.getElementById('letterAspect').disabled = false;
	}else if (fontChoice.isWalter()) {
		fontFileName = 'fonts/walterFont.ttf';
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = true;
		document.getElementById('fireAspect').disabled = true;
		document.getElementById('letterAspect').disabled = false;
	}else if (fontChoice.isBaskerville()) {
		fontFileName = 'fonts/baskervilleFont.ttf';
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = false;
		document.getElementById('fireAspect').disabled = false;
		document.getElementById('letterAspect').disabled = false;
	}else if (fontChoice.isCooperBlack()) {
		fontFileName = 'fonts/cooperFont.ttf';
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = false;
		document.getElementById('fireAspect').disabled = false;
		document.getElementById('letterAspect').disabled = false;
	}else if (fontChoice.isLondon()) {
		fontFileName = 'fonts/londonFont.ttf';
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = false;
		document.getElementById('fireAspect').disabled = false;
		document.getElementById('letterAspect').disabled = false;
	};

	//if font loaded with button
	if (fontChoice.isBrux() == false
	   && fontChoice.isGaramond() == false
	   &&fontChoice.isKust() == false
	   && fontChoice.isWalter() == false
	   && fontChoice.isBaskerville() == false
	   && fontChoice.isCooperBlack() == false
	   && fontChoice.isLondon() == false) {
		
		document.getElementById('circleOrderAspect').disabled = false;
		document.getElementById('circleDisorderAspect').disabled = false;
		document.getElementById('lineOrderAspect').disabled = false;
		document.getElementById('lineDisorderAspect').disabled = false;
		document.getElementById('lineAngleAspect').disabled = false;
		document.getElementById('fireAspect').disabled = false;
		document.getElementById('letterAspect').disabled = false;
		visualTreatment(font);

	}else{ //if font choosed in the list
		opentype.load(fontFileName, function (err, font) {
			if (err) {
				alert('Font could not be loaded: ' + err);
			} else {
				document.getElementById('file').value = '';
				visualTreatment(font);
			}
		});
	};
}

function visualTreatment(font){
	var textToRender = document.getElementById('text-field').value;
	var ctx = document.getElementById('text-render').getContext('2d');
	var myText = document.getElementById('text-render').getContext('2d');
	ctx.clearRect(0,0,1020,290);
	var compteur = 0;
	var letterY = 200;

	for (var i in textToRender) {

		// DEFINE POSITION X & Y OF EACH LETTER
		var letterX = 80*compteur;
		if (letterX > 840) {
			letterY = letterY+160;
			compteur = 0;
		};
		compteur++;

		// GET PATH OF EACH LETTER
		var myClone = font.getPath(textToRender[i], letterX, letterY, 200);

		// READ & SET POINTS OF EACH LETTER PATH
		var points = [];
		for (var j in myClone.commands) {
			points.push(myClone.commands[j].x);
			points.push(myClone.commands[j].y);
			points.push(myClone.commands[j].x1);
			points.push(myClone.commands[j].y1);
		}

		// un couple de points (d'ou le k+=2) équivaut aux coordonées x et y d'UN point donc ici...
		// ... LOOP FOR SET PARAMETERS ON EACH POINT/SHAPE
		for(var k = 0, lengthPoints = points.length; k < lengthPoints; k+=2) {

			//SET POSITION
			setShapePosition(k, points);

			if (shapeChoice.isDisorderedEllipse()
			   || shapeChoice.isOrderedEllipse()
			   || shapeChoice.isNormalLetters()) {
				document.getElementById('fillstrokeaspect').disabled = true;						
			}else{
				document.getElementById('aspectstroke').checked = true;
				document.getElementById('fillstrokeaspect').disabled = false;						
			};

			// SET HEIGHT & WIDTH
			if (shapeChoice.isDisorderedEllipse()||shapeChoice.isDisorderedLine()) {
				var height = Math.abs(points[k+1]-points[k+3])+4;
				var width = Math.abs(points[k]-points[k+2])+4;
			}else{
				var height = Math.abs((letterX)-points[k])/4;
				var width = Math.abs((letterX)-points[k])/4;						
			};

			ctx.beginPath();

			// SET SHAPE
			if (shapeChoice.isDisorderedLine()||shapeChoice.isOrderedLine()) {
				var theInputShape = "line";

			}else if (shapeChoice.isObliqueLine()) {
	  			var theInputShape = "obliqueLine";

	  		}else if(shapeChoice.isOrderedEllipse()||shapeChoice.isDisorderedEllipse()) {
	  			var theInputShape = "ellipse";

	  		}else if (shapeChoice.isOnFire()) {
	  			var theInputShape = "fire";

			}else if (shapeChoice.isNormalLetters()) {
	  			// var theInputShape = "letter";
	  			var myPath = font.getPath(textToRender[i], letterX, letterY, Math.abs(200-k/2));
				myPath.draw(myText);
			};
			shapeChoice.setShape(theInputShape, pointX, pointY, height,width, k, i);

			// SET COLOR
			if (colorChoice.isDifferentByLetter()) {
				var theInputColor = "differentByLetter";

			}else if (colorChoice.isAColorToWhiteGradient()) {
				var theInputColor = "colorToWhiteGradient";

			}else if (colorChoice.isOneColor()) {
				var theInputColor = "oneColor";

			}else if (colorChoice.isATwoColorsGradient()) {
				var theInputColor = "twoColorsGradient";

			}else if (colorChoice.isMulticolor()) {
				var theInputColor = "multicolor";
			};
			colorChoice.setColor(theInputColor, k, kbis, colorValue, saturation);

			// SET ASPECT
			if (aspectChoice.isStroke()) {
				var theInputAspect = "stroke";

			}else if (aspectChoice.isFill()) {
				var theInputAspect = "fill";

			};
			aspectChoice.setAspect(theInputAspect);

			ctx.lineWidth= 1.5;
			ctx.closePath();	
		}
	}
}

function clearArea() {
	var ctx = document.getElementById('text-render').getContext('2d');
	ctx.clearRect(0, 0, 1020, 290);
	renderText();
}

function onReadFile(e) {
	document.getElementById('bruxFont').checked = false;
	document.getElementById('garamondFont').checked = false;
	document.getElementById('kustFont').checked = false;
	document.getElementById('walterFont').checked = false;
	document.getElementById('baskervilleFont').checked = false;
	document.getElementById('cooperFont').checked = false;
	document.getElementById('londonFont').checked = false;
	var file = e.target.files[0];
    	var reader = new FileReader();
	reader.onload = function(e) {
	    	try {
	    		font = opentype.parse(e.target.result);
	    		onFontLoaded(font);
	    		showErrorMessage('');
	    	} catch (err) {
	    	}
    	}
    	reader.readAsArrayBuffer(file);
}

var fileButton = document.getElementById('file');
fileButton.addEventListener('change', onReadFile, false);