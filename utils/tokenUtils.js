import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class TokenService {

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET must be defined in environment variables');
        }
        this.secret = process.env.JWT_SECRET;
        this.expiresIn = process.env.JWT_EXPIRES_IN || '100y';
    }

    generateAccessToken(user) { 
        return jwt.sign(
            {
                id: user._id
            },
            this.secret,
            // { expiresIn: this.expiresIn }
        );
    }

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.secret);
            return {
                valid: true,
                expired: false,
                decoded
            };
        } catch (error) {
            return {
                valid: false,
                expired: error.name === 'TokenExpiredError',
                decoded: null
            };
        }
    }
}

const tokenService = new TokenService();

export default tokenService;