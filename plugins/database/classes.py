# Import pewee for database manipulations
from peewee import *
# Path to database
from plugin_manager.plugin_manager import plugin_path

database = SqliteDatabase(plugin_path + 'database/databases/users.db')

database_texts = SqliteDatabase(plugin_path + 'database/databases/texts.db')

database_pinboard = SqliteDatabase(plugin_path + 'database/databases/pinboard.db')
# User model
class User(Model):
    # We need username
    user = CharField()
    # We need to save password of user
    password = CharField()
    # And his email
    email = CharField()
    # Drawing tool
    drawing = IntegerField(default=0)

    class Meta:
        # We need do use specific database
        database = database  # Uses 'users.db'


# Note model
class texts(Model):
    # We need to save a theme field
    theme = CharField()
    # Text field
    text = CharField()
    # And user who create this
    user = CharField()

    class Meta:
        database = database_texts  # Uses 'texts.db'


# Depending of notes
class Depending(Model):
    # Get main theme
    main_theme = CharField()
    # Get secondary theme
    second_theme = CharField()

    class Meta:
        database = database_texts  # Uses 'texts.db'

# Pinboard model
class Pinboard(Model):
    # User field
    user = CharField()
    # Type field
    type = CharField()
    # Content field
    content = CharField()
    # Column field
    column = IntegerField()
    # id field
    id = IntegerField()
    # Position field
    position = IntegerField()
    
    class Meta:
        database = database # Uses 'pinboard.db'

def create_tables():
    database_texts.connect()
    database_texts.create_tables([Depending, texts])
    database_texts.close()
    database.connect()
    database.create_table([User])
    database.close()
    database_pinboard.connect()
    database_pinboard.create_tables([Pinboard])
    database_pinboard.close()

