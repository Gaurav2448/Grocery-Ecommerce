const User = require('../models/user_model');
const bcrypt=require('bcryptjs');

const home = async (req, res) => {
    try {
        res.status(200).send("Wlcome");
    } catch (err) {
        console.log(err);
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(422).json({ error: "Please fill all the fields properly" });
        }
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // const saltRound=10;
        // const hash_password=await bcrypt.hash(password,saltRound);

        const userCreated = await User.create({ username, email, phone, password });
        res.status(201).json({ message: userCreated, token: await userCreated.generateToken(), userId: userCreated._id.toString() });

    } catch (err) {
        // console.log(err);
        next(err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const user_exist = await User.findOne({ email: email });
        console.log(user_exist);

        if (!user_exist) {
            return res.status(400).json({ message: "invalid username or password" });
        }

        // const user = await bcrypt.compare(password, user_exist.password);
        const user = await user_exist.comparePassword(password);

        if (user) {
            res.status(200).json({ message: "user signin successfully", token: await user_exist.generateToken(), userId: user_exist._id.toString() });
        }
        else {
            res.status(401).json({ message: "invalid credential" });
        }


    } catch (err) {
        res.status(500).json("internal server error");
    }
}

const user=async(req,res)=>{
    try {
        const userdata=req.user;
        console.log(userdata);
        return res.status(200).json({userdata});
    } catch (error) {
        console.log(`error from user root ${error}`);
    }
}

module.exports = { home, register, login, user };