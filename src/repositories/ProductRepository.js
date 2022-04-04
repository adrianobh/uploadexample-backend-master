import Product from "../models/banco/Product";
import paginate from "../helpers/paginate";
import { Op } from "sequelize";
import ProductDetail from "../models/banco/ProductDetail";
import ProductLote from "../models/banco/ProductLote";
class ProductRepository {
  async find(data) {
    const { pageSize = 10, currentPage = 1, globalFilter } = data;
    let where = {};
    if (globalFilter && globalFilter !== null) {
      where = {
        [Op.or]: {
          description: {
            [Op.like]: `${globalFilter}%`,
          },
        },
      };
    }
    const totalRows = await Product.count({ where });
    const response = await Product.findAll({
      attributes: ["id", "description"],
      where,
      ...paginate({ currentPage, pageSize }),
    });
    return {
      totalRows,
      response,
    };
  }
  async store(data) {
    const { description } = data;
    return Product.create({
      description,
    });
  }
  async update(data, id) {
    const { description, detail } = data;
    ProductDetail.update({ detail }, { where: { product_id: id }})
    return Product.update({ description }, { where: { id } });
  }
  async destroy(id) {
    return Product.destroy({ where: { id } });
  }
  async findByRequest(id, facilitador) {
    return await Product.findByPk(id, {
      attributes: ["description", "id"],
      include: [
        {
          model: ProductDetail,
          as: "product_detail",
        },
        {
          model: ProductLote,
          as: "lotes",
          where: {
            user_id: facilitador
          }
        },
      ],
    });
  }
  async findByPk(id) {
    return await Product.findByPk(id, {
      attributes: ["description", "id"],
      include: [
        {
          model: ProductDetail,
          as: "product_detail",
        },
      ],
    });
  }

  async findOption(data) {
    return Product.findAll({
      include: [
        {
          model: ProductDetail,
          as: "product_detail",
        },
        {
          model: ProductLote,
          as: "lotes",
          where: { user_id: data ? data : null }
        },
      ],
    });
  }

}
export default new ProductRepository();
