# Import pewee for database manipulations

# Path to database

# Hashlib for md5
import hashlib
# Redirect if success
from flask import redirect
from plugins.database.classes import *

# Text database
database_texts = SqliteDatabase(plugin_path + 'database/databases/texts.db')
# Users database
database = SqliteDatabase(plugin_path + 'database/databases/users.db')
#Pinboard database
database_pinboard = SqliteDatabase(plugin_path + 'database/databases/pinboard.db')
# MD5 crypt
md5 = lambda string: hashlib.md5(string.encode()).hexdigest()

database.connect()


# Register a new user
def register_user(login_form):
    " Add user to db by login form "
    # Attempt to create the user. If the username is taken...
    try:
        if User.get(User.email == login_form.email.data) and User.get(User.password == md5(login_form.password.data)):
            return redirect('/c')
        return 'Already exist.'
    except:
        user = User.create(
            password=md5(login_form.password.data),
            email=login_form.email.data
        )
        user.save()
        return 'We have add this user.'


# Add note
def add_note(note, theme):
    " Add note to db "
    # Connect database
    database_texts.connect()
    # Add note
    texts.create(theme=theme, text=note, user='Andrew').save()
    # Close connection
    database_texts.close()

# Get text of user
def get_text_of_user(user):
    " Get text of single user "
    # Connect database
    database_texts.connect()
    # Request text of user
    text_of_user = texts.select().where(texts.user == 'Andrew')
    # Close connection
    database_texts.close()
    # Return text
    return text_of_user


# Add theme's depending
def add_depending(main_theme, secondary_theme):
    " Add theme depending "
    # Connect database
    database_texts.connect()
    # Add depending
    Depending.create(main_theme=main_theme, second_theme=secondary_theme)
    # Close connection
    database_texts.close()


# Get depending of theme
def get_theme_depending(secondary_theme):
    " Get main theme by secondary theme "
    # Connect database
    database_texts.connect()
    # Request text of user
    main_theme = Depending.select().where(Depending.second_theme == secondary_theme)
    # Close connection
    database_texts.close()
    # Return main theme
    try:
        # Return theme
        return main_theme
    # If no depending, return nothing!
    except IndexError:
        return ''

# Get text of user
def get_text_by_theme(user, theme):
    " Get text of single user "
    # Connect database
    database_texts.connect()
    # Request text of user
    text_of_user = texts.select().where(texts.user == 'Andrew', texts.theme == theme)
    # Close connection
    database_texts.close()
    # Return text
    return text_of_user


# Remove depending
def remove_depending(main_theme, second_theme):
    " Remove theme depending "
    # Connect database
    database_texts.connect()
    # Select depending to delete
    depending = Depending.delete().where(Depending.second_theme == second_theme, Depending.main_theme == main_theme)
    # Remove the depending
    depending.execute() 
    # Close connection
    database_texts.close()

# Add Pinboard element
def add_pinboard_element(user, type, content, cursor):
    # Connect database
    database_pinboard.connect()
    # Change positioning of other elements
    elements = Pinboard.select().where(Pinboard.user == user, Pinboard.column == cursor.column, Pinboard.position >= cursor.position)
    for element in elements:
        element.position+=1
        element.save()
    # Add pinboard element
    Pinboard.create(user=user, type=type, content=content, column=cursor.column, id=cursor.id, position=cursor.position).save()
    # Close connection
    database_pinboard.close()
 
# Get Pinboard element
def get_pinboard_element(user, cursor):
    # Connect database
    database_pinboard.connect() 
    # Select the element
    if cursor.position and cursor.id:
        pinboard_element = Pinboard.select().where(Pinboard.user == user, Pinboard.column == cursor.column, Pinboard.position == cursor.position, Pinboard.id == cursor.id)
    # Or select the whole column
    else:
        pinboard_element = Pinboard.select().where(Pinboard.user == user, Pinboard.column == cursor.column)
    # Close connection
    database_pinboard.close()
    # Return element
    return pinboard_element

# Change Pinboard element 
def change_pinboard_element(pinboard_element, final_position=None, final_column=None, type=None, content=None):
    # Connect database
    database_pinboard.connect()
    
    # Change the content
    if content and type:
        pinboard_element.type = type
        pinboard_element.content = content
    
    # Change the id
    if id:
        pinboard_element.id = id
    
    # Change the column
    if final_column:
        pinboard_element.column = final_column
        
    # Change the position
    if final_position:
        current_position = pinboard_element.position
        
        if current_position - final_position > 0:
            elements = Pinboard.select().where(Pinboard.user == pinboard_element.user, Pinboard.column == pinboard_element.column, Pinboard.position >= final_position)
            for element in elements:
                element.position+=1
                element.save()
        elif current_position - final_position < 0:
            elements = Pinboard.select().where(Pinboard.user == pinboard_element.user, Pinboard.column == pinboard_element.column, Pinboard.position <= final_position, Pinboard.position > current_position)
            for element in elements:
                element.position-=1
        
        pinboard_element.position = final_position

    # Save changes
    pinboard_element.save()
    # Close connection
    database_pinboard.close()

# Remove Pinboard elements
def remove_pinboard_element(user, cursor):
    # Connect database
    database_pinboard.connect()
    # Select the element
    if cursor.id and cursor.position:
        elements = Pinboard.delete().where(Pinboard.user == user, Pinboard.column == cursor.column, Pinboard.position == cursor.position, Pinboard.id == cursor.id)
    # Or select the whole column
    else:
        elements = Pinboard.delete().where(Pinboard.user == user, Pinboard.column == cursor.column)
    # Remove elements
    elements.execute() 
    # Change postitioning
    elements = Pinboard.select().where(Pinboard.column == cursor.column and Pinboard.position > cursor.position)
    for element in elements:
        element.position-=1
        element.save()
    # Close connection
    database_pinboard.close()   

