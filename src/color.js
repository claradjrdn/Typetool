var Color = function() {
	var colorMode, color;
	var colorRange, secondColorRange;

	this.colorRangeListener = function(){
		colorRange = $("color-value-range").value;
		secondColorRange = $("secondcolor-value-range").value;

		renderText();
	}

	this.getColorMode = function(){
		if ($('singlecolor').checked) {
			return 'isOneColor';
		};
		if ($('gradientletter').checked) {
			return 'isDifferentByLetter';
		};
		if ($('twocolorsgradient').checked) {
			return 'isATwoColorsGradient';
		};
		if ($('gradientshape').checked) {
			return 'isAColorToWhiteGradient';
		};
		if ($('multicolorgradient').checked) {
			return 'isMulticolor';
		};
	}

	this.getColor = function(shapeIndex, saturationByLetter, colorChoice){
		var hue;
		var saturation;
		var luminosity;

		var increase = shapeIndex; 
		var slowIncrease = shapeIndex / 2; 
		var speedIncrease = shapeIndex * 2;

		colorMode = this.getColorMode();

		//if saturation defined here then random saturation on each shape, not each letter
		// TO DO : add a color mode 
		// saturation = Math.floor(Math.random()*(85 - 15)+15);
		if (colorMode == "isDifferentByLetter") {
			hue = colorRange;
			saturation = saturationByLetter;
			luminosity = 50;
		
		}else if (colorMode == "isAColorToWhiteGradient") {
			hue = colorRange;
			saturation = 70;
			luminosity = Math.abs(100 - slowIncrease / 2);

			//pour black gradient
			// luminosity = pointIndex/8;

		}else if (colorMode == "isOneColor") {
			//good one
			// hue = colorRange;
			// saturation = 70;
			// luminosity = 50;
			
			//gradient test
			color = ctx.createLinearGradient(0,0,900,0);
			color.addColorStop(0, "hsl("+ secondColorRange + ",70%, 50%)");
			color.addColorStop(1, "hsl("+ colorRange + ",70%, 50%)");
			return color;
			
		}else if (colorMode == "isATwoColorsGradient") {
			var fullSaturation = 100;
			var breakpointSaturation = 25;
			var highLuminosity = 75;
			var lowLuminosity = 25;

			if ( (fullSaturation - increase) > breakpointSaturation) {
				hue = colorRange;
				saturation = fullSaturation - shapeIndex;
				luminosity = highLuminosity - slowIncrease;
			}else{
				var resetShapeIndex = shapeIndex - ( fullSaturation - breakpointSaturation ) / 2;
				increase = resetShapeIndex;
				slowIncrease = resetShapeIndex / 2;
				speedIncrease = resetShapeIndex * 2;

				hue = secondColorRange;
				saturation = Math.abs( breakpointSaturation + slowIncrease );
				luminosity = lowLuminosity + slowIncrease;
			};

		}else if (colorMode == "isMulticolor") {
			hue = colorRange + shapeIndex;
			luminosity = Math.abs( 100 - slowIncrease );
			saturation = Math.abs( speedIncrease );
		};
		color = "hsl(" + hue + "," + saturation + "%," + luminosity + "%)";
		return color;
	};
};