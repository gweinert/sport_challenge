 
const isAuthenticated = module.exports = (req, res, next) => {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()) {
        console.log("is auth good to go!")
		return next();
	}
	console.log("auth failed")
	// if the user is not authenticated then redirect him to the login page
	res.json({success: 0, error: "User is not authenticated"})
}