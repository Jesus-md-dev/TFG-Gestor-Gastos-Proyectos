export class Project {
    id: number | null;
    name: string | null;
    category: string | null;
    admin: number | null;
    img: string | null;

    constructor(id = null, name = null, category = null, admin = null, img = null) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.admin = admin;
        this.img = img;
    }

    static jsontoList(json: any) {
        let projects: any = [];
        json.forEach((project: any) => {
            projects.push(new Project(
                project["pk"],
                project["fields"]["name"],
                project["fields"]["category"],
                project["fields"]["admin"],
                project["fields"]["img"],
            ));
        });
        return projects;
    }

    static jsontoObject(json: any) {
        return this.jsontoList(json)[0];
    }
}
