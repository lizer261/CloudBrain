from flask import request, redirect

from plugins.database.main import add_pinboard_element, get_pinboard_element, change_pinboard_element, remove_pinboard_element

from plugins.database.classes import Pinboard

#path to db
from plugin_manager.plugin_manager import plugin_path

#Pinboard database
database_pinboard = SqliteDatabase(plugin_path + 'database/databases/pinboard.db')

def init(app):
    @app.route('/new_pinboard_el', methods=['POST'])
    def new_element():
        cursor = {column:request.form['column'],position:request.form['position']}
        add_pinboard_element(user='Andrew',cursor=cursor, type=request.form['type'], content=request.form['content'])
        return redirect('/')
        
    @app.route('/change_pinboard_el', methods=['POST'])
    def change_element():
    
        #connect to db
        database_pinboard.connect()
        
        cursor={column:request.form['column'],position:request.form['position']}        
        pinboard_element = get_pinboard_element(user='Andrew', cursor=cursor)

        #close the connection
        database_pinboard.close()
        
        change_pinboard_element(pinboard_element, final_position=request.form['final_position'], final_column=request.form['final_column'], cursor=cursor, type=request.form['type'], content=request.form['content'])
        return redirect('/')
        
    @app.route('/del_pinboard_el', methods=['POST'])    
    def remove_element():
        cursor = {column:request.form['column'], position:request.form['position']}
        remove_pinboard_element(user='Andrew', cursor=cursor)
        return redirect('/')
