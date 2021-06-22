from flask import Flask, request, render_template
from stories import Story


app = Flask(__name__)

@app.route('/')
def get_words():
    return render_template('form-2.html')

@app.route('/story')
def create_story():
    place = request.args.get('place')
    noun = request.args.get('noun')
    verb = request.args.get('verb')
    adjective = request.args.get('adjective')
    plural_noun = request.args.get('plural_noun')

    

    if request.args.get("stories") == "story1":
        story = Story(
        ["place", "noun", "verb", "adjective", "plural_noun"],
        """Once upon a time in {place}, there lived a
        large {adjective} {noun}. It loved to {verb} {plural_noun}."""
        )

    elif request.args.get("stories") == "story2":
        story = Story(
        ["place", "noun", "verb", "adjective", "plural_noun"],
        """{place}, a {adjective} place to {verb}, full of {noun},
        and a ton of {plural_noun}."""
        )

    ans = {
        "place":place,
        "noun":noun,
        "verb": verb,
        "adjective": adjective,
        "plural_noun": plural_noun
    }
    
    result = story.generate(ans)

    return render_template('story.html', story=result)