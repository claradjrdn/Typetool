function $(id) {
	return document.getElementById(id);
}

// global 
var ctx = $('text-render').getContext('2d');

var setDisabledOptions = function(option){
	$(option).disabled = true;
	$(option).checked = false;
	if (option=='aspectstroke') {
		$('aspectfill').checked=true;
	}else if(option=='aspectfill'){
		$('aspectstroke').checked=true;		
	};
}

//BACKGROUND GRADIENT  //must be into the listener function of colorValue
// var startGradientValue = "hsl("+ secondColorValue+",70%, 50%)";
// var endGradientValue = "hsl("+ colorValue+",70%, 50%)";
// document.getElementById('text-render').style.background = "linear-gradient(90deg,"+startGradientValue+", "+endGrandientValue+")";