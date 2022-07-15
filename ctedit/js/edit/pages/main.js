CT.require("CT.all");
CT.require("CT.rte");
CT.require("core");
CT.require("edit.core");

CT.onload(function() {
	CT.initCore();
	edit.core.list();
});