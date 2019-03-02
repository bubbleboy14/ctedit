CT.require("CT.all");
CT.require("core");
CT.require("edit.core");
CT.scriptImport("CT.lib.colorPicker");

CT.onload(function() {
	CT.initCore();
	edit.core.style.load(edit.core.style.editor);
});