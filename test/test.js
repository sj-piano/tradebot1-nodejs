let assert = require('assert');


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


describe('Bar', function() {
	describe('#test_attribute', function() {
		it('should have an attribute "x" with a value of "foo".', function() {
			b = new Bar();
			assert.equal(b.x, 'foo');
		});
	});
});


describe('TradeBot', function() {
	describe('#test_z', function() {
		it('should return "z".', async function() {
			tb = new TradeBot();
			x = await tb.z();
			assert.equal(x, 'z');
		});
	});
});
