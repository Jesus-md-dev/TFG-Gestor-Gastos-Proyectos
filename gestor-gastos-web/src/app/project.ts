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
              project["id"],
              project["name"],
              project["category"],
              project["admin"],
              project["img"],
          ));
      });
      return projects;
    }

    static jsontoObject(project: any) {
      return new Project(
        project['id'],
        project['name'],
        project['category'],
        project['admin'],
        project['img'],
      );
    }
}
