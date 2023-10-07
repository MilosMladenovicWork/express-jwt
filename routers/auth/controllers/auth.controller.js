const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const registeredUser = {
    email: "invalid@invalid.invalid",
    password: "invalid",
    refreshToken: null
}

const loginController = (req, res) => {

    if(req.body?.email === registeredUser.email && req.body?.password === registeredUser.password){
        const token = generateJwtToken()
        const refreshToken = generateRefreshToken()
        registeredUser.refreshToken = refreshToken;

        return res.json({message: "Logged in successfully", token, refreshToken})
    }

    return res.status(400).send({message: "Invalid username or password"})
}

const tokenController = (req, res) => {
    if(req.body?.refreshToken === registeredUser.refreshToken){
        const refreshToken = generateRefreshToken()
        registeredUser.refreshToken = refreshToken
        const token = generateJwtToken()
        
        return res.json({message: 'Tokens created successfully', token, refreshToken})
    }

    return res.status(400).send({message: "Invalid refresh token"})

}

const logoutController = (req, res) => {
    if(req.body?.refreshToken === registeredUser.refreshToken){
        registeredUser.refreshToken = null;
        
        return res.json({message: 'Logged out successfully'})
    }

    return res.status(400).send({message: "Invalid refresh token"})

}

const generateJwtToken = () => {
    return jwt.sign({email: registeredUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'})
}

const generateRefreshToken = () => {
    const refreshToken = crypto.randomBytes(64).toString('hex');

    return refreshToken;
}

module.exports = {loginController, tokenController, logoutController};