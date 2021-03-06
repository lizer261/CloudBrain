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
    global was, num, dep, themes, depends
    # Main page
    @app.route('/c')
    def cabinet():
        return render_template('c.html')

    # All notes
    @app.route('/all_notes')
    def all_notes():
        global was, num, dep, themes, depends
        was = []
        num = 0
        keys = []
        tabs = []
        # Get notes of user
        notes = get_text_of_user('Andrew')[::-1]
        # Bind themes and depends
        depends = []
        themes = []

        def list_indexes(item_find, mass):
            list_ind = []
            for i in range(0, len(mass)):
                try:
                    if mass[i] == item_find:
                        list_ind.append(mass.index(item_find, i))
                except ValueError:
                    pass
            return list_ind

        def next(mass, item_from):
            lst = list_indexes(item_from, mass)
            end = []
            for i in lst:
                end.append(depends[i])
            return end

        def pre(mass, item):
            try:
                return mass[depends.index(item)]
            except ValueError:
                return ''

        def tree(mass, start):
            global was, num, dep
            if start not in was:
                was.append(start)
                if start != '%':
                    keys.append(start)
                    tabs.append(num)
                else:
                    num -= 1

            if next(mass, start) != []:
                num += 1
                for i in next(mass, start):
                    if i != '':
                        tree(mass, i)
                    else:
                        num -= num
            else:
                num -= 1
        # For every note in notes we add theme and depend
        for note in notes:
            # get note depend
            for i in get_theme_depending(note.theme):
                depends.append(i.main_theme)
                themes.append(i.second_theme)
            if note.theme not in themes:
                themes.append(note.theme)
                depends.append('')
        for note in notes:
            if pre(themes, note.theme) == '':
                themes.append('%')
                depends.append(note.theme)
        tree(themes, '%')
        return render_template('all_notes.html',
                               notes=keys, tabs=tabs)

    @app.route('/cloud/note_editor')
    def note_editor():
        return render_template('note_editor.html',
                               header_links=generate_header())

    @app.route('/c/<theme>')
    def get_theme(theme):
        # return get_text_by_theme('Andrew', theme)[0].text
        return render_template('edit_note.html', text=get_text_by_theme('Andrew', theme)[0].text, theme=theme)

    @app.route('/depend', methods=['POST'])
    def depend():
        add_depending(request.form['second_theme'], request.form['main_theme'])
        return ''

    @app.route('/rem_depend', methods=['POST'])
    def rem_depend():
        remove_depending(request.form['second_theme'],request.form['main_theme'])
        return ''
