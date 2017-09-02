# ctedit
This package provides a simple interface (and corresponding models) for generically modifying content on a site without touching code or configuration.


# Back (Init Config)

    syms = {
    	".": ["_edit.py"],
    	"js": ["edit"],
    	"html": ["edit"]
    }
    model = {
    	"ctedit.model": ["PageEdit"]
    }
    routes = {
    	"/_edit": "_edit.py"
    }

# Front (JS Config)

## core.config.ctedit
### Import line: 'CT.require("core.config");'
    {
    	"paths": {
    		"/": ["ctmain"]
    	}
    }