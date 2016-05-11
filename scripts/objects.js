var Shape = function() {
	
	this.setShape = function(shape, font, textToRender, i, pointIndex, letterY, letterX){
		if (shape.isDisorderedLine()||shape.isOrderedLine()) {
			theInputShape = "line";

		}else if (shapeChoice.isObliqueLine()) {
			theInputShape = "obliqueLine";

		}else if(shape.isOrderedEllipse()||shape.isDisorderedEllipse()) {
			theInputShape = "ellipse";

		}else if (shapeChoice.isOnFire()) {
			theInputShape = "fire";

		}else if (shape.isNormalLetters()) {
			theInputShape = "letter";
			myPath = font.getPath(textToRender[i], letterX, letterY, Math.abs(200-pointIndex/2));
		};
	}

	this.drawShape = function(theInputShape, pointX, pointY, height,width, pointIndex){
		if (theInputShape == "line") {
			ctx.moveTo(pointX-height/2, pointY);
			ctx.lineTo(pointX + height/2, pointY);
		
		}else if (theInputShape == "ellipse") {
			ctx.moveTo(pointX, pointY - height/2);
	  		ctx.bezierCurveTo(
	  			pointX + width/2, pointY - height/2,
	  			pointX + width/2, pointY + height/2,
	  			pointX, pointY + height/2
	  		);
	  		ctx.bezierCurveTo(
	  			pointX - width/2, pointY + height/2,
	  			pointX - width/2, pointY - height/2, 
	  			pointX, pointY - height/2
	  		);	

		}else if (theInputShape == "obliqueLine") {
			ctx.moveTo(pointX-height/2, pointY);
	  		ctx.lineTo(pointX + height/2, pointY+height+pointIndex/20);
		
		}else if (theInputShape == "fire") {
			var diametre = height;
			for(var nbrCircle = 0; nbrCircle < 3; nbrCircle++){
				diametre = diametre/2;
				ctx.moveTo(pointX +diametre, (pointY - diametre/2));
				ctx.bezierCurveTo(
					pointX + diametre/2, pointY - diametre/2,
					pointX + diametre/2, pointY + diametre/2,
					pointX, pointY + diametre/2
				);
				ctx.bezierCurveTo(
				  	pointX - diametre/2, pointY + diametre/2,
				  	pointX - diametre/2, pointY - diametre/2, 
				  	pointX, pointY - diametre/2
				);
			}

		}else if (theInputShape == "letter") {
			myPath.draw(ctx);
		};
	};

	this.isOrderedEllipse = function(){
		return Id('circleOrderAspect').checked;		
	};

	this.isDisorderedEllipse = function(){
		return Id('circleDisorderAspect').checked;		
	};
	
	this.isOrderedLine = function(){
		return Id('lineOrderAspect').checked;	
	};

	this.isDisorderedLine = function(){
		return Id('lineDisorderAspect').checked;		
	};

	this.isObliqueLine = function(){
		return Id('lineAngleAspect').checked;		
	};

	this.isOnFire = function(){
		return Id('fireAspect').checked;		
	};
	
	this.isNormalLetters = function(){
		return Id('letterAspect').checked;		
	};
};

var Color = function() {
	this.setColor = function(color){
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

	this.useColor = function(theInputColor, pointIndex, k, colorValue, saturation){
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
			color = "hsl("+ colorValue+",70%, 50%)";
		
		}else if (theInputColor == "twoColorsGradient") {
			var fullSaturation = 100;
			var lum = 75;
			var secondSaturation = 25;
			var secondLum = 25;

			if ((fullSaturation-pointIndex)>25) {
				console.log(pointIndex);
				color = "hsl("+colorValue+","+(fullSaturation-pointIndex)+"%,"+(lum-pointIndex/2)+"%)";
			}else{
				color = "hsl("+secondColorValue+","+Math.abs((secondSaturation+(pointIndex-74)/4))+"%,"+(secondLum+(pointIndex-74)/4)+"%)";
				console.log(pointIndex-74);
				console.log(color);
			};
			console.log(color);

		}else if (theInputColor == "multicolor") {
			var entier = Math.abs(100-pointIndex/2);
			var autreentier = Math.abs(pointIndex*2);
			color = "hsl("+(colorValue+pointIndex)+","+autreentier+"%,"+entier+"%)";
		};
		return color;
	};

	this.isOneColor = function(){
		return Id('singlecolor').checked;		
	}

	this.isDifferentByLetter = function(){
		return Id('gradientletter').checked;		
	}
	
	this.isATwoColorsGradient = function(){
		return Id('twocolorsgradient').checked;		
	}
	
	this.isAColorToWhiteGradient = function(){
		return Id('gradientshape').checked;		
	}

	this.isMulticolor = function(){
		return Id('multicolorgradient').checked;		
	}
};

var Aspect = function(){

	this.setAspect = function(){
		if (aspectChoice.isStroke()) {
			theInputAspect = "stroke";
		}else if (aspectChoice.isFill()) {
			theInputAspect = "fill";
		};
	}

	this.useAspect = function(theInputAspect){
		if (theInputAspect == "stroke") {
			ctx.strokeStyle = color;
			ctx.stroke();		

		}else if (theInputAspect == "fill") {
			ctx.strokeStyle = color;
			ctx.stroke();	
			ctx.fillStyle = color;
			ctx.fill();
		}
	}

	this.isFill = function(){
		return Id('aspectfill').checked;		
	}
	this.isStroke = function(){
		return Id('aspectstroke').checked;		
	}
};

var Font = function() {
	this.isBrux = function(){
		return Id('bruxFont').checked;		
	}

	this.isBaskerville = function(){
		return Id('baskervilleFont').checked;		
	}
	
	this.isGaramond = function(){
		return Id('garamondFont').checked;		
	}
	
	this.isKust = function(){
		return Id('kustFont').checked;		
	}

	this.isWalter = function(){
		return Id('walterFont').checked;		
	}
	
	this.isCooperBlack = function(){
		return Id('cooperFont').checked;		
	}
	
	this.isLondon = function(){
		return Id('londonFont').checked;		
	}
};