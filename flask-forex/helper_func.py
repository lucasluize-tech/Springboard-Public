from forex_python.converter import CurrencyRates, CurrencyCodes, Decimal

def from_is_valid(currency):
    c = CurrencyCodes()
    if c.get_symbol(currency):
        return True
    return False

def to_is_valid(currency):
    c = CurrencyCodes()
    if c.get_symbol(currency):
        return True
    return False

def amount_is_valid(amount):
    try:
        amount = float(amount)
        return True
    except ValueError:
        return False

def get_result(convert_from, convert_to, amount):
    amount = float(amount)
    rates = CurrencyRates(force_decimal=True)
    result_amount = rates.convert(convert_from, convert_to, Decimal(amount))
    
    symbol = CurrencyCodes().get_symbol(convert_to)

    return f'{symbol} {result_amount:.2f}'