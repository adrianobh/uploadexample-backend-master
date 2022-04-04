import ProducerLoteRepository from "../repositories/ProducerLotesRepository";

class ProducerLoteController {
  async findAll(req, res) {
    try {
      const data = await ProducerLoteRepository.find();
      return res
        .status(200)
        .json({ message: "Lotes encontrados com sucesso", data });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar os lotes" });
    }
  }

  async create(req, res) {
    try {
      const data = await ProducerLoteRepository.store(req.body);
      if (data) {
        return res
          .status(200)
          .json({ message: "Lote cadastrado com sucesso.", data });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um lote" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const data = await ProducerLoteRepository.update(req.body, id);
      if (data) {
        return res.status(200).json({ message: "Lote alterado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel editar esse lote" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const data = await ProducerLoteRepository.destroy(id);
      if (data) {
        return res.status(200).json({ message: "Lote deletado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel deletar esse lote" });
    }
  }
}
export default new ProducerLoteController();
