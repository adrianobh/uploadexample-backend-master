import ReportRepository from "../repositories/ReportRepository";

class ReportController {

  async findMonth(req, res) {
    try {
      const data = await ReportRepository.findMes();
      return res
        .status(200)
        .json({ message: "Relatorio feito com sucesso", data });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel realizar um relatorio" });
    }
  }

  async findUser(req, res) {
    try {
      const data = await ReportRepository.findUser();
      return res
        .status(200)
        .json({ message: "Relatorio feito com sucesso", data });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel realizar um relatorio" });
    }
  }

  async findFacilitador(req, res) {
    try {
      const data = await ReportRepository.findFacilitador();
      return res
        .status(200)
        .json({ message: "Relatorio feito com sucesso", data });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Não foi possivel realizar um relatorio" });
    }
  }

}
export default new ReportController();
