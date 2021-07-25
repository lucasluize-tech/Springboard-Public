from app import app
from helper_func import currency_is_valid, get_result, amount_is_valid
from unittest import TestCase
from forex_python.converter import CurrencyRates

class FlaskTests(TestCase):

    def setUp(self):

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):

        with self.client as c:
            response = c.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Forex Converter APP', response.data)
    
    def test_resultpage(self):

        with self.client as c:
            response = c.get('/result')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Conversion', response.data)

    def test_conversionform(self):
        rates = CurrencyRates()
        with app.test_client() as c:
            response = c.post('/conversion', data={
                'from':'USD',
                'to':'GBP',
                'amount':'1'
            })
            new_amount = rates.convert('USD','GBP',1)
            self.assertIn(b'The result is', response.data)

class HelperFunctionTests(TestCase):

    def test_currency_is_valid(self):
        self.assertEqual(currency_is_valid('USD'), True)
        self.assertEqual(currency_is_valid('ZZZ'), False)

    def test_to_is_valid(self):
        self.assertEqual(currency_is_valid('GBP'), True)
        self.assertEqual(currency_is_valid('YYY'), False)

    def test_amount_is_valid(self):
        self.assertEqual(amount_is_valid('123.45'), True)
        self.assertEqual(amount_is_valid('number'), False)

    def test_get_results(self):
        amount = CurrencyRates().convert('USD', 'GBP', 1)
        self.assertEqual(get_result('USD','GBP', "1"), f'£ {amount:.2f}')