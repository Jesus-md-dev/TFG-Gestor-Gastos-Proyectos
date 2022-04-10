export class User {
  id: number | null;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  img: string | null;

  constructor(
    id = null,
    username = '',
    first_name = null,
    last_first_name = null,
    email = null,
    img = null
  ) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_first_name;
    this.email = email;
    this.img = img;
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
}
