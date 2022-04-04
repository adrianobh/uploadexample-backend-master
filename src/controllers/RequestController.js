import RequestRepository from "../repositories/RequestRepository";
import RequestProductRepository from '../repositories/RequestProductRepository';
import InventoryProductRepository from '../repositories/InventoryProductRepository';

const { OAuth2Client } = require("google-auth-library");
class RequestController {

  async findAllPagination(req, res) {
    const { pageSize, currentPage, globalFilter, user_id } = req.query;
    try {
      const data = await RequestRepository.findAllRequest({
        pageSize,
        currentPage,
        globalFilter,
        user_id
      });
      if (data) {
        return res.status(200).json({
          message: "Pedidos encontrados com sucesso",
          data,
        });
      }

    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um pedido" });
    }
  }

  async findOne(req, res) {
    const { id } = req.params;
    try {
      const data = await RequestRepository.findByPk(id);
      if (data) {
        return res.status(200).json({
          message: "Pedidos encontrados com sucesso",
          data,
        });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um pedido" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const data = await RequestRepository.destroy(id);
      if (data) {
        return res
          .status(200)
          .json({ message: "Pedido deletado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel deletar esse Pedido" });
    }
  }

  async create(req, res) {
    const { params } = req.body;
    const { user_id, facilitador } = params
    try {
      // Retirando quantidade usada do estoque do produto.
      params.product.map(async (item) => {
        const response = await InventoryProductRepository.findLote({
          product_id: item.id,
          lote: item.lote,
          quantidade: item.quantidade
        });
        const estoque = await InventoryProductRepository.removeQtd({
          id: response[0].id,
          quantidade: response[0].quantidade - item.quantidade
        })
      })

      let soma = 0
      params.product.map((item) => {
        soma += item.valor * item.quantidade
      });
      // Salvando pedido
      const request = await RequestRepository.store({
        user_id,
        facilitador_id: facilitador,
        total_price: soma,
        data_sale: new Date()
      })
      // Salvando itens do pedido
      params.product.map(async (item) => {
        if (item.quantidade > 0) {
          await RequestProductRepository.store({
            request_id: request.id,
            product_id: item.id,
            amout: item.quantidade,
            price: item.valor
          })
        }
      })

      if (request) {
        return res
          .status(200)
          .json({ message: "Pedido cadastrado com sucesso.", request });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um pedido" });
    }
  }
}
export default new RequestController();
