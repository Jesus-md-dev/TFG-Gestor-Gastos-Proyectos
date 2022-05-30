import { GlobalComponent } from "./global-component";
import { ProjectService } from "./project.service";

export class Project {
  id: number | null;
  name: string;
  category: string;
  admin: string;
  private _img: string;

  constructor(id = null, name = '', category = '', admin = '', img = '') {
    this.id = id;
    this.name = name;
    this.category = category;
    this.admin = admin;
    this._img = img;
  }

  public get img(): string {
    return this._img != '' ? this._img : GlobalComponent.blankProjectImgPath;
  }

  public set img(value: string) {
    this._img = value;
  }

  static async create(name: string, category: string) {
    return ProjectService.create(name, category, null);
  }

  async delete() {
    if (typeof this.id == 'number') return await ProjectService.delete(this.id);
  }

  async update() {
    if (typeof this.id == 'number') return await ProjectService.update(
      this.id, this.name, this.category, this.img);
  }

  static jsontoList(json: any) {
    let projects: any = [];
    json.forEach((project: any) => {
      projects.push(
        new Project(
          project['id'],
          project['name'],
          project['category'],
          project['admin'],
          project['img']
        )
      );
    });
    return projects;
  }

  static jsontoObject(project: any) {
    return new Project(
      project['id'],
      project['name'],
      project['category'],
      project['admin'],
      project['img']
    );
  }

  async addMembers(userlist: string[]) {
    if (typeof this.id == 'number')
      return ProjectService.addMembers(userlist, this.id);
  }

  async expellMember(pojetc_id: number, member_id: number) {
    return ProjectService.expellMember(pojetc_id, member_id);
  }
}
