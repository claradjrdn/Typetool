var Id = function(id){
	return document.getElementById( id );
}
//===========================================

// canvas
var ctx = Id('text-render').getContext('2d');
var myText = Id('text-render').getContext('2d');

// fonts
var fontFileName = 'fonts/kust.otf';
var myClone;

//shape
var theInputShape;
var theInputAspect;

// colors
var colorValue = 323; 
var secondColorValue = 180;
var colorValueSlider = Id("color-value-range");
var secondColorValueSlider = Id("secondcolor-value-range");
var theInputColor;
var color;

// position
var positionValue = 50;
var positionValueSlider = Id("position-value-range");
var pointX, pointY, diffusionValue;

//scale 
var height;
var width;

// loop
var k = 1;

// recuperation des valeurs des curseurs & affichage de ces valeurs
function getValue() {
	// color ranges
	colorValue = colorValueSlider.value;
	secondColorValue = secondColorValueSlider.value;
	Id('color-value').innerHTML = '' + colorValue;
	Id('secondcolor-value').innerHTML = '' + secondColorValue;
	
	// position range
	positionValue = positionValueSlider.value;
	diffusionRange = positionValueSlider.value;
	Id('position-value').innerHTML = '' + positionValue;

    	renderText();
}