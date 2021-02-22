const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/userModel');

const EmailSender = require('../services/emailSenderService/auth');

const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const HelperClass = require('../utils/Helper');
const Helper = new HelperClass();

const passwordChecher = (password, passwordCheck) => {
    const letterRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
    const numericRegex = new RegExp("(?=.*[0-9])");
    const simbolRegex = new RegExp("(?=.*[!@#\$%\^&\*])");
    let msg = ""


    if (password.length < 7) msg = "Your password must be at least 7 characters.";
    
    if (letterRegex.test(password) == false) msg = "Your password must contain uppercase and lowercase letters.";

    if (numericRegex.test(password) === false) msg = "Your password must contain  numbers.";

    if (password !== passwordCheck) msg = "Your passwords do not match.";

    return msg
}


router.post('/register', async (req,res) => {
    try {
        let {email, password, confirmPassword, name} = req.body;
        if (!email || !password || !confirmPassword || !name) return res.status(400).json({msg: "Fill in all the fields ."});
        const passwordCheckError = passwordChecher(password, confirmPassword)
        if (passwordCheckError !== "") return res.status(400).json({msg: passwordCheckError});

        const userExists = await User.findOne({email:email});
        if (userExists) return res.status(400).json({msg: "User with this mail already exists ."});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        name = name.charAt(0).toUpperCase() + name.slice(1);

        const newUser = new User ({
            email,
            name,
            password: passwordHash,
        });


        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (err) {
        console.log(err)
        return res.status(500).json({err: err.message});
    }
})


router.post('/verificationSend', async(req, res) => {
    try {
        let {email} = req.body;
        const user = await User.findOne({email:email});
        
        let code = user._id;
        code = code.toString().substr(4,4);

        const emailSender = new EmailSender();
        emailSender.sendEmail(email, user.name, code);

        return res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err.message});
    }
})


router.post('/verificationRight', async(req, res) => {
    try {
        const { code, token } = req.body;

        const decodedJwt = jwt_decode(token);
        const user = await User.findById(decodedJwt.id);
        const user_id = user._id.toString().substr(4,4);

        console.log(req.body, user_id);
        if (code === user_id) {
            await User.findByIdAndUpdate(decodedJwt.id, {verified: true});
            return res.json(user.verified);
        } else {
            return res.status(400).json({msg: "Code does not match."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err.message});
    }
})

router.post('/login', async (req,res) => {
    try {
        let {emailLogin, passwordLogin} = req.body;
        
        if (!emailLogin || !passwordLogin) return res.status(400).json({msg: "Заполните все поля."});

        const user = await User.findOne({email: emailLogin});

        if (!user) return res.status(400).json({msg: "This account does not exist. Try to register."});

        const ifMatch = await bcrypt.compare(passwordLogin, user.password);
        if (!ifMatch) return res.status(400).json({msg: "Your passwords do not match."});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                name:user.name,
                email:user.email,
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({err: err.message});
    }
})


router.post('/validToken', async (req,res) => {
    try {
        const token = req.headers['x-auth-token'];
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!verified) return res.json(false);
        
        return res.json(true);
    } catch (err) {
        res.status(500).json({err: err.message});
    }
})



router.get('/', async (req,res) => {
    try {
        const decodedJwt = jwt_decode(req.headers['x-auth-token']);
        const user = await User.findById(decodedJwt.id);
        const lastMessages = await Helper.userLastMessages(user)
        res.json({
            name: user.name,
            email: user.email,
            rooms: user.rooms,
            lastMessages
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({err: err.message});
    }
})

module.exports = router