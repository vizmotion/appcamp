var data = null;
var chapters = [];
var transition = [];
Alloy.Globals.currentchapter.push(0);
Alloy.Globals.currentchapter.push(0);
Alloy.Globals.currentchapter.push(0);
Alloy.Globals.currentchapter.push(0);
Alloy.Globals.currentchapter.push(0);
Alloy.Globals.currentchapter.push(0);
Alloy.Globals.currentchapter.push(0);

// THIS IS TEST STORY
function createStory1 () {
	chapters = [];
	transition = [];

	chapters[0] = '<html><body><div>Window 0</div></body></html>';
	transition[0] = createTransitionEntry('next',1);
	chapters[1] = '<html><body><div>Window 1</div></body></html>';
	transition[1] = createTransitionEntry('password',2, "What is the type of animal that has black and white stripes?", "zebra");
	chapters[2] = '<html><body><div>Window 2</div></body></html>';
	transition[2] = createTransitionEntry('random','3,4,5');
	chapters[3] = '<html><body><div>Window 3</div></body></html>';
	transition[3] = createTransitionEntry('next',4);
	chapters[4] = '<html><body><div>Window 4</div></body></html>';
	transition[4] = createTransitionEntry('next',5);
	chapters[5] = '<html><body><div>Window 5</div></body></html>';
	transition[5] = createTransitionEntry('replay',0);
}
function createStory2 () {
	chapters = [];
	transition = [];

	chapters[0] = '<html><body><div>2 Window 0</div></body></html>';
	transition[0] = createTransitionEntry('next',1);
	chapters[1] = '<html><body><div>2 Window 1</div></body></html>';
	transition[1] = createTransitionEntry('password',2, "What is the type of animal that has black and white stripes?", "zebra");
	chapters[2] = '<html><body><div>2 Window 2</div></body></html>';
	transition[2] = createTransitionEntry('random','3,4,5');
	chapters[3] = '<html><body><div>2 Window 3</div></body></html>';
	transition[3] = createTransitionEntry('next',4);
	chapters[4] = '<html><body><div>2 Window 4</div></body></html>';
	transition[4] = createTransitionEntry('next',5);
	chapters[5] = '<html><body><div>2 Window 5</div></body></html>';
	transition[5] = createTransitionEntry('replay',0);
}
function initialStory(id) {
	if(id == 1) {
		createStory1();
	} else {
		createStory2();
	}
	
}
// story globals
function setsg(val) {
	Alloy.Globals.currentchapter[Alloy.Globals.currentstoryid] = val;
	return(val);
}
function getsg() {
	return(Alloy.Globals.currentchapter[Alloy.Globals.currentstoryid]);
}
function createTransitionEntry(kind, param1, param2, param3){
	var obj = {};
	obj.kind = kind;
	obj.param1 = param1;
	obj.param2 = param2;
	obj.param3 = param3;
	
	return obj;
}
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
	$.storyNext.show();
}
function setupRandomTransition(loc) {
	Ti.API.info('Random Loc: '+loc);
	// show next
	$.storyRandom.show();
}
function setupReplayTransition(loc) {
	Ti.API.info('Replay Loc: '+loc);
	$.storyReplay.show();
}
function setupPasswordTransition(loc) {
	Ti.API.info('Replay Loc: '+loc);
	$.storyPassword.show();
}

exports.setData = function(d){
	Ti.API.info("CURRENT CHAPTER: " + JSON.stringify(Alloy.Globals.currentchapter,null,2));
	Alloy.Globals.currentstoryid = d.storyid;
	initialStory(d.storyid);
	cur = getsg();
	if(chapters[cur]==null) {
		cur = setsg(0);
	}
	$.storyView.html = chapters[cur];	
	setupTransition(cur);
};

function refreshHtml() {
	$.storyView.html = currentStory.getCurrentChapter().body;
	setupTransition(currentStory.getCurrentChapter().transition);
}

function advanceChapter(next_chapter_id) {
	currentStory.setNextChapter(next_chapter_id);
	refreshHtml();
}

$.storyClose.addEventListener('click', function(e){
	$.storyWin.close();
});

$.storyReplay.addEventListener('click', function(e){
//	alert('currentstoryid: '+Alloy.Globals.currentstoryid+" currentstep: " + JSON.stringify(Alloy.Globals.currentchapter));
	// hide next
	$.storyReplay.hide();
	var cur = getsg();
	cur = setsg(transition[cur].param1);
	$.storyView.html = chapters[cur];
	setupTransition(cur);
	alert("BEGIN AGAIN");
});

$.storyNext.addEventListener('click', function(e){
	$.storyNext.hide();
	cur = getsg();
	cur = setsg(transition[cur].param1);
	$.storyView.html = chapters[cur];
	setupTransition(cur);
});

$.storyRandom.addEventListener('click', function(e){
//	alert('currentstoryid: '+Alloy.Globals.currentstoryid+" currentstep: " + JSON.stringify(Alloy.Globals.currentchapter));
	// hide next
	$.storyRandom.hide();
	var cur = getsg();
	Ti.API.info("PARAM1: "+ transition[cur].param1);
	var choice = transition[cur].param1;
	var choicearray = choice.split(",");
	var loc = choicearray[Math.floor(Math.random() * choicearray.length)];
	Ti.API.info("LOC: "+loc)
	cur = setsg(loc);
	
	$.storyView.html = chapters[cur];
	setupTransition(cur);
});

$.storyPassword.addEventListener('click', function(e){
	$.storyPassword.hide();
	var cur = getsg();
	var trans = transition
	cur = setsg(transition[cur].param1);
	$.storyView.html = chapters[cur];
	setupTransition(cur);
});

