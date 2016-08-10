module.exports = function (app, passport) {

	app.get('/', function (req, res) {
		res.render('index.ejs');
	});

	app.get('/signup', function (req, res) {
		console.log("render signup page");
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/login', function (req, res) {
		res.render('login.ejs');
	});

	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs');
	});

	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();
		req.redirect('/');
	}
}