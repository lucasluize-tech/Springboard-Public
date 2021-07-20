from flask import Flask, request, render_template, flash
from flask import redirect
from helper_func import from_is_valid, to_is_valid, amount_is_valid, get_result

app = Flask(__name__)

app.config['SECRET_KEY'] = 'averyverysosecretkeyright?'
result = ""

@app.route('/')
def home():
    """ Landing page with the form """
    
    return render_template('base.html')

@app.route('/conversion', methods=["POST"])
def convert_values():
    """ getting the values from the form and tryng to make conversion"""
    convert_from = request.form.get('from').upper()
    convert_to = request.form.get('to').upper()
    amount = request.form.get('amount')
    
    # Check for from_is_valid()
    if not from_is_valid(convert_from):
        flash(f'{convert_from} NOT A VALID CURRENCY SYMBOL!')
        return redirect('/')
    # Check for to_is_valid()

    elif not to_is_valid(convert_to):
        flash(f'{convert_from} NOT A VALID CURRENCY SYMBOL!')
        return redirect('/')

    # Check amount_is_valid()
    elif not amount_is_valid(amount):
        flash('AMOUNT NOT A NUMBER!')
        return redirect('/')

    # Get string result with symbol + conversion

    result = get_result(convert_from, convert_to, amount)

    return redirect('/result')

    @app.route('/result')
    def showing_result():
        """ here will render the result of the conversion """

        new_amount = result
        
        return render_template('result.html', result=new_amount)