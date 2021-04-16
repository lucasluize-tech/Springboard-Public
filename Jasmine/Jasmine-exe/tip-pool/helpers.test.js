describe('helper functions', function(){
    beforeEach(function(){
        billAmtInput.value = 100;
        tipAmtInput.value = 18;
    });

    it('should return average of tips on SumPaymentTotal()', ()=>{
        createCurPayment();
        submitPaymentInfo();
        expect(sumPaymentTotal('tipAmt')).toEqual(18)
    });

    it('should calculate tip % on calculateTipPercent()', ()=>{
        expect(calculateTipPercent(100, 18)).toEqual(18)
    });

    it('should delete the server table when "X" is clicked', ()=>{
        let newTr = document.createElement('tr')
        appendDeleteButton(newTr)
        expect(newTr.children.length).toEqual(1)
    });

    afterEach(()=>{
        billAmtInput.value = '';
        tipAmtInput.value = '';
        serverId = 0;
        allServers = {};
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
    })
})