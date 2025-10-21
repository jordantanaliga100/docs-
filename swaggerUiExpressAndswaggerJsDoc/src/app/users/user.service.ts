class UserService {
  getAll() {
    return [
      { id: "1", name: "Juan Dela Cruz" },
      { id: "2", name: "Maria Santos" },
    ];
  }

  getById(id: string) {
    return { id, name: "Test User" };
  }
}

const userService = new UserService();
export default userService;
