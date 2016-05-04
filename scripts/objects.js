/// define $ as document.getElementById();

class Shape {
	var isOrderedEllipse = function () {
		// when we call this isOrderedEllipse function 
		// it returns the state (false or true) of the 'orderedellipse' element
		return document.getElementById('CircleOrderAspect').checked;
	};
	
	var isDisorderedEllipse = function () {
		return document.getElementById('CircleDisorderAspect').checked;
	};
	
	var isLine = function () {
		return document.getElementById('lineOrderAspect').checked;
	};
	
	var isDisorderedLine = function () {
		return document.getElementById('lineDisorderAspect').checked;
	};
	
	var isObliqueLine = function () {
		return document.getElementById('lineAngleAspect').checked;
	};

	var isFire = function () {
		return document.getElementById('fireAspect').checked;
	};
	
	var isSpeedFire = function () {
		return document.getElementById('fireSpeedAspect').checked;
	};
}

class Color {

}

class Font {

}