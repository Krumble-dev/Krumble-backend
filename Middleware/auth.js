import tokenService from '../utils/tokenUtils.js';

import ApiError from '../utils/ApiError.js';

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader  
        if (!token) {
            res.status(201).next(new ApiError( 401,"Please login to get access"));
        }

        const { valid, expired, decoded } = tokenService.verifyToken(token);

        if (!valid) {
            return next(new ApiError(401, "Invalid token"));
        }
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401, "Please login to get access"));
    }
};


export default authenticateToken;