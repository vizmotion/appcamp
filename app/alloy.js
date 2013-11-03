// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.stories = [];
Alloy.Globals.storyid = '';
Alloy.Globals.currentchapter = [];

Alloy.Globals.windowTop = (function() {
	var version, windowTops;

	// Look up table
	windowTops = {
		android: 0,
		ios:     0,
		ios7:    20
	};

	if (OS_IOS) {
		version = Ti.Platform.version.split(".");
		// Assume version returns valid int values. Won't try/catch
		if (parseInt(version[0], 10) > 6) {
			return windowTops.ios7;
		}
		else {
			return windowTops.ios;
		}
	}
	else {
		return windowTops.android;
	}
})();
