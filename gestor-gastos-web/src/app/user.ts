import { UserService } from "./user.service";

export class User {
  id: number | null;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  img: string | null;

  constructor(
    username = '',
    id = null,
    first_name = null,
    last_name = null,
    email = null,
    img = null
  ) {
    this.username = username;
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.img = img;
    if (
      id == null ||
      first_name == null ||
      last_name == null ||
      email == null ||
      img == null
    ) {
      UserService.getUserData(username).then((response) => {
        this.id = response['id'];
        this.first_name = response['first_name'];
        this.last_name = response['last_name'];
        this.email = response['email'];
        this.img = response['img'];
      });
    }
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

  async getProjects() { return await UserService.getUserProjects(this.username); }
}
