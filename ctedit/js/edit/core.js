edit.core = {
	_modz: {},
	editor: function(path, node_id) {
		var mz = edit.core._modz,
			pobj = mz[path] = mz[path] || {},
			data = pobj[node_id] = pobj[node_id] || {
				path: path,
				content: "",
				node_id: node_id
			}, content = CT.dom.textArea(null, data.content, "w1");
		return [
			CT.dom.div(data.node_id, "bigger"),
			content,
			CT.dom.button("update", function() {
				if (content.value != data.content) {
					data.content = content.value;
					CT.net.post({
						path: "/_edit",
						params: {
							data: data
						},
						cb: function(key) {
							data.key = key; // for new ones
							alert("we did it!");
						}
					})
				}
			})
		];
	},
	list: function() {
		CT.db.get("pageedit", function(mods) {
			var modz = edit.core._modz;
			mods.forEach(function(mod) {
				modz[mod.path] = modz[mod.path] || {},
				modz[mod.path][mod.node_id] = mod;
			});
			var pathz = core.config.ctedit.paths,
				content = CT.dom.div("click a path (on the right) to begin"),
				sidebar = CT.dom.div();
			CT.dom.setContent("ctmain", [
				CT.dom.div([
					CT.dom.div("Paths", "bigger pb10"),
					CT.panel.triggerList(Object.keys(pathz), function(path) {
						CT.dom.setContent(content, pathz[path].map(function(node_id) {
							return edit.core.editor(path, node_id);
						}));
					}, sidebar)
				], "abs t0 b0 r0 w200p bordered padded bb"),
				CT.dom.div([
					CT.dom.div("Edits (By Node Id)", "bigger pb10"),
					content
				], "abs t0 b0 l0 r200 bordered padded bb")
			]);
		});
	},
	swap: function(modz) {
		modz.forEach(function(mod) {
			var node = CT.dom.id(mod.node_id, true);
			if (node && mod.content)
				node[node.tagName == "IMG" ? "src" : "innerHTML"] = mod.content.replace(/\r\n/g,
					"<br>").replace(/\r/g, "<br>").replace(/\n/g, "<br>");
		});
	},
	get: function(cb, path) {
		CT.db.get("pageedit", cb, null, null, null, {
			path: path
		});
	},
	override: function() {
		var p = location.pathname;
		if (p in core.config.ctedit.paths)
			edit.core.get(edit.core.swap, p);
	}
};