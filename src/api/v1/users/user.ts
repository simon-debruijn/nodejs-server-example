class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  tokens: string[] = [];

  constructor(_id: string, name: string, email: string, password: string) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export { User };
