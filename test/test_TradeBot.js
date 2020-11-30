let assert = require('assert');
let log = console.log;


describe('TradeBot', function() {

	describe('#test_name', function() {
		it('should return "TradeBot".', function() {
			tb = new TradeBot();
			assert.equal(tb.name, 'TradeBot');
		});
	});

	describe('#test_getGasPrice', function() {
		it('should return a number.', async function() {
			t = new TradeBot();
			x = await t.makeRequest();
			log(x);
			//assert.equal(x, 'z');
		});
	});

});
