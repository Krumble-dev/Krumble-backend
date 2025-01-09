import tokenService from '../utils/tokenUtils.js';

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication token is required'
            });
        }

        const { valid, expired, decoded } = tokenService.verifyToken(token);

        if (!valid) {
            return res.status(401).json({
                status: 'error',
                message: expired ? 'Token has expired' : 'Invalid token'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
};


export default authenticateToken;