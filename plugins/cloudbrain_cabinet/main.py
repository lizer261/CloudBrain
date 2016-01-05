# Send file is needed for js and css
from flask import render_template, request
# Import plugin path for static
#
from plugins.database.main import *

JS_DRAWING = '<script src="/cloud/js/drawing.js"></script>'


def generate_header():
    return ' '

# Init
def init(app):
    # Main page
    @app.route('/c')
    def cabinet():
        return render_template('c.html')

    # All notes
    @app.route('/all_notes')
    def all_notes():
        # Get notes of user
        notes = get_text_of_user('Andrew')[::-1]
        # Bind themes and depends
        themes = []
        depends = []
        # For every note in notes we add theme and depend
        for note in notes:
            # get note depend
            note.depend = get_theme_depending(note.theme)
            themes.append(note.theme)
            depends.append(note.depend)

        keys = []

        cash = []
        # For theme in depend
        for theme, depend in zip(themes, depends):
            # If theme in depend
            if theme in depends:
                cash.append(theme)
                # we must know depend is list or no
                try:
                    # if not list - error
                    assert isinstance(depend, list)
                    # add - new mass
                    add = []
                    add.append(theme)
                    for dep in depend:
                        add.append(dep)
                    depends[depends.index(theme)] = add
                except AssertionError:
                    depends[depends.index(theme)] = [theme, depend]
        for cash_item in cash:
            index = themes.index(cash_item)
            themes.pop(index)
            depends.pop(index)
        for theme, depend in sorted(zip(themes, depends)):
            keys.append(theme)
            if depend != '':
                try:
                    assert isinstance(depend, list)
                    for depend_item in depend:
                        keys.append(depend_item)
                except AssertionError:
                    keys.append(depend)

        return render_template('all_notes.html',
                               notes=keys)

    @app.route('/cloud/note_editor')
    def note_editor():
        return render_template('note_editor.html',
                               header_links=generate_header())

    @app.route('/c/<theme>')
    def get_theme(theme):
        return get_text_by_theme('Andrew', theme)[0].text

    @app.route('/depend', methods=['POST'])
    def depend():
        add_depending(request.form['main_theme'], request.form['second_theme'])
        return ''
