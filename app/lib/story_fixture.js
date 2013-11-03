// StorryFixture - A fixture module to make fake stories for testing
/*jshint eqnull:true */
/*global _ */

var fake_chapters = [
	// Chapter 1
	[
		{ body: '<html><body><div>Window 0</div></body></html>', transition: createTransitionEntry('next',1) },
		{ body: '<html><body><div>Window 1</div></body></html>', transition: createTransitionEntry('password',2, "What is the type of animal that has black and white stripes?", "zebra") },
		{ body: '<html><body><div>Window 2</div></body></html>', transition: createTransitionEntry('random','3,4,5') },
		{ body: '<html><body><div>Window 3</div></body></html>', transition: createTransitionEntry('next',4) },
		{ body: '<html><body><div>Window 4</div></body></html>', transition: createTransitionEntry('next',5) },
		{ body: '<html><body><div>Window 5</div></body></html>', transition: createTransitionEntry('replay',0) }
	],
	// Chapter 2
	[
		{ body: '<html><body><div>2 Window 0</div></body></html>', transition: createTransitionEntry('next',1) },
		{ body: '<html><body><div>2 Window 1</div></body></html>', transition: createTransitionEntry('password',2, "What is the type of animal that has black and white stripes?", "zebra") },
		{ body: '<html><body><div>2 Window 2</div></body></html>', transition: createTransitionEntry('random','3,4,5') },
		{ body: '<html><body><div>2 Window 3</div></body></html>', transition: createTransitionEntry('next',4) },
		{ body: '<html><body><div>2 Window 4</div></body></html>', transition: createTransitionEntry('next',5) },
		{ body: '<html><body><div>2 Window 5</div></body></html>', transition: createTransitionEntry('replay',0) }
	]
];

function createTransitionEntry(kind, param1, param2, param3){
	var obj = {};
	obj.kind = kind;
	obj.param1 = param1;
	obj.param2 = param2;
	obj.param3 = param3;

	return obj;
}

function getStateOrInitialize(id) {
	if (Alloy.Globals.storyStates == null) {
		Alloy.Globals.storyStates = {};
	}
  return Alloy.Globals.storyStates[id] || 0;
}

function StoryFixture(props) {
	this.id       = 0;
	this.state    = 0;
	this.chapters = [];
	_.extend(this, props);
}

StoryFixture.prototype.getCurrentChapter = function getCurrentChapter() {
	return this.chapters[this.state];
};

StoryFixture.prototype.setNextChapter = function setNextChapter(chapter) {
	this.state = chapter;
	Alloy.Globals.storyStates[this.id] = this.state;
	return this;
};

StoryFixture.find = function find(id, state) {
	if (state == null) { state = getStateOrInitialize(id); }
	return new StoryFixture({id: id, chapters: fake_chapters[id], state: state});
};

module.exports = StoryFixture;
/* vim:set ts=2 sw=2 noet fdm=marker: */

