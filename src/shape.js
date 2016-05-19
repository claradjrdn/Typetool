var Shape = function() {
	// var theInputShape;
	var height;
	var width;
	var positionValue = 50;
	var diffusionValue;
	var diffusionRange;
	var pointX, pointY;
	type: "",
	/*height: 0,
	width: 0,
	positionX: 0,
	positionY: 0;*/
	
	this.setShapeScale = function(shape, pointIndex, letterX, letterY, points){
		if (shape.isDisorderedEllipse()||shape.isDisorderedLine()) {
			height = Math.abs(points[pointIndex+1]-points[pointIndex+3])+4;
			width = Math.abs(points[pointIndex]-points[pointIndex+2])+4;
		}else{
			height = Math.abs((letterX)-points[pointIndex])/4;
			width = Math.abs((letterX)-points[pointIndex])/4;						
		};
	}

	this.positionRangeListener = function(){
		var positionValueSlider = $("position-value-range");
		positionValue = positionValueSlider.value;
		diffusionRange = positionValueSlider.value;

		renderText();
		this.displayPositionValues();
	}

	this.displayPositionValues = function() {
		$('position-value').innerHTML = '' + positionValue;
	}

	this.setShapePosition = function(pointIndex, points){
		diffusionValue = Math.floor((Math.random() * diffusionRange) + 1);
		pointX = points[pointIndex]+ diffusionValue;
		pointY = points[pointIndex+1] +diffusionValue;
		return pointX, pointY;
	}

	this.setTypeOfShape = function(shapeChoice, font, textToRender, i, pointIndex, letterY, letterX){
		if (shapeChoice.isDisorderedLine()||shapeChoice.isOrderedLine()) {
			this.type = "line";

		}else if (shapeChoice.isObliqueLine()) {
			// this.type = "obliqueLine";
			this.type = "obliqueLine";

		}else if(shapeChoice.isOrderedEllipse()||shapeChoice.isDisorderedEllipse()) {
			this.type = "ellipse";

		}else if (shapeChoice.isOnFire()) {
			this.type = "fire";

		}else if (shapeChoice.isNormalLetters()) {
			this.type = "letter";
			myPath = font.getPath(textToRender[i], letterX, letterY, Math.abs(200-pointIndex/2));
		};
	}

	this.drawShape = function(pointIndex){
		if (this.type == "line") {
			ctx.moveTo(pointX - height / 2, pointY);
			ctx.lineTo(pointX + height / 2, pointY);
		
		}else if (this.type == "ellipse") {
			ctx.moveTo(pointX, pointY - height / 2);
	  		ctx.bezierCurveTo(
	  			pointX + width / 2, pointY - height / 2,
	  			pointX + width / 2, pointY + height / 2,
	  			pointX, pointY + height / 2
	  		);
	  		ctx.bezierCurveTo(
	  			pointX - width / 2, pointY + height / 2,
	  			pointX - width / 2, pointY - height / 2, 
	  			pointX, pointY - height / 2
	  		);	

		}else if (this.type == "obliqueLine") {
			ctx.moveTo(pointX - height / 2, pointY);
	  		ctx.lineTo(pointX + height / 2, pointY+ height + pointIndex / 20);
		
		}else if (this.type == "fire") {
			var diametre = height;
			for(var nbrCircle = 0; nbrCircle < 3; nbrCircle++){
				diametre = diametre / 2;
				ctx.moveTo(pointX +diametre, (pointY - diametre / 2));
				ctx.bezierCurveTo(
					pointX + diametre / 2, pointY - diametre / 2,
					pointX + diametre / 2, pointY + diametre / 2,
					pointX, pointY + diametre / 2
				);
				ctx.bezierCurveTo(
				  	pointX - diametre / 2, pointY + diametre / 2,
				  	pointX - diametre / 2, pointY - diametre / 2, 
				  	pointX, pointY - diametre / 2
				);
			}

		}else if (this.type == "letter") {
			myPath.draw(ctx);
		};
	};

	this.isOrderedEllipse = function(){
		return $('circleOrderAspect').checked;		
	};

	this.isDisorderedEllipse = function(){
		return $('circleDisorderAspect').checked;		
	};
	
	this.isOrderedLine = function(){
		return $('lineOrderAspect').checked;	
	};

	this.isDisorderedLine = function(){
		return $('lineDisorderAspect').checked;		
	};

	this.isObliqueLine = function(){
		return $('lineAngleAspect').checked;		
	};

	this.isOnFire = function(){
		return $('fireAspect').checked;		
	};
	
	this.isNormalLetters = function(){
		return $('letterAspect').checked;		
	};
};

var setDefaultShapeOptions = function(){
	$('circleOrderAspect').disabled = false;
	$('circleDisorderAspect').disabled = false;
	$('lineOrderAspect').disabled = false;
	$('lineDisorderAspect').disabled = false;
	$('lineAngleAspect').disabled = false;
	$('fireAspect').disabled = false;
	$('letterAspect').disabled = false;
}

