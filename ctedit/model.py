from cantools import db

class PageEdit(db.TimeStampedBase):
	path = db.String()
	content = db.Text()
	node_id = db.String()