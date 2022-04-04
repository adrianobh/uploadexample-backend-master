import InventoryProductRepository from "../repositories/InventoryProductRepository";

class InventoryProductController {
  async findAllPagination(req, res) {
    const { pageSize, currentPage, globalFilter, product_id, user_id, profile } = req.query;
    try {
      const data = await InventoryProductRepository.findAllPagination({
        pageSize,
        currentPage,
        globalFilter,
        product_id,
        user_id,
        profile
      });
      return res
        .status(200)
        .json({ message: "Estoque encontrado com sucesso", data });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um estoque" });
    }
  }

  async findByPk(req, res) {
    const { id } = req.params;
    try {
      const data = await InventoryProductRepository.findById(id);
      return res.status(200).json({ message: "Estoque encontrado com sucesso", data});
    }catch(err){
      return res.status(401).json({ message: "Não foi possivel encontrar um estoque"});
    }
  }

  async create(req, res) {
    try {
      const data = await InventoryProductRepository.store(req.body);
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
    const { id } = req.params
    try {
      const data = await InventoryProductRepository.update(req.body, id);
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

  async delete(req, res) {
    // Pegando id pelo parametros
    const { id } = req.params;
    try {
      // Chamanda a função destroy dentro do repositorio para exluir o status
      await InventoryProductRepository.destroy(id);

      return res.status(201).json({
        message: "Lote deletado com sucesso",
        data: {},
      });
    } catch (err) {
      return res.status(401).json({
        message: "Não foi possivel deletar um Lote",
      });
    }
  }

}
export default new InventoryProductController();
