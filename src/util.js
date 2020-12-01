const winston = require('winston');
require('winston-daily-rotate-file');
const Joi = require('joi');
const _ = require('lodash');
const constants = require('./constants');


// Shortcuts
log2 = console.log;


// Settings
let createLoggerArgsSchema = Joi.object({
	name: Joi.string().required(),
	level: Joi.string().required().valid(...constants.logLevels),
	timestamp: Joi.boolean().default(false),
	filepath: Joi.string().default(''),
});


module.exports.createLogger = async function (args) {
	const {error, value} = createLoggerArgsSchema.validate(args);
	if (error) { throw Error(error) };
	let {name, level, timestamp, filepath} = value;
	/* NOTES:
	- Sample output:
	2020-12-01T13:30:54.484Z INFO    [TradeBot] TradeBot initialised.
	2020-12-01T13:30:54.650Z INFO    [TradeBot] bestBid: 170, bestAsk: 195
	- Logs to console.
	- If a filepath is supplied, then the log will also be written to the designated file. [NOT IMPLEMENTED YET]
	-- The log file is rotated daily.
	*/
	// Note: If an object is passed in to be logged, e.g. logger.info({foo}), then it will be stored in options.meta. options.message will be empty.
	function buildLogString(options, loggerName) {
		let message = options.message;
		if (!(_.isEmpty(options.meta))) {
			let objString = JSON.stringify(options.meta);
			if (message === '') {
				message = objString;
			} else {
				message += ' - ' + objString;
			}
		}
		let levelName = options.level.toUpperCase();
		// Pad level name with spaces to length=7.
		let paddedLevelName = (levelName + ' '.repeat(7)).slice(0, 7);
		// Colorise level name.
		let colorizedLevelName = winston.config.colorize(options.level, paddedLevelName);
		let logString = colorizedLevelName + ' '
			+ '[' + loggerName + ']'
			+ ' ' + message;
		if (timestamp) {
			logString = options.timestamp() + ' ' + logString;
		}
		if (options.meta) {
			if (options.meta.stack) {
				// produced when an exception occurs.
				let stack = options.meta.stack;
				if(isString(stack)) {
					logString += '\n' + stack;
				} else {
					logString += '\n' + stack.join('\n');
				}
			}
		}
		return logString;
	}
	let transports = [
		new (winston.transports.Console) ({
			level: level,
			timestamp: function() { return (new Date()).toISOString(); },
			json: false,
			formatter: function(options) {
				return buildLogString(options, name);
			}
		})
	];
	// If a filepath is specified, create a transport that writes to this file.
	// [NOT IMPLEMENTED YET]
	let logger = new (winston.Logger)({
		transports: transports,
		exitOnError: false,
	});
	logger.listOfTransports = transports;
	return logger;
}
