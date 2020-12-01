const Big = require('big.js'); // Future: Use this to do price & volume calculations.
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
		this.balances = {
			'ETH': 10,
			'USD': 2000,
		}
		this.orders = {
			'bids': [],
			'asks': [],
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
		/* NOTES:
		- Volume is in ETH.
		- Price is in USD.
		*/
		let log = this.log;
		let deb = this.deb;
		let durationSeconds = 0;
		let c = 0;
		while (true) {
			log('### Start of trading cycle');
			//let {bid:bestBidStr, ask:bestAskStr} = await this.getBestBidAndAskETH();
			let bestBid = Number(util.getRandomFloat(170,200).toFixed(2));
			let bestAsk = bestBid + 15
			log(`bestBid: ${bestBid}, bestAsk: ${bestAsk}`);
			let highBid = bestBid;
			let lowBid = bestBid * 0.95;
			let lowAsk = bestAsk;
			let highAsk = bestAsk * 1.05;
			let lowVolume = this.balances.ETH * 0.01;
			let highVolume = this.balances.ETH * 0.05;
			/* Check existing orders to see if:
			- They have filled.
			- They are no longer within 5% of the best prices and need to be cancelled.
			*/
			this.orders2 = {'bids': [], 'asks': []}; // hacky.
			for (const order of this.orders.bids) {
				let p = Number(order.price);
				let v = Number(order.volume);
				let q = Number(order.quoteVolume);
				if (p > bestAsk) {
					// Order has filled.
					this.balances.ETH += v;
					this.balances.USD -= q;
					let message = `FILLED BID @ ${order.price} ${order.volume}`;
					message += ` (Balances: ${this.balances.ETH} ETH, ${this.balances.USD} USD)`;
					log(message);
				} else if (p < lowBid || p > highBid) {
					// Order is no longer within target range. Cancel it.
					let message = `CANCEL BID @ ${order.price} ${order.volume}`;
					log(message);
				} else {
					// Order is fine. Leave it on the book.
					this.orders2.bids.push(order);
				}
			}
			for (const order of this.orders.asks) {
				let p = Number(order.price);
				let v = Number(order.volume);
				let q = Number(order.quoteVolume);
				if (p < bestBid) {
					// Order has filled.
					this.balances.ETH -= v;
					this.balances.USD += q;
					let message = `FILLED ASK @ ${order.price} ${order.volume}`;
					message += ` (Balances: ${this.balances.ETH} ETH, ${this.balances.USD} USD)`;
					log(message);
				} else if (p < lowAsk || p > highAsk) {
					// Order is no longer within target range. Cancel it.
					let message = `CANCEL ASK @ ${order.price} ${order.volume}`;
					log(message);
				} else {
					// Order is fine. Leave it on the book.
					this.orders2.asks.push(order);
				}
			}
			this.orders = this.orders2;
			// Place new bid orders, until we have 5 bid orders on the book.
			while (this.orders.bids.length < 5) {
				let price = util.getRandomFloat(lowBid, highBid).toFixed(2);
				let volume = util.getRandomFloat(lowVolume, highVolume).toFixed(2);
				this.addBidOrder({price, volume});
			};
			// Place new ask orders, until we have 5 ask orders on the book.
			while (this.orders.asks.length < 5) {
				let price = util.getRandomFloat(lowAsk, highAsk).toFixed(2);
				let volume = util.getRandomFloat(lowVolume, highVolume).toFixed(2);
				this.addAskOrder({price, volume});
			};
			await sleepSeconds(5);
			durationSeconds += 5
			// Display balances.
			if (durationSeconds > 30) {
				durationSeconds = 0
				let message = `Balances: ${this.balances.ETH} ETH, ${this.balances.USD} USD`;
				log(message);
			}
			log('### End of trading cycle');
		}
	}


	async addBidOrder({price, volume}) {
		let message = `PLACE BID @ ${price} ${volume}`;
		let quoteVolume = (Number(price) * Number(volume)).toFixed(2);
		if (quoteVolume > this.balances.USD) {
			let logMsg = `Insufficient balance (${this.balances.USD}) to place order (${message}). quoteVolume=${quoteVolume}`;
			this.log(logMsg);
			return;
		}
		// Store values as strings.
		let order = {price, volume, quoteVolume};
		this.orders.bids.push(order);
		this.log(message);
	}


	async addAskOrder({price, volume}) {
		let message = `PLACE ASK @ ${price} ${volume}`;
		let quoteVolume = (Number(price) * Number(volume)).toFixed(2);
		if (volume > this.balances.ETH) {
			let logMsg = `Insufficient balance (${this.balances.ETH}) to place order (${message}). volume=${volume}`;
			this.log(logMsg);
			return;
		}
		// Store values as strings.
		let order = {price, volume, quoteVolume};
		this.orders.asks.push(order);
		this.log(message);
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
		// This API function doesn't appear to be updating.
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
		return result;
	}


	async getBestBidAndAskETH2() {
		// Leave this alone for now. Perhaps the market just isn't very active atm.
		let book = await this.getOrderbookETHUSD();
		log2(book);
	}


}



module.exports = TradeBot;
