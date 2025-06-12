import bcrypt from "bcrypt"; 
import { UserRepository } from '../repositories/UserRepository';
import { UserModel } from '../models/UserModel';
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

function encriptar(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

export class UserService {

    static generateToken(user: UserModel): string {
        return jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });
    };
    static async createUser(
        name: string,
        username: string,
        email: string,
        password: string,
    )
    {
        if (!name|| !username || !email || !password) {
            throw new Error('Todos los campos son obligatorios');
        }
        const hash = encriptar(password);

        const User = new UserModel(
            name,
            username,
            email,
            hash,
        );
        // llamamos al repositorio para crear el usuario
        const UsuarioCreado = await UserRepository.createUser(User);
        //retornamos el usuario creado
        return UsuarioCreado;
    }
    static async getUserByUsername(username: string): Promise<UserModel | null> {
        return await UserRepository.getUserByUsername(username);
    }
    static async getAllUser() {
        return await UserRepository.getAllUsers();
    }
    static async updatedData(username: string, updatedData: Partial<UserModel>): Promise<UserModel | null> {
        // actualizar la contraseña
        if (updatedData.password) {
            updatedData.password = encriptar(updatedData.password);
        }
        return await UserRepository.updateDataUser(username, updatedData);
    }
    static async deleteByUsername(username: string): Promise<void> {
        try{
        await UserRepository.deleteByUsername(username);
        }catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error}`);
        }
    }
    static async Login(username: string, password: string): Promise<{token: string } | null> {
        const user = await UserRepository.getUserByUsername(username);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            throw new Error('Contraseña incorrecta');
        }else{
            const token = this.generateToken(user);
            return { token };
        }
    }
}