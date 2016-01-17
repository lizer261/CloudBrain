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
def add_pinboard_element(user, type, content, column, id, position):
    # Connect database
    database_pinboard.connect()
    # Add pinboard element
    Pinboard.create(user=user, type=type, content=content, column=column, id=id, position=position).save()
    # Close connection
    database_pinboard.close()
 
# Get Pinboard element
def get_pinboard_element(user, type, content, column, id, position):
    # Connect database
    database_pinboard.connect() 
    # Select the element
    pinboard_element = Pinboard.select().where(Pinboard.user == user, Pinboard.type == type, Pinboard.content == content, Pinboard.column == column, Pinboard.id == id, Pinboard.position == position)
    # Close connection
    database_pinboard.close()
    # Return element
    return pinboard_element

# Change Pinboard element content
def change_pinboard_element_content(pinboard_element, type, content):
    # Connect database
    database_pinboard.connect()
    # Change the type
    pinboard_element.type = type
    # Change the content
    pinboard_element.content = content
    # Save changes
    pinboard_element.save()
    # Close connection
    database_pinboard.close()
    
# Change Pinboard element column
def change_pinboard_element_column(pinboard_element, final_column):
    # Connect database
    database_pinboard.connect()
    # Change the column
    pinboard_element.column = final_column
    # Save changes
    pinboard_element.save()
    # Close connection
    database_pinboard.close()

# Change Pinboard element id
def change_pinboard_element_column(pinboard_element, id):
    # Connect database
    database_pinboard.connect()
    # Change the id
    pinboard_element.id = id
    # Save changes
    pinboard_element.save()
    # Close connection
    database_pinboard.close()
    
# Change Pinboard element position
def change_pinboard_element_position(pinboard_element, final_position):
    # Connect database
    database_pinboard.connect()
    # Change the position
    pinboard_element.position = final_position
    # Save changes
    pinboard_element.save()
    # Close connection
    database_pinboard.close()

# Remove Pinboard element
def remove_pinboard_element(user, type, content, column, id, position):
    # Connect database
    database_pinboard.connect()
    #Select the element
    element = Pinboard.delete().where(Pinboard.user == user, Pinboard.type == type, Pinboard.content == content, Pinboard.column == column, Pinboard.id == id, Pinboard.position == position)
    # Remove the element
    element.execute() 
    # Close connection
    database_pinboard.close()   
