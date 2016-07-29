// ============
// VARIABLES
// ============

var trainTypes = ["TGV","Intercites"];/*,"Transilien","TER"];*/
	templates = {
		option : "<option value='{0}'>{0}</option>",
		message : "Vous avez <span>{0}%</span> de chance d'arriver à l'heure !!"
	},
	canvas = document.getElementsByTagName('canvas')[0],
	ctx = canvas.getContext('2d'),
	data = train.value.toLowerCase();

canvas.width = canvas.height = 16;



// ============
// HELPERS
// ============

function $(expr) { return document.querySelector(expr); }

// Browser sniffing
var ua = (function(){
	var agent = navigator.userAgent.toLowerCase();
	return function(browser){
		return agent.indexOf(browser) !== -1;
	};
}());

var browser = {
	ie: ua('msie'),
	chrome: ua('chrome'),
	webkit: ua('chrome') || ua('safari'),
	safari: ua('safari') && !ua('chrome'),
	mozilla: ua('mozilla') && !ua('chrome') && !ua('safari')
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



// ============
// FUNCTIONS
// ============

function setTrains() {
	train.innerHTML = createList(trainTypes);
};

function changeTrainType(){
	data = donnees[train.value.toLowerCase()];
	init();
}

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
			var percent = data[prop][2];
			indicator.style.width = percent + "%";
			result.innerHTML = templates.message.format(Math.round(percent));
			drawFavicon(Math.round(percent));
		}
	}
}

function drawFavicon(n){

	ctx.clearRect(0, 0, 16, 16);

	ctx.fillStyle = "#801F66";
	ctx.fillRect(0, 0, 16, 16);

	ctx.fillStyle = "#fff";
	ctx.font = "6pt Arial";
	ctx.fillText(n, 4, 11);

	if (browser.chrome){
		$('[rel="shortcut icon"]').setAttribute("href", canvas.toDataURL());
	} else {
		var link = d.createElement('link'),
			oldLink = $('[rel="shortcut icon"]');
		link.type = "image/png";
		link.rel = "shortcut icon";
		link.href = canvas.toDataURL();
		if (oldLink) {
			d.head.removeChild(oldLink);
		}
		d.head.appendChild(link);
	}
}

function init(){
	data = donnees[train.value.toLowerCase()];
	depart.innerHTML = createList(getDeparts());
	arrivee.innerHTML = createList(getArrivees(depart.value));
	setProgress();
}


// ==================
// RUN YOU CLEVER BOY
// ==================

setTrains();
init();