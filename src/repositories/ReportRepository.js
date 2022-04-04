import { QueryTypes } from "sequelize"; // importar o sequelize
import sequelize from "../db";

class RequestProductRepository {

  async findMes(){
      
    const response = await sequelize.query(`
    SELECT
        CASE 
            WHEN Month(requests.data_sale) = "1" THEN "Janeiro"
            WHEN Month(requests.data_sale) = "2" THEN "Fevereiro"
            WHEN Month(requests.data_sale) = "3" THEN "Março"
            WHEN Month(requests.data_sale) = "4" THEN "Abril"
            WHEN Month(requests.data_sale) = "5" THEN "Maio"
            WHEN Month(requests.data_sale) = "6" THEN "Junho"
            WHEN Month(requests.data_sale) = "7" THEN "Julho"
            WHEN Month(requests.data_sale) = "8" THEN "Agosto"
            WHEN Month(requests.data_sale) = "9" THEN "Setembro"
            WHEN Month(requests.data_sale) = "10" THEN "Outubro"
            WHEN Month(requests.data_sale) = "11" THEN "Novembro"
            WHEN Month(requests.data_sale) = "12" THEN "Dezembro"
        END AS "Mês",
        Month(requests.data_sale) AS "Order",
        Year(requests.data_sale) AS "Ano",
        SUM(requests.total_price) AS "Valor"
    FROM
        requests
    INNER JOIN users on
        users.id = requests.user_id
    GROUP BY 2,3
    ORDER BY 2,3`, 
    { type: QueryTypes.SELECT })
    return response;
  }

  async findUser(){
      
    const response = await sequelize.query(`
    SELECT
        users.id,
        users.name,
        SUM(requests.total_price) AS "Valor"
    FROM
        requests
    INNER JOIN users on
        users.id = requests.user_id
    GROUP BY 1
    ORDER BY 2
    LIMIT 10`
    , 
    { type: QueryTypes.SELECT })
    return response;
  }

  async findFacilitador(){
      
    const response = await sequelize.query(`
    SELECT
	users.name,
	SUM(requests.total_price) AS "Valor"
    FROM
        requests
    INNER JOIN users ON requests.facilitador_id = users.id
    GROUP BY 1
    ORDER BY 2
`
    , 
    { type: QueryTypes.SELECT })
    return response;
  }

}
export default new RequestProductRepository();




