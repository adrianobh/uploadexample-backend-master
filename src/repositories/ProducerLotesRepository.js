import ProducerLote from "../models/banco/ProducerLote";

class ProducerLoteRepository {
  async find() {
    return ProducerLote.findAll();
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
    return ProducerLote.create({
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
    return ProducerLote.update(
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
    return await ProducerLote.destroy({ where: { id } });
  }
}
export default new ProducerLoteRepository();
