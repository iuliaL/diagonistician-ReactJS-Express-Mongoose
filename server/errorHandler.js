// Error Handler 500 (server error)

module.exports = {
	handleError: function (err, req, res, next) { // the err argument does the trick here (4 args required to mantain signature!!!)
		res.status(err.status || 500)
			.statusMessage = err.message; // added this for fetch to use err message directly
		res.json({
			error: { message: err.message }
		});
	}
};
/*
Error-handling middleware

Error-handling middleware always takes four arguments.
You must provide four arguments to identify it as an error-handling middleware function.
Even if you don’t need to use the next object, you must specify it to maintain the signature. */