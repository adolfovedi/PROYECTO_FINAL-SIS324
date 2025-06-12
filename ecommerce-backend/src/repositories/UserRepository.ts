import { DataBase } from '../config/turso';
import { UserModel } from '../models/UserModel';


export class UserRepository {
    static async createUser(user: UserModel): Promise<UserModel> {
        const newUser = 'INSERT INTO Users (Name, UserName, Email, Password) VALUES (:name , :username, :email, :password) RETURNING *';

        try {
            const result = await DataBase.execute({
                sql: newUser,
                args: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                },
            });

            const createdUser = result.rows[0];

            return new UserModel(
                String(createdUser.Name),
                String(createdUser.UserName),
                String(createdUser.Email),
                String(createdUser.Password)
            );
        } catch (error) {
            console.error('error al crear usuario: repository', error);
            throw new Error('Error al crear usuario repository');
        }
    }
    static async getUserByUsername(username: string): Promise<UserModel | null> {
        const buscar = "SELECT * FROM USERS WHERE username = :username";
        const result = await DataBase.execute({
            sql: buscar,
            args: { username },
        });

        if (!result.rows || result.rows.length === 0) {
            return new UserModel(
                "",
                "",
                "",
                "",
                ""
            );
        } else {
            const getUser = result.rows[0];
            return new UserModel(
                String(getUser.Name),
                String(getUser.UserName),
                String(getUser.Email),
                String(getUser.Password),
                "",
                Number(getUser.Id)
            );
        }
    }

    static async getAllUsers(): Promise<UserModel[]> {
        const searchUsers = 'SELECT * FROM USERS';
        const result = await DataBase.execute(searchUsers);
        if (!result.rows || result.rows.length === 0) return [];
        return result.rows.map((row => new UserModel(
            row.Name ? String(row.Name) : "",
            row.UserName ? String(row.UserName) : "",
            row.Email ? String(row.Email) : "",
            row.Password ? String(row.Password) : ""
        )));
    }

    static async updateDataUser(username: string, updatedData: Partial<UserModel>): Promise<UserModel | null> {
        const editUser = 'UPDATE Users SET Name = COALESCE(:NewName, Name), Email = COALESCE(:NewEmail, Email), Password = COALESCE(:NewPassword, Password) WHERE UserName = :Username RETURNING *;';
        try {
            const updatedUser = await DataBase.execute({
                sql: editUser,
                args: {
                    NewName: updatedData.username ?? null,
                    NewEmail: updatedData.email ?? null,
                    NewPassword: updatedData.password ?? null,
                    Username: username
                },
            });
            if (!updatedUser.rows || updatedUser.rows.length === 0) return null;
            const userUpdated = updatedUser.rows[0];
            return new UserModel(
                String(userUpdated.Name),
                String(userUpdated.UserName),
                String(userUpdated.Email),
                String(userUpdated.Password)
            );
        } catch (error) {
            console.error('error al actualizar usuario: repository', error);
            throw new Error('Error al actualizar usuario repository');
        }
    }

    static async deleteByUsername(username: string): Promise<string> {
        const deleteUser = "DELETE FROM USERS WHERE username = :UserName";
        try {
            const result = await DataBase.execute({
                sql: deleteUser,
                args: {
                    UserName: username
                }
            });
            if (result.rows.length === 0) {
                throw new Error('no existe el usuario');
            } else {
                return `Usuario ${username} eliminado satisfactoriamente`;
            }
        } catch (error) {
            console.error('error al eliminar usuario: repository', error);
            throw new Error('Error al eliminar usuario repository');
        }
    }
}