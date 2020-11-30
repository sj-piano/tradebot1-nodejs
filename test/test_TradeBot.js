let assert = require('assert');
let _ = require('lodash');


/* START SHORTCUTS */
let log = console.log;
let aq = assert.equal;
/* END SHORTCUTS */


describe('TradeBot', function() {

	let t;

	before(function() {
		t = new TradeBot();
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

});
