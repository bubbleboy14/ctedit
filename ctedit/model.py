from cantools import db

class PageEdit(db.TimeStampedBase):
	path = db.String()
	content = db.Text()
	node_id = db.String()

class Style(db.TimeStampedBase):
	font = db.String()
	color = db.String()
	background = db.String()
	rules = db.Text()