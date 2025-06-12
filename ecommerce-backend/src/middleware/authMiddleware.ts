import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user?: jwt.JwtPayload;
    }
}
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'acceso denegado' });
        return;
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        req.user = payload as jwt.JwtPayload;
        next();
    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export function authorizeAdmin(req: Request, res: Response, next: NextFunction): void {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ message: 'Acceso denegado. Se requiere ser Administrador' });
        return;
    }
    next();
}