/// define $ as document.getElementById();

var Shape = function() {
	
	this.setShape = function(theInputShape, pointX, pointY, height,width, k){
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
	  		ctx.lineTo(pointX + height/2, pointY+height+k/20);
		
		}else if (theInputShape == "fire") {
			var diametre = height; //height & width = same value
			//==========boucle for 3 circle per point[k]
			for(var nbrCircle = 0; nbrCircle < 3; nbrCircle++){
				diametre = diametre/2;
				ctx.moveTo(pointX +diametre, (pointY - diametre/2));
				ctx.bezierCurveTo(
					pointX + diametre/2, pointY - diametre/2,
					pointX + diametre/2, pointY + diametre/2,
					pointX, pointY + diametre/2
				);
				ctx.bezierCurveTo(
				  	//simple fire
				  	pointX - diametre/2, pointY + diametre/2,
				  	pointX - diametre/2, pointY - diametre/2, 
				  	pointX, pointY - diametre/2
				);
			}

		}else if (theInputShape == "letter") {
			// myPath.draw(myText);
		};
	};

	this.isOrderedEllipse = function(){
		return document.getElementById('circleOrderAspect').checked;		
	};

	this.isDisorderedEllipse = function(){
		return document.getElementById('circleDisorderAspect').checked;		
	};
	
	this.isOrderedLine = function(){
		return document.getElementById('lineOrderAspect').checked;		
	};

	this.isDisorderedLine = function(){
		return document.getElementById('lineDisorderAspect').checked;		
	};

	this.isObliqueLine = function(){
		return document.getElementById('lineAngleAspect').checked;		
	};

	this.isOnFire = function(){
		return document.getElementById('fireAspect').checked;		
	};
	
	this.isNormalLetters = function(){
		return document.getElementById('letterAspect').checked;		
	};

	/*this.setScale = function() {
		if (Shape.isDisorderedLine || Shape.isDisorderedEllipse) {
			var height = Math.abs(points[k+1]-points[k+3])+4;
			var width = Math.abs(points[k]-points[k+2])+4;
		};
		var height = Math.abs((letterX)-points[k])/4;
		var width = Math.abs((letterX)-points[k])/4;	
	}*/
};

var Color = function() {

	this.setColor = function(theInputColor, k, kbis, colorValue, saturation){
		if (theInputColor == "differentByLetter") {
			color = "hsl("+ colorValue+","+saturation+"%, 50%)";
		
		}else if (theInputColor == "colorToWhiteGradient") {
			color = "hsl("+ colorValue+",70%, "+k/8+"%)";

		}else if (theInputColor == "oneColor") {
			color = "hsl("+ colorValue+",70%, 50%)";
		
		}else if (theInputColor == "twoColorsGradient") {
			var fullSaturation = 100;
			var lum = 75;
			var secondSaturation = 25;
			var secondLum = 25;
				
			if ((fullSaturation-k)>25) {
				color = "hsl("+colorValue+","+(fullSaturation-k)+"%,"+(lum-k/2)+"%)";
			}else{
				kbis++;
				color = "hsl("+secondColorValue+","+(secondSaturation+kbis)+"%,"+(secondLum+kbis/2)+"%)";
			};

		}else if (theInputColor == "multicolor") {
			var entier = Math.abs(100-k/2);
			var autreentier = Math.abs(k*2);
			color = "hsl("+(colorValue+k)+","+autreentier+"%,"+entier+"%)";
		};
		return color;
	};

	this.isOneColor = function(){
		return document.getElementById('singlecolor').checked;		
	}

	this.isDifferentByLetter = function(){
		return document.getElementById('gradientletter').checked;		
	}
	
	this.isATwoColorsGradient = function(){
		return document.getElementById('twocolorsgradient').checked;		
	}
	
	this.isAColorToWhiteGradient = function(){
		return document.getElementById('gradientshape').checked;		
	}

	this.isMulticolor = function(){
		return document.getElementById('multicolorgradient').checked;		
	}
};

var Aspect = function(){
	this.setAspect = function(theInputAspect){
		if (theInputAspect == "stroke") {
			ctx.strokeStyle = color;
			ctx.stroke();		

		}else if (theInputAspect == "fill") {
			ctx.fillStyle = color;
			ctx.fill();
		}
	}

	this.isFill = function(){
		return document.getElementById('aspectfill').checked;		
	}
	this.isStroke = function(){
		return document.getElementById('aspectstroke').checked;		
	}
};

var Font = function() {
	this.isBrux = function(){
		return document.getElementById('bruxFont').checked;		
	}

	this.isBaskerville = function(){
		return document.getElementById('baskervilleFont').checked;		
	}
	
	this.isGaramond = function(){
		return document.getElementById('garamondFont').checked;		
	}
	
	this.isKust = function(){
		return document.getElementById('kustFont').checked;		
	}

	this.isWalter = function(){
		return document.getElementById('walterFont').checked;		
	}
	
	this.isCooperBlack = function(){
		return document.getElementById('cooperFont').checked;		
	}
	
	this.isLondon = function(){
		return document.getElementById('londonFont').checked;		
	}
};

var setPositionLetter = function(){

};

var setShapePosition = function(k, points){
	diffusionValue = Math.floor((Math.random() * diffusionRange) + 1);
	pointX = points[k]+ diffusionValue;
	pointY = points[k+1] +diffusionValue;
	return pointX, pointY;
}