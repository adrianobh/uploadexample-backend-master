import Request from "../models/banco/Request";
import User from '../models/banco/User';
import paginate from "../helpers/paginate";
import { Op } from "sequelize";
import RequestProduct from "../models/banco/RequestProduct";
import Product from "../models/banco/Product";
class RequestRepository {

  async findAllRequest(data) {
    const { pageSize = 10, currentPage = 1, globalFilter, user_id } = data;
    let where = { user_id };
    let where_user = {};
    if (globalFilter && globalFilter !== null) {
      where_user = {
        [Op.or]: {
          name: {
            [Op.like]: `${globalFilter}%`,
          },
          email: {
            [Op.like]: `${globalFilter}%`,
          },
        },
      };
    }
    const totalRows = await Request.count({ where });
    const response = await Request.findAll({
      attributes: ["id", "user_id", "total_price", "data_sale"],
      include: [
        {
          model: User,
          as: 'user',
          where: where_user,
        }
      ],
      where,
      ...paginate({ currentPage, pageSize }),
    });

    return {
      totalRows,
      response,
    };
  }
  async findByPk(id) {
    return Request.findByPk(id, {
      include: [
        {
          model: RequestProduct,
          as: 'request_product',
          include: [
            {
              model: Product,
              as: 'product'
            }
          ]
        },
        {
          model: User,
          as: 'user'
        }
      ]
    })
  }
  async destroy(id) {
    return Request.destroy({ where: { id } });
  }

  async store(data){
    const { user_id, total_price, data_sale, facilitador_id} = data;

    const response = await Request.create({
      user_id,
      facilitador_id,
      total_price,
      data_sale
    })

    return response;
  }

}
export default new RequestRepository();
