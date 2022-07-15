edit.core = {
	_modz: {},
	editor: function(path, node_id) {
		var mz = edit.core._modz,
			pobj = mz[path] = mz[path] || {},
			data = pobj[node_id] = pobj[node_id] || {
				path: path,
				content: "",
				node_id: node_id
			}, content = CT.dom.smartField({
				wyz: true,
				isTA: true,
				value: data.content,
				classname: "w1 mt5 hmin200p"
			});
		return [
			CT.dom.div(data.node_id, "bigger"),
			content,
			CT.dom.button("update", function() {
				var cval = content.fieldValue();
				if (cval != data.content) {
					data.content = cval;
					CT.net.post({
						path: "/_edit",
						params: {
							action: "edit",
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

edit.core.style = {
	color: function(key, val) {
		var id = key.replace(/ /g, ""),
			n = CT.dom.field(id, val, "block", null, null, {
				color: "gray",
				background: val
			});
		setTimeout(function() { // wait a tick
			jsColorPicker("input#" + id, {
				color: val,
				readOnly: true
			});
		}, 500);
		return n;
	},
	editor: function(skin) {
		var rules = CT.dom.textArea(null, skin.rules, "w400p h200p"),
			font = CT.dom.select([
				"sans-serif, Arial, Helvetica",
				"serif, Times New Roman, Times",
				"monospace, Courier, Courier New"
			], null, null, skin.font),
			color = edit.core.style.color("Text Color", skin.color),
			background = edit.core.style.color("Background Color", skin.background),
			submitter = CT.dom.button("Update", function() {
				CT.net.post({
					path: "/_edit",
					params: {
						action: "style",
						data: {
							font: font.value,
							rules: rules.value,
							color: color.value,
							background: background.value
						}
					},
					cb: edit.core.style.apply
				});
			});
		CT.dom.setContent("ctmain", CT.dom.div([
			CT.dom.div("Style Your Site!", "biggerest bold centered"),
			CT.dom.div([
				CT.dom.div([
					"CSS", rules
				], "right"),
				[
					CT.dom.label("Text Color", "TextColor"),
					color
				], [
					CT.dom.label("Background Color", "BackgroundColor"),
					background
				], [
					"Font", font
				],
				submitter
			])
		], "bordered padded margined round hmin400p"));
	},
	apply: function(skin) {
		skin.font && CT.dom.addStyle(null, null, {
			body: {
				"font-family": skin.font
			}
		});
		skin.color && CT.dom.addStyle(null, null, {
			body: {
				color: skin.color
			}
		});
		skin.background && CT.dom.addStyle(null, null, {
			body: {
				background: skin.background
			}
		});
		skin.rules && CT.dom.addStyle(skin.rules);
	},
	load: function(cb) {
		if (edit.core.style._skin)
			return cb(edit.core.style._skin);
		CT.net.post({
			path: "/_edit",
			params: {
				action: "style"
			},
			cb: function(skin) {
				edit.core.style._skin = skin;
				cb(skin);
			}
		});
	}
};

if (core.config.ctedit.autoStyle)
	edit.core.style.load(edit.core.style.apply);