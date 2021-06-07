
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({
    amount:10000,
    years:5,
    rate:5,
  })).toEqual('188.71')
});

it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({
    amount:10000,
    years:5,
    rate:5,
  })).toBeCloseTo(188.71, 2)
});

