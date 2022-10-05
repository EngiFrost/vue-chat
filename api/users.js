class Users {
  constructor() {
    this.users = [];
  }

  add(user) {
    this.users.push(user);
  }

  get(id) {
    return this.users.find((user) => user.id === id);
  }

  remove(id) {
    const userToRemove = this.get(id);

    if (userToRemove) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return userToRemove;
  }

  getByRoom(room) {
    return this.users.filter((user) => user.room === room);
  }
}

export default new Users()
