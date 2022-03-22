import { HttpClient } from "@angular/common/http";

export class User {
    id: number | null;
    username: string;
    password: string | null;
    name: string | null;
    surname: string | null;
    email: string | null;

    constructor(id = null, username = "", password = null, name = null,
        surname = null, email = null) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    static jsontoList(json: any) {
        let users: User[] = [];
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
        return users.sort((a, b) => (a.username < b.username) ? -1 : 1);
    }

    static jsontoObject(json: any) { return this.jsontoList(json)[0]; }
}
