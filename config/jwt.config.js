const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    if(jwt_payload.email){
        return done(null, {email: jwt_payload.email})
    }

    return done(null, false)
}));