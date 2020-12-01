const assert = require('assert');
const _ = require('lodash');


// Shortcuts
const log2 = console.log;
const aq = assert.equal;


describe('TradeBot', function() {

	let t;

	before(async function() {
		const tradeBotArgs = {debug: false, timestamp: false, loggingOn: false}
		t = new TradeBot(tradeBotArgs);
		await t.init();
	});

	describe('#test_name', function() {
		it('should return "TradeBot".', function() {
			assert.equal(t.name, 'TradeBot');
		});
	});

	describe('#test_getGasPrice', function() {
		it('should return an object with an "average" value.', async function() {
			x = await t.getGasPriceETH();
			aq(_.has(x, 'average'), true);
			aq(_.isNumber(x.average), true);
		});
	});

	describe('#test_getBestBidAndAskETH', function() {
		it('should return an object with a "bid" value and an "ask" value.', async function() {
			x = await t.getBestBidAndAskETH();
		});
	});

});
