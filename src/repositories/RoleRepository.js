import Role from "../models/banco/Role";

class RoleRepository {
  async find(data) {
    return Role.findAll();
  }
  async findByName(data) {
    return Role.findOne({ where: { permission: data } });
  }
  async store(data) {
    const { permission } = data;
    return Role.create({
      permission,
    });
  }
}
export default new RoleRepository();
