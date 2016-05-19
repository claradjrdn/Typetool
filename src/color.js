var Color = function() {
	var theInputColor;
	var color;
	var colorValue = 323;
	var secondColorValue = 180;

	this.setColorMode = function(color){
		if (colorChoice.isDifferentByLetter()) {
			theInputColor = "differentByLetter";
		}else if (colorChoice.isAColorToWhiteGradient()) {
			theInputColor = "colorToWhiteGradient";
		}else if (colorChoice.isOneColor()) {
			theInputColor = "oneColor";
		}else if (colorChoice.isATwoColorsGradient()) {
			theInputColor = "twoColorsGradient";
		}else if (colorChoice.isMulticolor()) {
			theInputColor = "multicolor";
		};
	}

	this.colorRangeListener = function(){
		var colorValueSlider = $("color-value-range");
		var secondColorValueSlider = $("secondcolor-value-range");
		colorValue = colorValueSlider.value;
		secondColorValue = secondColorValueSlider.value;

		renderText();
		this.displayColorValues();
	}

	this.displayColorValues = function() {
		$('color-value').innerHTML = '' + colorValue;
		$('secondcolor-value').innerHTML = '' + secondColorValue;		
	}

	this.getColor = function(pointIndex, saturation){
		//if saturation defined here then random saturation on each shape, not each letter
		// TO DO : add a color mode 
		// var saturation = Math.floor(Math.random()*(85 - 15)+15);
		if (theInputColor == "differentByLetter") {
			color = "hsl("+ colorValue+","+saturation+"%, 50%)";
		
		}else if (theInputColor == "colorToWhiteGradient") {
			var abs = Math.abs(100 - pointIndex/8);
			color = "hsl("+ colorValue+",70%, "+abs+"%)";
			//black gradient
			//color = "hsl("+ colorValue+",70%, "+pointIndex/8+"%)";

		}else if (theInputColor == "oneColor") {
			//good one
			//color = "hsl("+ colorValue+",70%, 50%)";
			
			//gradient test
			color = ctx.createLinearGradient(0,0,900,0);
			color.addColorStop(0,"hsl("+ secondColorValue+",70%, 50%)");
			color.addColorStop(1,"hsl("+ colorValue+",70%, 50%)");
			
		}else if (theInputColor == "twoColorsGradient") {
			var fullSaturation = 100;
			var lum = 75;
			var secondSaturation = 25;
			var secondLum = 25;

			if ((fullSaturation-pointIndex)>25) {
				color = "hsl("+colorValue+","+(fullSaturation-pointIndex)+"%,"+(lum-pointIndex/2)+"%)";
			}else{
				color = "hsl("+secondColorValue+","+Math.abs((secondSaturation+(pointIndex-74)/4))+"%,"+(secondLum+(pointIndex-74)/4)+"%)";
			};

		}else if (theInputColor == "multicolor") {
			var entier = Math.abs(100-pointIndex/2);
			var autreentier = Math.abs(pointIndex*2);
			color = "hsl("+(colorValue+pointIndex)+","+autreentier+"%,"+entier+"%)";
		};
		return color;
	};

	this.isOneColor = function(){
		return $('singlecolor').checked;		
	}

	this.isDifferentByLetter = function(){
		return $('gradientletter').checked;		
	}
	
	this.isATwoColorsGradient = function(){
		return $('twocolorsgradient').checked;		
	}
	
	this.isAColorToWhiteGradient = function(){
		return $('gradientshape').checked;		
	}

	this.isMulticolor = function(){
		return $('multicolorgradient').checked;		
	}
};