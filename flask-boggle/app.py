from boggle import Boggle
from flask import Flask, render_template, request
from flask import jsonify, redirect, session


boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'booooooggggglllleee'

@app.route('/')
def start_session_board():
    board = boggle_game.make_board()
    session['board'] = board
    #keep score?
    highscore = session.get('highscore', 0)
    plays = session.get('plays', 0)

    return render_template('board.html', board=board, highscore=highscore, plays=plays)

@app.route('/validate')
def validate_word():
    guess = request.args.get('guess')
    board = session['board']
    is_valid = boggle_game.check_valid_word(board, guess)

    return jsonify(result=is_valid)

@app.route('/scores', methods=["POST"])
def update_scores():
    score = request.json['score']
    highscore = session.get('highscore', 0)
    plays = session.get('plays', 0)

    session['plays'] = plays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(record=score> highscore)