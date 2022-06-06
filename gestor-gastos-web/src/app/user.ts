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
    img = null,
  ) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this._imgUrl = imgUrl;
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
    reader.onload = (event: any) => { this._imgUrl = event.target.result; };
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
          GlobalComponent.apiUrl + user['img']
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
      GlobalComponent.apiUrl + user['img']
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

  async update() {
    return await UserService.update(
      this.username,
      this.first_name,
      this.last_name,
      this._img
    );
  }

  async delete() {
    return await UserService.delete(this.username);
  }
}
