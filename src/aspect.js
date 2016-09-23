var Aspect = function(){
	var theInputAspect;
	
	this.getAspect = function(){

		if ($('aspectfill').checked) {
			return 'isFill';
		};
		return 'isStroke';
	}
	this.useAspectByColor = function(color){
		theInputAspect = this.getAspect();
		if (theInputAspect == "isStroke") {
			ctx.strokeStyle = color;
			ctx.stroke();		

		}else if (theInputAspect == "isFill") {
			ctx.strokeStyle = color;
			ctx.stroke();	
			ctx.fillStyle = color;
			ctx.fill();
		}
	}

	this.freezeAspectByShape = function(shapeType){
		if(shapeType == "isNormalLetters"){
			$('aspectfill').checked = true;
		}else if (shapeType == "isDisorderedLine" || shapeType == "isOrderedLine" || shapeType == "isObliqueLine" || shapeType == "isOnFire") {
			$('aspectfill').checked = false;
		};
	}
};



