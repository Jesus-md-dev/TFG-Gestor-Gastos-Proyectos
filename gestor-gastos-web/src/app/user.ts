import { GlobalComponent } from "./global-component";
import { UserService } from "./user.service";

export class User {
  id: number | null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  private _img: string;

  constructor(
    id = null,
    username = '',
    first_name = '',
    last_name = '',
    email = '',
    img = ''
  ) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this._img = img;
  }

  public get img(): string {
    return this._img != '' ? this._img : GlobalComponent.blankUserImgPath;
  }

  public set img(value: string) {
    this._img = value;
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
    return await UserService.loadUser(username);
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

  async getProjects() {
    return await UserService.getUserProjects(this.username);
  }

  async getProjectsMember() {
    return await UserService.getUserProjectsMember(this.username);
  }

  async save() {
    return await UserService.save(
      this.username,
      this.first_name,
      this.last_name,
      this._img
    );
  }
}
