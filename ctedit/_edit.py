from cantools.web import respond, succeed, fail, cgi_get
from model import db, PageEdit, Style

def response():
	action = cgi_get("action", choices=["edit", "style"])
	data = cgi_get("data", required=False)
	if action == "style":
		style = Style.query().get()
		if not style:
			style = Style()
			style.put() # for key
		if data:
			for key, val in list(data.items()):
				setattr(style, key, val)
			style.put()
		succeed(style.data())
	if "key" in data:
		entity = db.get(data["key"])
	else:
		entity = PageEdit(**data)
	entity.content = data["content"]
	entity.put()
	succeed(entity.key.urlsafe())

respond(response)
