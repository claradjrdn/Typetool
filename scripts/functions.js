var setShapePosition = function(pointIndex, points){
	diffusionValue = Math.floor((Math.random() * diffusionRange) + 1);
	pointX = points[pointIndex]+ diffusionValue;
	pointY = points[pointIndex+1] +diffusionValue;
	return pointX, pointY;
}

var setShapeScale = function(shape, pointIndex, letterX, letterY, points){
	if (shape.isDisorderedEllipse()||shape.isDisorderedLine()) {
		height = Math.abs(points[pointIndex+1]-points[pointIndex+3])+4;
		width = Math.abs(points[pointIndex]-points[pointIndex+2])+4;
	}else{
		height = Math.abs((letterX)-points[pointIndex])/4;
		width = Math.abs((letterX)-points[pointIndex])/4;						
	};
}

var loadPreselectedFont = function(){
	opentype.load(fontFileName, function (err, font) {
		if (err) {
			alert('Font could not be loaded: ' + err);
		} else {
			Id('file').value = '';
			visualTreatment(font);
		}
	});
}

var setDisabledOptions = function(option){
	Id(option).disabled = true;
	Id(option).checked = false;
	if (option=='aspectstroke') {
		Id('aspectfill').checked=true;
	}else if(option=='aspectfill'){
		Id('aspectstroke').checked=true;		
	};
}

var setAllUncheckedFont = function(){
	Id('bruxFont').checked = false;
	Id('garamondFont').checked = false;
	Id('kustFont').checked = false;
	Id('walterFont').checked = false;
	Id('baskervilleFont').checked = false;
	Id('cooperFont').checked = false;
	Id('londonFont').checked = false;
}

var setDefaultShapeOptions = function(){
	Id('circleOrderAspect').disabled = false;
	Id('circleDisorderAspect').disabled = false;
	Id('lineOrderAspect').disabled = false;
	Id('lineDisorderAspect').disabled = false;
	Id('lineAngleAspect').disabled = false;
	Id('fireAspect').disabled = false;
	Id('letterAspect').disabled = false;
}

var setAspectOptions = function(){
	if (shapeChoice.isDisorderedEllipse()
	   || shapeChoice.isOrderedEllipse()) {
	   	return setDefaultAspectOptions();
	}else if(shapeChoice.isNormalLetters()){
		var a = setDefaultAspectOptions();
		var b = setDisabledOptions('aspectstroke');
		return a && b;
	};
	var a = setDefaultAspectOptions();
	var b = setDisabledOptions('aspectfill');
	return a && b;
}

var setDefaultAspectOptions = function(){
	Id('aspectfill').disabled = false;
	Id('aspectstroke').disabled = false;
}