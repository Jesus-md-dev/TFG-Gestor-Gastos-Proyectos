import { HttpClient } from "@angular/common/http";

export class User {
    id: number | undefined;
    username: string | undefined;
    password: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;

    constructor()
    constructor(id: number, username: string, password: string, name: string, 
        surname: string, email: string)
    constructor(id?: number, username?: string, password?: string, name?: string,
        surname?: string, email?: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
    
    static jsontoList(json: any) {
        let users: any = [];
        json.forEach((user: any) => {
            users.push(new User(
                user["pk"],
                user["fields"]["username"],
                user["fields"]["password"],
                user["fields"]["name"],
                user["fields"]["surname"],
                user["fields"]["email"],
            ));
        });
        return users;
    }

    static jsontoObject(json: any) { return this.jsontoList(json)[0]; }
}