const Big = require('big.js');
const Joi = require('joi');
const fetch = require('node-fetch');
const util = require('./util');
const constants = require('./constants');


// Shortcuts
const log2 = console.log;
const sleepSeconds = ms => new Promise(r => setTimeout(r, ms * 1000));




class TradeBot {


	constructor(args) {
		// Note: Can't call async functions in the constructor.
		this.name = 'TradeBot';
		this.tradeBotArgsSchema = Joi.object({
			debug: Joi.boolean().default(false),
			logLevel: Joi.string().valid(...constants.logLevels).default('error'),
			timestamp: Joi.boolean().default(false),
			loggingOn: Joi.boolean().default(false),
		});
		const {error, value} = this.tradeBotArgsSchema.validate(args);
		if (error) { throw Error(error) };
		let {debug, timestamp, loggingOn, logLevel} = value;
		this.debug = debug;
		this.logLevel = logLevel;
		this.loggingOn = loggingOn;
		if (debug) { this.logLevel = 'debug'; }
		this.loggerArgs = {name: 'TradeBot', level: this.logLevel, timestamp};
		this.defaultHeaders = {
			"Accept": "application/json",
			"Content-Type": "application/json",
		}
	}


	async init() {
		this.logger = await util.createLogger(this.loggerArgs);
		this.log = this.logger.info;
		this.deb = this.logger.debug;
		if (!this.loggingOn) { await this.switchOffLogging(); };
		this.log('TradeBot initialised.');
	}


	async switchOffLogging() {
		this.logger.listOfTransports.forEach((t) => (t.silent = true));
	}


	async run() {
		let log = this.log;
		let deb = this.deb;
		let c = 0;
		while (true) {
			let {bid:bestBid, ask:bestAsk} = await this.getBestBidAndAskETH();
			log(`bestBid: ${bestBid}, bestAsk: ${bestAsk}`);
			let ourLowBid = Big('0.95').mul(Big(bestBid));
			let ourLowBidStr = ourLowBid.toString();
			log({ourLowBidStr});


			await sleepSeconds(3);
			log2('endCycle');
			c += 1;
			if (c > 0) break;
		}
		
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


	async getBestBidAndAskETH() {
		const params = {symbols: "tETHUSD"};
		let url = `https://api.stg.deversifi.com/bfx/v2/tickers`;
		url += `?symbols=${params.symbols}`;
		const response = await fetch(url, {
			method: "GET", headers: this.defaultHeaders,
		});
		if (response.status !== 200) {
			throw Error(`Bad response: status=${status}`);
		}
		let x = await response.json();
		let y = x[0];
		let result = {'bid': y[1], 'ask': y[3]};
		return result;
	}
			

	async getOrderbookETHUSD() {
		const params = {
			Symbol: "tETHUSD",
			Precision: "P0",
		};
		let url = `https://api.stg.deversifi.com/bfx/v2/book/`;
		url += `${params.Symbol}/${params.Precision}`;
		const response = await fetch(url, {
			method: "GET", headers: this.defaultHeaders,
		});
		let result = await response.json();
		this.log(result);
		return result;
	}



}



module.exports = TradeBot;
