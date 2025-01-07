
import usrSchema from '../Models/User.js';

import tokenService from '../utils/tokenUtils.js';
import passwordService from '../utils/passutil.js';


import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import CatchAsync from "../utils/CatchAsync.js";


export const handleSignup = async (req, res) => {
    const { email, password, name ,phonenumber } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide all the required fields.'
        });
    }

    const { isStrong, requirements } = passwordService.validatePasswordStrength(password);
    if (!isStrong) {
        return res.status(400).json({
        status: 'error',
        message: 'Password is not strong enough',
        requirements
    });
}
    try {
        const existingUser = await usrSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists.'
            });
        }
        const hashedPassword = await passwordService.hashPassword(password);
        const newUser = new usrSchema({
            email,
            name,
            phonenumber,
            password_hash: hashedPassword,
            oauth: { google: { provider_id: null, linked: false } } 
        });
        await newUser.save();
        const token = tokenService.generateAccessToken(newUser);
        return res.status(201).json({
            status: 'success',
            data: {
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            },
            message: 'User registered successfully.'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try again later.'
            
        });
    }
};




export const handleLogin = async (req, res) => {
    const { email, password,name } = req.body;

   if (!password || (!email && !name)) {
    return res.status(400).json({
        status: 'error',
        message: 'Please provide password and at least one of the following: email or name.'
    });
}

try  {
    const check = email ? { email } : { name };
    const user = await usrSchema.findOne(check);
    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: email ? 'Email is incorrect.' : 'Username is incorrect.'
        });
    }
    
    const { valid, error } = await passwordService.verifyPassword(password, user.password_hash);
    if (!valid) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid password.',
            details: error
        });
    }
        const token = tokenService.generateAccessToken(newUser);

        return res.status(200).json({
            status: 'success',
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            message: 'Login successful.'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try again later.'
        });
    }
};


export const handleGoogleAuth = async (req, res) => {

    const { googleId, email} = req.body;

    if (!googleId || !email ) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide all the required fields.'
        });
    }

    try {
        
        let user = await usrSchema.findOne({ email });

        if (user) {
            if (!user.oauth.google?.linked) {
                user.oauth = { provider_id: googleId, linked: true };
                await user.save();
            }
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'Create a new account'
            });
        }

       const token = tokenService.generateAccessToken(newUser);

        return res.status(200).json({
            status: 'success',
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                }
            },
            message: 'login successful.'
        });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try again later.'
        });
    }
};

export const getUserProfile  = async (req, res) => {
    try {
        console.log("d")
    } catch (error) {
        console.log(error)
    }
}



export default {
    handleSignup,
    handleLogin,
    handleGoogleAuth,
};
