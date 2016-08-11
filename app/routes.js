module.exports = function (app, passport) {

	app.get('/', function (req, res) {
		res.render('index.ejs');
	});

	app.get('/signup', function (req, res) {
		console.log("render signup page");
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/login', function (req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs');
	});

	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.post('/login',passport.authenticate('local-login',{
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}))

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();
		req.redirect('/');
	}
}