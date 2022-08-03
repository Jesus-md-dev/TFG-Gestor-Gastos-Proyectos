import { GlobalComponent } from "./global-component";
import { ProjectService } from "./project.service";

export class Project {
  id: number | null;
  name: string;
  category: string;
  admin: string;
  private _img: File | null;
  private _imgUrl: string;

  constructor(
    id = null,
    name = '',
    category = '',
    admin = '',
    imgUrl = '',
    img = null
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.admin = admin;
    this._imgUrl = GlobalComponent.apiUrl + imgUrl;
    this._img = null;
  }

  public get img(): any {
    if (this._imgUrl != null) return this._imgUrl;
    else return GlobalComponent.blankUserImgPath;
  }

  public set img(value: File) {
    this._img = value;
    var reader = new FileReader();
    reader.readAsDataURL(this._img);
    reader.onload = (event: any) => {
      this._imgUrl = event.target.result;
    };
  }

  isAdmin(username: string | null) {
    return username == this.admin;
  }

  static async create(name: string, category: string, img: File | null) {
    return ProjectService.create(name, category, img);
  }

  async delete() {
    if (typeof this.id == 'number') return await ProjectService.delete(this.id);
  }

  async update() {
    if (typeof this.id == 'number')
      return await ProjectService.update(
        this.id,
        this.name,
        this.category,
        this._img
      );
  }

  async addMembers(userlist: string[]) {
    return ProjectService.addMembers(userlist, this);
  }

  async expellMember(pojetc_id: number, member_id: number) {
    return ProjectService.expellMember(pojetc_id, member_id);
  }

  async imManager() {
    return ProjectService.imManager(this);
  }

  static load(projectId: number) {
    return ProjectService.load(projectId);
  }

  static jsontoList(json: any) {
    let projects: any = [];
    json.forEach((project: any) => {
      projects.push(this.jsontoObject(project));
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
}
