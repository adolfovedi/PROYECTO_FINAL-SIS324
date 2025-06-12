import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserModel } from "../models/UserModel";

export class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, username, email, password } = req.body;
            const newUser = await UserService.createUser(name, username, email, password);
            res.status(201).json({ user: newUser });
        } catch (error) {
            res.status(400).json({
                message: "Error al crear el usuario controller" + error
            });
        }
    }

    static async getbyUsername(req: Request, res: Response): Promise<void> {
        const username = req.params.username;

        try {
            const user = await UserService.getUserByUsername(username);
            if (user) { 
                res.status(200).json(user); 
            } else { 
                res.status(404).json({ message: 'Usuario no encontrado' }); 
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el usuario controller -> " + error,
            });
        }
    }

    static async getAllUser(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserService.getAllUser();
            res.json(users);
        } catch (error) {
            res.status(400).json({
                message: "Error al obtener los usuarios controller -> " + error
            });
        }
    }

    static async UpdateData(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        const updatedData: Partial<UserModel> = req.body;

        try {
            const updatedUser = await UserService.updatedData(username, updatedData);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            }else{
            res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar el usuario controller -> " + error,
            });
        }
    }

    static async deleteByUsername(req: Request, res: Response): Promise<void> {
        const { username } = req.params;

        try {
            const result = await UserService.deleteByUsername(username);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar el usuario -> " + error
            });
        }
    }

    static async Login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const result = await UserService.Login(username, password);
            if (result) {
                res.status(200).json({ token: result.token });
            }else{
                res.status(401).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(404).json({
                message: (error as Error).message
            });
        }
    }
}