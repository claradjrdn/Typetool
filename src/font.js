var Font = function() {
	this.isBrux = function(){
		return $('bruxFont').checked;		
	}

	this.isBaskerville = function(){
		return $('baskervilleFont').checked;		
	}
	
	this.isGaramond = function(){
		return $('garamondFont').checked;		
	}
	
	this.isKust = function(){
		return $('kustFont').checked;		
	}

	this.isWalter = function(){
		return $('walterFont').checked;		
	}
	
	this.isCooperBlack = function(){
		return $('cooperFont').checked;		
	}
	
	this.isLondon = function(){
		return $('londonFont').checked;		
	}
};

var loadPreselectedFont = function(){
	opentype.load(fontFileName, function (err, font) {
		if (err) {
			alert('Font could not be loaded: ' + err);
		} else {
			$('file').value = '';
			visualTreatment(font);
		}
	});
}

var setAllUncheckedFont = function(){
	$('bruxFont').checked = false;
	$('garamondFont').checked = false;
	$('kustFont').checked = false;
	$('walterFont').checked = false;
	$('baskervilleFont').checked = false;
	$('cooperFont').checked = false;
	$('londonFont').checked = false;
}