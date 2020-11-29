class Bar {


	constructor() {
		console.log('Location: constructor');
		this.x = 'foo';
		this.y = 'bar';
	}


	async z() {
		try {
			console.log('Location: z');
			return 'z';
		} catch(err) {
			throw(err);
		}
	}


}




module.exports.Bar = Bar;
