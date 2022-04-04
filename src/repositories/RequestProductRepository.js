import RequestProduct from "../models/banco/RequestProduct";

class RequestProductRepository {

  async store(data){
    const { request_id, product_id, amout, price } = data;
    const response = await RequestProduct.create({
      request_id,
      product_id,
      amout,
      price
    })
    return response;
  }

}
export default new RequestProductRepository();
