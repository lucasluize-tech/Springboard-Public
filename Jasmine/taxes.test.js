describe('calculateTaxes tests', function(){
    it('should calculate low-bracket', function(){
        expect(calculateTaxes(10000)).toEqual(1500);
        expect(calculateTaxes(20000)).toEqual(3000);
    })

    it('sould calculate high-bracket', function(){
        expect(calculateTaxes(40000)).toEqual(10000);
    })
})

describe('other tests', function(){
    it('should do the operation', function(){
        expect(1+1).toEqual(2);
    })

    it('should match string', function(){
        expect('hello').toEqual('hello')
    })
})

describe('removeDuplicates and remove functions', function(){
    it('sould remove duplicates from array', function(){
        expect(removeDuplicates([1,1,2,2,3,3,4,5,6,6])).toEqual([1,2,3,4,5,6])
        expect(removeDuplicates([1,1,2,2,3,3,4,5,6,6])).toBeInstanceOf(Array)
    })


    it('should remove duplicate from string', function(){
        expect(removeDuplicates('hello')).toEqual('helo')
        expect(removeDuplicates('hello')).toBeInstanceOf(String)
    })

    it('should remove value from array', function(){
        expect(remove([1,2,3,4,5,6,7,8], 8)).toEqual([1,2,3,4,5,6,7])
    })
})

// special case throwing errors :
describe('throwing errors', function(){
    it('should reject invalid incomes', function(){
        // we have to insert another function before our testing function
        expect(()=> calculateTaxes('auwdhkawdufawd')).toThrowError();
        expect(()=> calculateTaxes([])).toThrowError();
        expect(()=> calculateTaxes(true)).toThrowError();
    })
})

describe('submitUser() tests ', ()=>{
    it('saves input val to usernames array', ()=>{
        input.value = "something"
        submitUser();
        expect(usernames.length).toBe(1);
        expect(usernames).toContain('something');
    })
})

afterEach(()=>{
    input.value ="";
    usernames = [];
    console.log("afterEach!")
})