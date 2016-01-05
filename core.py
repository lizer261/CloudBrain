# Main idea
from flask import Flask

# Request only plugin manager
# It will load all plugins
from plugin_manager import plugin_manager

# We have custom plugins with
# 'templates' folders
# We need to add locations of those
# folders
import jinja2

# We need cfrt for protetion
from flask_wtf.csrf import CsrfProtect

csrf = CsrfProtect()

# Init flask
app = Flask(__name__)

# You can enable or disable debug mode
app.debug = True

# Your secret for app, it's needed for CSFR
app.secret_key = 'Cool12391kmkmkfswlewf,wemfmwelm' \
                 'fkmwjnvjenvjnwevnkewmajsfnjnyob[[\\fdfs' \
                 'dfdsddfsdfsdf'

# It is need for templates locations
app.jinja_loader = jinja2.ChoiceLoader([
        # we need this to append
        # and not to set
        app.jinja_loader,
        # plugin_manager.plugin_locations_templates -- all 'templates' folder
        # locations
        jinja2.FileSystemLoader(plugin_manager.plugin_locations_templates),
    ])

# Init plugin manager
plugin_manager.init(app)

if __name__ == '__main__':
    # Run flask on 80 port
    app.run(port=int("80"))
    csrf.init_app(app)