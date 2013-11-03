
exports.setRowData = function(data){
	Ti.API.info(JSON.stringify(data));
	$.name.text = data.name + "\n" + data.description;
	$.image.image = data.image;
	$.name.myData = data;
};


