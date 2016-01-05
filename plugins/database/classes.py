# Import pewee for database manipulations
from peewee import *
# Path to database
from plugin_manager.plugin_manager import plugin_path

database = SqliteDatabase(plugin_path + 'database/databases/users.db')

database_texts = SqliteDatabase(plugin_path + 'database/databases/texts.db')


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
    # Get MAIN theme
    main_theme = CharField()
    # Get secondary theme
    second_theme = CharField()

    class Meta:
        database = database_texts  # Uses 'texts.db'


def create_tables():
    database_texts.connect()
    database_texts.create_tables([Depending, texts])
    database_texts.close()
    database.connect()
    database.create_table([User])
    database.close()
