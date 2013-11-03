
var stories = null;

exports.setStories = function(data){
//	Ti.API.info('in set stories');
	stories = data;
	populateTable();
};

function populateTable(){
	var rows = [];
	for(var i=0;i<stories.length;i++){
		var rowController = Alloy.createController('storyInfo');
		rowController.setRowData(stories[i]);
		rows.push(rowController.getView());		
	}
//	Ti.API.info(JSON.stringify(rows,null,2));
	$.stories.setData(rows);
}

$.stories.addEventListener('click', function(e){
//	Ti.API.info(JSON.stringify(e,null,2));
	var storyController = Alloy.createController('storyWindow');
	storyController.setData(e.source.myData);
	var storyWindow = storyController.getView();
	storyWindow.open();
});

$.storiesRefresh.addEventListener('click', function(e){
	alert('refresh')
});
$.storiesToggleDisplay.addEventListener('click', function(e){
	alert('display')
});



