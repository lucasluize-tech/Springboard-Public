from flask import Flask, request
from operations import add, sub, mult, div
# Put your app in here.

app = Flask(__name__)

@app.route('/add')
def _add():
    a = int(request.args["a"])
    b = int(request.args["b"])
    _sum = a + b
    return f"{_sum}"

@app.route('/sub')
def _sub():
    a = int(request.args["a"])
    b = int(request.args["b"])
    _sub = a - b
    return f"{_sub}"

@app.route('/mult')
def _mult():
    a = int(request.args["a"])
    b = int(request.args["b"])
    _mult = a * b
    return f"{_mult}"

@app.route('/div')
def _div():
    a = int(request.args["a"])
    b = int(request.args["b"])
    _div = a / b
    return f"{_div}"

operators = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route("/math/<oper>")
def do_math(oper):

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = operators[oper](a, b)

    return str(result)