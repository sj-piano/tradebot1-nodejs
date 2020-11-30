


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




foo();

async function foo() {
	try {


	} catch(err) {
		console.log(err);
		process.exit(0);
		//console.log(err.response.body);
		console.log('end');
	}
}
