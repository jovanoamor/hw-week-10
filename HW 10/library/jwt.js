import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Token = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
} 
const verifyToken = (token) => {
    return jwt.verifyToken(token, process.env.SECRET_KEY);
}
export {  Token,   verifyToken
}