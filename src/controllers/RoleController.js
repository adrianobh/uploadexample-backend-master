import RoleRepository from "../repositories/RoleRepository";

class RoleController {
  async findAll(req, res) {
    try {
      const data = await RoleRepository.find();
      return res
        .status(200)
        .json({ message: "Permissões encontradas com sucesso", data });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um usuários" });
    }
  }

  async create(req, res) {
    try {
      const data = await RoleRepository.store(req.body);
      if (data) {
        return res
          .status(200)
          .json({ message: "Permissões cadastrada com sucesso.", data });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um usuários" });
    }
  }
}
export default new RoleController();
