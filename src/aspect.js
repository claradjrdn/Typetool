var Aspect = function(){
	var theInputAspect;
	this.setAspect = function(){
		if (aspectChoice.isStroke()) {
			theInputAspect = "stroke";
		}else if (aspectChoice.isFill()) {
			theInputAspect = "fill";
		};
	}
	this.useAspectByColor = function(color){
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
		return $('aspectfill').checked;		
	}
	this.isStroke = function(){
		return $('aspectstroke').checked;		
	}
	
	this.setDefaultAspectOptions = function(){
		$('aspectfill').disabled = false;
		$('aspectstroke').disabled = false;
	}
	this.setAspectOptions = function(){
		if (shapeChoice.isDisorderedEllipse()
		   || shapeChoice.isOrderedEllipse()) {
		   	return this.setDefaultAspectOptions();
		}else if(shapeChoice.isNormalLetters()){
			var a = this.setDefaultAspectOptions();
			var b = setDisabledOptions('aspectstroke');
			return a && b;
		};
		var a = this.setDefaultAspectOptions();
		var b = setDisabledOptions('aspectfill');
		return a && b;
	}
};



