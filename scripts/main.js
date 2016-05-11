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
		setDefaultShapeOptions();
		setDisabledOptions('lineAngleAspect');
		setDisabledOptions('fireAspect');
		setDisabledOptions('letterAspect');

	}else if (fontChoice.isGaramond()) {
		fontFileName = 'fonts/garamondFont.ttf';
		setDefaultShapeOptions();
		setDisabledOptions('fireAspect');
		
	}else if (fontChoice.isKust()) {
		fontFileName = 'fonts/kustFont.otf';
		setDefaultShapeOptions();
		setDisabledOptions('lineAngleAspect');

	}else if (fontChoice.isWalter()) {
		fontFileName = 'fonts/walterFont.ttf';
		setDefaultShapeOptions();
		setDisabledOptions('fireAspect');
		setDisabledOptions('lineAngleAspect');

	}else if (fontChoice.isBaskerville()) {
		fontFileName = 'fonts/baskervilleFont.ttf';
		setDefaultShapeOptions();

	}else if (fontChoice.isCooperBlack()) {
		fontFileName = 'fonts/cooperFont.ttf';
		setDefaultShapeOptions();

	}else if (fontChoice.isLondon()) {
		fontFileName = 'fonts/londonFont.ttf';
		setDefaultShapeOptions();
	};

	//if font loaded with button
	if (fontChoice.isBrux() == false
	   && fontChoice.isGaramond() == false
	   &&fontChoice.isKust() == false
	   && fontChoice.isWalter() == false
	   && fontChoice.isBaskerville() == false
	   && fontChoice.isCooperBlack() == false
	   && fontChoice.isLondon() == false) {

		var a = setDefaultShapeOptions();
		var b = visualTreatment(font);
		return a && b;
	};
	//if font choosed in the list
	return loadPreselectedFont(fontFileName);
}

function visualTreatment(font){
	var textToRender = Id('text-field').value;
	ctx.clearRect(0,0,1020,290);

	var compteur = 0;
	var letterY = 160;
	for (var i in textToRender) { // each letter loop

		var saturation = Math.floor(Math.random()*(85 - 15)+15);

		// DEFINE POSITION X & Y OF EACH LETTER
		var letterX = 120*compteur;
		if (letterX > 840) {
			letterY = letterY+160;
			compteur = 0;
			letterX = 120*compteur;
		};
		compteur++;

		// GET PATH OF EACH LETTER
		var myClone = font.getPath(textToRender[i], letterX, letterY, 160);

		// READ & SET POINTS OF EACH LETTER PATH
		var points = [];
		for (var j in myClone.commands) { // each value in path loop
			points.push(myClone.commands[j].x);
			points.push(myClone.commands[j].y);
			points.push(myClone.commands[j].x1);
			points.push(myClone.commands[j].y1);
		}

		// ... LOOP FOR SET PARAMETERS ON EACH POINT/SHAPE
		for(var pointIndex = 0, lengthPoints = points.length; pointIndex < lengthPoints; pointIndex+=2) { //each COUPLE of value (= point position) in path loop

			shapeChoice.setShape(shapeChoice, font, textToRender, i, pointIndex, letterY, letterX);
			setAspectOptions();
			setShapePosition(pointIndex, points);
			setShapeScale(shapeChoice, pointIndex, letterX, letterY, points);
			
			ctx.beginPath();
			shapeChoice.drawShape(theInputShape, pointX, pointY, height,width, pointIndex);
			ctx.lineWidth= 3;
			ctx.closePath();

			colorChoice.setColor(colorChoice);
			colorChoice.useColor(theInputColor, pointIndex, k, colorValue, saturation);

			aspectChoice.setAspect(aspectChoice);
			aspectChoice.useAspect(theInputAspect, color);
		}
	}
}

function clearArea() {
	var ctx = Id('text-render').getContext('2d');
	ctx.clearRect(0, 0, 1020, 290);
	renderText();
}

function onReadFile(e) {
	setAllUncheckedFont();
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

var fileButton = Id('file');
fileButton.addEventListener('change', onReadFile, false);