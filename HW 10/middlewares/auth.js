import User_Repositories from '../repo/user_repositories.js'
import { verifyToken } from '../library/jwt.js'


const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({
            message: 'Authentication Token Required'
        });

        const accessToken = token.split(' ')[1];
        if (!accessToken) return res.status(401).json({
            message: 'Invalid Token'

        });
        const decoded = verifyToken(accessToken);
        const data = await User_Repositories.getById(decoded.id)
        if (!data) throw {name: 'Data Not Found'}
        req.data = data;
        req.token_id = decoded.id;
        next();

    } catch (error) {
        next(error);
    }
}

const userAuthorization = async (req, res, next) => {
    try {
        const user_id = parseInt(req.params.id)
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw { name: 'token' }
        const decodedToken = verifyToken(token)
        const { id, role } = decodedToken;
        if (!id || !role) throw { name: 'authorization' }
        req.user = { id, role };
        if (role !== 'admin' && id !== user_id) throw { name: 'No Access' }
        next();

    } catch (error) {
        next(error);
    }
}

const adminAuthorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw { name: 'token' }
        const decodedToken = verifyToken(token)
        const { role } = decodedToken;
        console.log(role);
        if (!role) throw { name: 'No Access' }
        if (role !== 'admin') throw { name: 'No Access' }
        next();

    } catch (error) {
        next(error);
    }
}

export {    authentication, userAuthorization, adminAuthorization,
}