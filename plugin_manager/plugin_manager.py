# We need get all folders
from os import listdir

# We need to log errors
from flask import flash

# <custom>

# Path to 'plugins' folder
plugin_path = '/root/PycharmProjects/CloudBrain/plugins/'

# </custom>

# Global
# Names of all plugin
plugin_names = [plugin_name for plugin_name in listdir(plugin_path) if plugin_name != 'plugin_manager']

# Plugins locations
# For templates folder
plugin_locations_templates = [plugin_path+f+'/templates' for f in plugin_names]

# Init function loads in core.py

def init(app):
    # import * plugins
    for plugin_name in plugin_names:
        # it's import plugin from 'plugins' folder
        plugin=eval('__import__("plugins.{0}.main").{0}.main'.format(plugin_name))
        # def init() is in all plugins
        # that's why we call it
        try:
            plugin.init(app)
            app.logger.debug('[+] Plugin \'%s\' have been loaded.' % plugin_name)
        except AttributeError:
            app.logger.debug('[?] Plugin \'%s\' have no (init() def)' % plugin_name)
        except SyntaxError:
            app.logger.debug('[-] Can\'t load init() def, please check it in \'%s\'.' % plugin_name)
        except TypeError:
            plugin.init()
            app.logger.debug('[!] Plugin \'%s\' was loaded without app class.' % plugin_name)
        # we need to clear plugin
        plugin = None

