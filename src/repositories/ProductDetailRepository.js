import Product from "../models/banco/Product";
import ProductDetail from "../models/banco/ProductDetail";
import paginate from "../helpers/paginate";
import { Op } from "sequelize";

class ProductDetailRepository {
  async store(data) {
    const { product_id, detail, img } = data;
    return ProductDetail.create({
      product_id,
      detail,
      img,
    });
  }
  async update(data, id) {
    const { detail, img } = data;
    return Product.update({ detail, img }, { where: { id } });
  }
  async destroy(id) {
    return Product.destroy({ where: { id } });
  }

  async findByPk(id) {
    return await Product.findByPk(id, {
      attributes: ["detail", "url"],
    });
  }
}
export default new ProductDetailRepository();
