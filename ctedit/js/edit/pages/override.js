CT.require("CT.all");
CT.require("core");
CT.require("edit.core");

CT.onload(function() {
	CT.initCore();
	CT.parse.enableVideo();
	edit.core.override();
});