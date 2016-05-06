// canvas
var ctx = document.getElementById('text-render').getContext('2d');

// fonts
var fontFileName = 'fonts/kust.otf';

// colors
var saturation = Math.floor(Math.random()*(85 - 15)+15);
var color;
var colorValue = 323; 
var secondColorValue = 180;
var colorValueSlider = document.getElementById("color-value-range");
var secondColorValueSlider = document.getElementById("secondcolor-value-range");

// position
var pointX, pointY, diffusionValue;
var positionValue = 50;
var positionValueSlider = document.getElementById("position-value-range");

// loop
var kbis=1;

// recuperation des valeurs des curseurs & affichage de ces valeurs
function getValue() {
	// color ranges
	colorValue = colorValueSlider.value;
	secondColorValue = secondColorValueSlider.value;
	document.getElementById('color-value').innerHTML = '' + colorValue;
	document.getElementById('secondcolor-value').innerHTML = '' + secondColorValue;
	
	// position range
	positionValue = positionValueSlider.value;
	diffusionRange = positionValueSlider.value;
	document.getElementById('position-value').innerHTML = '' + positionValue;

    	renderText();
}