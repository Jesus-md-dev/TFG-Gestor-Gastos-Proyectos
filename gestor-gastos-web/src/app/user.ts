import { GlobalComponent } from "./global-component";
import { UserService } from "./user.service";

export class User {
  id: number | null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  private _img: File | null;
  private _imgUrl: string;

  constructor(
    id = null,
    username = '',
    first_name = '',
    last_name = '',
    email = '',
    imgUrl = '',
    img = null
  ) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
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

  static async create(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    return UserService.create(username, first_name, last_name, email, password);
  }

  async update(password: string) {
    return await UserService.update(this, this._img, password);
  }

  async delete() {
    return await UserService.delete(this.username);
  }

  static jsontoList(json: any) {
    let users: User[] = [];
    json.forEach((user: any) => {
      users.push(
        new User(
          user['id'],
          user['username'],
          user['first_name'],
          user['last_name'],
          user['email'],
          user['img']
        )
      );
    });
    return users.sort((a, b) => (a.username < b.username ? -1 : 1));
  }

  static jsontoObject(user: any) {
    return new User(
      user['id'],
      user['username'],
      user['first_name'],
      user['last_name'],
      user['email'],
      user['img']
    );
  }

  static async loadUser(username: string) {
    return await UserService.load(username);
  }

  async getOwnedProjects() {
    return await UserService.getOwnedProjects(this.username);
  }

  async getProjectsManaged() {
    return await UserService.getProjectsManaged(this.username);
  }

  async getProjectsMember() {
    return await UserService.getProjectsMember(this.username);
  }

  async getExpenses(projectId: number | null = null) {
    return await UserService.getUserExpenses(this.username, projectId);
  }
}
