let assert = require('assert');


describe('TradeBot', function() {
	describe('#test_z', function() {
		it('should return "z".', async function() {
			tb = new TradeBot();
			x = await tb.z();
			assert.equal(x, 'z');
		});
	});
});


describe('TradeBot2', function() {
	describe('#test_name', function() {
		it('should return "TradeBot".', function() {
			tb = new TradeBot();
			assert.equal(tb.name, 'TradeBot');
		});
	});
});
