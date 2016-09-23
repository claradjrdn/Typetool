// global var
var ctx = $('text-render').getContext('2d');

// ======================================

function $(id) {
	return document.getElementById(id);
}

function onFontLoaded(font) {
	window.font = font;
	renderText();
}

function setDisabledOptions(option){
	$(option).checked = false;
	$(option).disabled = true;
}

function clearArea() {
	var ctx = $('text-render').getContext('2d');
	ctx.clearRect(0, 0, 1020, 290);
	renderText();
}

function onReadFile(e) {
	setAllUncheckedFont();
	var file = e.target.files[0];
    	var reader = new FileReader();
	reader.onload = function(e) {
	    	try {
	    		font = opentype.parse(e.target.result);
	    		onFontLoaded(font);
	    		showErrorMessage('');
	    	} catch (err) {
	    	}
    	}
    	reader.readAsArrayBuffer(file);
}

var fileButton = $('file');
fileButton.addEventListener('change', onReadFile, false);


//BACKGROUND GRADIENT  //must be into the listener function of colorValue
// var startGradientValue = "hsl("+ secondColorValue+",70%, 50%)";
// var endGradientValue = "hsl("+ colorValue+",70%, 50%)";
// document.getElementById('text-render').style.background = "linear-gradient(90deg,"+startGradientValue+", "+endGrandientValue+")";