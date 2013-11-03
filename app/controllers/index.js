$.index.open();

function createStoryEntry(id, name, description, image){
	var obj = {};
	obj.storyid = id;
	obj.name = name;
	obj.description = description;
	obj.image = image;
	
	return obj;
}
function createStory(id) {
	
	
}
setTimeout(function(param) {
	var stories = [];
	stories.push(createStoryEntry(1,'first story', 'story 1 description story 1 description story 1 description story 1 description story 1 description story 1 description story 1 description story 1 description story 1 description story 1 description story 1 description', '/spiritsoars.jpg'));
	stories.push(createStoryEntry(2,'2nd story', 'story 2 description', '/spiritsoars.jpg'));
	stories.push(createStoryEntry(3,'3rd story', 'story 3 description', '/spiritsoars.jpg'));
	stories.push(createStoryEntry(4,'4th story', 'story 4 description', '/spiritsoars.jpg'));
	
	Ti.API.info('got stories: ' + JSON.stringify(stories));
	//Alloy.Globals.stories = stories;
	var homeController = Alloy.createController('homeWindow');
	homeController.setStories(stories);
	var homeWindow = homeController.getView();
	homeWindow.open();
}, 0000);
