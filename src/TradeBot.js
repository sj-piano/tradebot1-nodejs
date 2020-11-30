//let fetch = require('fetch');
const fetch = require('node-fetch');


class TradeBot {


	constructor() {
		this.name = 'TradeBot';
	}


	async z() {
		try {
			console.log('Location: z');
			return 'z';
		} catch(err) {
			throw(err);
		}
	}


	async makeRequest() {
		const params = {
			Symbol: "tETHUSD",
			Precision: "P0",
		};
		const url = `https://api.stg.deversifi.com/bfx/v2/book/${params.Symbol}/${params.Precision}`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			},
		});
		return response.json();
	}


}



module.exports = TradeBot;
