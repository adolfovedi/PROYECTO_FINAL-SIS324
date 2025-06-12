import jwt from 'jsonwebtoken';

interface UserPayload {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    UserRole: string;
}
const decodeJWT = (token: string): UserPayload => {
    const decoded = jwt.decode(token) as { user: UserPayload };
    return decoded.user;
}
export default decodeJWT;