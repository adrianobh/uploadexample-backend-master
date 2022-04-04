import ProductRepository from "../repositories/ProductRepository";
import ProductDetailRepository from "../repositories/ProductDetailRepository";
class ProductController {
  async findAll(req, res) {
    const { pageSize, currentPage, globalFilter, user_id } = req.query;

    try {
      const data = await ProductRepository.find({
        pageSize,
        currentPage,
        globalFilter,
      });
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
    const { description, detail, img } = req.body;
    try {
      const data = await ProductRepository.store({ description });
      // Precisa do produto gravado, para ter seu id e gravar os detalhes.
      if (data) {
        if (detail || img) {
          await ProductDetailRepository.store({
            product_id: data.id,
            detail,
            img,
          });
        }
      }
      if (data) {
        return res
          .status(200)
          .json({ message: "Produto cadastrado com sucesso.", data });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um produto" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const data = await ProductRepository.update(req.body, id);
      if (data) {
        return res
          .status(200)
          .json({ message: "Produto alterado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel editar esse produto" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const data = await ProductRepository.destroy(id);
      if (data) {
        return res
          .status(200)
          .json({ message: "Produto deletado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel deletar esse lote" });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const data = await ProductRepository.findByPk(id);
      if (data) {
        return res.status(200).json({
          message: "Produto encontrado com sucesso",
          data,
        });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um produto" });
    }
  }

  async delete(req, res) {
    // Pegando id pelo parametros
    const { id } = req.params;
    try {
      // Chamanda a função destroy dentro do repositorio para exluir o status
      await ProductRepository.destroy(id);

      return res.status(201).json({
        message: "Produto deletado com sucesso",
        data: {},
      });
    } catch (err) {
      return res.status(401).json({
        message: "Não foi possivel deletar um produto",
      });
    }
  }

  async findAllOption(req, res) {
    const { user_id } = req.query;
    try {
      const data = await ProductRepository.findOption(user_id);
      return res
        .status(200)
        .json({ message: "Produtos encontrados com sucesso", data });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar os produtos" });
    }
  }
}
export default new ProductController();
