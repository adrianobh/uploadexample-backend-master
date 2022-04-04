import CityRepository from "../repositories/CityRepository";

class CityController {
  async findAll(req, res) {
    try {
      const data = await CityRepository.find();
      return res
        .status(200)
        .json({ message: "Cidades encontradas com sucesso", data });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um usuários" });
    }
  }

  async create(req, res) {
    try {
      const data = await CityRepository.store(req.body);

      if (data) {
        return res
          .status(200)
          .json({ message: "Cidade cadastrada com sucesso.", data });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um usuários" });
    }
  }
}
export default new CityController();
