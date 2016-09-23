var shapeChoice = new Shape();
var colorChoice = new Color();
var fontChoice = new Font();
var aspectChoice = new Aspect();

function renderText() {
	if (fontChoice.isBrux()) {
		fontFileName = 'fonts/bruxFont.otf';
		shapeChoice.setDefaultShapeOptions();
		setDisabledOptions('lineAngleAspect');
		setDisabledOptions('fireAspect');
		setDisabledOptions('letterAspect');

	}else if (fontChoice.isGaramond()) {
		fontFileName = 'fonts/garamondFont.ttf';
		shapeChoice.setDefaultShapeOptions();
		setDisabledOptions('fireAspect');
		
	}else if (fontChoice.isKust()) {
		fontFileName = 'fonts/kustFont.otf';
		shapeChoice.setDefaultShapeOptions();
		setDisabledOptions('lineAngleAspect');

	}else if (fontChoice.isWalter()) {
		fontFileName = 'fonts/walterFont.ttf';
		shapeChoice.setDefaultShapeOptions();
		setDisabledOptions('fireAspect');
		setDisabledOptions('lineAngleAspect');

	}else if (fontChoice.isBaskerville()) {
		fontFileName = 'fonts/baskervilleFont.ttf';
		shapeChoice.setDefaultShapeOptions();

	}else if (fontChoice.isCooperBlack()) {
		fontFileName = 'fonts/cooperFont.ttf';
		shapeChoice.setDefaultShapeOptions();

	}else if (fontChoice.isLondon()) {
		fontFileName = 'fonts/londonFont.ttf';
		shapeChoice.setDefaultShapeOptions();
	};

	//if font loaded with button
	if (fontChoice.isBrux() == false
	   && fontChoice.isGaramond() == false
	   &&fontChoice.isKust() == false
	   && fontChoice.isWalter() == false
	   && fontChoice.isBaskerville() == false
	   && fontChoice.isCooperBlack() == false
	   && fontChoice.isLondon() == false) {

		var a = shapeChoice.setDefaultShapeOptions();
		var b = visualTreatment(font);
		return a && b;
	};
	//if font choosed in the list
	return loadPreselectedFont(fontFileName);
}

function visualTreatment(font){
	var textToRender = $('text-field').value.toUpperCase();
	ctx.clearRect(0,0,1020,290);

	var fontSize = 100;
	var letterY = 200;
	var lineHeight = fontSize + 30;
	var kerning = 20;
	var counter = 1;

	var type = shapeChoice.getShapeType(shapeChoice, font, textToRender, i, shapeIndex, letterY, letterX);
	aspectChoice.freezeAspectByShape(type);

	for (var i in textToRender) { // each letter loop
		// DEFINE POSITION X & Y OF EACH LETTER
		if (letterX > 750) {
			letterY = letterY + lineHeight;
			counter = 1;
		};
		var letterX = fontSize * counter;
		counter++;

		// GET PATH OF EACH LETTER
		var myClone = font.getPath(textToRender[i], letterX, letterY, fontSize);

		// READ & SET POINTS OF EACH LETTER PATH
		var shapeCoord = [];
		for (var j in myClone.commands) { // each value in path loop
			shapeCoord.push( {'x': myClone.commands[j].x, 'y': myClone.commands[j].y} );
			shapeCoord.push( {'x': myClone.commands[j].x1, 'y': myClone.commands[j].y1} );
		}

		var maxSaturation = 85;
		var minSaturation = 15;
		var saturationByLetter = Math.floor( Math.random() * ( maxSaturation - minSaturation ) + minSaturation );
		
		// ... LOOP FOR SET PARAMETERS ON EACH POINT/SHAPE
		for(var shapeIndex = 0; shapeIndex < shapeCoord.length - 1; shapeIndex++) { 
			shapeChoice.setShapePosition(shapeIndex, shapeCoord);
			shapeChoice.setShapeScale(shapeChoice, shapeIndex, letterX, letterY, shapeCoord);
			
			ctx.beginPath();
			shapeChoice.drawShape(shapeIndex,shapeChoice, font, textToRender, i, shapeIndex, letterY, letterX);
			ctx.lineWidth= 1;
			ctx.closePath();

			var colorToUse = colorChoice.getColor(shapeIndex, saturationByLetter, colorChoice);
			aspectChoice.getAspect();
			aspectChoice.useAspectByColor(colorToUse);
		}

		//dans l'idéal, la théorie : 
		/*for(var shapeIndex = 0; shapeIndex < shapeCoord.length - 1; shapeIndex++) {
			aspectChoice = aspectChoice.getAspect();
			shapeChoice = shapeChoice.getShapeType();
			aspectChoice = aspectChoice.getAspect();
			colorChoice = colorChoice.getColorByColorMode(getColorMode);
			ctx.drawShape(aspectChoice, shapeChoice, aspectChoice, colorChoice);
		}*/
	}
}