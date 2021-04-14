it('should calculate low-bracket', function(){
    expect(calculateTaxes(10000)).toEqual(1500);
    expect(calculateTaxes(20000)).toEqual(3000);
})

it('sould calculate high-bracket', function(){
    expect(calculateTaxes(40000)).toEqual(10000);
})

it('should do the operation', function(){
    expect(1+1).toEqual(2);
})

it('should match string', function(){
    expect('hello').toEqual('hello')
})