const got = require('got');


console.log('test');


process.on('uncaughtException', (err) => {
	console.error('There was an uncaught error', err)
	process.exit(1) //mandatory (as per the Node docs)
})

process.on('unhandledRejection', (error, p) => {
	console.log('=== UNHANDLED REJECTION ===');
	console.log(error.stack);
	console.log(p);
});

//Promise.reject(new Error('not OK'))


let dest = 'https://api.deversifi.com/bfx/v2/book/tETHUSD/R0';


foo();

async function foo() {
	try {
		const response = await got(dest);
		console.log(response.body);


	} catch(err) {
		console.log(err);
		console.log(err.response.body);
	}
}
