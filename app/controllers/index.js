$.index.open();
//debugger;
Ti.App.app = 'StoryTap';
Ti.App.appv = '10.7';

Ti.App.osname = Ti.Platform.osname;
Ti.App.version = Ti.Platform.version;
Ti.App.height = Ti.Platform.displayCaps.platformHeight;
Ti.App.width = Ti.Platform.displayCaps.platformWidth;

Ti.App.dbversion = '0.49';
Ti.App.dbname = "contentDB" + Ti.App.dbversion;
Titanium.Database.install('storytap.sqlite', Ti.App.dbname);
Ti.include("/analytics.js");

Ti.App.uuid = Titanium.Platform.id;
var db = Titanium.Database.open(Ti.App.dbname);
var ver = db.execute("SELECT * FROM settings where id = 1");
var uuid = ver.fieldByName('uuid');

if(Ti.App.uuid == '') {
	if(uuid != '') {
		Ti.App.uuid = uuid;
	} else {
		Ti.App.uuid = Titanium.Platform.createUUID();
	} 
} else if (uuid == '') {
		db.execute("UPDATE settings SET uuid = ? where id = 1", Ti.App.uuid);
}
db.close();

startup();

function startup() {
	Ti.API.info("Startup");
	
	logEvent('initial', '');

	if (Titanium.Platform.name == 'android') {
		Ti.Android.currentActivity.addEventListener('pause', function(e) {
			Ti.API.info("Pause Android");
			logEvent('pause', '');
		});
		Ti.Android.currentActivity.addEventListener('resume', function(e) {
			Ti.API.info("Resume Android");
			logEvent('resume', '');
		});
	} else {
		Ti.API.info("Else Set");
		Titanium.App.addEventListener('pause', function(e) {
			Ti.API.info("Pause");
			logEvent('pause', '');
		});
		Titanium.App.addEventListener('resume', function(e) {
			Ti.API.info("Resume");
			logEvent('resume', '');
		});
	}
}


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
	stories.push(createStoryEntry(0,'And How My Spirit Soars', 'The story about a woman finding her voice', '/spiritsoars.jpg'));
	stories.push(createStoryEntry(1,'Fox and Hound', 'A fox makes friends with a hound', '/foxhound.jpg'));
	
	Ti.API.info('got stories: ' + JSON.stringify(stories));
	//Alloy.Globals.stories = stories;
	var homeController = Alloy.createController('homeWindow');
	homeController.setStories(stories);
	var homeWindow = homeController.getView();
	homeWindow.open();
}, 0000);
