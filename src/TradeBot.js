const fetch = require('node-fetch');


class TradeBot {


	constructor() {
		this.name = 'TradeBot';
	}


	async getGasPriceETH() {
		const url = `https://api.stg.deversifi.com/v1/trading/r/getGasPrice`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
		});
		return response.json();
	}


	async getOrderbookETHUSD() {
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
