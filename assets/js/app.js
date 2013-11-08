

var option = "<option value='{0}'>{1}</option>";

String.prototype.format = function(){
	var string = this;
	for (var i = 0, j = arguments.length; i < j; i++) {
		string = string.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return string;
};




function getArrivals(depart){
	var arrivals = [];
	for (var prop in data) {
		if (data[prop][0] === depart) {
			arrivals.push(data[prop][1]);
		}
	}
	return arrivals;
}

var arrivals = getArrivals("PARIS MONTPARNASSE");