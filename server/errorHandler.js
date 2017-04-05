// Error Handler 500 (server error)

module.exports = {
		handleError : function(err, req, res, next){ // the err argument does the trick here (4 args)
				res.status(err.status || 500)
					.statusMessage = err.message; // added this for fetch to use err message directly
				res.json({
					error: { message: err.message }
				});
			}
	};