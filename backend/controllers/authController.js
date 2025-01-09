import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js"

const register = async (req, res) => {
    const { name, email, password, organization, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, organization, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

export { register, login };
