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
	stories.push(createStoryEntry(0,'And How My Spirit Soars', 'Story about women coming of age', '/spiritsoars.jpg'));
	stories.push(createStoryEntry(1,'Fox and Hound', 'Fox makes friend with Hound', '/foxhound.jpg'));
	
	Ti.API.info('got stories: ' + JSON.stringify(stories));
	//Alloy.Globals.stories = stories;
	var homeController = Alloy.createController('homeWindow');
	homeController.setStories(stories);
	var homeWindow = homeController.getView();
	homeWindow.open();
}, 0000);
