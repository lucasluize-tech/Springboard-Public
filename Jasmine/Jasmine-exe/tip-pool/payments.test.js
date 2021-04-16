describe('handling payments', function(){
    beforeEach(function () {
        // initialization logic
        serverNameInput.value = 'Alice';
        billAmtInput.value = 100;
        tipAmtInput.value = 18;
    
    });
    
    it('should Add a curPayment object to allPayments on submitPaymentInfo()', ()=>{
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + paymentId].billAmt).toEqual('100')
    });

    it('should createCurPayment() will return undefined with negative or empty inputs', ()=>{

        expect(createCurPayment()).toEqual({
            billAmt: '100',
            tipAmt: '18',
            tipPercent: 18,})
    });

    it('should append to the Payment table on appendPaymentTable()', ()=>{
        let currentPay = createCurPayment()
        appendPaymentTable(currentPay);
        expect(paymentTbody.innerText).toContain("$100\t$18\t18%")
    });

    it('should display updated values to summary on updateSummary()', ()=>{
        createCurPayment();
        submitPaymentInfo();
        updateSummary();
        
        expect(summaryTds[0].innerHTML).toEqual('$100')
        expect(summaryTds[1].innerHTML).toEqual('$18')
        expect(summaryTds[2].innerHTML).toEqual('18%')
    })

    afterEach(()=>{
        billAmtInput.value = "";
        tipAmtInput.value = "";
        serverId = 0;
        allServers = {};
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML ="";

    })
})