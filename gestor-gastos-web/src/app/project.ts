export class Project {
    id: number | undefined;
    name: string | undefined;
    category: string | undefined;
    admin: number | undefined;

    constructor(id: number, name: string, category: string, admin: number) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.admin = admin;
    }

    static jsontoList(json: any) {
        let projects: any = [];
        json.forEach((project: any) => {
            projects.push(new Project(
                project["pk"],
                project["fields"]["name"],
                project["fields"]["category"],
                project["fields"]["admin"],
            ));
        });
        return projects;
    }

    static jsontoObject(json: any) {
        return this.jsontoList(json)[0];
    }
}