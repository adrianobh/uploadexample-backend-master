import ProductLote from "../models/banco/ProductLote";
import paginate from "../helpers/paginate";
import Product from "../models/banco/Product";
import ProductDetail from "../models/banco/ProductDetail";

class InventoryProductRepository {
  async findAllPagination(data) {
    const { pageSize = 10, currentPage = 1, globalFilter, product_id } = data;
    let where = { product_id };
    if(data.profile !== 'Admin'){
      where = {
        user_id: data.user_id
      }
    }
    if (globalFilter && globalFilter !== null) {
      where = {
        [Op.or]: {
          valor: {
            [Op.like]: `${globalFilter}%`,
          },
          lote: {
            [Op.like]: `${globalFilter}%`,
          },
          quantidade: {
            [Op.like]: `${globalFilter}%`,
          },
          unidade: {
            [Op.like]: `${globalFilter}%`,
          },
        },
      };
    }
    const totalRows = await ProductLote.count({ where });
    const response = await ProductLote.findAll({
      attributes: [
        "id",
        "user_id",
        "product_id",
        "valor",
        "lote",
        "quantidade",
        "unidade",
        "status",
        "data_entrada",
        "data_validade",
      ],
      where,
      ...paginate({ currentPage, pageSize }),
    });

    return {
      response,
      totalRows,
    };
  }

  async store(data) {
    const {
      user_id,
      product_id,
      valor,
      lote,
      quantidade,
      unidade,
      status,
      data_entrada,
      data_validade,
    } = data;
    return ProductLote.create({
      user_id,
      product_id,
      valor,
      lote,
      quantidade,
      unidade,
      status,
      data_entrada,
      data_validade,
    });
  }

  async update(data, id) {
    const {
      user_id,
      product_id,
      valor,
      lote,
      quantidade,
      unidade,
      status,
      data_entrada,
      data_validade,
    } = data;
    return ProductLote.update(
      {
        user_id,
        product_id,
        valor,
        lote,
        quantidade,
        unidade,
        status,
        data_entrada,
        data_validade,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  async destroy(id) {
    return await ProductLote.destroy({ where: { id } });
  }

  async findById(id){
    return await ProductLote.findByPk(id);
  }

  async findLote(data){
    return await ProductLote.findAll({
      attributes: [
        "id",
        "user_id",
        "product_id",
        "valor",
        "lote",
        "quantidade",
        "unidade",
        "status",
        "data_entrada",
        "data_validade",
      ],
      where: {
        product_id: data.product_id,
        lote: data.lote
      }
    })
  }

  async removeQtd(data){
    return await ProductLote.update(
      {
      quantidade: data.quantidade
      },
      {
        where: {
          id: data.id
        },
      }
    )
  }
}
export default new InventoryProductRepository();
