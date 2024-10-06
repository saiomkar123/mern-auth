const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User is already exists, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: 'Signup Successful.', success: true })
    } catch (e) {
        console.log('error', e);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'Auth failed. Email is not found.', success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: 'Auth failed. Invalid password.', success: false });
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ message: 'Signup Successful.', success: true, jwtToken: jwtToken, email: user.email, name: user.name });
    } catch (e) {
        console.log('error', e);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports = {
    signup,
    login
}