var Shape = function() {
	var shapeType;
	var height, width, scaleMultiplier = 5, scaleDivisor = 4;
	var degreeOfDiffusion, diffusionValue;
	var coordX, coordY;
	
	this.setShapeScale = function(shape, shapeIndex, letterX, letterY, shapeCoord){
		shapeType = this.getShapeType();
		if (shapeType == "isDisorderedEllipse"|| shapeType == "isDisorderedLine") {
			// height = Math.abs(points[pointIndex+1]-points[pointIndex+3])+scaleMultiplier;
			// width = Math.abs(points[pointIndex]-points[pointIndex+2])+scaleMultiplier;
			height = Math.abs( shapeCoord[shapeIndex].y - shapeCoord[shapeIndex+1].y ) + scaleMultiplier;
			width = Math.abs( shapeCoord[shapeIndex].x - shapeCoord[shapeIndex+1].x ) + scaleMultiplier;
		}else{
			height = Math.abs( (letterX) - shapeCoord[shapeIndex].x ) / scaleDivisor;
			width = Math.abs( (letterX) - shapeCoord[shapeIndex].x ) / scaleDivisor;						
		};
	}

	this.diffusionRangeListener = function(){
		degreeOfDiffusion = $("position-value-range").value;
		renderText();
	}

	this.setShapePosition = function(shapeIndex, shapeCoord){
		diffusionValue = Math.floor(Math.random() * degreeOfDiffusion);
		coordX = shapeCoord[shapeIndex].x + diffusionValue;
		coordY = shapeCoord[shapeIndex].y +diffusionValue;
		return coordX, coordY;
	}

	this.getShapeType = function() {
		if ($('circleOrderAspect').checked) {
			return 'isOrderedEllipse';
		};
		if ($('circleDisorderAspect').checked) {
			return 'isDisorderedEllipse';
		};
		if ($('lineAngleAspect').checked) {
			return 'isObliqueLine';
		};
		if ($('lineOrderAspect').checked) {
			return 'isOrderedLine';
		};
		if ($('lineDisorderAspect').checked) {
			return 'isDisorderedLine';
		};
		if ($('fireAspect').checked) {
			return 'isOnFire';
		};
		if ($('letterAspect').checked) {
			return 'isNormalLetters';
		};
	}

	this.drawShape = function(shapeIndex, shapeChoice, font, textToRender, i, shapeIndex, letterY, letterX){
		shapeType = this.getShapeType();
		var verticalRadius = height / 2;
		var horizontalRadius = width / 2;

		if (shapeType == "isOrderedLine" || shapeType == "isDisorderedLine") {
			ctx.moveTo(coordX - verticalRadius, coordY);
			ctx.lineTo(coordX + verticalRadius, coordY);
		
		}else if (shapeType == "isOrderedEllipse" || shapeType == "isDisorderedEllipse") {
			ctx.moveTo(coordX, coordY - verticalRadius);
	  		ctx.bezierCurveTo(
	  			coordX + horizontalRadius, coordY - verticalRadius,
	  			coordX + horizontalRadius, coordY + verticalRadius,
	  			coordX, coordY + verticalRadius
	  		);
	  		ctx.bezierCurveTo(
	  			coordX - horizontalRadius, coordY + verticalRadius,
	  			coordX - horizontalRadius, coordY - verticalRadius, 
	  			coordX, coordY - verticalRadius
	  		);	

		}else if (shapeType == "isObliqueLine") {
			ctx.moveTo(coordX - verticalRadius, coordY);
	  		ctx.lineTo(coordX + verticalRadius, coordY+ height + shapeIndex / 20);
		
		}else if (shapeType == "isOnFire") {
			var diametre = height;
			for(var nbrCircle = 0; nbrCircle < 3; nbrCircle++){
				diametre = diametre / 2;
				ctx.moveTo(coordX +diametre, (coordY - diametre / 2));
				ctx.bezierCurveTo(
					coordX + diametre / 2, coordY - diametre / 2,
					coordX + diametre / 2, coordY + diametre / 2,
					coordX, coordY + diametre / 2
				);
				ctx.bezierCurveTo(
				  	coordX - diametre / 2, coordY + diametre / 2,
				  	coordX - diametre / 2, coordY - diametre / 2, 
				  	coordX, coordY - diametre / 2
				);
			}

		}else if (shapeType == "isNormalLetters") {
			myPath = font.getPath(textToRender[i], letterX, letterY, Math.abs(200-shapeIndex/2));
			myPath.draw(ctx);
		};
	};
	this.setDefaultShapeOptions = function(){
		$('circleOrderAspect').disabled = false;
		$('circleDisorderAspect').disabled = false;
		$('lineOrderAspect').disabled = false;
		$('lineDisorderAspect').disabled = false;
		$('lineAngleAspect').disabled = false;
		$('fireAspect').disabled = false;
		$('letterAspect').disabled = false;
	}

};