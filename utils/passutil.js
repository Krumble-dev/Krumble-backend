import bcrypt from 'bcrypt';

class PasswordService {

    constructor() {
        this.saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
    }

    async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password: ' + error.message);
        }
    }

    async verifyPassword(password, hashedPassword) {
        try {
            const isValid = await bcrypt.compare(password, hashedPassword);
            return {
                valid: isValid,
                error: null
            };
        } catch (error) {
            return {
                valid: false,
                error: 'Error verifying password: ' + error.message
            };
        }
    }


    validatePasswordStrength(password) {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return {
            isStrong: strongPasswordRegex.test(password),
            requirements: [
                'Minimum 8 characters',
                'At least one uppercase letter',
                'At least one lowercase letter',
                'At least one number',
                'At least one special character (@$!%*?&)'
            ]
        };
    }
}

const passwordService = new PasswordService();
export default passwordService;