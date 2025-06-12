export class UserModel {
    id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    UserRole?: string;
    constructor(
        name: string,
        username: string,
        email: string,
        password: string,
        UserRole?: string,
        id?: number,
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.UserRole = UserRole;
    }
}