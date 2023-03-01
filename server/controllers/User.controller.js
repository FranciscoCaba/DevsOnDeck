const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET = process.env.SECRET_KEY

module.exports = {
    userRegister: async (req,res) => {
        const { accountType, orgName, firstname, lastname, email, address, city, state, password, confirmPassword } = req.body
        try{
            if( password === confirmPassword ){
                const newUser = await User.create({ accountType, orgName, firstname, lastname, email, address, city, state, password })
                const userToken = jwt.sign({_id: newUser._id, accountType: newUser.accountType}, SECRET, { expiresIn: '4m' })
                res.status(201).cookie('userToken', userToken, {httpOnly: true, expires: new Date(Date.now() + 240000)})
                    .json({successMessage: "User created correctly", user: newUser})
            }else{
                res.status(400).json({ errors: { confirmPassword: {message: "Passwords dont match"}}})
            }
        }catch(error){
            res.status(400).json(error)
        }
    },
    userLogin: async (req,res) => {
        const user = await User.findOne({ email: req.body.email })
        if(!user){
            res.status(400).json({error: "Incorrect email or password"})
            return
        }
        if( user.accountType !== req.body.accountType ){
            return res.status(400).json({error: "Incorrect email or password"})
        }
        try {
            const passwordValidation = await bcrypt.compare( req.body.password, user.password )
            if(!passwordValidation){
                res.status(400).json({error: "Incorrect email or password"})
            }else{
                const userToken = jwt.sign({ _id: user._id, accountType: user.accountType}, SECRET, { expiresIn: '4m' })
                res.status(201).cookie('userToken', userToken, {httpOnly: true, expires: new Date(Date.now()+240000)})
                    .json({ successMessage: "Loged in successfully"})
            }
        }catch(error){
            res.status(400).json({error: "Incorrect email or password"})
        }
    },
    logOutUser: (req,res) => {
        const cookies = req.cookies
        if(!cookies?.userToken) return res.sendStatus(204)
        res.clearCookie('userToken', { httpOnly: true, sameSite: 'None', secure: true } )
        res.json( { message: 'Cookie cleared' } )
    },
    isSignedIn: (req, res) => {
        const userToken = req.cookies.userToken;
    
        if (!userToken) {
            return res.status(403).json({
                message: 'User has not logged in ',
                isLoggedIn: false,
                isValidToken: false,
            });
        } else {
            try {
                const data = jwt.verify(userToken, SECRET);
                if (!data) {
                    console.log('token is invalid');
                    throw {
                        message: 'Invalid token',
                        isLoggedIn: false,
                        isValidToken: false,
                    };
                } else {
                    req.auth = { _id: data._id };
                    res.json({ _id: data._id, accountType: data.accountType})
                }
            } catch (error) {
                return res.status(500).send(error);
            }
        }
    },
    getUsers: async (req,res) => {
        try{
            const users = await User.find({ accountType: "DEV" })
            res.status(201).json(users.map( (value) => {
                const { accountType, orgName, firstname, lastname, email, languages, frameworks, shortBio, _id } = value
                if(accountType == "DEV")
                    return { accountType, firstname, lastname, email, languages, frameworks, shortBio, _id }
                else
                    return { accountType, orgName, firstname, lastname, email, _id }
            }))
        }catch(error){
            res.status(400).json(error)
        }
    },
    getOneUser: async (req,res) => {
        try{
            const user = await User.findOne({ _id: req.params.id })
            const { accountType, orgName, firstname, lastname, email, languages, frameworks, shortBio, _id } = user
            if(accountType == "DEV")
                res.status(201).json({ accountType, firstname, lastname, email, languages, frameworks, shortBio, _id })
            else
                res.status(201).json({ accountType, orgName, firstname, lastname, email, _id })
        }catch(error){
            res.status(400).json(error)
        }
    },
    updateSkills: (req,res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then( user => res.status(201).json(user) )
            .catch( error => res.status(400).json(error) )
    }
}