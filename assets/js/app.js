var templates = {
	option : "<option value='{0}'>{0}</option>",
	message : "Vous avez <span>{0}%</span> de chance d'arriver à l'heure !!"
};

String.prototype.format = function(){
	var string = this;
	for (var i = 0, j = arguments.length; i < j; i++) {
		string = string.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return string;
};

Array.prototype.has = function(v) {
	for (var i = 0, length = this.length; i < length; i++) {
		if (this[i] == v) return true;
	}
	return false;
};

function getDeparts() {
	var departs = new Array;
	for (var prop in data) {
		var gare = data[prop][0];
		if(!departs.has(gare) && gare !== undefined){
			departs.push(gare);
		}
	}
	return departs;
}

function getArrivees(depart) {
	depart = depart.toUpperCase();
	var arrivees = [];
	for (var i = 0; i < data.length; i++){
		if (data[i][0] === depart) {
			arrivees.push(data[i][1]);
		}
	}
	return arrivees;
}

function createList(array) {
	tpl = "";
	for (var i = 0, length = array.length; i < length; i++){
		tpl += templates.option.format(array[i]);
	}
	return tpl;
}

function populateArrivee(){
	arrivee.innerHTML = createList(getArrivees(depart.value));
}

function setProgress(){
	for (var prop in data) {
		if(data[prop][0] == depart.value.toUpperCase() && data[prop][1] == arrivee.value.toUpperCase()){
			var percent = 100 - ((data[prop][3]*100) / data[prop][2]);
			indicator.style.width = percent + "%";
			result.innerHTML = templates.message.format(Math.round(percent));
		}
	}
}

depart.innerHTML = createList(getDeparts());
arrivee.innerHTML = createList(getArrivees(depart.value));
setProgress();