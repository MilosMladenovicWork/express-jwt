require('dotenv').config()
const express = require('express')
const authRouter = require('./routers/auth/auth.router')
const bodyParser = require('body-parser')
const passport = require('passport');
require('./config/jwt.config')

const app = express()

const port = 3000;

app.use(bodyParser.json())

app.use(passport.initialize());

app.use('/auth', authRouter)
app.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json(req.user)
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})