/* DESCRIPTION
- Run a simple market-making TradeBot using NodeJS.
- Market: Ethereum / United States Dollars (ETHUSD)
- Venue: Deversifi
*/


const program = require('commander');
const TradeBot = require('./src').TradeBot;


// Shortcuts
let log2 = console.log;


// Error handling

process.on('uncaughtException', (err) => {
	log2('=== UNCAUGHT EXCEPTION ===');
	console.error(err)
	process.exit(1);
});

process.on('unhandledRejection', (err, rejectedPromise) => {
	log2('=== UNHANDLED REJECTION ===');
	console.error(err.stack);
	//log(rejectedPromise);
	process.exit(1);
});

// Test error handling
//Promise.reject(new Error('promiseFoo'))
//throw Error('errorFoo');


// Command-line arguments
program
	.option('-d, --debug', 'Print out debug information.', false)
	.option('-l, --logLevel <logLevel>', 'Set logging level.', 'error')
	.option('-t, --timestamp', 'Include timestamp in log messages', false)
program.parse(process.argv);
let debug = program.debug;
let logLevel = program.logLevel;
let timestamp = program.timestamp;



// Run main top-level function
main();


// Top-level function
async function main() {
	try {
		tradeBotArgs = {debug, logLevel, timestamp, loggingOn:true};
		t = new TradeBot(tradeBotArgs);
		await t.init();
		t.run();
	} catch(err) {
		console.error(err);
		process.exit(1);
	}
}
