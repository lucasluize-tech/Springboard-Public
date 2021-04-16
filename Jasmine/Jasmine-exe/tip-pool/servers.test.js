describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    billAmtInput.value = 100;
    tipAmtInput.value = 18;

  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice')
  });

  it('should update the values to SummaryTable on UpdateSeverTable()', function() {
    createCurPayment();
    submitPaymentInfo();
    updateServerTable();

    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments['payment' + paymentId].tipAmt).toEqual('18');
  });

  afterEach(function() {
    // teardown logic
    serverNameInput.value = "";
    billAmtInput.value = "";
    tipAmtInput.value = "";
    serverId = 0;
    allServers = {};
    allPayments = {};
    paymentId = 0;
    paymentTbody.innerHTML = '';
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    serverTbody.innerHTML = '';
  });
});
