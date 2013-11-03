var
	StoryFixture = require("story_fixture"),
	currentStory;

function setupTransition(transition){
	Ti.API.info("KIND: " + transition.kind);
	switch (transition.kind) {
		case "next":
			setupNextTransition(transition.param1);
			break;
		case "random":
			setupRandomTransition(transition.param1);
			break;
		case "replay":
			setupReplayTransition(transition.param1);
			break;
		case "password":
			setupPasswordTransition(transition.param1);
			break;
		default:
			Ti.API.error("Application logic fell into the void with " + transition.kind);
	}
}
function setupNextTransition(loc) {
	Ti.API.info('Next Loc: '+loc);
	// show next
	// $.storyNext.show();
	$.storyNext.setVisible(true);
}
function setupRandomTransition(loc) {
	Ti.API.info('Random Loc: '+loc);
	// show next
	$.storyRandom.setVisible(true);
}
function setupReplayTransition(loc) {
	Ti.API.info('Replay Loc: '+loc);
	$.storyReplay.setVisible(true);
}
function setupPasswordTransition(loc) {
	Ti.API.info('Replay Loc: '+loc);
	$.storyPassword.setVisible(true);
}

exports.setData = function(d){
	currentStory = StoryFixture.find(d.storyid);
	Ti.API.info("CURRENT CHAPTER: " + JSON.stringify(currentStory.getCurrentChapter(), null, 2));
	refreshHtml();
};

function refreshHtml() {
	hideActionButtons();
	$.storyView.html = currentStory.getCurrentChapter().body;
	setupTransition(currentStory.getCurrentChapter().transition);
}

function advanceChapter(next_chapter_id) {
	currentStory.setNextChapter(next_chapter_id);
	refreshHtml();
}

function hideActionButtons() {
	$.storyNext.setVisible(false);
	$.storyRandom.setVisible(false);
	$.storyReplay.setVisible(false);
	$.storyPassword.setVisible(false);
}

$.storyClose.addEventListener('click', function(e){
	$.storyWin.close();
});

$.storyReplay.addEventListener('click', function(e){
//	alert('currentstoryid: '+Alloy.Globals.currentstoryid+" currentstep: " + JSON.stringify(Alloy.Globals.currentchapter));
	// hide next
	advanceChapter(currentStory.getCurrentChapter().transition.param1);
	alert("BEGIN AGAIN");
});

$.storyNext.addEventListener('click', function(e){
	advanceChapter(currentStory.getCurrentChapter().transition.param1);
});

$.storyRandom.addEventListener('click', function(e){
//	alert('currentstoryid: '+Alloy.Globals.currentstoryid+" currentstep: " + JSON.stringify(Alloy.Globals.currentchapter));
	// hide next
	var transition = currentStory.getCurrentChapter().transition;
	Ti.API.info("PARAM1: "+ transition.param1);
	var choices = transition.param1.split(",");
	var loc = choices[Math.floor(Math.random() * choices.length)];
	Ti.API.info("LOC: "+loc);
	advanceChapter(loc);
});

$.storyPassword.addEventListener('click', function(e){
	// TODO: get password and varify
	advanceChapter(currentStory.getCurrentChapter().transition.param1);
});

