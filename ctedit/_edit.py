from cantools.web import respond, succeed, fail, cgi_get
from model import db, PageEdit

def response():
	data = cgi_get("data")
	if "key" in data:
		entity = db.get(data["key"])
	else:
		entity = PageEdit(**data)
	entity.content = data["content"]
	entity.put()
	succeed(entity.key.urlsafe())

respond(response)