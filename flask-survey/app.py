from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Survey, Question, satisfaction_survey, personality_quiz

app = Flask(__name__)
app.config['SECRET_KEY'] = 'something-secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route('/')
def landing():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions

    return render_template('landing.html', title = title,
    instructions = instructions)

@app.route('/start', methods=["POST"])
def start_session():
    session['answers'] = []
    return redirect('/questions/0')

@app.route('/questions/<int:id>')
def show_question(id):
    #retrieve responses stored on sessions
    responses = session["answers"]
    # if user already responded all questions:
    if len(responses) == len(satisfaction_survey.questions):
        return redirect('/thankyou')

    # Protecting users from jumping questions manually.
    if len(responses) != id:
        flash(f'Invalid question id: {id}')
        return redirect(f'/questions/{len(RESPONSES)}')

    question = satisfaction_survey.questions[id].question
    choices = satisfaction_survey.questions[id].choices # make a for loop on the template for radio buttons

    return render_template('questions.html', question= question, choices=choices, qnum = id)


@app.route('/answer', methods =["POST"])
def post_awnser():
    # adding to list with sessions
    answer = request.form.get('answer')
    responses = session['answers']
    responses.append(answer)
    session['answers'] = responses
    
 
    # if all the questions have been answered show thank you page.

    if len(responses) >= len(satisfaction_survey.questions):
        return redirect('/thankyou')
    return redirect(f'/questions/{len(responses)}') # how to make this route dynamic

@app.route('/thankyou')
def thankyou_page():
    return render_template('thankyou.html')